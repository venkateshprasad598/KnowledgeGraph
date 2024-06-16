import { useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import RelationshipModal from './RelationshipModal';

const initialData = {
    nodes: [
        { id: 1, name: 'Node 1', parentColor: "#735da5", childColor: "#3d85c6", collapsed: false },
    ],
    links: [],

};

function ForceGraph() {

    const [graphData, setGraphData] = useState(initialData);
    const [selectedNode, setSelectedNode] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [action, setAction] = useState('');
    const [formValidation, setFormValidation] = useState(false)

    const handleNodeClick = (node) => {
        setSelectedNode(node);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setAction('');
    };

    const handleGoBack = () => {
        setAction('');
        setFormValidation(false)
    }

    const handleSaveRelationship = (relationship) => {
        if (action === 'Add Relationship') {

            if (!relationship?.name || !relationship.description) {
                setFormValidation(true)
                return
            } else {
                setFormValidation(false)
            }

            const colors = ["#6aa84f", "#3d85c6", "#f1c232", " #cc0000", "#e69138", "#7A288A", "#87CEEB", "#FF69B4", "#032B44"]
            const randomIndex = Math.floor(Math.random() * colors.length);
            const randomColor = colors[randomIndex];

            const newNode = {
                id: graphData.nodes.length + 1,
                name: relationship.name,
                description: relationship.description,
                parentColor: selectedNode.childColor,
                parent: selectedNode.id,
                childColor: randomColor,
                collapsed: false
            };

            const newLink = {
                source: selectedNode.id,
                target: newNode.id,
            };

            setGraphData({
                nodes: [...graphData.nodes, newNode],
                links: [...graphData.links, newLink],
            });
        } else if (action === 'Edit Relationship') {
            setGraphData({
                nodes: graphData.nodes.map((node) =>
                    node.id === selectedNode.id ? { ...selectedNode, name: relationship.name, description: relationship.description } : node
                ),
                links: graphData.links
            });
        }
        setModalOpen(false);
        setAction("")
    };


    const handleDeleteRelationship = () => {
        setGraphData({
            nodes: graphData.nodes.filter((node) => node.id !== selectedNode.id),
            links: graphData.links.filter(
                (link) => link.source.id !== selectedNode.id && link.target.id !== selectedNode.id
            ),
        });
        setModalOpen(false);
    };


    const handleExpandCollapse = (node) => {
        const updatedNodes = graphData.nodes.map(n => {
            if (n.parent === node.id) {
                return { ...n, collapsed: !n.collapsed };
            }
            return n;
        });

        setGraphData({ ...graphData, nodes: updatedNodes });
    };


    const filteredGraphData = {
        nodes: graphData.nodes.filter(node => {
            // const parent = graphData.nodes.find(n => n.id === node.parent);
            // return !parent || !parent.collapsed;
            return node.collapsed ? false : true
        }),
        links: graphData.links.filter(link => {
            const sourceNode = graphData.nodes.find(n => n.id === link?.source || n.id === link?.source?.id);
            const targetNode = graphData.nodes.find(n => n.id === link?.target || n.id === link?.target?.id);
            return !sourceNode.collapsed && !targetNode.collapsed;
        }),
    };

    return (
        <div>
            <span className='kg-info'>Click on the node to Add a new relationship or to delete the selected Node.</span>
            <ForceGraph2D
                graphData={graphData}
                nodeLabel="name"
                linkLabel="name"
                onNodeClick={handleNodeClick}
                nodeAutoColorBy={"origin"}

                nodeCanvasObject={(node, ctx) => {
                    const size = 20
                    const radius = size / 2;
                    const fontSize = 3; // Adjust this value to change the font size
                    const nodeNameOffset = 0; // Adjust this value to increase/decrease the distance between the node and its name
                    const fontWeight = 'bold'; // Set the desired font weight


                    if (node.avatar) {
                        const img = new Image()
                        img.src = node.avatar
                        ctx.save(); // Save the current state of the canvas
                        ctx.beginPath();
                        ctx.ellipse(node.x, node.y, radius, radius, 0, 0, 2 * Math.PI); // Draw a circle with the desired radius
                        ctx.clip(); // Clip the image to the circle shape
                        ctx.drawImage(img, node.x - radius, node.y - radius, size, size); // Draw the image within the clipped circle
                        ctx.restore(); // Restore the canvas state

                        ctx.font = `${fontSize}px Arial`;
                        ctx.fillStyle = 'black';
                        ctx.textAlign = 'center';
                        ctx.fillText(node.name, node.x, node.y + radius + fontSize + nodeNameOffset); // Adjust the vertical position as needed
                    } else {
                        ctx.beginPath();
                        ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
                        ctx.fillStyle = node.parentColor; // Set the desired color for the circle
                        ctx.fill();
                        // Draw the node name inside the circle
                        ctx.font = `${fontWeight} ${fontSize}px Arial`;
                        ctx.fillStyle = 'black';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(node.name, node.x, node.y);
                    }
                }}

                linkCanvasObject={(link, ctx) => {
                    const fontSize = 3;
                    const sourceNode = graphData.nodes.find(node => node.id === link.source.id);
                    const targetNode = graphData.nodes.find(node => node.id === link.target.id);
                    const text = `${sourceNode?.name || ""} -> ${targetNode?.name || ""}`;
                    ctx.font = `${fontSize}px Sans-Serif`;

                    const sourceX = sourceNode?.x || 0
                    const sourceY = sourceNode?.y || 0
                    const targetX = targetNode?.x || 0
                    const targetY = targetNode?.y || 0

                    const midPos = {
                        x: (sourceX + targetX) / 2,
                        y: (sourceY + targetY) / 2
                    };

                    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
                    ctx.fillText(text, midPos.x, midPos.y);
                    ctx.lineWidth = 0.5; // Adjust this value to change the thickness
                    ctx.strokeStyle = 'black'; // Adjust this value to change the color

                    // Draw the line
                    ctx.beginPath();
                    ctx.moveTo(link.source.x, link.source.y);
                    ctx.lineTo(link.target.x, link.target.y);
                    ctx.stroke();

                }}
            />

            {modalOpen && <RelationshipModal
                open={modalOpen}
                node={selectedNode}
                onSave={handleSaveRelationship}
                onClose={handleModalClose}
                onDelete={handleDeleteRelationship}
                setAction={setAction}
                action={action}
                handleGoBack={handleGoBack}
                formValidation={formValidation}
                onExpandCollapse={handleExpandCollapse}
            />}

        </div >
    );
}



export default ForceGraph;