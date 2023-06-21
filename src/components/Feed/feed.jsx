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
    function showDeleteBtn(item){
        if (item.username.trim() === loggedUser.username){
            return true
        }else {
            return false
        }
    }
    function userFollowing(item){
        // console.log(JSON.parse(localStorage.getItem('my-key')))
        const condition1 = loggedUser.username.trim() === item.username.trim()
        // console.log(condition1)
        if (loggedUser.following){
            const followIndex = loggedUser.following.findIndex(i => i===item.username)
            const condition2 = followIndex > -1; 
            // console.log(loggedUser.following); 
            if ((followIndex > -1)){
                return true;
            }else{
                if(condition1){
                    return true
                }else {
                    return false
                }
            }

        }
    }
    // useEffect(()=>{
    //     console.log(loggedUser)
    // }, [loggedUser])
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
                {(homeTab && loggedUser.username) && <TweetBox/>}
                {(posts && homeTab) && posts.map((item, index)=> (
                    <div>
                        <Post zIndex={posts.length-index} following={userFollowing(item)} showDel = {showDeleteBtn(item)} key={index} postIndex={index} displayName={item.displayName} text={item.text} username={item.username} verified={item.verified} videoSrc={item.videoURL} imgSrc={item.imageURL} postID={item.parentId}/>
                    </div>
                ))}
                {(userTab&&loggedUser.username) && <UserAccount posts={posts} username={loggedUser.username} bio={loggedUser.bio} accountname = {loggedUser.accountname}/>}
            </div>
    )
}