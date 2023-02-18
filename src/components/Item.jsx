import {doc, deleteDoc } from "firebase/firestore/lite"
import { db, auth } from "../App"


function Item(props){
    const id = props.id

    const deleteItem = async () =>{
       await deleteDoc(doc(db, 'item', id))
       props.fetch()
    }

    return(
        <div className="item">
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <p>Due Date: {props.date}</p>
            <div className="seperation2">
                {props.completion ? <button>Mark Incomplete</button>:<button>Mark Complete</button>}
                <button onClick={deleteItem}>Delete</button>
            </div>
        </div>
    )
}
export default Item