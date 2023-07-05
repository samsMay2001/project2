import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export async function handleSignOut(setHomeTab, setLoggedUser, setUserLoggedIn, setInputVal){
    try {
        await signOut(auth); 
        setHomeTab(true)
        setLoggedUser({}); 
        setUserLoggedIn(false); 
        setInputVal("")
        localStorage.clear();
    } catch(err){
        console.error(err)
    }
}