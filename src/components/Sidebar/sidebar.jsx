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

export const SideBar = () => {
    
    return (
        <div className='sidebar'>
            <TwitterIcon className='sidebar-twitterIcon'/>
            <SidebarOption active={true} Icon={HomeIcon} text={'Home'}/>
            <SidebarOption Icon={SearchIcon} text={'Explore'}/>
            <SidebarOption Icon={NotificationsNone} text={'Notifications'}/>
            <SidebarOption Icon={MailOutlineIcon} text={'Messages'}/>
            <SidebarOption Icon={BookmarkBorderIcon} text={'Saved'}/>
            <SidebarOption Icon={ListAltIcon} text={'Lists'}/>
            <SidebarOption Icon={PermIdentityIcon} text={'Profile'}/>
            <SidebarOption Icon={MoreHorizIcon} text={'More'}/>
            <Button variant='outlined' className='sidebar-tweet' fullWidth>Tweet</Button>
        </div>
    )
}