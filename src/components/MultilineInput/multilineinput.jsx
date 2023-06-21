import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../../appContext/appContext'
import './multilineinput.css'
import { TextareaAutosize } from '@mui/material';

export const MultilineInput = ({value, onChange}) => {
    return (
    <div>
        <TextareaAutosize className='multi-input' placeholder='Add a Bio...' value={value} onChange={onChange}/>
    </div>
    )
}