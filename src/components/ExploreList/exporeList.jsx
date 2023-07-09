import { Explore } from '../Explore/explore'
import './exploreList.css'

export const ExploreList = () => {
    return (
        <div className='explore-list'>
            <Explore Topic={'Featured'}/>
            <Explore Topic={'Sports'}/>
            <Explore Topic={'Music'}/>
            <Explore Topic={'Travel'}/>
        </div>
    )
}