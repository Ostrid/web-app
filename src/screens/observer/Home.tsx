// src/components/Dashboard/Dashboard.jsx
import React from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,

} from "@xyflow/react";
import { motion } from "framer-motion";
import { useApp } from "../../hooks/useApp";

// Custom Node Component for Agents/Adapter
const CustomNode = ({ data }) => (
  <motion.div
    className="p-4 bg-white border-2 border-blue-500 rounded-lg shadow-lg cursor-pointer"
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.3 }}
    whileHover={{ scale: 1.05 }}
  >
    <h3 className="text-lg font-bold text-blue-700">{data.label}</h3>
    <p className="text-sm text-gray-600">{data.type}</p>
    <p className="text-xs text-gray-400">ID: {data.id}</p>
  </motion.div>
);

// Node Types Mapping
const nodeTypes = { custom: CustomNode };

const Home = () => {
  const { observability } = useApp();
  const {nodes, edges, events, isConnected} = observability!;

  // Timeline Component to show recent events
  const Timeline = () => (
    <motion.div
      className="mt-8 p-4 bg-gray-100 dark:bg-accent rounded-lg overflow-y-auto max-h-48"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-4">Request Timeline</h2>
      <ul className="space-y-2">
        {events.map((ev, idx) => (
          <motion.li
            key={idx}
            className="p-2 bg-white rounded shadow"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <span className="text-sm text-gray-500">{ev.timestamp}</span> -
            <span className="font-medium"> {ev.type}</span>:{" "}
            {ev.description || "Action occurred"}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 relative bg-gray-100 dark:bg-accent rounded-lg ">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          // onNodesChange={onNodesChange}
          // onEdgesChange={onEdgesChange}
          // onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
      <Timeline /> 
    </div>
  );
};

export default Home;
