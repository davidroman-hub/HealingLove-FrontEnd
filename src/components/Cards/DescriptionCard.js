import React,{Fragment,useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import ShowImage from './imageCardIndex'
import {addItem} from '../Cart/CartHelpers'
import './DescriptionCardInfo.scss'
import './Cards.scss'
import renderHTML from 'react-render-html';


const DescriptionCard = ({product,
                        cartUpdate = false,
                        showRemoveProductButton = false,
                        setRun = f => f,// default value of funtion 3.- as props
                        run = undefined
                    }) => {

    const [ redirect, setRedirect] = useState(false)

    const addToCart = () => {
        addItem(product, setRedirect(true));
        alert(`Se ha agregado a la orden: ${product.name}`)
    }

    const shouldRedirect = redirect => {
        if (redirect){
            return <Redirect to='/carrito'/>
        }
    }


    
    return(
        <div className='DescriptionCardInfo'>
            <div className='desc-img'>
            {shouldRedirect(redirect)}
                <ShowImage item={product} url='product'/>
            </div>
            <div className='desc-letters'>
                <div className='desc-content'>
                    <p>{renderHTML(product.description)}</p>
                    <div className='text-center'>
                        <button onClick={addToCart} className="TallerButton">
                            Agregar Taller
                        </button>
                    </div>
                </div>  
            </div>
        
        </div>
    )
}

export default DescriptionCard