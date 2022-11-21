
import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useWindowSize from '../../hooks/widow-size-hook/window-size-hook';
import Canvas from '../canvas-component/canvas-component';
import './color-scheme-page-component.scss'
import ColorSchemeSettings from './color-scheme-settings-component/color-scheme-settings-component';
import colorConveter from './tools/ColorConverter';



const ColorSchemePage = () => {
    const canvasRef = useRef(null);
    const [blueSaturation, setBlueSaturation] = useState(1);
    const [file, setFile] = useState();
    const [image, setImage] = useState(new Image(1,1));
    
    useEffect(() => {
        if(file != null) {
            const path = window.URL.createObjectURL(file)
            const image = new Image();
            image.src = path;
            image.onload = () => {
                setImage(image)
            }
        }
    }, [file])

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d')

        drawImage(context)
        setSaturation(context)

    }, [image, blueSaturation])

    const drawImage = (context) => {
        context.canvas.height = context.canvas.clientHeight;
        context.canvas.width = context.canvas.clientWidth;
        context.drawImage(image,0,0,image.width,image.height, 0,0,context.canvas.width,context.canvas.height)
    }

    const downloadHandle = () => {
        var canvas = canvasRef.current;
        var url = canvas.toDataURL("image/png");
        var link = document.createElement('a');
        link.download = 'image.png';
        link.href = url;
        link.click();
    }

    const setSaturation = (context) => {
        if(context != null) {
            var data = context.getImageData(0, 0, context.canvas.width, context.canvas.height)
            for (let i = 0; i < data.data.length; i+=4) {
                var hsl = colorConveter.rgb2hsl([data.data[i],data.data[i+1],data.data[i+2]])
                if(hsl[0]>240-30 && hsl[0] < 240+30) {
                    hsl[2] *= blueSaturation;
                    var rgb = colorConveter.hsl2rgb(hsl)
    
                    data.data[i] = rgb[0];
                    data.data[i+1] = rgb[1];
                    data.data[i+2] = rgb[2];
                }


                //data.data[i+0] *= blueSaturation; //red
                //data.data[i+1] *= blueSaturation; //green
                // data.data[i+2] *= blueSaturation; //blue
                //data.data[i+3] *= blueSaturation; //alpha
            }
            context.putImageData(data,0,0);
        }
    }

    return (
        <div className='color-scheme-page'>
            <canvas ref={canvasRef} className='canvas'/>
            <ColorSchemeSettings blueSaturation={blueSaturation} setBlueSaturation={setBlueSaturation} setFile={setFile} downloadHandle={downloadHandle}/>
        </div>
    );
}

export default ColorSchemePage;