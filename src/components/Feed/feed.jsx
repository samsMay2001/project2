import { useEffect, useState } from 'react'
import { Post } from '../Post/post'
import { TweetBox } from '../TweetBox/tweetbox'
import './feed.css'
import { useAppContext } from '../../appContext/appContext'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { UserAccount } from '../UserAccount/useraccount'
export const Feed = () => {
    const {posts, loggedUser, userTab,setUserTab, homeTab, setHomeTab} = useAppContext()
    // console.log(loggedUser)
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
                    <div onClick={handleHomeClick} className={`home ${homeTab && 'feed-header-active'}`}>
                        <HomeIcon className='home-icon' />
                    </div>
                    {loggedUser.username && <div onClick={handleUserClick} className={`useraccount ${userTab && 'feed-header-active'}`}>
                        <AccountCircleIcon className='user-acc-icon'  />
                    </div>}
                </div>
                {homeTab && <TweetBox/>}
                {(posts && homeTab) && posts.map((item, index)=> (
                    <Post key={index} displayName={item.displayName} text={item.text} username={item.username} verified={item.verified} videoSrc={item.videoURL} imgSrc={item.imageURL} postID={item.parentId}/>
                ))}
                {(userTab&&loggedUser.username) && <UserAccount posts={posts} username={loggedUser.username} bio={loggedUser.bio} accountname = {loggedUser.accountname}/>}
            </div>
    )
}