import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBKRivdo2XP7PTWPJVkh8WSYE9vXZ7wUVY",
    authDomain: "project2-f6bff.firebaseapp.com",
    projectId: "project2-f6bff",
    storageBucket: "project2-f6bff.appspot.com",
    messagingSenderId: "417676002357",
    appId: "1:417676002357:web:7256472366562a4e085d7c",
    measurementId: "G-CTQ90NYQTZ"
  };

  export const firebaseApp = initializeApp(firebaseConfig)
  export const auth = getAuth(firebaseApp) 
  export const db = getFirestore(firebaseApp)


   
