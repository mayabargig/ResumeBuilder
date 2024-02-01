import { useState, useEffect, useContext } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Form from './pages/Form';
import Auth from './pages/Auth';
import { auth } from './config/firebaseConfig';
import { signOut, onAuthStateChanged } from "firebase/auth";
import NavBar from './components/NavBar';
import FormP from './pages/Form';
import UserForms from './components/UserForms';

function App() {
  const [userName, setName] = useState({});

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
    if (user) {
      setName({email: user.email, id: user.uid});
    } else {
      setName(null)
    }});
  },[]);
  
  const SingOutClick = ()=>{
    signOut(auth)
    .then(()=>{
      console.log("sign out successfully");
    })
    .catch((error)=>{
      console.log("error in signOut:", error);
    })
  }

  return (
    <Router>
    <NavBar SingOutClick={SingOutClick} userName={userName}/>
    {
      userName ? 
    <Routes>
      <Route path='/form' element={<FormP
          userName={userName}
          />}/>
          <Route path='/userForm' element={<UserForms
          userName={userName}
          />}/>

        <Route path='*' element={<FormP/>}/>
      </Routes>
      :
      <Routes>
      <Route path='/auth' element={<Auth />}/>
      </Routes>
      
    }
</Router>
  )
}

export default App
