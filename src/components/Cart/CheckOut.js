import React, {useState, Fragment} from 'react';
import {Link,Redirect} from 'react-router-dom';
import {isAuth, getCookie} from '../../User/Helpers';
import {createOrder} from '../../User/apiCore';
import {emptyCart} from './CartHelpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


const Checkout = ({product, setRun = f => f, run = undefined, match }) => {

    const [ redirect, setRedirect] = useState(false);
    
    const [data, setData] = useState({
        //loading:false,
        success:false,
        clientToken:null,
        error:'',
        instance:{},
        address:'',
        amount:'',
        name:'',
        number:'',
        address2:'',
        error:''
    })

    const shouldRedirect = redirect => {
        if (redirect){
            return <Redirect to='/user/dashboard'/>
        }
    }
        // if the user is Auth
    
        const token = getCookie('token')  //// <-- right one
        const Id = getCookie('token')  //// <-- right one

        // Method for get the total amount
    const getTotal = () => {
        return product.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        },0)
    }

    const orderForm = () => {
        return(
            <>
            <h2 className='text-center'>MÉTODOS DE PAGO</h2>
            <h3 className='text-center'>SELECCIONA</h3>
            <form  
                
                >
                <ul className='col-md-6 offset-md-3 mt-3'>
                    <li className='list-group-item d-flex justify-content-between align-items-center'>
                        <Link to='/pago/oxxo' className='TallerButton'>PAGO CON OXXO</Link>
                        <img src='https://res.cloudinary.com/dm8dxwvix/image/upload/v1598528679/Healing%20love/1920px-Oxxo_Logo.svg_xmfkwz.png' style={{ width:'100px', }} alt='/'/>  
                    </li>
                    <li className='list-group-item d-flex justify-content-between align-items-center'>
                        <Link to='/pago/transferencia' className='TallerButton'>PAGO CON TRANSFERENCIA</Link>
                        <img src='https://res.cloudinary.com/dm8dxwvix/image/upload/v1598529606/Healing%20love/pngwing.com_hizqcn.png' style={{ width:'50px', }} alt='/'/>
                    </li>
                    </ul>
            </form>
            </>    
        )
    }

    const showDropIn = () => {
        return (
            <div onBlur={ ()=> setData({...data, error:''})}>
                {token !== null && product.length > 0 ? (
                <div>
                    {orderForm()}
                    {/* {name()}
                    {address()} */}     
                </div> 
            ) : null}</div>
        )
    }

    const showCheckout = () => {
        return  isAuth() ? ( <div >{showDropIn()}</div>
        ) : (
        <Link to='/inicia-sesion'>
            <button className='btn btn-primary'>
                Inicia Sesión para Ordenar.
            </button>
        </Link>
            )}


    return(
    <Fragment>
        {/* <h2 className='text-center'>MÉTODOS DE PAGO</h2>
        <h3 className='text-center'>SELECCIONA</h3> */}
            <div className='col-md-6 offset-md-3 mt-3'>
                {showCheckout()}
            </div>
            <div className='col-md-6 offset-md-3 mt-3'>
                <h2 className='text-center mb-5 mt-5' style={{border:'1px solid #b3b3b3', borderRadius:'1em', padding:'1em 1em'}}> Total: ${getTotal()}</h2>
            </div>
    </Fragment>    
    )
}

export default Checkout