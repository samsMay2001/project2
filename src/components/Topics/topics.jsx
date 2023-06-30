import { useState } from 'react'
import './topics.css'
import { Topic } from '../Topic/topic'

export const Topics = () => {
    const [topicList, setTopicList] = useState([
        'Travel', 
        "Men's Fashion",
        'Sports', 
        "Politcs", 
        "Science", 
        "Football", 
        "Formula 1"
    ])
    return (
        <div className='topics'>
            <div className='welcome' style={{marginTop: '5px'}}>
                Explore Topics
            </div>
            <div className="topic-list">
                {topicList.map((item, index)=> (
                    <Topic topic={item}/>
                ))}
            </div>
        </div>
    )
}