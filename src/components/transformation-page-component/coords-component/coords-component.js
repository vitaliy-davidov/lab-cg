import { useState } from "react";

const Coords = (props) => {
    const {changeHandler, initPoint={x:0, y:0}, resolution, ...rest} = props;
    const [point,setPoint] = useState(initPoint);
    return (
        <div className="settings-input-block" {...rest}>
            <label htmlFor="x-position">x:</label>
            <input
              id="x-position"
              className="number-input"
              type="number"
              min={resolution.minWidth}
              max={resolution.maxWidth}
              value={point.x}
              onChange={(e) => {
                setPoint((current) => {
                  current.x = e.target.valueAsNumber;
                  changeHandler({...current});
                  return {...current};
                });
              }}
            />
            <label htmlFor="y-position">y:</label>
            <input
              id="y-position"
              className="number-input"
              type="number"
              min={resolution.minHeight}
              max={resolution.maxHeight}
              value={point.y}
              onChange={(e) => {
                setPoint((current) => {
                    current.y = e.target.valueAsNumber;
                    changeHandler({...current});
                    return {...current};
                });
              }}
            />
          </div>
    );
}

export default Coords;