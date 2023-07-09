import { useState } from 'react'
import './topics.css'
import { Topic } from '../Topic/topic'

export const Topics = () => {
    const [topicList, setTopicList] = useState([
        'Featured', 
        "Fashion",
        "Cars",
        'Sports', 
        "Travel", 
        "Music", 
        "Football", 
        "Formula 1", 
    ])
    return (
        <div className='topics'>
            <div className='welcome' style={{marginTop: '5px'}}>
                Explore Topics
            </div>
            <div className="topic-list">
                {topicList.map((item, index)=> (
                    <Topic key={index} topic={item}/>
                ))}
            </div>
        </div>
    )
}