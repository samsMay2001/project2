import { useAppContext } from '../../appContext/appContext'
import { Avatar, Button } from '@mui/material'
import './commentSection.css'
import { useRef, useState } from 'react'
import {collection, addDoc} from 'firebase/firestore'
import db from '../../firebase'

export const CommentSection = ({commentID}) => {
    const {comments} = useAppContext()
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
    function handleReply(event, item){
        ref.current.focus()
        setParentComment(item.useID)
    }
    async function postComment(){
        const postObj = {
            likes: 20, 
            parentComment: parentComment,
            text: comment, 
            timeStamp: 4, 
            userID: commentID
        }
        console.log(postObj)
        // try{
        //     const docRef = await addDoc(collection(db, "posts"), postObj)
        //     console.log(postObj)
        // }catch(error){
        //     console.log(error); 
        // }
    }
    function displayComments(item){
    
        if (item.userID.trim() === commentID){
            if (item.parentComment == null){
                return (
                    <div className="comment-box">
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
            }else {
                return (
                    <div className="comment-box-reply">
                        <div className='comment-avatar'>
                            <Avatar style={{width:'30px', height: '30px'}}/>
                        </div>
                        <div className='comment-text-content' style={{marginLeft: '0px'}}>
                            <div className='comment-user'>
                                @{"testuser "}{"2m"}
                            </div>
                            <div className='comment-text'>
                                {item.text}
                            </div>
                            <div className='comment-reply' onClick={(item,event)=>{handleReply(event, item)}}>
                                Reply
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
    return (
        <div className='comment-section-content'>
            <div className="comment-input">
                <input ref={ref} type="text" name="" id="" placeholder='Write a comment' value={comment} onChange={handleChange}/>
                <Button className='comment-post-btn' onClick={postComment}>Post</Button>
            </div>
            {comments.map((item, index)=> (
                    displayComments(item)
            ))}
        </div>
    )
}