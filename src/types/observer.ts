// src/types.ts
export interface AgentNodeData {
  label: string;
  type: 'Principal' | 'Remote' | 'Adapter' | 'ChainEvent' | 'Other';
  id: string;
  status?: 'active' | 'matched' | 'completed' | 'failed' | 'pending';
}

export interface OstridEvent {
  id: string;
  timestamp: string;
  type:
    | 'agent-message-to-adapter'
    | 'adapter-management'
    | 'agent-to-agent-communication'
    | 'sui-chain-event'
    | 'task-job-initiated'
    | 'match-found'
    | 'escrow-locked'
    | 'attestation-submitted'
    | 'escrow-released'
    | 'dispute-initiated';
  description?: string;
  agentId?: string;
  sourceAgentId?: string;
  targetAgentId?: string;
  jobId?: string;
  messageType?: string;
  commType?: string;
  eventType?: string;
  amount?: number;
}

export interface NodeData extends AgentNodeData {
  // You can extend with more runtime data if needed
}

export type OstridNode = Node & {
  id: string;
  type: 'custom';
  position: { x: number; y: number };
  data: NodeData;
};

export type OstridEdge = {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
  markerEnd?: any;
  style?: React.CSSProperties;
  label?: string;
};