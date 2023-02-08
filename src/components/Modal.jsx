import '../App.css'

function Modal(props) {
    return (
        <div className='signup-modal dropshadow'>
            <form>
                <label>Enter Task:</label>
                <input type="text" />
                <label>Description:</label>
                <textarea></textarea>
                <label>Deadline:</label>
                <input type="date" />
                <div>
                    <button onClick={props.onClick}>Cancel</button>
                    <button>Confirm</button>
                </div>
            </form>
        </div>
    )



}
export default Modal