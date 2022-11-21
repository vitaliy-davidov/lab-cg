import React, {
  StrictMode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import ColorPicker from "../../settings-components/color-picker-component/color-picker";
import InputFile from "../../settings-components/file-input-component/file-input-component";
import Range from "../../settings-components/range-component/range";
import colorConveter from "../tools/ColorConverter";
import "./color-scheme-settings-component.scss";

const ColorSchemeSettings = ({
  blueSaturation,
  setBlueSaturation,
  setFile,
  downloadHandle,
}) => {
  const [color, setColor] = useState('#000000');
  // const [fromType, setFromType] = useState("rgb");
  const [type, setType] = useState("cmyk");

  // useEffect(() => {
  //   switch (fromType) {
  //     case "rgb":
  //       setColor([0,0,0])
  //       break;
  //     case "cmyk":
  //       setColor([0,0,0,0])
  //       break;
  //     case "hsl":
  //       setColor([0,0,0])
  //       break;

  //     default:
  //       break;
  //   }
  // }, [fromType]);

  const colorChange = () => {
    const rgb = colorConveter.ConvertHexToRGB(color);
    var result = null;

    switch (type) {
      case "cmyk":
        result = colorConveter.ConvertRGBToCMYK(rgb);
        break;
      case "hsl":
        result = colorConveter.ConvertRGBToHSL(rgb);
        break;
      default:
        break;
    }

    return colorConveter.ConvertToString(type, result);
  };

  // const convert = (value) => {
  //   var rgb = colorConveter.hex2rgb(value);
  //   switch (fromType) {
  //     case "rgb":
  //       return rgb;
  //     case "cmyk":
  //       return colorConveter.rgb2cmyk(rgb);
  //     case "hsl":
  //       return colorConveter.rgb2hsl(rgb);

  //     default:
  //       break;
  //   }
  //   return null;
  // }

  // const reverseConvert = (value) => {
  //   switch (fromType) {
  //     case "rgb":
  //       return colorConveter.converSchemes(value, (value) => value, colorConveter.rgb2hex);
  //     case "cmyk":
  //       return colorConveter.converSchemes(value, colorConveter.cmyk2rgb, colorConveter.rgb2hex);
  //     case "hsl":
  //       return colorConveter.converSchemes(value, colorConveter.hsl2rgb, colorConveter.rgb2hex);

  //     default:
  //       break;
  //   }
  //   return null;
  // }

  // const stringify = (value) => {
  //   var converter = (value) => value;
  //   switch (fromType) {
  //     case "rgb":
  //       converter = colorConveter.color2string('rgb');
  //       break;
  //     case "cmyk":
  //       converter = colorConveter.color2string('cmyk');
  //       break;
  //     case "hsl":
  //       converter = colorConveter.color2string('hsl');
  //       break;

  //     default:
  //       break;
  //   }
  //   return converter(value);
  // }

  return (
    <div className="settings-container">
      <span className="settings-title">Settings</span>

      <div className="settings-block">
        <span className="settings-name">Color Converter</span>

        {/* <select
          className="settings-select my-10"
          value={fromType}
          onChange={(e) => {
            setFromType(e.target.value);
          }}
        >
          <option value={"rgb"}>RGB</option>
          <option value={"cmyk"}>CMYK</option>
          <option value={"hsl"}>HSL</option>
        </select> */}

        <div className="settings-input-block">
          <label>input:</label>
          <ColorPicker
            className="my-10 py-8"
            handleChange={setColor}
            // converter={convert}
            // reverseConverter={reverseConvert}
            // stringify={stringify}
            value={color}
          />
        </div>

        <select
          className="settings-select my-10"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option value={"cmyk"}>To CMYK</option>
          <option value={"hsl"}>To HSL</option>
        </select>

        <div className="settings-input-block">
          <label>output:</label>
          <input
            className="text-input my-10"
            type={"text"}
            readOnly={true}
            value={colorChange()}
          />
        </div>
      </div>

      <div className="settings-block" style={{ marginBlockStart: 0 }}>
        <span className="settings-name">Image Settings</span>
        <div className="spy-5 my-10">
          <InputFile
            content={"🡅 Upload"}
            accept="image/png, image/jpg, image/jpeg"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <button className="file-component" onClick={downloadHandle}>
            🡇 Download
          </button>
        </div>

        <div className="settings-block my-10">
          <Range
            name={"Blue lightness"}
            min={0.0}
            max={1.0}
            step={0.01}
            value={blueSaturation}
            onChange={(e) => {
              setBlueSaturation(e.target.valueAsNumber);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ColorSchemeSettings;
