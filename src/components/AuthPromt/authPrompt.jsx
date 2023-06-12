import { useEffect, useState } from 'react'
import { auth, db } from '../../firebase'
import './authPrompt.css'
import {getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged} from "firebase/auth"
import { addDoc, collection, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { create } from '@mui/material/styles/createTransitions'
import { useAppContext } from '../../appContext/appContext'
import { createAccNoUsername } from './createAccNoUsername'
import { validateUserName } from './validateUserName'
import { modifyName } from './modifyName'
import { setLocalStorage } from './setLocalStorage'


export const AuthPrompt = () => {
    const {userLoggedIn, setUserLoggedIn, setUserTab, setHomeTab, setLoggedUser, loggedUser} = useAppContext()
    const [user, setUser] = useState(null); 
    const [username, setUsername] = useState('')
    const [userAlreadyExist, setUserAlreadyExist] = useState(null)
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try{
            await signInWithPopup(auth, provider)
            console.log('Sign in with Google'); 
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
                const userRef = querySnapShot.docs[0].ref;
                await updateDoc(userRef, {
                    username: newUsername
                })
                setLocalStorage(newUsername, setLoggedUser, setUserLoggedIn, setUserTab, setHomeTab)
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
            setLocalStorage(usernameExists, setLoggedUser, setUserLoggedIn, setUserTab, setHomeTab); 
        }
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=> {
            if(currentUser){
                setUser(currentUser); 
                createAccWrapper(currentUser); 
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
            {!user && <button onClick={handleGoogleSignIn}>Sign Up With Google</button> }
            { (user && !userAlreadyExist) &&
                <div>
                    <input type="text" value={username} placeholder='Create a user name' onChange={handleChange}/><button onClick={addUserName}>Create Account</button>
                </div>
            }
        </div>
    )
}