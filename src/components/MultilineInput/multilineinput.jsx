import { useAppContext } from '../../appContext/appContext'
import './multilineinput.css'

export const MultilineInput = () => {
    const {inputVal, setInputVal} = useAppContext(); 
    function handleChange(){

    }
    return (
        <textarea name="" className="multi-input" onChange={handleChange} value={inputVal}></textarea>
    )
}