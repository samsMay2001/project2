import { useEffect, useState } from 'react'
import { Post } from '../Post/post'
import { TweetBox } from '../TweetBox/tweetbox'
import './feed.css'
import db from '../../firebase'
import { useAppContext } from '../../appContext/appContext'
export const Feed = () => {
    const {posts} = useAppContext()
    // getDocs(collection(db, 'posts'), orderBy('timeStamp', 'asc')).then((snapshot)=> {
    //     const postArray = snapshot.docs.map(doc => doc.data())
    //     setPosts(postArray);  
    // }) 
    return (
        
            <div className="feed">
                <div className="feed-header">
                    <h2>Home</h2>
                </div>
                <TweetBox/>
                {posts && posts.map((item, index)=> (
                <Post key={index} displayName={item.displayName} text={item.text} username={item.username} verified={item.verified} videoSrc={item.videoURL} imgSrc={item.imageURL} postID={item.parentId}/>
                ))}
            </div>
    )
}