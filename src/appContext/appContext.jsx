import { createContext, useContext, useState } from "react"

const appContext = createContext(null)
export const AppContext = ({children})=> {
    const [uploadedVid, setUploadedVideo] = useState(null)
    const [uploadedImage, setUploadedImage] = useState(null)
    const [videoProgress, setVideoProgress] = useState(0)
    const [videoURL, setVideoURL] = useState(null)
    const [imageURL, setImageURL] = useState(null)
    return (
        <appContext.Provider value={{
            uploadedVid, 
            setUploadedVideo, 
            uploadedImage, 
            setUploadedImage,
            videoProgress, 
            setVideoProgress, 
            videoURL, 
            setVideoURL, 
            imageURL, 
            setImageURL
        }}>
            {children}
        </appContext.Provider>
    )
} 
export const useAppContext = () =>  useContext(appContext); 