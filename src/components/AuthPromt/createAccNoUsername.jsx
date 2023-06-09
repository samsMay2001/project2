import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

export async function createAccNoUsername(currentUser, setLoggedUser, username){
    let userEmail = currentUser.email;
    let postObj = {
        username : username, 
        email : userEmail,
        bio: "",
        accountname: currentUser.displayName
    }
    const user = JSON.parse(localStorage.getItem('my-key'))
    if(user == null){
        setLoggedUser(postObj); 
    }
    const q = query(collection(db, 'users'), where("email", "==", userEmail))
    const querySnapShot = await getDocs(q); 
    if (querySnapShot.docs.length == 0){

        try{
            const docRef = await addDoc(collection(db, "users"), postObj)
        }catch(err){
            console.log(err)
        }
    }
}