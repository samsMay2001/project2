import { Post } from '../Post/post'
import { TweetBox } from '../TweetBox/tweetbox'
import './feed.css'
export const Feed = () => {
    return (
        
            <div className="feed">
                <div className="feed-header">
                    <h2>Home</h2>
                </div>
                <TweetBox/>
                <Post/>
            </div>
    )
}