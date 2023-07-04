import { useEffect } from 'react'
import { useAppContext } from '../../appContext/appContext'
import './explore.css'

export const Explore = () => {
    const {homeTab, setHomeTab} = useAppContext();
    useEffect(()=>{
        setHomeTab(true)
        console.log('explore has been mounted')
    }, [])
    return (
        <div>{JSON.stringify(homeTab)}</div>
    )
}