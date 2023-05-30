import { TwitterTimelineEmbed, TwitterShareButton, TwitterTweetEmbed } from 'react-twitter-embed'
import SearchIcon from '@mui/icons-material/Search'
import './widgets.css'
export const Widgets = () => {
    return (
        <div className='widgets'>
            <div className='widgets-input'>
                <SearchIcon className='widgets-searchIcon'/>
                <input type="text" placeholder='Search Twitter' />
            </div>
            <div className="widgets-widgetContainer">
                <h2>What's happening</h2>

                <TwitterTweetEmbed tweetId='858551177860055040'/>
                <TwitterTimelineEmbed sourceType='profile' screenName='cleverqazi' options={{height: 400}} />
            </div>
        </div>
    )
}