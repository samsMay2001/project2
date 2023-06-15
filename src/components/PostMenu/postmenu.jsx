import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import './postmenu.css'
import { useAppContext } from '../../appContext/appContext';
import { collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { useState } from 'react';
export const PostMenu = ({postIndex, showDel}) => {
    const { posts, setPosts} = useAppContext(); 
    const [hidden, setHidden] = useState(true)
    function handlePostMenu(e){
        e.stopPropagation();
        setHidden((oldVal)=> {
            return !oldVal
        })
    }
    function sharePost(e){
        e.stopPropagation();
        setHidden(true)
    }
    async function deletePosts(e){
        e.stopPropagation();   
        const postCopy = [...posts]
        const newPosts = postCopy.filter((_, i)=> i !== postIndex)
        await getPosts()
        setPosts(newPosts)
        setHidden(true)
    }
    async function getPosts(){
        try{
            const q = query(collection(db, 'posts'), orderBy('timeStamp', 'desc'))
            const querySnapShot = await getDocs(q);  
            const fetchedPosts = querySnapShot.docs.map((doc)=> ({
                id: doc.id, 
                ...doc.data()
            }))
            const postId = fetchedPosts[postIndex].id
            await deleteDoc(doc(db, 'posts', postId))
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <div className={`post-menu-btn ${!hidden && 'post-menu-active'}`} onClick={handlePostMenu}>
                <MoreVertIcon/>
            </div>
            {!hidden && <div className="post-menu" >
                <div className="post-menu-item" onClick={sharePost}>
                    <div className="post-menu-icon" >
                        <ShareIcon className='icon-menu'/>
                    </div>
                    <div className="post-menu-txt">Share</div>
                </div>
                {showDel &&
                <div className="post-menu-item" onClick={deletePosts}>
                    <div className="post-menu-icon" >
                        <DeleteIcon className='icon-menu'/>
                    </div>
                    <div className="post-menu-txt">Delete</div>
                </div>
                }
            </div>}
        </div>
    )
}