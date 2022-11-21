import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import TransformationSettings from "./transformation-page-settings/transformation-page-settings";
import './transformation-page-component.scss'

const TransformationPage = () => {
    const [points, setPoints] = useState([
        { x: -3, y: 0 },
        { x: 3, y: 0 },
        { x: 0, y: 5.196 },
    ]);
    const [graphPoints, setGraphPoints] = useState([]);
    const [time, setTime] = useState(0.0)
    const [board, setBoard] = useState(null);
    const [doRotation, setDoRotation] = useState(true);
    const [doTranslate, setDoTranslate] = useState(true);
    const [id, setId] = useState(null);

    useLayoutEffect(() => {
        // eslint-disable-next-line no-undef
        const board = JXG.JSXGraph.initBoard("jxgbox", {
            axis: true,
            maxboundingbox: [-100, 100, 100, -100],
            boundingbox: [-10, 30, 30, -30],
            zoomX: 0.5,
            zoom: {
              enabled: true,
              wheel: true,
              pinchSensitivity: 15,
            },
            pan: {
              needShift: true,
              needTwoFingers: false,
              enabled: true,
            },
        })
        init(board);
        setBoard(board);
    }, [])

    useLayoutEffect(() => {
        if(board != null) {
            init(board);
            draw();
        }
    }, [points])

    const resolution = {
        minWidth: -100,
        maxWidth: 100,
        minHeight: -100,
        maxHeight: 100
    }
    
    const init = (board) => {
        board.removeObject(graphPoints)
        var gPoints = [];

        gPoints.push(board.create("point", [points[0].x,points[0].y]))
        gPoints.push(board.create("point", [points[1].x,points[1].y]))
        gPoints.push(board.create("point", [points[2].x,points[2].y]))
        board.create("polygon", gPoints, { hasInnerPoints: true });
        gPoints.push(board.create("point", center(points)))

        setGraphPoints(gPoints);
    }

    const translate = (x,y) => {
        return [
            [1,0,x],
            [0,1,y],
            [0,0,1],
        ]
    }

    const rotate = (angel) => {
        return [
            [Math.cos(angel), -Math.sin(angel), 0],
            [Math.sin(angel), Math.cos(angel), 0],
            [0, 0, 1],
        ]
    }

    const center = (points) => {
        let x = points.reduce((acc, cur) => acc + cur.x, 0) / 3;
        let y = points.reduce((acc, cur) => acc + cur.y, 0) / 3;

        return [x, y];
    }

    const draw = () => {
        let coordMatx = [
            [points[0].x, points[0].y, 1],
            [points[1].x, points[1].y, 1],
            [points[2].x, points[2].y, 1],
        ];

        const distance = 30;
        const a = -2 * Math.PI;

        var rotMatr = rotate(a*time);
        var translateMatr = translate(distance * time, 0);
        var centerCoords = center(points);

        var centerTranslMatr = translate(-centerCoords[0], -centerCoords[1])
        var reverseTranslMatr = translate(centerCoords[0], centerCoords[1])
        // eslint-disable-next-line no-undef
        rotMatr = math.multiply(rotMatr, centerTranslMatr);
        
        // eslint-disable-next-line no-undef
        coordMatx = math.transpose(coordMatx);
        if(doRotation == true) {
            // eslint-disable-next-line no-undef
            coordMatx = math.multiply(rotMatr, coordMatx);
            // eslint-disable-next-line no-undef
            coordMatx = math.multiply(reverseTranslMatr, coordMatx);
        }
        if(doTranslate == true) {
            // eslint-disable-next-line no-undef
            coordMatx = math.multiply(translateMatr, coordMatx);
        }
        // eslint-disable-next-line no-undef
        coordMatx = math.transpose(coordMatx);
        
        graphPoints[0].moveTo([coordMatx[0][0], coordMatx[0][1]]);
        graphPoints[1].moveTo([coordMatx[1][0], coordMatx[1][1]]);
        graphPoints[2].moveTo([coordMatx[2][0], coordMatx[2][1]]);

        var newpoints = [
            {
                x: coordMatx[0][0],
                y: coordMatx[0][1],
            },
            {
                x: coordMatx[1][0],
                y: coordMatx[1][1],
            },
            {
                x: coordMatx[2][0],
                y: coordMatx[2][1],
            },
        ]

        graphPoints[3].moveTo(center(newpoints));
    }

    useEffect(() => {
        if(board != null)
            draw();

        if(time >= 1)
            clearInterval(id);
            
        }, [time])

    const handleStartAnimation = () => {
        setTime(0);
        var id = setInterval(() => {

            setTime((current) => current += 0.005);
        }, 10);

        setId(id);
    }

    return (
        <div className='transform-page'>
            <div id="jxgbox" className='canvas' style={{width: '1200зч', height: '600px'}}/>
            <TransformationSettings handleStartAnimation={handleStartAnimation} points={points} setPoints={setPoints} resolution={resolution} time={time} setTime={setTime} doRotation={doRotation} setDoRotation={setDoRotation} doTranslate={doTranslate} setDoTranslate={setDoTranslate}/>
        </div>
    );
}

export default TransformationPage;