import { useEffect, useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import Item from './components/Item'
import Navbar from './components/NavBar'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc } from 'firebase/firestore/lite';
import { signOut, getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyACWQvqr1rTLWBqFOtDjfw9BKQsT80Xor4",
  authDomain: "todo-react-9c08c.firebaseapp.com",
  projectId: "todo-react-9c08c",
  storageBucket: "todo-react-9c08c.appspot.com",
  messagingSenderId: "85760319556",
  appId: "1:85760319556:web:e1cafe4671a13916629c11",
  measurementId: "G-TK390XY2MW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
const provider = new GoogleAuthProvider();
export const auth = getAuth();


function App() {
  
  const [signInState, infoChange] = useState()
  const [todos, setTodos] = useState([])
  let user = auth.currentUser;
  let bs = []
  useEffect(() =>{
    if(user){
      infoChange(true)
    }else{
      infoChange(false)
    }
  },[user, infoChange])

  const fetchPost = async () => {
    let tempTodos = [];
    await getDocs(collection(db, 'item'))
      .then((querySnapshot) =>{
        const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id}))
        
        newData.forEach(element => {
          if(element.uid == auth.currentUser.uid){
            tempTodos.push(element)
          }else{
            setTodos([...tempTodos])
          }
        });
        setTodos([...tempTodos])
      })
  }


  useEffect(() =>{
    fetchPost()
  }, [])

  
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    fetchPost()
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;

    infoChange(true)
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    infoChange(false)
  });
  }
  const xsignOut = () =>{
    signOut(auth).then(() => {
      infoChange(false)
      setTodos([...bs])
    }).catch((error) =>{
      setTodos([...bs])
      console.error("An error occured when you signed out!")
    }
    )
  }
  
  
  
  return (
    
    <div className="App">
    
      <Navbar signOut={xsignOut} signedIn={signInState} fetch={fetchPost} signIn={signInWithGoogle}/>
      <div className='item-section'>
      {todos && todos.map(todo => <Item key={todo.id} fetch={fetchPost} id={todo.id} title={todo.title} description={todo.description} date={todo.date} completion={todo.completion}/>)}
      </div>
      <Footer />
    </div>
   
  )
}


export default App
