import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

export async function createAccNoUsername(currentUser, setLoggedUser, username, setUserAlreadyExist){
    let userEmail = currentUser.email;
    let postObj = {
        username : username, 
        email : userEmail,
        bio: "Hello! I'm a react developer and this is one of my react projects",
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
    }else {
        const user = querySnapShot.docs[0].data()
        if (user.username.length > 0){
        return user.username.trim()
        }
    }
}