import { useState } from 'react'
import './postSuggestions.css'
import { PostSuggestion } from '../PostSuggestion/postSuggestion'
import { useAppContext } from '../../appContext/appContext'

export const PostSuggestions = () => {
    const {suggested} = useAppContext(); 

    return (
        <div className='post-suggestions'>
            <h1 htmlFor="Follow suggestions" className='welcome' style={{marginTop: '0px'}}>Now Trending</h1>
            <div className="post-suggestion-list">
                {suggested.map((item, index)=> (
                    <PostSuggestion key={index} accountname={item.accountname} username={item.username}/>
                ))}
            </div>
        </div>
    )
}