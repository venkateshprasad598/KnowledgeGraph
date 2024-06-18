import ReactFlow, { Background, Controls, MiniMap } from "reactflow"
import "reactflow/dist/style.css";


const NodeFlow = ({ nodes, edges, nodeTypes }) => {
    return (
        <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView={false} minZoom={0.1}
            maxZoom={1.2} defaultViewport={{ x: 20, y: 20, zoom: 0.5 }}>
            <Background />
            <Controls showInteractive={false} />
            <MiniMap pannable zoomable style={{ background: "purple" }} />
        </ReactFlow>
    )
}

export default NodeFlow