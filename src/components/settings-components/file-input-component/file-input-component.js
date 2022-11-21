import './file-input-component.scss'

const InputFile = (props) => {
    const {content, ...rest} = props;
    return(
        <label className="file-component">
            <input style={{display: 'none'}} type="file" {...rest}/>
            <span>{content}</span>
        </label>
    );
}

export default InputFile