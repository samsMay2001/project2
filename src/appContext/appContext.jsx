import { createContext, useContext, useEffect, useState } from "react"; 
import {collection, getDocs, orderBy, query} from 'firebase/firestore'
import db from "../firebase";

const appContext = createContext(null)
export const AppContext = ({children})=> {
    const [uploadedVid, setUploadedVideo] = useState(null)
    const [uploadedImage, setUploadedImage] = useState(null)
    const [videoProgress, setVideoProgress] = useState(0)
    const [videoURL, setVideoURL] = useState(null)
    const [imageURL, setImageURL] = useState(null)
    const [comments, setComments] = useState(null)
    const [posts, setPosts] = useState(null)

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
    useEffect(()=> {
        getPosts(); 
        getComments(); 
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
            setPosts
        }}>
            {children}
        </appContext.Provider>
    )
} 
export const useAppContext = () =>  useContext(appContext); 