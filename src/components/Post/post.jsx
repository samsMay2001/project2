import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import RepeatIcon from '@mui/icons-material/Repeat'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import PublishIcon from '@mui/icons-material/Publish'
import { Avatar } from '@mui/material'
import './post.css'
import { getImg } from '../../assets/env'
import img1 from '../../assets/images.png'
import img2 from '../../assets/profile pic.jpg'
import { useEffect, useRef, useState } from 'react'
import { CommentSection } from '../CommentSection/commentSection'
import { PostMenu } from '../PostMenu/postmenu'
import { useAppContext } from '../../appContext/appContext'
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../../firebase'

export const Post = ({timestamp, likes,feed, accountname, username, verified, text, imgSrc, videoSrc, postID, postIndex, showDel, following, zIndex}) => {
    const {setHidden, loggedUser, setLoggedUser, setHomeTab, posts, setPosts, setAppFocus} = useAppContext()
    const [showComments, setShowComments] = useState(true)
    const [displayName, setDisplayName] = useState(null)
    const [like, setLike] = useState (false)
    const style = {zIndex}
    const commentRef = useRef(); 
    function handlePostClick(e){
        setHidden(true)
    }
    function getTimeStamp(){
        const date = new Date(timestamp)
        const options = { month: 'long', year: 'numeric', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('default', options);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedTime = `${formattedHours}:${minutes
          .toString()
          .padStart(2, '0')} ${period}`;
        return `${formattedTime}. ${formattedDate}`
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
        // console.log('a')
        try{
            const q = query(collection(db,'users'), where('username', '==', username))
            const querySnapShot = await getDocs(q); 
            const user = querySnapShot.docs[0].data()
            // console.log(user.accountname)
            if (user){
                setDisplayName(user.accountname); 
            }
        }
        catch(err){
            console.log(err)
        }
    }
    async function handleLike(){
        // console.log(postID); 
        // const docRef = await doc(db, 'posts', postID.trim()) 
        const q = doc(collection(db, 'posts'), postID)
        const querySnapShot = await getDoc(q)
        let postCopy; 
        if (querySnapShot.exists()){
            postCopy = querySnapShot.data();
        }
        const postsCopy = [...posts]; 
        setLike((oldVal)=> {
            if (!oldVal){ // adding username to likes array
                postsCopy[postIndex].likes.push(loggedUser.username)
                postCopy.likes.push(loggedUser.username); 
                updateDoc(q, {
                    likes : postCopy.likes
                }).then(()=> console.log('likes updated'))
                .catch(err => console.log(err)); 
            }else { // removing username to likes array
                const newLikes = postsCopy[postIndex].likes.filter(item => item !== loggedUser.username);  
                postsCopy[postIndex].likes = newLikes; 
                const newFirebaseLikes = postCopy.likes.filter(item => item !== loggedUser.username); 
                // console.log(newFirebaseLikes); 
                updateDoc(q, {
                    likes : newFirebaseLikes
                }).then(()=> console.log('likes updated'))
                .catch(err => console.log(err))
            } 
            setPosts(postsCopy); 

            return !oldVal
        }); 
    }
    function displayLikes(){
        // console.log(likes); 
        if (likes.length > 0){
            if (likes.length > 999) {
                return (likes.length / 1000).toFixed(1) + 'k';
              }
              return likes.length.toString();
        }else {
            return ''
        }
    }
    function handleReply(){
        commentRef.current.focus()
    }
    useEffect(()=>{
        getDsisplayName()
        if (feed){
            setHomeTab(true); 
        }
    }, [posts])
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
                            {/* {displayName}{" "} */}
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
                <div className="post-time-stamp">
                    {getTimeStamp()}
                </div>
                <div className="post-footer">
                    <div className="post-footer-icon" onClick={handleLike}>
                        <span >
                            {!like && <FavoriteBorderIcon className='ps-fo-ico'/>}
                            {like && <FavoriteIcon className='ps-fav-icon'/>}
                        </span>
                        <h5>{displayLikes()}</h5>
                    </div>
                    <div className="post-footer-icon">
                        <span>
                            <BubbleChartIcon className='ps-fo-ico2' sx={{fontSize:25}}/>
                        </span>
                        <h5 onClick={handleReply}>{'Reply'}</h5>
                    </div>
                </div>
                {showComments &&<div className="comment-section" >
                    <CommentSection commentID={postID} refference={commentRef}/>
                </div>}
                <PostMenu showDel={showDel} postIndex = {postIndex} />
            </div>}
        </div>
    )
}