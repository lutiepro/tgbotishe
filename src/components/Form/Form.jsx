 
import './Form.css';
import { useTelegram } from '../../hooks/useTelegram';
import {React, useCallback, useEffect, useState} from 'react';

export const Form =()=>{
    const [country, setCountry] =useState('');
    const [city, setCity] =useState('');
    const [subject, setSubject] =useState('');
    const {tg} = useTelegram();
 
    const onSendData = useCallback(()=>{
        const data ={
            country, city, subject
        }
        tg.SendData(JSON.stringify(data))
    }, [country, city, subject])

    const onChangeCountry = (e) =>{
        setCountry(e.target.value);
    }
    const onChangeCity = (e)=>{
        setCity(e.target.value)
    }
    const onChangeSubject = (e)=>{
        setSubject(e.target.value)
    }
    useEffect(()=>{
        tg.onEvent('mainButtonClicked', onSendData)
        return() =>{
            tg.offEvent('mainBottonClicked', onSendData)
        }
    })
    useEffect(()=>{
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    useEffect(()=>{
        if (!country || !city){
            tg.MainButton.hide();
        }else{
            tg.MainButton.show();
        }
    }, [country, city])

    return(
        <>
        <h3>Введите ваши данные:</h3>
        <input
        className='input'
        type = 'text'
        placeholder='Страна'
        value = {country}
        onChange = {onChangeCountry}
        />
         <input
         className='input'
         type = 'text'
         placeholder='Город'
         value = {city}
         onChange = {onChangeCity}
         />
         <select value = {subject} onChange={onChangeSubject} className='select'>
            <option value={'legal'}>Физ.лицо</option>
            <option value={'legal'}>Юр.лицо</option>
         </select>
        </>
    )
}