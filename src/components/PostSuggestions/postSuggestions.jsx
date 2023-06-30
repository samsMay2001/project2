import { useState } from 'react'
import './postSuggestions.css'
import { PostSuggestion } from '../PostSuggestion/postSuggestion'

export const PostSuggestions = () => {
    const testArr = [
        {
            name: 'ESPN', 
            username: 'espn'
        }, 
        {
            name: 'Elon Musk', 
            username: 'elonmusk'
        }, 
        {
            name: 'Beyonce', 
            username: 'beyonce'
        }, 
    ]
    const [suggestedPosts, setSuggestedPosts ] = useState(testArr)

    return (
        <div className='post-suggestions'>
            <h1 htmlFor="Follow suggestions" className='welcome' style={{marginTop: '0px'}}>You Might Like</h1>
            <div className="post-suggestion-list">
                {suggestedPosts.map((item, index)=> (
                    <PostSuggestion key={index} accountname={item.name} username={item.username}/>
                ))}
            </div>
        </div>
    )
}