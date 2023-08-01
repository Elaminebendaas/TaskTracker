import { useState } from "react";
import "../App.css";
import Backdrop from "./Backdrop";
import Modal from "./Modal";

function Navbar(props) {
  const [active, setActive] = useState(false);
  function setModal() {
    if (active == false) {
      setActive(true);
    } else if (active == true) {
      setActive(false);
    }
  }

  return (
    <>
      <div className="navbar">
        <h1 className="title">TaskTracker</h1>
        <div className="seperation">
          {props.signedIn ? (
            <button onClick={setModal}>Add Task</button>
          ) : (
            <button onClick={props.signIn}>Sign In</button>
          )}
          {props.signedIn && <button onClick={props.signOut}>Sign Out</button>}
        </div>
      </div>
      {active && <Modal onClick={setModal} fetch={props.fetch} />}
      {active && <Backdrop onClick={setModal} />}
    </>
  );
}
export default Navbar;
