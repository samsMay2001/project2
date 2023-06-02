import { useEffect, useState } from 'react'
import { Post } from '../Post/post'
import { TweetBox } from '../TweetBox/tweetbox'
import './feed.css'
import db from '../../firebase'
import {collection, getDocs, orderBy, query} from 'firebase/firestore'
export const Feed = () => {
    const [posts, setPosts] = useState([])
    // getDocs(collection(db, 'posts'), orderBy('timeStamp', 'asc')).then((snapshot)=> {
    //     const postArray = snapshot.docs.map(doc => doc.data())
    //     setPosts(postArray);  
    // }) 
    async function getSnapShot(){
        const q = query(collection(db, 'posts'), orderBy('timeStamp', 'desc'))
        const querySnapShot = await getDocs(q); 
        const postArray = querySnapShot.docs.map(doc => doc.data())
        setPosts(postArray)
    }
    useEffect( ()=>{
        // getSnapShot()
        // http request to get all posts from mongodb
    }, [posts])
    return (
        
            <div className="feed">
                <div className="feed-header">
                    <h2>Home</h2>
                </div>
                <TweetBox/>
                {posts.map((item, index)=> (
                <Post key={index} displayName={item.displayName} text={item.text} username={item.username} verified={item.verified} videoSrc={item.videoURL} imgSrc={item.imgURL}/>
                ))}
            </div>
    )
}