import {doc, deleteDoc, setDoc } from "firebase/firestore/lite"
import { db, auth } from "../App"
let className = 'item'

function Item(props){
    const id = props.id
    if(props.completion == true){
        className += ' complete'
    }else{
        className = "item"
    }

    const itemStatus = async () =>{
        if(props.completion == false){
            await setDoc(doc(db, 'item', id), {
                date: props.date,
                title: props.title,
                description: props.description,
                uid: auth.currentUser.uid,
                completion: true,
            })
            className += ' complete'
            props.fetch()
        }else if(props.completion == true){
            await setDoc(doc(db, 'item', id),{
                date: props.date,
                title: props.title,
                description: props.description,
                uid: auth.currentUser.uid,
                completion: false,
            })
            className = "item"
            props.fetch()
        }
    }
    const deleteItem = async () =>{
       await deleteDoc(doc(db, 'item', id))
       props.fetch()
    }

    return(
        <div className={className}>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <p>Due Date: {props.date}</p>
            <div className="seperation2">
                {props.completion ? <button onClick={itemStatus}>Mark Incomplete</button>:<button onClick={itemStatus}>Mark Complete</button>}
                <button onClick={deleteItem}>Delete</button>
            </div>
        </div>
    )
}
export default Item