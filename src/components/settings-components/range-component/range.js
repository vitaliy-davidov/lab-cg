import './range.scss'

const Range = (props) => {
    const { name, ...rest } = props

    return (
        <div className='settings-input-component'>
            <label>{name}</label>
            <input className='range-input' type="range" {...rest}/>
        </div>
    );
}

export default Range;