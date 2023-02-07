import { useState } from 'react'
import '../App.css'
import Backdrop from './Backdrop'
import Modal from './Modal'

function Navbar() {
    const [active, setActive] = useState(false)
    function setModal() {
        if (active == false) {
            setActive(true)
        } else if (active == true) {
            setActive(false)
        }
    }

    return (
        <>
            <div className='navbar'>
                <h1 className='title'>To Do</h1>
                <button onClick={setModal}>Add Task</button>
            </div>
            {active && <Modal onClick={setModal} />}
            {active && <Backdrop onClick={setModal} />}
        </>
    )
}
export default Navbar