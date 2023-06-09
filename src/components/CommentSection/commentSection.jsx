import { useAppContext } from '../../appContext/appContext'
import { Avatar, Button } from '@mui/material'
import './commentSection.css'
import { useRef, useState } from 'react'
import {collection, addDoc} from 'firebase/firestore'
import { db } from '../../firebase'
// import db from '../../firebase'

export const CommentSection = ({commentID}) => {
    const {comments, setComments} = useAppContext()
    const [showComment, setShowComment] = useState(false)
    const [parentComment, setParentComment] = useState(null)
    const [comment, setComment] = useState('')
    const ref = useRef()
    function handleChange (event){
        setComment(event.target.value)
    }
    function handleMainReply(){
        ref.current.focus()
    }
    async function postComment(){
        const postObj = {
            likes: 20, 
            parentComment: parentComment,
            text: comment, 
            timeStamp: new Date().getTime(), 
            userID: commentID
        }
        if (comment !== ""){
            try{
                const docRef = await addDoc(collection(db, "comments"), postObj)
                let commentsCopy = [...comments, postObj]
                setComments(commentsCopy); 
                setComment(''); 
            }catch(error){
                console.log(error); 
            }
        }
    }
    function displayComments(item, index){
    
        if (item.userID.trim() === commentID){
                return (
                    <div key={index} className="comment-box">
                        <div className='comment-avatar'>
                            <Avatar/>
                        </div>
                        <div className='comment-text-content'>
                            <div className='comment-user'>
                                @{"testuser "}{"2m"}
                            </div>
                            <div className='comment-text'>
                                {item.text}
                            </div>
                            <div className='comment-reply' onClick={(event)=> {handleMainReply(event, item)}}>
                                Reply
                            </div>
                        </div>
                    </div>
                )
        }
    }
    return (
        <div className='comment-section-content'>
            <div className="comment-input">
                <input ref={ref} type="text" name="" id="" placeholder='Write a comment' value={comment} onChange={handleChange}/>
                <Button className='comment-post-btn' onClick={postComment}>Post</Button>
            </div>
            {comments.map((item, index)=> (
                    displayComments(item, index)
            ))}
        </div>
    )
}