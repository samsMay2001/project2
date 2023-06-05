import { useRef } from "react"
import { useAppContext } from "../../appContext/appContext";
import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage'; 
import { getStorage } from 'firebase/storage'; 
import { firebaseApp } from "../../firebase";
import { IconButton } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image';
import './mediauploader.css'

export const MediaUploder = () => {
    const {setUploadedVideo, setVideoProgress, setVideoURL, setUploadedImage, setImageURL} = useAppContext()
    const storage = getStorage(firebaseApp)
    const myRef = useRef(); 
    function handleClick () {
        myRef.current.click(); 
    }
    async function  handleChange (event) {

        const selectedFile = event.target.files[0]; 
        if (selectedFile){ 
            const filename = `${Date.now()}-${selectedFile.name}`; 
            const storageRef = ref(storage, filename);
            setMedia(selectedFile); 
            const uploadTask = uploadBytesResumable(storageRef, selectedFile); 
            // http request to upload file to GridFSBucket. ************
            // const fileData = new FormData(); 
            // fileData.append('file', selectedFile); 
            // fetch('http://localhost:4000/upload', {
            //     method: 'POST',
            //     body: fileData
            // })
            // .then( res => {
            //     console.log(res); 
            // })
            // .catch(err => {
            //     console.log(err);
            // })
            uploadTask.on('state_changed', (snapshot) => {
                const progress =   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setVideoProgress(progress)
            }, (error)=> {
                console.log('Error uploading video', error); 
            }, async ()=> {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref); 
                setMediaURL(selectedFile, downloadURL); 
            })
        }
    }
    function setMedia(selectedFile){
        if (selectedFile.type.includes('image')){
            setUploadedVideo(null)
            setUploadedImage(URL.createObjectURL(selectedFile))
        }
        if (selectedFile.type.includes('video')){
            setUploadedImage(null)
            setUploadedVideo(URL.createObjectURL(selectedFile))
        }
    }
    function setMediaURL(selectedFile, downloadURL){
        if (selectedFile.type.includes('image')){
            setVideoURL(null)
            setImageURL(downloadURL)
        }
        if (selectedFile.type.includes('video')){
            setImageURL(null)
            setVideoURL(downloadURL)
        }
    }
    return (
        <div>
            <IconButton className="mediaupload-btn" type="button" onClick={handleClick}><ImageIcon/></IconButton>
            <input type="file" onChange={handleChange} ref={myRef} style={{display: 'none'}} accept="video/*, image/*"/>
        </div>
    )
}