import { useEffect, useState } from 'react'
import { Post } from '../Post/post'
import { TweetBox } from '../TweetBox/tweetbox'
import './feed.css'
import db from '../../firebase'
import { useAppContext } from '../../appContext/appContext'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { UserAccount } from '../UserAccount/useraccount'
export const Feed = () => {
    const {posts} = useAppContext()
    // getDocs(collection(db, 'posts'), orderBy('timeStamp', 'asc')).then((snapshot)=> {
    //     const postArray = snapshot.docs.map(doc => doc.data())
    //     setPosts(postArray);  
    // }) 
    const [homeTab, setHomeTab] = useState(true)
    const [userTab, setUserTab] = useState(false)

    function handleHomeClick(){
        setHomeTab(true); 
        setUserTab(false); 
    }
    function handleUserClick(){
        setUserTab(true); 
        setHomeTab(false); 
    }
    return (
        
            <div className="feed">
                <div className="feed-header">
                    <div onClick={handleHomeClick}>
                        <HomeIcon className={`home ${homeTab && 'feed-header-active'}`}/>
                    </div>
                    <div onClick={handleUserClick}>
                        <AccountCircleIcon  className={`useraccount ${userTab && 'feed-header-active'}`}/>
                    </div>
                </div>
                {homeTab && <TweetBox/>}
                {(posts && homeTab) && posts.map((item, index)=> (
                <Post key={index} displayName={item.displayName} text={item.text} username={item.username} verified={item.verified} videoSrc={item.videoURL} imgSrc={item.imageURL} postID={item.parentId}/>
                ))}
                {userTab && <UserAccount posts={posts} username={'sam_ever7'} bio={'Hello! I develop software and this is one of my React projects'} accountname = {'Samuel Muhigirwa'}/>}
            </div>
    )
}