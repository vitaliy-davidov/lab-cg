import { useCallback, useEffect, useRef, useState } from 'react';
import Canvas from '../canvas-component/canvas-component';
import './fractals-page-component.css'
import FractalSettings from './fractals-setting-component/fractals-setting-component';
import TreeDrawer from './fractals/tree-drawer';
import Turtle from 'react-turtle'
import LSystem from './fractals/L-system';
import TreeSettings from './fractals/tree-settings';
import IslandSettings from './fractals/island-settings';
import BeautifulTreeSettings from './fractals/beautiful-tree-setting';

const FractalsPage = () => {
    const [fractalType, setFractalType] = useState('tree')
    const [color, setColor] = useState('#000000')
    const [depth, setDepth] = useState(4)
    const [position, setPosition] = useState({x:0, y:300})
    const [lineSize, setLineSize] = useState({heigth:50, width:1})
    const [fill, setFill] = useState(false)
    const tree = new TreeSettings();
    const custom = new BeautifulTreeSettings();
    const island = new IslandSettings();
    const drawer = useCallback(() => {
        var drawer;
        const s = new LSystem();
        s.color=color;

        s.startPoint.x=Number.parseInt(position.x);
        s.startPoint.y=Number.parseInt(position.y);

        s.lineSize=Number.parseInt(lineSize.heigth);
        s.lineWidth=Number.parseInt(lineSize.width);
        
        if(fractalType == 'tree') {
            s.startAngle=90;
            s.stepSizeMultiplier=2;
            tree.system = s
            drawer = tree.getDrawer(depth)
            
        } else if(fractalType == 'island') {
            s.startAngle=90
            s.stepSizeMultiplier=1
            island.system = s
            drawer = island.getDrawer(depth, fill)

        } else {
            s.startAngle=90;
            s.stepSizeMultiplier=8;
            custom.system = s
            drawer = custom.getDrawer(depth)
        }
        return drawer;
    }, [fractalType,color,depth,fill,position, lineSize])
    
    useEffect(() => {
    }, [])

    return (
        <div className='fractals-page'>
            <Turtle pixelated={false} height="600" width="1200" className="canvas" draw={drawer()}/>
            <FractalSettings color={color} changeColor={setColor}
                             depth={depth} changeDepth={setDepth}
                             position={position} changePosition={setPosition}
                             lineSize={lineSize} changeLineSize={setLineSize}
                             fractalType={fractalType} changeFractalType={setFractalType}
                             fill={fill} changeFill={setFill}
                             resolution={{x:600, y:1200}}/>
        </div>
    );
}

export default FractalsPage;