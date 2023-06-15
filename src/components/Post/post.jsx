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
import { useState } from 'react'
import { CommentSection } from '../CommentSection/commentSection'
import { PostMenu } from '../PostMenu/postmenu'
import { useAppContext } from '../../appContext/appContext'

export const Post = ({displayName, username, verified, text, imgSrc, videoSrc, postID, postIndex, showDel}) => {
    const {setHidden} = useAppContext()
    const [showComments, setShowComments] = useState(true)
    function handlePostClick(e){
        setHidden(true)
    }
    return (
        <div className='post' onClick={handlePostClick}>
            <div className="post-avatar">
                <Avatar src={img1}/>
            </div>
            <div className="post-body">
                <div className="post-header">
                    <div className="post-headerText">
                        <h3>
                            {displayName}{" "}
                            <span className='post-headerSpecial'>
                                {verified &&<VerifiedUserIcon className='post-badge'/>} @{username}
                            </span>
                        </h3>
                        <PostMenu showDel={showDel} postIndex = {postIndex}/>
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
                {showComments &&<div className="comment-section">
                    <CommentSection commentID={postID}/>
                </div>}
            </div>
        </div>
    )
}