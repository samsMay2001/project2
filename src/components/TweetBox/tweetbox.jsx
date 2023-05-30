import { Button, Avatar } from '@mui/material'
import imgs from '../../assets/images.png'
import './tweetbox.css'
export const TweetBox = () => {
    return (
        <div className='tweetBox'>
            <form action="">
                <div className="tweetBox-input">
                    <Avatar src={imgs}/>
                    <input placeholder="What's happening"/>
                </div>
                <input type="text" className='tweetBox-img-input' placeholder='Enter Image URL' />
                <Button className='tweetBox-btn'>Tweet</Button>
            </form>
        </div>
    )
}