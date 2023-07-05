import { Home } from '@mui/icons-material';
import { SidebarOption } from '../SidebarOptions/sidebarOptions';
import './sidebar.css'
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { NotificationsNone } from '@mui/icons-material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PermIdentityIcon  from '@mui/icons-material/PermIdentity';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Button } from '@mui/material';
import {signOut} from 'firebase/auth'
import { auth } from '../../firebase';
import { useAppContext } from '../../appContext/appContext';
import { AuthPrompt } from '../AuthPromt/authPrompt';
import { PostSuggestion, PostSuggestions } from '../PostSuggestions/postSuggestions';
import { Topics } from '../Topics/topics';
import { UserSummary } from '../UserSummary/usersummary';

export const SideBar = () => {
    const {setUserTab, setHomeTab, setLoggedUser, setInputVal, setUserLoggedIn, userLoggedIn, homeTab} = useAppContext()
    return (
        <div className='sidebar'>
            <div className='sidebar-wrapper'>
                {(homeTab&&userLoggedIn) && <UserSummary/>}
                <AuthPrompt/>
                <PostSuggestions/>
                <Topics/>
            </div>

        </div>
    )
}