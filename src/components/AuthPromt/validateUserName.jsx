import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

export async function validateUserName(username){
    if (username.length == 0){
        return false
    }else {
        try{
            const q = query(collection(db, "users"), where('username', '==', username))
            const querySnapShot = await getDocs(q)
            if (querySnapShot.docs.length > 0){
                return false; 
            }else {
                return true;
            }

        }catch(err){
            console.log(err)
        }
    }
}