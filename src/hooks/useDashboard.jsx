import { useState } from "react";
import { Handle, Position } from "reactflow";
import MessageNode from "../components/CustomNode/MessageNode";


const useDashboard = () => {

  const initialNodes = [
    {
      id: "1",
      type: "default",
      data: {
        label: "Node 1 123456789999999",
        isChild: true,
        isSibling: false,
      },
      position: { x: 0, y: 0 },
      sourcePosition: "right",
    },
  ]

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
  const [activeTab, setActiveTab] = useState(1)

  const nodeTypes = {
    default: (props) => (
      <MessageNode data={props}
        handleAddSibling={handleAddSibling}
        handleAddChild={handleAddChild}

      />
    ),
  };

  const handleHeader = (id) => {
    setActiveTab(id)
  }

  //Add Sibling node
  const handleAddSibling = (nodeId) => {
    let yAxis = 200;

    const parentNode = nodes.find((node) => node.id === nodeId);
    const parentNodeIndex = nodes.findIndex((node) => node.id === nodeId);
    const targetNode = edges.find((node) => node.target == parentNode.id);

    const allRightNodes = nodes.filter((node, index) => {
      if (index > parentNodeIndex && node.position.x > parentNode.position.x) {
        yAxis = node.position.y;
        return true;
      }
      return false;
    });

    //Add New Sibling
    const newSiblingPosition = {
      x: parentNode.position.x,
      y: allRightNodes?.length ? yAxis + 200 : parentNode.position.y + yAxis,
    };

    const newSiblingNode = {
      id: Date.now().toString(),
      data: { label: `Sibling-${Date.now()}`, isChild: true, isSibling: true },
      position: newSiblingPosition,
      targetPosition: "top",
    };

    const updatedNodes = [...nodes, newSiblingNode];

    const updateNodesPositions = recursiveNodeUpdate(targetNode, updatedNodes);

    const updateButtonsPositions = updateNodesPositions?.map((node) => {
      if (node.id == nodeId) {
        return { ...node, data: { ...node.data, isSibling: false } };
      }
      return node;
    });

    setNodes(updateButtonsPositions);

    const newEdge = {
      id: Date.now().toString(),
      source: targetNode.source,
      target: newSiblingNode.id,
      type: "smoothstep",
      sourceHandle: "a",
      targetHandle: "b",
    };

    setEdges([...edges, newEdge]);
  };

  //Add Child Node
  const handleAddChild = (nodeId) => {
    const parentNode = nodes.find((node) => node.id === nodeId);

    const newChildPosition = {
      x: parentNode.position.x + 300,
      y: parentNode.position.y,
    };

    const newChildNode = {
      id: Date.now()?.toString(),
      data: {
        label: `child Node ${Date.now()}`,
        isSibling: true,
        isChild: true,
      },
      position: newChildPosition,
      sourcePosition: "right",
      targetPosition: "left",
    };

    const nodePositions = [...nodes, newChildNode];

    const newEdge = {
      id: Date.now().toString(),
      source: parentNode.id,
      target: newChildNode.id,
      type: "smoothstep",
      sourceHandle: "a",
      targetHandle: "b",
    };

    const edgePostions = [...edges, newEdge];

    const updatedPositions = nodePositions?.map((node) => {
      if (node.id == nodeId) {
        return { ...node, data: { ...node.data, isChild: false } };
      }
      return node;
    });

    setNodes(updatedPositions);
    setEdges(edgePostions);
  };

  const recursiveNodeUpdate = (targetNode, updatedNodes) => {
    let isParentFound = false;

    const findParent =
      edges?.find((data) => data?.target == targetNode.source) || {};

    const findAllParallelNodes = Object.keys(findParent)?.length
      ? edges?.filter((data) => {
        if (
          data?.source == findParent.source &&
          findParent.target == data?.target
        ) {
          isParentFound = true;
          return false;
        }

        if (
          data?.source == findParent.source &&
          findParent.target !== data?.target &&
          isParentFound
        ) {
          return true;
        }

        return false;
      })
      : [];

    const targetArr = findAllParallelNodes?.map((data) => data.target);

    edges?.map((data) => {
      if (targetArr.includes(data.source)) {
        targetArr.push(data.target);
      }
    })

    const updateNodesPosition = updatedNodes?.map((updateNodesData) => {
      if (targetArr.includes(updateNodesData?.id)) {
        return {
          ...updateNodesData,
          position: {
            ...updateNodesData.position,
            y: updateNodesData.position.y + 200,
          },
        };
      }

      return updateNodesData;
    });

    const newTargetNode =
      edges.find((node) => node.target == targetNode.source) || {};

    if (Object.keys(newTargetNode)?.length) {
      return recursiveNodeUpdate(newTargetNode, updateNodesPosition);
    } else {
      return updateNodesPosition;
    }
  };


  return {
    nodes,
    edges,
    nodeTypes,
    activeTab,
    handleHeader
  }
}

export default useDashboard