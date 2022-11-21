import { useRef, useState } from 'react';
import Checkbox from '../../settings-components/checkbox-component/checkbox';
import ColorPicker from '../../settings-components/color-picker-component/color-picker';
import Range from '../../settings-components/range-component/range';
import './fractals-setting-component.scss'

const FractalSettings = ({fractalType, changeFractalType, color, changeColor, fill, changeFill, position={x: 0, y: 300}, changePosition, depth, changeDepth, lineSize={height: 50, width: 1}, changeLineSize, resolution}) => {
    return (
        <div className='settings-container'>
            <span className='settings-title'>Settings</span>

            <div className='settings-block'>
                <select className='settings-select' value={fractalType} onChange={(e) => {changeFractalType(e.target.value)}}>
                    <option value="tree">Tree</option>
                    <option value="island">Island</option>
                    <option value="custom">Custom Tree</option>
                </select>
            </div>

            <div className='settings-block'>
                <span className='settings-name'>Fractal Settings</span>
                <div className='settings-input-block'>
                    <label htmlFor='x-position'>x:</label>
                    <input id='x-position' className='number-input' type="number" min={-resolution.x/2} max={resolution.x/2} value={position.x} onChange={(e) => {changePosition({...position, x: e.target.value})}}/>
                    <label htmlFor='y-position'>y:</label>
                    <input id='y-position' className='number-input' type="number" min={-resolution.y/2} max={resolution.y/2} value={position.y} onChange={(e) => {changePosition({...position, y: e.target.value})}}/>
                </div>

                <div style={{height: '10px'}}/>

                <div className='settings-input-block'>
                    <label htmlFor='depth-position'>depth:</label>
                    <input id='depth-position' className='number-input' type="number" min={1} max={10} value={depth} onChange={(e) => {changeDepth(e.target.value)}}/>
                </div>
            </div>

            <div className='settings-block'>
                <span className='settings-name'>Color Settings</span>
                <div className='settings-input-block'>
                    <ColorPicker onChange={e => {changeColor(e.target.value)}} value={color}/>
                    <Checkbox text={'fill color'} state={fill} changeState={changeFill}/>
                </div>
            </div>

            <div className='settings-block'>
                <span className='settings-name'>Line Settings</span>
                <div className='settings-input-block dir-col'>
                    <Range name={'Line length:'} min={1} max={200} step={1} value={lineSize.height} onChange={(e) => {changeLineSize({...lineSize, heigth: e.target.value});}}/>
                    <Range name={'Line width:'} min={1} max={15} step={1} value={lineSize.width} onChange={(e) => {changeLineSize({...lineSize, width: e.target.value})}}/>
                </div>
            </div>
        </div>
    );
}

export default FractalSettings;