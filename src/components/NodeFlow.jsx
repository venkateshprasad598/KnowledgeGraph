import ReactFlow, { Background, Controls } from "reactflow"
import "reactflow/dist/style.css";


const NodeFlow = ({ nodes, edges, nodeTypes }) => {
    return (
        <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
            <Background />
            <Controls />
        </ReactFlow>
    )
}

export default NodeFlow