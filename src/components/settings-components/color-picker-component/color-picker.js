import './color-picker.scss'

const ColorPicker = props => {
  
  const {className, ...rest} = props;
  const {handleChange, value, stringify = (value) => value, converter = (value) => value, reverseConverter = (value) => value, ...other} = rest;

  const pickerChange = (e) => {
    handleChange(converter(e.target.value));
  }

  const textChange = (e) => {
    handleChange(e.target.value);
  }

  return (
    <div className={'color-picker-wrpapper ' + className}>
      <input type="color" onChange={pickerChange} value={reverseConverter(value)} {...other}/>
      <input type="text" onChange={textChange} value={stringify(value)} {...other}/>
    </div>
  );
};

export default ColorPicker