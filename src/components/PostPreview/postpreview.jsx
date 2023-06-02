import { useAppContext } from "../../appContext/appContext"
import './postpreview.css'
export const PostPreview = () => {
    const {uploadedVid, videoProgress, uploadedImage } = useAppContext()
    return (
        <div style={{ width: '100%'}}>
            <div style={{display: 'flex', width: '100%'}}>
                {uploadedVid && <video src={uploadedVid} controls className="media"/>}
                {uploadedImage && <img src={uploadedImage} className="media"/>}
            </div>
            { (uploadedVid || uploadedImage)&&
                <div className="upload-message">
                    <h2>Progress: {(videoProgress).toFixed(0)}%</h2>
                    <div>Longer videos may take a while to upload</div>
                </div>
            }
            
        </div>
    )
}