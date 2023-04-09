import React, {useState} from 'react';
import './ProductList.css';
import {ProductItem} from "./ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";
import { ListItem } from '@mui/material';


const products = [
    {id: '1', title: 'Венсдей', price: 8271, description: 'Чёрная, 2 косички, рука в комплекте', img: 'https://pub-8b49af329fae499aa563997f5d4068a4.r2.dev/generations/017aabb5-b965-497f-aa16-f3a63385b1fd-0.png'},
    {id: '2', title: 'Сталин', price: 99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999, description: 'Вождь, съел змею', img: 'https://pub-8b49af329fae499aa563997f5d4068a4.r2.dev/generations/03910ebf-f70f-4a8c-9b00-5b2baedc39e8-0.png'},
    {id: '3', title: 'Многоэтажка', price: 12546937, description: '12 этажей, серая, вентилятора нет', img: 'https://pub-8b49af329fae499aa563997f5d4068a4.r2.dev/generations/3e71eb06-f229-4ef6-8a62-be249dfa38bd-0.png'},
    {id: '4', title: 'Котлетка из столовки', price: 215, description: '50 грамм, из ноги трудовика', img: 'https://pub-8b49af329fae499aa563997f5d4068a4.r2.dev/generations/2321cc76-57cf-462f-a0a8-746fdbfa28a8-0.png'}, 
    {id: '5', title: 'Сайти на js', price: 17, description: 'Приедет Эмиль, на дом', img: 'https://pub-8b49af329fae499aa563997f5d4068a4.r2.dev/generations/a32c9f4b-948e-4451-855f-732cb82608e7-0.png'},
    {id: '6', title: 'Gaymaster', price: 13249, description: 'Играет в майн', img: 'https://pub-8b49af329fae499aa563997f5d4068a4.r2.dev/generations/c9b57eae-61b6-4c2c-82c4-55e5ad5e2126-0.png'},
    {id: '7', title: 'Intervu', price: 34230, description: 'ноу, айм интервью', img: 'https://pub-8b49af329fae499aa563997f5d4068a4.r2.dev/generations/79a5f582-51d0-4144-a146-6b4985132722-0.png'},
    {id: '8', title: 'Акк в бс', price: 13590, description: 'Есть шелли, 17 гемов, 3к кубкв', img: 'https://pub-8b49af329fae499aa563997f5d4068a4.r2.dev/generations/125d30c8-029b-460a-a803-8935381fcd80-0.png'},
    {id: '9', title: 'Детские волосы', price: 4025908, description: '8 лет', img: 'https://pub-8b49af329fae499aa563997f5d4068a4.r2.dev/generations/227d18f5-0d17-4f9a-81ab-bd69239b8334-0.png'},
    {id: '10', title: 'Лысые ###### в адиках', price: 9, description: 'Гладкие, любят редан<з', img: 'https://pub-8b49af329fae499aa563997f5d4068a4.r2.dev/generations/9a6eb2d6-7636-478d-a371-bd5cb7534df4-0.png'},
    {id: '11', title: 'Экзорцизм', price: 666, description: 'Люцифер в подарок', img: 'https://pub-8b49af329fae499aa563997f5d4068a4.r2.dev/generations/7efc8710-d449-439a-a995-abcf8ada8990-0.png'},
    {id: '12', title: 'Iphone 3 Белый', price: 120000, description: 'pro max, 14 камер', img: 'https://pub-8b49af329fae499aa563997f5d4068a4.r2.dev/generations/b39585b9-1960-4131-bd0f-86b5f020c149-0.png'},
    {id: '13', title: 'Эмиль', price: 71, description: 'Приедет сайти на js, на дом', img: 'https://pub-8b49af329fae499aa563997f5d4068a4.r2.dev/generations/4b8b04b2-728c-473a-a015-be185a12447d-0.png'},
    {id: '14', title: 'рИНГТОГН на ксяоми', price: 6492, description: 'Прикольная мелодя тудудуду тудуду', img: 'https://pub-8b49af329fae499aa563997f5d4068a4.r2.dev/generations/fa36205e-117d-4e70-86eb-95e348b25800-0.png'},
]
const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}
export  const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();
    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId
        }
        fetch('http://85.119.146.179:800/web-data',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
})
    })
 
    
useEffect(() =>{
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
        tg.offEvent('mainButtonClicked', onSendData)
    }
}, [onSendData])
    

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];
        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.lenght === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }
   

 
    return (
        <div className={'list'}>
           {products.map(item => (
            <ProductItem
                product={item}
                onAdd={onAdd}
                className={'item'}
            />
           ))}
        </div>
    );
};

 