import { Handle, Position } from 'reactflow'
import "./MessageNode.css"

const MessageNode = ({ data, handleAddSibling, handleAddChild }) => {
    return (
        <div className="text-updater-node">
            <div className='message-node-body'>
                <div className='title'>Top</div>
                <div className='desc'>Bottom</div>
                {data?.data?.isSibling && <div className='sibling-button btn' onClick={() => handleAddSibling(data.id)}>Add Sibling</div>}
                {data?.data?.isChild && <div className='child-button btn' onClick={() => handleAddChild(data.id)}>Add Child</div>}
            </div>
            <Handle type="source" position={Position.Right} id="b" />
            <Handle type="target" position={Position.Left} id="a" />
        </div>
    )
}

export default MessageNode