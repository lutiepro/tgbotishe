import React from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import './Header.css';
export const Header =()=>{
    const { user, onClose} = useTelegram();
    return(
        <>
        <button className='btn' onClick = {onClose}>Закрыть</button>
        <span className='userName'>
        Асаламалекум,  {  user?.username}
        </span>
        </>
    )
}