import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../../appContext/appContext'
import './multilineinput.css'

export const MultilineInput = () => {
    const {inputVal, setInputVal} = useAppContext(); 
    const [textLines, setTextLines] = useState(1)
    const textareaRef = useRef(null);
    function handleChange(e){
        if (inputVal.length<100){
            setInputVal(e.target.value)
        }
    }
    function calculateTextareaRows(){
        return inputVal.split('\n').length;
    }
    function handleTextAreanWidth (){
        if (textareaRef.current) {
            textareaRef.current.style.width = 'auto';
            const newWidth = textareaRef.current.scrollWidth;
            // console.log(newWidth)
            textareaRef.current.style.width = `${200}px`;
            // textareaRef.current.style.width = `${newWidth}px`;
          }
    }
    useEffect(()=>{
        handleTextAreanWidth()
    }, [inputVal])
    return (
        <textarea ref={textareaRef} name="" className="multi-input" rows={calculateTextareaRows()} onChange={handleChange} value={inputVal} placeholder='Add a Bio . . .' style={{ resize: 'none', overflow: 'hidden' }}/>
    )
}