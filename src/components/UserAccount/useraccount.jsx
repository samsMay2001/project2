import './useraccount.css'
import { Button, Avatar } from '@mui/material'
import GridOnIcon from '@mui/icons-material/GridOn';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SettingsIcon from '@mui/icons-material/Settings';
import imgs from '../../assets/images.png'
import { useState } from 'react';
import { Post } from '../Post/post';
import { MultilineInput } from '../MultilineInput/multilineinput';

export const UserAccount = ({posts, username, accountname, bio}) => {
    const [userPosts, setUserPosts] = useState(true)
    const [userSaved, setUserSaved] = useState(false)
    const [userSettings, setUserSettings] = useState(false)
    function displayUserPosts(item, index){
        if (item.username.trim() === username ){
            return (
                <Post key={index} displayName={item.displayName} text={item.text} username={item.username} verified={item.verified} videoSrc={item.videoURL} imgSrc={item.imageURL} postID={item.parentId}/>
            )
        }
    }
    return (
        <div>
            <div className="user-acc-header-section">
                <div className="user-acc-profile-img">
                    <Avatar className='user-acc-pro-img' src={imgs}/>
                </div>
                <div className="user-acc-info">
                    <h2>{accountname}</h2>
                    {bio && <div className="user-acc-bio">{bio}</div>}
                    {!bio && <MultilineInput/>}
                </div>
                <div className='view-options'>
                    <div className={`list-option ${userPosts && 'user-acc-header-active'}` } onClick={()=> {setUserPosts(true); setUserSaved(false); setUserSettings(false)}}>
                        <FormatListBulletedIcon/>
                    </div>
                    <div className={`saved-option ${userSaved && 'user-acc-header-active'}` } onClick={()=> {setUserPosts(false); setUserSaved(true); setUserSettings(false)}}>
                        <BookmarkIcon/>
                    </div>
                    <div className={`settings-option ${userSettings && 'user-acc-header-active'}` } onClick={()=> {setUserPosts(false); setUserSaved(false); setUserSettings(true)}}>
                        <SettingsIcon/>
                    </div>
                </div>
            </div>
            <div className='user-acc-posts'>
                {posts && posts.map((item, index)=> displayUserPosts(item, index))}
            </div>
        </div>
    )
}