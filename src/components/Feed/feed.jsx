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
import { NavLink, Outlet, Route, Router, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Explore } from '../Explore/explore';
import { AuthPrompt } from '../AuthPromt/authPrompt';
import { SideBar } from '../Sidebar/sidebar';
import { Widgets } from '@mui/icons-material';

export const Feed = () => {
    const {posts, loggedUser, setHomeTab} = useAppContext()
    function handleHomeClick(){
        setHomeTab(true); 
    }
    function handleUserClick(){
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
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={
                <>
                    <SideBar/>
                    <div className="feed">    
                        <div className="feed-header">
                            {loggedUser.username && <NavLink to={'/feed'} style={{textDecoration:'none'}} onClick={handleHomeClick} className={`home`}>
                                <FeedIcon className='home-icon' />
                                <h4>Feed</h4>
                            </NavLink>}
                            <NavLink to={'/explore'} onClick={handleExplore} style={{textDecoration:'none'}} className={`home`}>
                                <PublicIcon className='home-icon' />
                                <h4>Explore</h4>
                            </NavLink>
                            {(loggedUser.username) && <NavLink to={'/bmwm4'} style={{textDecoration:'none'}} onClick={handleUserClick} className={`useraccount`}>
                                <AccountCircleIcon className='user-acc-icon'  />
                                <h4>Profile</h4>
                            </NavLink>}
                        </div>
                        <Outlet/>
                    </div>
                </>
                
            }>
                <Route path='explore'  element={<Explore/>}/>
                <Route element={loggedUser.username ? <Outlet/> : <Explore/>}>
                    <Route path='feed' element={
                        <>
                            {(loggedUser.username) && <TweetBox/>}
                            {(posts) && posts.map((item, index)=> (
                                <div>
                                    <Post 
                                    timestamp={item.timeStamp}
                                    likes={item.likes}
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
                                    postID={item.parentId}
                                    feed = {true}
                                    />
                                </div>
                            ))}
                        </>
                    }/>

                    <Route path=':username' element={
                        <>
                            {(loggedUser.username) && <UserAccount posts={posts} username={loggedUser.username} bio={loggedUser.bio} accountname = {loggedUser.accountname}/>}
                        </>
                    }/>
                </Route>
                
            </Route>
        )
    )
    
    return (
        
            <RouterProvider router={router}/>
    )
}