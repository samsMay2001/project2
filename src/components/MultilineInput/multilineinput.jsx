import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../../appContext/appContext'
import './multilineinput.css'
import { TextareaAutosize } from '@mui/material';

export const MultilineInput = ({value, onChange, textAlign, placeholder}) => {
    const style = {
        textAlign : textAlign
    }
    return (
    <div>
        <TextareaAutosize className='multi-input' style={style} placeholder={placeholder} value={value} onChange={onChange}/>
    </div>
    )
}