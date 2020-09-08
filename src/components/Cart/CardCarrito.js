import React,{useState, useEffect} from 'react'
import {Link,Redirect} from 'react-router-dom'
import {updateItem, removeItem} from './CartHelpers'
import ShowImage from '../Cards/imageCardIndex'
import './CardCarrito.scss'
import '../Cards/Cards.scss'

const CardCar =({
                product, 
                cartUpdate = false,
                showRemoveProductButton = false,
                setRun = f => f,// default value of funtion 3.- as props
                run = undefined
}) => {

       /// remove item method /// 

    const showRemoveButton = (showRemoveProductButton) => {
        return (
            showRemoveProductButton && (
                <button
                    onClick={() => { 
                        setRun(!run)
                        removeItem (product._id);
                    
                    }} 
                            className='TallerButton mb-2 ml-2 mr-2' style={{backgroundColor:'#efd6d2'}} >
                    Remover
                </button>
            )
        )
    }

    return(
        <div className="cardCarrito">
        <ShowImage item={product} url='product' />
            <div className="card-container">
            <h4 className="text-center" style={{fontFamily:'Advent Pro'}}>{product.name}</h4>
            <br/>
            <h4 className="text-center">${product.price}</h4>
            <Link to={`/product/${product._id}`}>
                <button className="TallerButton mb-2" >
                    Descripción 
                </button>
            </Link>
            {showRemoveButton(showRemoveProductButton)}
            
        </div>
    </div>
    )
}

export default CardCar