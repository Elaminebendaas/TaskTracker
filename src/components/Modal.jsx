import '../App.css'
import { collection, addDoc } from 'firebase/firestore/lite'
import { db, auth } from '../App'
import { async } from '@firebase/util'
import { useState } from 'react'

function Modal(props) {
    const [todo, setTodo] = useState({
        title: '',
        description: '',
        completion: false,
        date: '',
        uid: '', 
    })

    const addTodo = async (e) => {
        e.preventDefault();

        const uid = auth.currentUser.uid
        try{
            const docRef = await addDoc(collection(db, 'item'),{
                title: todo.title,
                description: todo.description,
                completion: false,
                date: todo.date,
                uid: uid,
            })
            props.onClick()
            props.fetch()
            console.log("Document written with ID: ", docRef.id)
        }catch (e) {
            props.fetch()
            console.log(todo)
            console.error('Error adding document: ', e)
        }
    }

    function handleTitle(e){
        todo.title = e.target.value
        
    }
    function handleDescription(e){
        todo.description = e.target.value
    }
    function handleDate(e){
        todo.date = e.target.value
    }


    return (
        <div className='signup-modal dropshadow'>
            <form onSubmit={addTodo}>
                <label>Enter Task:</label>
                <input type="text" onChange={handleTitle}/>
                <label>Description:</label>
                <textarea onChange={handleDescription}></textarea>
                <label>Deadline:</label>
                <input type="date" onChange={handleDate}/>
                <div>
                    <button onClick={props.onClick}>Cancel</button>
                    <button onClick={() => {addTodo()
                                           
                                            }}>
                                            Confirm</button>
                </div>
            </form>
        </div>
    )



}
export default Modal