import { createContext, useContext, useEffect, useState } from "react"; 
import {collection, getDocs, orderBy, query} from 'firebase/firestore'
import { auth, db } from "../firebase";
// import {db} from "../firebase";
const appContext = createContext(null)
export const AppContext = ({children})=> {
    const [uploadedVid, setUploadedVideo] = useState(null)
    const [uploadedImage, setUploadedImage] = useState(null)
    const [videoProgress, setVideoProgress] = useState(0)
    const [videoURL, setVideoURL] = useState(null)
    const [imageURL, setImageURL] = useState(null)
    const [comments, setComments] = useState(null)
    const [posts, setPosts] = useState(null)
    const [userLoggedIn, setUserLoggedIn] = useState(false); 
    const [loggedUser, setLoggedUser] = useState({
        username : null,
        email: null, 
        bio: null, 
        accountname: null, 
        followers: [],
        following: []
    });  
    const [homeTab, setHomeTab] = useState(false)
    const [inputVal, setInputVal] = useState("")
    const [hidden, setHidden] = useState(true)
    const [appFocus, setAppFocus] = useState(true); 
    const [suggested, setSuggested] = useState([]); 
    async function getComments(){
        const q = query(collection(db, 'comments'), orderBy('timeStamp', 'asc'))
        const querySnapShot = await getDocs(q); 
        const commentsArray = querySnapShot.docs.map(doc => doc.data())
        setComments(commentsArray); 
    }
    async function getPosts(){
        const q = query(collection(db, 'posts'), orderBy('timeStamp', 'desc'))
        const querySnapShot = await getDocs(q); 
        
        const postArray = querySnapShot.docs.map(doc => doc.data())
        postArray.map((post, index) => {
            post.parentId = querySnapShot.docs[index].id
        })
        setPosts(postArray)
    }
    function isUserLoggedIn(){
        // localStorage.clear()
        const user = JSON.parse(localStorage.getItem('my-key'))
        if (user){
            setUserLoggedIn(true);
            let loggedUserCopy = {...user}
            setLoggedUser(loggedUserCopy); 
        }
    }
    async function qualifyUser(){
        const followersLimit = 1
        try{
            const q = query(collection(db, 'users')); 
            const querySnapShot = await getDocs(q)
            const users = querySnapShot.docs.map(user => user.data())
            const qualifiedUsers = users.filter(item => 
                item.followers.length >= followersLimit &&
                item.username !== loggedUser.username
                 )
            return qualifiedUsers; 
        }catch(err){
            console.log(err)
        }

    }
    async function suggestedUsers(){
        const qualifiedUsers = await qualifyUser()
        let suggestedCopy = []
        let iterationNum;  
        if (qualifiedUsers.length> 3){
            iterationNum = 3
        }else {
            iterationNum = qualifiedUsers.length
        }
        for (let i = 0; i < iterationNum; i++){
            let randomIndex = Math.floor(Math.random()*((qualifiedUsers.length-1)+1))
            suggestedCopy.push(qualifiedUsers[randomIndex]);  
        }
        setSuggested(suggestedCopy); 
    }
    useEffect(()=> {
        // localStorage.clear(); 
        // auth.signOut();
        isUserLoggedIn();  
        getPosts(); 
        getComments();
        suggestedUsers()
    }, [])
    return (
        <appContext.Provider value={{
            uploadedVid, 
            setUploadedVideo, 
            uploadedImage, 
            setUploadedImage,
            videoProgress, 
            setVideoProgress, 
            videoURL, 
            setVideoURL, 
            imageURL, 
            setImageURL, 
            comments, 
            setComments, 
            posts, 
            setPosts, 
            userLoggedIn, 
            setUserLoggedIn, 
            loggedUser, 
            setLoggedUser, 
            homeTab, 
            setHomeTab, 
            inputVal, 
            setInputVal, 
            hidden, 
            setHidden, 
            appFocus, 
            setAppFocus, 
            suggested
        }}>
            {children}
        </appContext.Provider>
    )
} 
export const useAppContext = () =>  useContext(appContext); 