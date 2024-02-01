import {React, useState} from "react";
import Login from "../Auth/Login";
import SignUp from "../Auth/SignUp";
import { auth } from "../config/firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword  } from "firebase/auth";

function Auth (){
    const [isLoginMode, setIsLoginMode] = useState(true);

    const toggleMode = ()=>{
        setIsLoginMode(!isLoginMode);
    };

    const [isUserLog, setUserLog] = useState(false);

    const changeHandler= (e)=>{
        console.log(e);
        setUserLog({...isUserLog, [e.target.name]:e.target.value});
    };

    console.log(isUserLog);
    const handelSubmit= async (e)=>{
        e.preventDefault();
        console.log(e);

        try{
            if(isLoginMode){
                const userCard = await signInWithEmailAndPassword(auth,
                     isUserLog.email,
                     isUserLog.password
                     );
            }else{
                const userCard = await createUserWithEmailAndPassword(auth,
                    isUserLog.email,
                    isUserLog.password
                    );
            }
        }catch(error){
            console.log(error);
        } 
    };

    return (
        <div id="logSignP">
            {
                isLoginMode ? <Login handelSubmit={handelSubmit} changeHandler={changeHandler}/> 
                : <SignUp handelSubmit={handelSubmit} changeHandler={changeHandler} />
            }
            <br></br>
            <p onClick={toggleMode} id="logPara">
            {isLoginMode ? "Go To Create Account" : "Already Have Account ?" }
            </p>
        </div>
    )
}

export default Auth;