import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import RepeatIcon from '@mui/icons-material/Repeat'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import PublishIcon from '@mui/icons-material/Publish'
import { Avatar } from '@mui/material'
import './post.css'
import { getImg } from '../../assets/env'
import img1 from '../../assets/images.png'
import img2 from '../../assets/profile pic.jpg'

export const Post = ({displayName, username, verified, timestamp}) => {
    return (
        <div className='post'>
            <div className="post-avatar">
                <Avatar src={img1}/>
            </div>
            <div className="post-body">
                <div className="post-header">
                    <div className="post-headerText">
                        <h3>
                            Samuel Muhigirwa{" "}
                            <span className='post-headerSpecial'>
                                <VerifiedUserIcon className='post-badge'/> @sam_ever7
                            </span>
                        </h3>
                    </div>
                    <div className='post-headerDescription'>
                        <p>This is my twitter clone</p>
                    </div>
                </div>
                <img src={img2} alt="profile pic" />
                <div className="post-footer">
                    <ChatBubbleOutlineIcon fontSize='small'/>
                    <RepeatIcon fontSize='small'/>
                    <FavoriteBorderIcon fontSize='small'/>
                    <PublishIcon fontSize='small'/>
                </div>
            </div>
        </div>
    )
}