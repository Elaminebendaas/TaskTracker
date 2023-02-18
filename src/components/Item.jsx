function Item(props){

    return(
        <div className="item">
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <p>Due Date: {props.date}</p>
            <div className="seperation2">
                {props.completion ? <button>Mark Incomplete</button>:<button>Mark Complete</button>}
                <button>Delete</button>
            </div>
        </div>
    )
}
export default Item