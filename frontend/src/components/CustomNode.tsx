import React from 'react'
import '@xyflow/react/dist/style.css';
import { Handle, Position } from '@xyflow/react';
import { Button } from './ui/button';

const CustomNode = () => {

const onChange = (evt) => {
    console.log(evt.target.value)
}

  return (
    <div className="text-updater-node border p-2">
      <Handle type="target" position={Position.Top} id="a" />
  <Handle type="source" position={Position.Right} id="a" />
  <Handle type="source" position={Position.Bottom} id="b" />
  <Handle type="target" position={Position.Right} id="right" />
  <Handle type="target" position={Position.Bottom} id="bottom" />
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
      <Button>lksjdf</Button>
    </div>
  )
}

export default CustomNode