import './usersummary.css'
import imgs from '../../assets/images.png'
import { Avatar } from '@mui/material'

export const UserSummary = () => {
    const imgStyle = {
        width: '150px',
        height: '150px'
    }
    return (
        <div className='user-summary'>
            <div className='summary-background'></div>
            <div className="summary-profile-img" style={imgStyle}>

            </div>
            <h2>{'BMW M4'}</h2>
            <div className='engagement'>
                <div className="engagement-box">
                    <h5>10</h5>
                    <h4>Posts</h4>
                </div>
                <div className="engagement-box">
                    <h5>789</h5>
                    <h4>Following</h4>
                </div>
                <div className="engagement-box">
                    <h5>10K</h5>
                    <h4>Followers</h4>
                </div>
            </div>
            <div className="logout-btn">Log Out</div>
        </div>
    )
}