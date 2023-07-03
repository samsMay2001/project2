import { Post } from '../Post/post'
import { TweetBox } from '../TweetBox/tweetbox'
import './feed.css'
import { useAppContext } from '../../appContext/appContext'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import PublicIcon from '@mui/icons-material/Public';
import WebIcon from '@mui/icons-material/Web';
import { UserAccount } from '../UserAccount/useraccount'
import { userFollowing } from './userFollowing'
import FeedIcon from '@mui/icons-material/Feed';
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
    function handleExplore(){}
    return (
        
            <div className="feed">
                <div className="feed-header">
                    <div onClick={handleHomeClick} className={`home ${homeTab && 'feed-header-active'}`}>
                        <FeedIcon className='home-icon' />
                        <h4>Feed</h4>
                    </div>
                    <div onClick={handleExplore} className={`home`}>
                        <PublicIcon className='home-icon' />
                        <h4>Explore</h4>
                    </div>
                    {(loggedUser.username) && <div onClick={handleUserClick} className={`useraccount ${userTab && 'feed-header-active'}`}>
                        <AccountCircleIcon className='user-acc-icon'  />
                        <h4>Profile</h4>
                    </div>}
                    
                </div>
                {(homeTab && loggedUser.username) && <TweetBox/>}
                {(posts && homeTab) && posts.map((item, index)=> (
                    <div>
                        <Post 
                        zIndex={posts.length-index} 
                        following={userFollowing(item, loggedUser)} 
                        showDel = {showDeleteBtn(item)} 
                        key={index} 
                        postIndex={index} 
                        text={item.text} 
                        username={item.username} 
                        verified={item.verified} 
                        videoSrc={item.videoURL} 
                        imgSrc={item.imageURL} 
                        postID={item.parentId}/>
                    </div>
                ))}
                {(userTab&&loggedUser.username) && <UserAccount posts={posts} username={loggedUser.username} bio={loggedUser.bio} accountname = {loggedUser.accountname}/>}
            </div>
    )
}