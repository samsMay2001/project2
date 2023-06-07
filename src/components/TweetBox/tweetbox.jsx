import { Button, Avatar } from '@mui/material'
import imgs from '../../assets/images.png'
import './tweetbox.css'
import { useState } from 'react'
import { MediaUploder } from '../VideoUploader/mediauploader'
import { PostPreview } from '../PostPreview/postpreview'
import { useAppContext } from '../../appContext/appContext'
import {collection, addDoc} from 'firebase/firestore'
import db from '../../firebase'
export const TweetBox = () => {
    const {videoURL, imageURL, setUploadedVideo, setVideoProgress, setVideoURL, setUploadedImage, setImageURL, posts, setPosts} = useAppContext()
    const [tweetMessage, setTweetMessage] = useState(""); 
    function handleChange(event){
        setTweetMessage(event.target.value)
    }
    async function handleClick(){
        const postObj = {
            displayName: 'Samuel Muhigirwa', 
            imageURL : imageURL,
            text : tweetMessage, 
            username : 'sam_ever7', 
            verified : true,
            videoURL : videoURL, 
            timeStamp : new Date().getTime()
        }
        if (videoURL || imageURL || tweetMessage){
            // http request endpoint to add a new post on mongodb
            try{
                const docRef = await addDoc(collection(db, "posts"), postObj)
                const postsCopy = [ postObj, ...posts]
                setPosts(postsCopy); 
                setTweetMessage("")
                setUploadedImage(null)
                setVideoProgress(null)

            }catch(error){
                console.log(error); 
            }
        }
    }
    return (
        <div className='tweetBox'>
            <form action="">
                <div className="tweetBox-top-content">
                    <div className="tweetBox-input">
                        <Avatar src={imgs}/>
                        <input placeholder="What's happening" value={tweetMessage} onChange={handleChange}/>
                    </div>
                    <div className='upload-btn'>
                        <MediaUploder/>
                    </div>
                    <Button className='tweetBox-btn' onClick={handleClick} type='button'>Post</Button>
                </div>
                <div className='post-preview'>
                    <PostPreview/>
                </div>
            </form>
        </div>
    )
}