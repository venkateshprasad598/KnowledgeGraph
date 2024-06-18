import ForceGraph from "../../components/ForceGraph/ForceGraph";
import NodeFlow from "../../components/NodeFlow"
import useDashboard from "../../hooks/useDashboard";

function Dashboard() {

    const {
        nodes,
        edges,
        nodeTypes,
        activeTab,
        handleHeader
    } = useDashboard()


    return (
        <div className="dashboard-container">
            <div className="d-flex header-btns">
                <div className={`btn ${activeTab == 1 && "active"}`} onClick={() => handleHeader(1)}>Knowledge Graph</div>
                <div className={`btn ${activeTab == 2 && "active"}`} onClick={() => handleHeader(2)}>Flow Graph</div>
            </div>
            {activeTab == 1 ? <ForceGraph /> : <NodeFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
            />}
        </div>
    );
}

export default Dashboard;

