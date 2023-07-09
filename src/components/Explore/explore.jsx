import { useEffect, useState } from 'react'
import { useAppContext } from '../../appContext/appContext'
import './explore.css'
import { ExploreImg } from '../exploreImage/exploreImg';
import { createTopicPostArray } from '../exploreImage/createTopicPostArray';

export const Explore = ({Topic}) => {
    const {homeTab, setHomeTab, posts} = useAppContext();
    const [topicPosts, setTopicPosts] = useState([]); 
    createTopicPostArray(setTopicPosts, Topic, posts); 
    const imgSequence = [
        'img1',
        'img2',
        'img3',
        'img4',
        'img5',
        'img6',
        'img7',
        'img8',
    ]

    useEffect(()=>{
        setHomeTab(true)
    }, [])
    return (
        <div className='explore'>
            <div className='explore-grid-header'>
                <h1>{Topic}</h1>
            </div>
            <div className="explore-grid-wrapper">
                <div className='explore-grid'>
                    {imgSequence.map((item, index)=> (
                        <ExploreImg key={index} classname={item} imgSrc={topicPosts[index]}/>
                    ))}
                </div>
            </div>
        </div>
    )
}