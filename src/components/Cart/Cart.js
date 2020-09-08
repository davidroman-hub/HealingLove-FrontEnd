import React,{ useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../Layout/Layout'
import {getCart} from './CartHelpers'
import CardCarrito from './CardCarrito'
import Checkout from './CheckOut'
import OxxoCheckout from './OxxoCheck'

const Cart = () => {

    const [item, setItem] = useState([]);
    const [run, setRun] = useState(false); 

    useEffect(() => {
        setItem(getCart())
    },[run])

    const showItem = item => {
        return(
            <div className='mt-4 mb-5'>
                <h1>Tienes  {`${item.length}` } Taller ó Talleres en tu orden.</h1>
                
                <div className='col-md-6 offset-md-3 mt-3 mb-3'>
                    <div className='row'> 
                
                    {item.map((product,i)=>(
                    <CardCarrito
                    key={i} 
                    product={product} 
                    cartUpdate={true} 
                    showRemoveProductButton={true}
                    setRun={setRun}
                    run={run}
                    />
                ))}
                        </div>
                </div>
                
            </div>
        )
    }

    const notItemMessage = () => (
        <h1 className='text-center'>Tu carrito esta vacío. <br/> <Link to='/'>Checa los Talleres!</Link></h1>
    )

    return(
        <Layout>
            <div>
                <div className='text-center'>
                    {item.length > 0 ? showItem(item) : notItemMessage()}
                </div>
                <Checkout product={item} setRun={setRun} run={run}/>
            </div>
        </Layout>
    )
} 

export default Cart