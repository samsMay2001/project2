import { Avatar } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import './comment.css'
import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAppContext } from '../../appContext/appContext';

export const Comment = ({ username, commentTxt, handleMainReply, zIndex, commentIndex}) => {
    const {comments, setComments, loggedUser, appFocus, setAppFocus} = useAppContext()
    const [showEdit, setShowEdit] = useState(false)
    const [activeMenu, setActiveMenu] = useState(false)
    const style = {zIndex}
    function showMenu(){
        if(username === loggedUser.username){
            setShowEdit(true)
        }else {
            setShowEdit(false)
        }
    }
    function handleCommentMenu(e){
        // setAppFocus(false)
        e.stopPropagation();
        setAppFocus(false); 
        setActiveMenu((oldVal)=> {
            return !oldVal
        })
    }
    async function deleteComment(){
        await delComment()
        setActiveMenu(false); 
    }
    async function delComment(){
        try{
            const q = query(collection(db, 'comments'), orderBy('timeStamp', 'asc'))
            const querySnapShot = await getDocs(q)
            const commentsFetched = querySnapShot.docs.map(doc=> ({id:doc.id}))
            const commentId = commentsFetched[commentIndex].id
            await deleteDoc(doc(db, 'comments', commentId))
            const commentsCopy = [...comments]; 
            const newComments = commentsCopy.filter((_, i)=> i !== commentIndex)
            setComments(newComments); 
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        showMenu()
    },[])
    useEffect(()=>{
        if (appFocus){
            setActiveMenu(false); 
        }
    },[appFocus])
    return (
        <div className='comment-box' style={style}>
            <div className="comment-avatar">
                <Avatar/>
            </div>
            <div className="comment-text-content">
                <div className="comment-user">
                    @{username}{" 2m"}
                </div>
            <div className="comment-text">
                {commentTxt}
            </div>
            <div className={`comment-reply`} onClick={(event)=> {handleMainReply(event)}}>
                Reply
            </div>
            </div>
            {showEdit && <div className={`comment-menu ${activeMenu && 'comment-menu-active'}`} onClick={handleCommentMenu}>
                edit
            </div>}
            {activeMenu &&
            <div className='comment-menu-box'>
                <div className="comment-menu-item" onClick={deleteComment}>
                    <div className="comment-menu-icon" >
                        <DeleteIcon className='icon-menu'/>
                    </div>
                    <div className="comment-menu-txt">Delete</div>
                </div>
            </div>}
        </div>
    )
}