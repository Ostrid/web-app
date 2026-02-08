// src/hooks/useOstridObservability.ts
import { useState, useEffect, useCallback, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { OstridEvent, OstridNode } from "../types/observer";
import { addEdge } from "@xyflow/react";
import { IAppContext } from "../context/AppContext";
import { dummyEvents } from "./dummydata";

export function useObservability() {
  const [state, setState] = useState<IAppContext["observability"]>({
    nodes: [],
    edges: [],
    events: [],
    isConnected: false,
  });

  useEffect(() => {
    if (import.meta.env.VITE_USE_DUMMY_DATA === "true") {
      loadDummyData();
    }
  }, []);
  const socketRef = useRef<Socket | null>(null);

  const addOrUpdateNode = useCallback((node: OstridNode) => {
    setState((prev) => {
      const exists = prev.nodes.some((n) => n.id === node.id);
      if (exists) {
        return {
          ...prev,
          nodes: prev.nodes.map((n) =>
            n.id === node.id ? { ...n, data: { ...n.data, ...node.data } } : n,
          ),
        };
      }
      return {
        ...prev,
        nodes: [...prev.nodes, node],
      };
    });
  }, []);

  const addEvent = useCallback((event: OstridEvent) => {
    setState((prev) => ({
      ...prev,
      events: [...prev.events, event].slice(-100), // keep last 100 events
    }));
  }, []);

  const processEvent = useCallback(
    (rawEvent: any) => {
      // Make sure we have a timestamp and id
      const event: OstridEvent = {
        ...rawEvent,
        id:
          rawEvent.id ||
          `evt-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        timestamp: rawEvent.timestamp || new Date().toISOString(),
      };

      addEvent(event);

      switch (event.type) {
        case "agent-message-to-adapter":
        case "task-job-initiated": {
          if (!event.agentId) return;
          addOrUpdateNode({
            id: event.agentId,
            type: "custom",
            position: { x: Math.random() * 600, y: Math.random() * 400 },
            data: {
              label: `Agent ${event.agentId.slice(0, 6)}...`,
              type: "Principal",
              id: event.agentId,
              status: "active",
            },
          });

          addOrUpdateNode({
            id: "adapter",
            type: "custom",
            position: { x: 800, y: 250 },
            data: { label: "Ostrid Adapter", type: "Adapter", id: "adapter" },
          });

          setState((prev) => ({
            ...prev,
            edges: addEdge(
              {
                id: `e-${event.id}`,
                source: event.agentId!,
                target: "adapter",
                animated: true,
                label: event.messageType || "→",
                style: { stroke: "#3b82f6" },
                markerEnd: { type: "arrowclosed", color: "#3b82f6" },
              },
              prev.edges,
            ),
          }));
          break;
        }

        case "agent-to-agent-communication": {
          if (!event.sourceAgentId || !event.targetAgentId) return;

          addOrUpdateNode({
            id: event.sourceAgentId,
            type: "custom",
            position: { x: Math.random() * 500, y: Math.random() * 300 },
            data: {
              label: `A${event.sourceAgentId.slice(0, 4)}`,
              type: "Remote",
            },
          });

          addOrUpdateNode({
            id: event.targetAgentId,
            type: "custom",
            position: { x: Math.random() * 500 + 300, y: Math.random() * 300 },
            data: {
              label: `A${event.targetAgentId.slice(0, 4)}`,
              type: "Remote",
            },
          });

          setState((prev) => ({
            ...prev,
            edges: addEdge(
              {
                id: `e-${event.id}`,
                source: event.sourceAgentId!,
                target: event.targetAgentId!,
                animated: true,
                label: event.commType || "↔",
                style: { stroke: "#10b981" },
                markerEnd: { type: "arrowclosed", color: "#10b981" },
              },
              prev.edges,
            ),
          }));
          break;
        }

        case "sui-chain-event":
        case "escrow-locked":
        case "escrow-released":
        case "match-found": {
          if (event.jobId) {
            addOrUpdateNode({
              id: `job-${event.jobId}`,
              type: "custom",
              position: { x: 400, y: 100 },
              data: {
                label: `Job ${event.jobId.slice(0, 6)}`,
                type: "ChainEvent",
                id: event.jobId,
                status:
                  event.type === "escrow-released" ? "completed" : "pending",
              },
            });
          }
          break;
        }

        default:
          // just log unknown events
          console.debug("Unhandled event type:", event.type);
      }
    },
    [addOrUpdateNode, addEvent],
  );

  const loadDummyData = useCallback(() => {
    dummyEvents.forEach((ev) => {
      setTimeout(() => {
        processEvent(ev);
      }, 500 * Math.random()); // stagger events randomly over 5 seconds
    });
  }, []);

  useEffect(() => {
    const socket = io(
      import.meta.env.VITE_ADAPTER_URL || "http://localhost:4000",
      {
        reconnectionAttempts: 5,
        timeout: 10000,
        autoConnect: true,
      },
    );

    socket.on("connect", () => {
      setState((prev) => ({ ...prev, isConnected: true }));
      console.log("Connected to Ostrid real-time adapter");
    });

    socket.on("disconnect", () => {
      setState((prev) => ({ ...prev, isConnected: false }));
    });

    socket.on("ostrid-event", (data: any) => {
      processEvent(data);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [processEvent]);

  return {
    nodes: state?.nodes,
    edges: state?.edges,
    events: state?.events,
    isConnected: state?.isConnected,
  };
}
