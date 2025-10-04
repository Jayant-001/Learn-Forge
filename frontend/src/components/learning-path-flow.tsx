"use client"

import { useCallback, useState, useMemo } from "react"
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  NodeTypes
} from "@xyflow/react"
import { LearningNodeComponent } from "./learning-node"
import { NodeDetailsPanel } from "./node-details-panel"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { LearningNode, LearningPath } from "@/lib/types"
import { Plus, Save, Eye, Settings } from "lucide-react"
import "@xyflow/react/dist/style.css"

interface LearningPathFlowProps {
  learningPath: LearningPath
  onUpdatePath: (pathId: string, updates: Partial<LearningPath>) => void
  isEditable?: boolean
}

export function LearningPathFlow({ learningPath, onUpdatePath, isEditable = true }: LearningPathFlowProps) {
  const [selectedNode, setSelectedNode] = useState<LearningNode | null>(null)
  const [showPanel, setShowPanel] = useState(false)

  // Convert learning nodes to React Flow nodes
  const initialNodes: Node[] = learningPath.nodes.map(node => ({
    id: node.id,
    type: 'learningNode',
    position: node.position,
    data: node,
    draggable: isEditable
  }))

  // Convert learning edges to React Flow edges
  const initialEdges: Edge[] = learningPath.edges.map(edge => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    type: 'smoothstep',
    animated: edge.type === 'prerequisite',
    markerEnd: {
      type: 'arrowclosed', // built-in arrow type
    },
  }))

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const nodeTypes: NodeTypes = useMemo(() => ({
    learningNode: LearningNodeComponent
  }), [])

  const onConnect = useCallback(
    (params: Connection) => {
      if (!isEditable) return
      setEdges((eds) => addEdge({ ...params, markerEnd: { type: 'arrowclosed' }, type: 'smoothstep', animated: true }, eds))
    },
    [setEdges, isEditable]
  )

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node.data as LearningNode)
    setShowPanel(true)
  }, [])

  const handleUpdateNode = useCallback((nodeId: string, updates: Partial<LearningNode>) => {
    const updatedNodes = learningPath.nodes.map(node =>
      node.id === nodeId ? { ...node, ...updates, updatedAt: new Date() } : node
    )
    
    onUpdatePath(learningPath.id, { nodes: updatedNodes })
    
    // Update React Flow nodes
    setNodes(nds => nds.map(node => 
      node.id === nodeId ? { ...node, data: { ...node.data, ...updates } } : node
    ))
  }, [learningPath, onUpdatePath, setNodes])

  const handleDeleteNode = useCallback((nodeId: string) => {
    const updatedNodes = learningPath.nodes.filter(node => node.id !== nodeId)
    const updatedEdges = learningPath.edges.filter(edge => 
      edge.source !== nodeId && edge.target !== nodeId
    )
    
    onUpdatePath(learningPath.id, { 
      nodes: updatedNodes, 
      edges: updatedEdges 
    })
    
    setNodes(nds => nds.filter(node => node.id !== nodeId))
    setEdges(eds => eds.filter(edge => edge.source !== nodeId && edge.target !== nodeId))
    setShowPanel(false)
  }, [learningPath, onUpdatePath, setNodes, setEdges])

  const handleAddNode = useCallback(() => {
    const newNode: LearningNode = {
      id: `node-${Date.now()}`,
      title: "New Topic",
      description: "Add description for this topic",
      status: "pending",
      estimatedTime: 2,
      notes: "",
      resources: [],
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      parentNodes: [],
      childNodes: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const updatedNodes = [...learningPath.nodes, newNode]
    onUpdatePath(learningPath.id, { nodes: updatedNodes })

    const reactFlowNode: Node = {
      id: newNode.id,
      type: 'learningNode',
      position: newNode.position,
      data: newNode,
      draggable: isEditable
    }

    setNodes(nds => [...nds, reactFlowNode])
  }, [learningPath, onUpdatePath, setNodes, isEditable])

  const handleSavePath = useCallback(() => {
    // Update node positions from React Flow
    const updatedNodes = learningPath.nodes.map(node => {
      const reactFlowNode = nodes.find(n => n.id === node.id)
      return reactFlowNode ? { ...node, position: reactFlowNode.position } : node
    })

    // Update edges from React Flow
    const updatedEdges = edges.map(edge => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: "prerequisite" as const
    }))

    onUpdatePath(learningPath.id, { 
      nodes: updatedNodes, 
      edges: updatedEdges,
      updatedAt: new Date()
    })
  }, [learningPath, nodes, edges, onUpdatePath])

  return (
    <div className="h-full w-full relative">
      {/* Toolbar */}
      {isEditable && (
        <Card className="absolute top-4 left-4 z-10 p-2">
          <div className="flex items-center space-x-2">
            <Button size="sm" onClick={handleAddNode}>
              <Plus className="h-4 w-4 mr-1" />
              Add Node
            </Button>
            <Button size="sm" variant="outline" onClick={handleSavePath}>
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button size="sm" variant="outline">
              <Eye className="h-4 w-4 mr-1" />
              Preview
            </Button>
            <Button size="sm" variant="outline">
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </Button>
          </div>
        </Card>
      )}

      {/* React Flow */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
      >
        <Background />
        <Controls />
        <MiniMap 
          nodeStrokeColor="#374151"
          nodeColor="#f3f4f6"
          nodeBorderRadius={8}
        />
      </ReactFlow>

      {/* Node Details Panel */}
      {showPanel && (
        <NodeDetailsPanel
          node={selectedNode}
          onClose={() => setShowPanel(false)}
          onUpdateNode={handleUpdateNode}
          onDeleteNode={handleDeleteNode}
        />
      )}
    </div>
  )
}