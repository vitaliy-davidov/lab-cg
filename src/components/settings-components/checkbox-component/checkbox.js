import './checkbox.scss'

const Checkbox = ({state, changeState, text}) => {
    return (
        <label class="checkbox-group">
            {text}
            <input type="checkbox" checked={state} onChange={(e) => {changeState(!state)}}/>
            <span class="checkmark"></span>
        </label>  
    );
}

export default Checkbox;