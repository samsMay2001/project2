import { useAppContext } from '../../appContext/appContext'
import { Avatar, Button, TextareaAutosize } from '@mui/material'
import './commentSection.css'
import { useEffect, useRef, useState } from 'react'
import {collection, addDoc, getDoc, doc} from 'firebase/firestore'
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from '../../firebase'
import { Comment } from '../Comment/comment'
// import db from '../../firebase'

export const CommentSection = ({commentID, refference}) => {
    const {comments, setComments, loggedUser, appFocus} = useAppContext()
    const [parentComment, setParentComment] = useState(null)
    const [comment, setComment] = useState('')
    // const ref = useRef()
    function handleChange (event){
        setComment(event.target.value)
    }
    function handleMainReply(){
        refference.current.focus()
    }
    async function postComment(){
        const user = await getUser()
        const postObj = {
            likes: 20, 
            parentComment: parentComment,
            text: comment, 
            timeStamp: new Date().getTime(), 
            postID: commentID, 
            replyTo: user.username,
            user : loggedUser.username
        }
        if (comment !== "" && loggedUser.username){
            try{
                let commentsCopy = [...comments, postObj]
                setComments(commentsCopy); 
            }catch(error){
                console.log(error); 
            }
        }
        setComment(''); 
    }
    async function getUser(){
        // for some reason this function runs twice, you need to fix that 
        try{
            const postRef = doc(db, 'posts', commentID)
            const postSnapShot = await getDoc(postRef); 
            if (postSnapShot.exists()){
                const postData = postSnapShot.data()
                return postData; 
            }
        }catch(err){
            console.log(err)
        }
    }
    function displayComments(item, index){
    
        if (item.postID.trim() === commentID){
                return (
                    <Comment key={index}  commentIndex={index} zIndex={comments.length-index} username={item.user} commentTxt={item.text} handleMainReply={handleMainReply}/>
                )
        }
    }
    return (
        <div className='comment-section-content'>
            <div className="comment-input">
                {/* <input ref={ref} type="text" name="" id="" placeholder='Write a comment' value={comment} onChange={handleChange}/> */}
                <TextareaAutosize ref={refference} className='comment-box-input' placeholder="write a comment" value={comment} onChange={handleChange}/>
                <Button className='comment-post-btn' onClick={postComment}>Post</Button>
            </div>
            {comments.map((item, index)=> (
                    displayComments(item, index)
            ))}
        </div>
    )
}