import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import RepeatIcon from '@mui/icons-material/Repeat'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import PublishIcon from '@mui/icons-material/Publish'
import { Avatar } from '@mui/material'
import './post.css'
import { getImg } from '../../assets/env'
import img1 from '../../assets/images.png'
import img2 from '../../assets/profile pic.jpg'
import { useEffect, useState } from 'react'
import { CommentSection } from '../CommentSection/commentSection'
import { PostMenu } from '../PostMenu/postmenu'
import { useAppContext } from '../../appContext/appContext'
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../../firebase'

export const Post = ({accountname, username, verified, text, imgSrc, videoSrc, postID, postIndex, showDel, following, zIndex}) => {
    const {setHidden, loggedUser, setLoggedUser} = useAppContext()
    const [showComments, setShowComments] = useState(true)
    const [displayName, setDisplayName] = useState(null)
    const style = {zIndex}
    function handlePostClick(e){
        setHidden(true)
    }
    async function follow(){
        // user who's being followed
        const q1 = query(collection(db, 'users'), where('username', '==', username))
        const querySnapShot1 = await getDocs(q1)
        try{
            const userData = await addFollowing()
            await addFollowers()
            const loggedUserCopy = {...loggedUser}
            loggedUserCopy.following = [...userData.following, username]
            //update the local storage
            const appKey = "my-key"
            localStorage.setItem(appKey, JSON.stringify(loggedUserCopy))
            // update the loggedUser sate
            setLoggedUser(loggedUserCopy);

        }catch(err){
            console.log(err)
        }
    }
    async function addFollowing(){
        // user who's doing the following
        const q = query(collection(db, 'users'), where('username', '==', loggedUser.username))
        const querySnapShot = await getDocs(q); 
        if (querySnapShot.docs.length > 0){
            const collectionID = querySnapShot.docs[0].id
            const userData = querySnapShot.docs[0].data()
            const docRef = doc(db, 'users', collectionID)
            await updateDoc(docRef, {
                following : [...userData.following, username]
            })
            console.log('updated the following array')
            return userData; 
        }
    }
    async function addFollowers(){
        const q = query(collection(db, 'users'), where('username', '==', username))
        const querySnapShot = await getDocs(q); 
        if (querySnapShot.docs.length > 0){
            const collectionID = querySnapShot.docs[0].id
            const userData = querySnapShot.docs[0].data()
            const docRef = doc(db, 'users', collectionID)
            await updateDoc(docRef, {
                followers : [...userData.followers, loggedUser.username]
            })
            console.log('updated the followers array')
        }
    }
    async function getDsisplayName(){
        try{
            const q = query(collection(db,'users'), where('username', '==', username))
            const querySnapShot = await getDocs(q); 
            const user = querySnapShot.docs[0].data()
            if (user){
                setDisplayName(user.accountname); 
            }
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getDsisplayName()
    }, [])
    return (
        <div className='post' onClick={handlePostClick} >
            {displayName && <div className="post-avatar">
                <Avatar src={img1}/>
            </div>}
            {displayName && <div className="post-body">
                <div className="post-header">
                    <div className="post-headerText">
                        <h3>
                            
                            {!accountname && displayName}{" "}
                            {accountname && accountname}{" "}
                            <span className='post-headerSpecial'>
                                {verified &&<VerifiedUserIcon className='post-badge'/>} @{username}
                            </span>
                            {!following && <span className='follow-status' onClick={follow}>
                                follow
                            </span>}
                        </h3>
                        
                    </div>
                    <div className='post-headerDescription'>
                        <p>{text}</p>
                    </div>
                </div>
                {imgSrc && <img src={imgSrc} alt="profile pic" />}
                {videoSrc && <video src={videoSrc} controls/>}
                <div className="post-footer">
                    <ChatBubbleOutlineIcon fontSize='small'/>
                    <RepeatIcon fontSize='small'/>
                    <FavoriteBorderIcon fontSize='small'/>
                    <PublishIcon fontSize='small'/>
                </div>
                {showComments &&<div className="comment-section" >
                    <CommentSection commentID={postID}/>
                </div>}
                <PostMenu showDel={showDel} postIndex = {postIndex} />
            </div>}
        </div>
    )
}