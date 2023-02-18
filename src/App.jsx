import { useEffect, useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import Item from './components/Item'
import Navbar from './components/NavBar'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { signOut, getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
function checkUser(user){
  if(user){

    return true
  }else{
    console.log(user)
    return false
  }
}


function App() {
  const [signInState, infoChange] = useState(null);
  const [todos, setTodos] = useState([])
  let tempTodos = []


  const fetchPost = async () => {
    checkUser(auth.currentUser)
    await getDocs(collection(db, 'item'))
      .then((querySnapshot) =>{
        const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id}))
        newData.forEach(element => {
          if(element.uid == auth.currentUser.uid){
            tempTodos.push(element)
          }
        });
        setTodos(tempTodos)
        
        
      })
  }
  useEffect(() =>{
    fetchPost()
  }, [])

  


  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
  .then((result) => {
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
    }).catch((error) =>{
      console.error("An error occured when you signed out!")
    }
    )
  }
  
  
  //
  return (
   
    <div className="App">
    
      <Navbar signOut={xsignOut} signedIn={signInState}  signIn={signInWithGoogle}/>

      <div className='item-section'>
      <Item id='1' title='hello' description='dcdsasd' completion='false' date='2020'/>
      {todos && todos.map(todo => <Item title={todo.title} description={todo.description} date={todo.date} completion={todo.completion}/>)}
      </div>
      <Footer />
    </div>
   
  )
}


export default App
