import './useraccount.css'
import { Button, Avatar, Tooltip } from '@mui/material'
import GridOnIcon from '@mui/icons-material/GridOn';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SettingsIcon from '@mui/icons-material/Settings';
import imgs from '../../assets/images.png'
import { useEffect, useRef, useState } from 'react';
import { Post } from '../Post/post';
import { MultilineInput } from '../MultilineInput/multilineinput';
import { collection, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAppContext } from '../../appContext/appContext';
import { userFollowing } from '../Feed/userFollowing';

export const UserAccount = ({posts, username, accountname, bio}) => {
    const myRef = useRef()
    const {loggedUser, setLoggedUser, setHomeTab} = useAppContext()
    const [userPosts, setUserPosts] = useState(true)
    const [userSaved, setUserSaved] = useState(false)
    const [userSettings, setUserSettings] = useState(false)
    const [editAccName, setEditAccName] = useState(false); 
    const [newName, setNewName] = useState('')
    const [value, setValue] = useState('')
    const [accountname1, setAccountName1] = useState(null)
    
    function displayUserPosts(item, index){
        if (item.username.trim() === username ){
            return (
                <Post 
                likes={item.likes}
                showDel={true} 
                following={userFollowing(item, loggedUser)}
                key={index} 
                postIndex={index} 
                accountname={loggedUser.accountname} 
                text={item.text} 
                username={item.username} 
                verified={item.verified} 
                videoSrc={item.videoURL} 
                imgSrc={item.imageURL} 
                postID={item.parentId}/>
            )
        }
    }
    function handleNewName(e){
        setNewName(e.target.value)
    }
    function handleChange(e){
        setValue(e.target.value)
    }
    function handleAccName(){
        setEditAccName(true)
    }
    async function editName(){
        // const q = query(collection(db, 'users'), where('username', '==', username))
        if (newName.length>0){
            try {
                const q = query(collection(db, 'users'), where('username', '==', username))
                const querySnapShot =  await getDocs(q)
                const userid = querySnapShot.docs[0].id
                await updateDoc(doc(db, 'users', userid), {
                    accountname : newName
                })
                const loggedUserCopy = {...loggedUser}
                loggedUserCopy.accountname = newName
                localStorage.setItem('my-key', JSON.stringify(loggedUserCopy))
                setLoggedUser(loggedUserCopy) 
                setNewName(""); 
                setEditAccName(false); 
            }catch(err){
                console.log(err); 
            }
        }else {
            console.log('Account name not valid'); 
            setNewName(""); 
        }
    }
    async function addBio(){
        try{
            const q = query(collection(db, 'users'), where('username', '==', username))
            const querySnapShot =  await getDocs(q)
            const userid = querySnapShot.docs[0].id
            await updateDoc(doc(db, 'users', userid), {
                bio : value
            })
            const loggedUserCopy = {...loggedUser}
            loggedUserCopy.bio = value
            localStorage.setItem('my-key', JSON.stringify(loggedUserCopy))
            setLoggedUser(loggedUserCopy) 
            setValue("")
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        if (editAccName && myRef.current){
            myRef.current.focus();
        }
    }, [editAccName])
    useEffect(()=>{
        setAccountName1(loggedUser.accountname)
        setHomeTab(false); 
    }, [loggedUser])
    return (
        <div>
            <div className="user-acc-header-section">
                <div className="user-acc-profile-img">
                    <Avatar className='user-acc-pro-img' src={imgs}/>
                </div>
                <div className="user-acc-info">
                    {!editAccName && 
                    <Tooltip title="Click to Edit" placement='right-end'>
                        <h2 onClick={handleAccName}>{accountname}</h2>
                    </Tooltip>
                    }
                    {
                        editAccName && <div onClick={editName} className='done-edit-btn'>Done</div>
                    }
                    {editAccName && <input ref={myRef} value={newName} onChange={handleNewName} type='text' placeholder='Add a Name...'/>}
                    {bio && <div className="user-acc-bio">{bio}</div>}
                    {!bio && <MultilineInput textAlign="center" placeholder={"Add a Bio..."} onChange={handleChange} value={value}/>}
                </div>
                {(value.length>1) &&<div className='add-bio' onClick={addBio}>Add Bio</div>}
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