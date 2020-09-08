import React,{Fragment} from 'react'
import {Link} from 'react-router-dom'
import ShowImage from './imageCardIndex'
import './Cards.scss'
import renderHTML from 'react-render-html';



const Card = ({ product }) => {



    const Card1 = () => (
        <Fragment>
        <div className='mb-5'>
            <section className='section1'>
            <h1> {product.name} </h1>
            <div className="content">
                <div className="img-card">
                    <ShowImage item={product} url='product'/>
                </div>    
                </div>
                <div className="excerpt-position">
                    <p >{renderHTML(product.excerpt)} </p>
                    <p className='mt-4'>PRECIO: ${product.price}</p>
                    <div className='text-center '>
                        <Link to={`/product/${product._id}`} className='TallerButton'> Leer Más</Link>
                    </div>
                </div>

            </section>
        </div>
    </Fragment>
    )

    return (
        <div>
                {Card1()}
        </div>
        
    )



}

export default Card