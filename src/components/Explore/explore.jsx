import { useEffect } from 'react'
import { useAppContext } from '../../appContext/appContext'
import './explore.css'

export const Explore = () => {
    const {homeTab, setHomeTab} = useAppContext();
    useEffect(()=>{
        setHomeTab(true)
    }, [])
    return (
        <div>{JSON.stringify(homeTab)}</div>
    )
}