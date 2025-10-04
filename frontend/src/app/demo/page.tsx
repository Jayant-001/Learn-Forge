'use client';

import { useCallback, useState } from 'react';
import '@xyflow/react/dist/style.css';
import { addEdge, applyEdgeChanges, applyNodeChanges, Background, Controls, MiniMap, Panel, ReactFlow, SelectionMode } from '@xyflow/react';
import CustomNode from "@/components/CustomNode"

// const initialNodes = [
//   { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
//   { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
// ];
// const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];

const DemoPage = () => {
//   const [nodes, setNodes] = useState(initialNodes);
//   const [edges, setEdges] = useState(initialEdges);
 
//   const onNodesChange = useCallback(
//     (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
//     [],
//   );
//   const onEdgesChange = useCallback(
//     (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
//     [],
//   );
//   const onConnect = useCallback(
//     (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
//     [],
//   );

    const initialNodes = [
        {
            id: 'n1',
            position: {x: 0, y: 0},
            data: {label: 'Java'},
            type: 'input',
        },
        {
            id: 'n2',
            position: { x: 100, y: 100 },
            data: { label: 'Node 2' },
            type: 'customNode',
        },
        {
            id: 'n3',
            type: 'customNode',
            position: { x: 50, y: 50 },
            data: { value: 123 },
        },
    ]
    

    const initialEdges = [
        // {
        //     id: 'n1-n2',
        //     source: 'n1',
        //     target: 'n2',
        //     type: 'step',
        //     label: "Connects with"
        // },
        // { id: 'n1-n2', source: 'n1', sourceHandle: 'a', target: 'n2' },
  { id: 'n1-n3', source: 'n1', targetHandle:"bottom", target: 'n3' },
    ]

    const [nodes, setNodes] = useState(initialNodes)
    const [edges, setEdges] = useState(initialEdges)

    const onNodesChange = useCallback(
        (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        []
    )

    const onEdgesChange = useCallback(
        (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        []
    )

    const onConnect = useCallback(
        (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );

    const nodeTypes = {
        customNode: CustomNode
    }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        panOnScroll
        selectionOnDrag
        panOnDrag
        selectionMode={SelectionMode.Partial}
      >
        <MiniMap />
        <Background />
        <Controls />
        <Panel position='top-left' style={{background: "blue", padding: "10px"}}>Top Left</Panel>
      </ReactFlow>
    </div>
  );

}

export default DemoPage
