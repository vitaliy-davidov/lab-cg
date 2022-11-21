import { useState } from "react";
import Checkbox from "../../settings-components/checkbox-component/checkbox";
import Range from "../../settings-components/range-component/range";
import Coords from "../coords-component/coords-component";
import "./transformation-page-settings.scss";

const TransformationSettings = ({points, setPoints, time, setTime, resolution, handleStartAnimation, doRotation, setDoRotation, doTranslate, setDoTranslate}) => {
  const pointChange = (index) => {
    return (value) => {setPoints((current) => {
        current[index] = value;
        return [...current];
    })}
  }

  return (
    <div className="transform-page-settings">
      <div className="settings-container">
        <span className="settings-title">Settings</span>

        <div className="settings-block">
          <span className="settings-name">Points</span>
          <Coords initPoint={points[0]} changeHandler={pointChange(0)} resolution={resolution}/>
          <Coords initPoint={points[1]} changeHandler={pointChange(1)} resolution={resolution}/>
          <Coords initPoint={points[2]} changeHandler={pointChange(2)} resolution={resolution}/>
        </div>

        <div className="settings-block">
          <span className="settings-name">Transformation</span>
          <div style={{ alignSelf: "start", marginBlock: "10px" }}>
            <Checkbox text={"Translate"} state={doTranslate} changeState={setDoTranslate} />
            <Checkbox text={"Rotate"} state={doRotation} changeState={setDoRotation} />
          </div>
          <Range
            name={"Time"}
            min={0.0}
            max={1.0}
            step={0.001}
            value={time}
            onChange={(e) => { setTime(e.target.valueAsNumber); }}
          />
          <button
            className="file-component"
            style={{ marginBlock: "2px", width: "100%" }}
            onClick={() => { handleStartAnimation(); }}
          >
            Start animation
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransformationSettings;
