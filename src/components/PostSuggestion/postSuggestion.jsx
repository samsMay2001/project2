import { Avatar } from '@mui/material'
import './postSuggestion.css'

export const PostSuggestion = ({accountname, username}) => {
    return (
        <div className='post-suggestion'>
            <Avatar className='suggestion-avatar'/>
            <div className="suggestion-details">
                <h3>{accountname}</h3>
                <h4>@{username}</h4>
            </div>
            <div className="suggestion-follow">
                View
            </div>
        </div>
    )
}