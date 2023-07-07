import { useEffect, useState } from 'react'
import { auth, db } from '../../firebase'
import './authPrompt.css'
import {getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged} from "firebase/auth"
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { create } from '@mui/material/styles/createTransitions'
import { useAppContext } from '../../appContext/appContext'
import { createAccNoUsername } from './createAccNoUsername'
import { validateUserName } from './validateUserName'
import { modifyName } from './modifyName'
import { setLocalStorage } from './setLocalStorage'
import { useNavigate } from 'react-router-dom'


export const AuthPrompt = () => {
    const {userLoggedIn, setUserLoggedIn, setUserTab, setHomeTab, setLoggedUser, loggedUser} = useAppContext()
    const [user, setUser] = useState(null); 
    const [username, setUsername] = useState('')
    const [userAlreadyExist, setUserAlreadyExist] = useState(null)
    const navigate = useNavigate()
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try{
            await signInWithPopup(auth, provider)
        }catch(err){
            console.log(err)
        }
    }
    function handleChange(e){
        setUsername(e.target.value); 
    }
    async function addUserName(){
        let newUsername = modifyName(username)
        const userValid = await validateUserName(newUsername); 
        if (userValid && user.email){
            try{

                const q = query(collection(db, "users"), where('email', '==', user.email))
                const querySnapShot = await getDocs(q)
                const userRef = querySnapShot.docs[0].id;
                // console.log(loggedUser); 
                await updateDoc(doc(db, 'users', userRef), {
                    username: newUsername
                })
                setLocalStorage(navigate,newUsername, setLoggedUser, setUserLoggedIn, setHomeTab)
            }catch(err){
                console.log(err)
            }
        }
        if (!userValid){
            console.log('user name is not valid')
        }
        setUsername(""); 
    }
    async function createAccWrapper(currentUser){
        const usernameExists = await createAccNoUsername(currentUser, setLoggedUser, username, setUserAlreadyExist); 
        if (usernameExists){

            setLocalStorage(navigate, usernameExists, setLoggedUser, setUserLoggedIn, setHomeTab); 
        }
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=> {
            if(currentUser){
                setUser(currentUser); 
                createAccWrapper(currentUser); 
                // auth.signOut();
            }else {
                setUser(null)
            }
        })
        return () => {
            unsubscribe();
        }
    }, [])
    return (
        <div className={`${userLoggedIn && 'u12ccc1'} ${!userLoggedIn && 'auth-prompt'}`}>
            { (user && !userAlreadyExist) &&
                <div>
                    <input type="text" value={username} placeholder='Create a user name' onChange={handleChange}/><button onClick={addUserName}>Create Account</button>
                </div>
            }
            <div className="welcome">
                Welcome To Our Community
            </div>
            <div className="authorize">
                <div className="signin">
                    {!user && <div className='login-btn' onClick={handleGoogleSignIn}>
                        <span></span>
                        Log In
                    </div> }
                </div>
                <div className="signup">
                    {!user && <div className='signup-btn' onClick={handleGoogleSignIn}>
                        <span></span>
                        Sign Up
                    </div> }
                </div>
            </div>
        </div>
    )
}