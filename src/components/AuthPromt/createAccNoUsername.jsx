import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

export async function createAccNoUsername(currentUser, setLoggedUser, username, setUserAlreadyExist){
    let userEmail = currentUser.email;
    let postObj = {
        username : username, 
        email : userEmail,
        bio: currentUser.bio,
        accountname: currentUser.displayName, 
        followers: [], 
        following: []
    }
    
    
    const q = query(collection(db, 'users'), where("email", "==", userEmail))
    const querySnapShot = await getDocs(q); 
    if (querySnapShot.docs.length == 0){
        // if that user doesn't exist, create them 
        try{
            const docRef = await addDoc(collection(db, "users"), postObj)
        }catch(err){
            console.log(err)
        }
    }else {
        // the user already exists, just return their username
        const user = querySnapShot.docs[0].data()
        if (user.username.length > 0){
            const users = JSON.parse(localStorage.getItem('my-key'))
            // updates the bio, followers, following, and accountname on the loggedUser
            if(users == null){
                postObj.bio = user.bio
                postObj.followers = user.followers
                postObj.following = user.following
                postObj.accountname = user.accountname
                setLoggedUser(postObj); 
            }
        return user.username.trim()
        }
    }
}