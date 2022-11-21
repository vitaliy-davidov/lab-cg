import React from 'react'
import useCanvas from '../../hooks/canvas-hook/canvas-hook'

const Canvas = props => {  
  
  const { draw, ...rest } = props
  const canvasRef = useCanvas(draw)
  
  return <canvas ref={canvasRef} {...rest}/>
}

export default Canvas