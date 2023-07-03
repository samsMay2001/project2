import './usersummary.css'
// import imgs from '../../assets/527aa367a7c51fe24244d313028404fd.jpg'
// import imgs from '../../assets/profile pic.jpg'
import imgs from '../../assets/images.png'

export const UserSummary = () => {
    return (
        <div className='user-summary'>
            {/* <div className='summary-background'></div> */}
            <div className="summary-profile-img" >
                <img src={imgs} alt='' />
            </div>
            <div className='engagement'>
                <h2>{'BMW M4'}</h2>
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
            <div className="logout-btn">Log Out</div>
            </div>
        </div>
    )
}