import React, {useState, Fragment, useEffect} from 'react';
import {Link,Redirect} from 'react-router-dom';
import {isAuth, getCookie} from '../../User/Helpers';
import {createOrder} from '../../User/apiCore';
import {emptyCart} from './CartHelpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


const OxxoCheckout = ({product, setRun = f => f, run = undefined, match}) => {


    
    const [ redirect, setRedirect] = useState(false)
    
    const shouldRedirect = redirect => {
        if (redirect){
            return <Redirect to='/user/dashboard'/>
        }
    }

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

    const [data2, setData2] = useState({
        //loading:false,
        success:false,
        clientToken:null,
        error:'',
        instance:{},
        address:'',
        amount:'',
        instagramUser:'',
        instagramUser2:'',
        number:'',
        aboutMe:'',
        state:'',
        zip:'',
        address2:'',
        error:''
    })



    const {
        success,
        clientToken,
        error,
        instance,
        address,
        amount,
        instagramUser,
        instagramUser2,
        number,
        aboutMe,
        state,
        zip,
        address2,
    
    } = data2;

    const handleChange = name => event => {
        setData2({...data2,[name]: event.target.value });
    }

    const clickSubmit = event => {
        event.preventDefault()
        setData2({...data2})
        console.log(data2)
    }

     // if the user is Auth

    
     const token = getCookie('token')  //// <-- right one
    // const Id = getCookie('token')  //// <-- right one
    
    const userId = isAuth() && isAuth()._id
    //const token = isAuth() && isAuth().token





/// address 2

let deliveryAddress2 = data.address2
const handleAddress2 =  event => {
    setData({...data, address2:event.target.value})  
}




    ///// handle the addresss /////

    let deliveryAddress = data.address
    const handleAddress =  event => {
        setData({...data, address:event.target.value})  
    }

    /// handle name ///

    let names = data.name
    const handleName =  event => {
        setData({...data, name:event.target.value})  
    }

//// handle the number ////

let numbers = data.number
    const handleNumber =  event => {
        setData({...data, number:event.target.value})  
    }

    
    
    const orderForm = () => {
            return(
                <form  onSubmit={buy} >
                    
                    <ul className='col-md-6 offset-md-3 mt-3'>
                    <h2  >Datos del Usuario</h2>
                    <div className="mb-2">
                    
                        <li className="nav-item">
                            <div className="form-group">    
                            <label className='text-muted'>(Importante) Número Celular: </label>
                                <input type="number"
                                onChange={handleChange('number')}
                                className='form-control'
                                value={number}
                                placeholder='Whats App o Número Telefónico'
                                required/>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="form-group">    
                            <label className='text-muted'>Usuario de IG </label>
                                <input type="text"
                                id="pass1"
                                onChange={handleChange('instagramUser')}
                                className='form-control'
                                value={instagramUser}
                                placeholder='Tu usuario de IG sin Errores'
                                required/>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="form-group">    
                            <label className='text-muted'>Repite tu Usuario de IG </label>
                                <input type="text"
                                id="pass2"
                                onChange={handleChange('instagramUser2')}
                                className='form-control'
                                value={instagramUser2}
                                placeholder='Tu usuario de IG sin Errores'
                                required/>
                            </div>
                        </li>

                        <li className="nav-item">
                        <div className="form-group">
                        {/* <textarea
                            onChange={handleAddress}
                            className='form-control'
                            value={data.address}
                            placeholder='Escribe tu direccion de envio aqui C.P, calle, Ref, etc..' required/> */}
                            Como te enteraste de mi?
                            <br/>
                            <select onChange={handleChange('aboutMe')}
                            className='form-control' required>
                                <option value=''>Por Favor Selecciona</option>
                                <option value='FaceBook'>FaceBook</option>
                                <option value='Instagram'>Instagram</option>
                                <option value='Google'>Google</option>
                                <option value='Conocido'>Un Conocido </option>
                            </select>
                        </div>
                        </li>
                        <h2 className='mt-4'>Dirección de Facturación</h2>
                        <br/>
                        <li className="nav-item">
                            <div className="form-group">
                                    {/* <textarea
                                        onChange={handleAddress}
                                        className='form-control'
                                        value={data.address}
                                        placeholder='Escribe tu direccion de envio aqui C.P, calle, Ref, etc..' required/> */}
                                        Estado:
                                        <select onChange={handleChange('state')}
                                        className='form-control' required>
                                            <option value="no">Seleccione uno...</option>
                                            <option value="Aguascalientes">Aguascalientes</option>
                                            <option value="Baja California">Baja California</option>
                                            <option value="Baja California Sur">Baja California Sur</option>
                                            <option value="Campeche">Campeche</option>
                                            <option value="Chiapas">Chiapas</option>
                                            <option value="Chihuahua">Chihuahua</option>
                                            <option value="CDMX">Ciudad de México</option>
                                            <option value="Coahuila">Coahuila</option>
                                            <option value="Colima">Colima</option>
                                            <option value="Durango">Durango</option>
                                            <option value="Estado de México">Estado de México</option>
                                            <option value="Guanajuato">Guanajuato</option>
                                            <option value="Guerrero">Guerrero</option>
                                            <option value="Hidalgo">Hidalgo</option>
                                            <option value="Jalisco">Jalisco</option>
                                            <option value="Michoacán">Michoacán</option>
                                            <option value="Morelos">Morelos</option>
                                            <option value="Nayarit">Nayarit</option>
                                            <option value="Nuevo León">Nuevo León</option>
                                            <option value="Oaxaca">Oaxaca</option>
                                            <option value="Puebla">Puebla</option>
                                            <option value="Querétaro">Querétaro</option>
                                            <option value="Quintana Roo">Quintana Roo</option>
                                            <option value="San Luis Potosí">San Luis Potosí</option>
                                            <option value="Sinaloa">Sinaloa</option>
                                            <option value="Sonora">Sonora</option>
                                            <option value="Tabasco">Tabasco</option>
                                            <option value="Tamaulipas">Tamaulipas</option>
                                            <option value="Tlaxcala">Tlaxcala</option>
                                            <option value="Veracruz">Veracruz</option>
                                            <option value="Yucatán">Yucatán</option>
                                            <option value="Zacatecas">Zacatecas</option>
                                        </select>
                                    </div>
                                </li>
                                <li>
                                    <div className="form-group">
                                        <input
                                            type='text'
                                            onChange={handleChange('address')}
                                            className='form-control'
                                            value={address}
                                            placeholder='Tu calle, Número' required/>
                                        </div>
                                </li>
                                <li>
                                    <div className="form-group">
                                        <input
                                            type='number'
                                            onChange={handleChange('zip')}
                                            className='form-control'
                                            value={zip}
                                            placeholder='Código Postal' required/>
                                        </div>
                                </li>
                                <li className='text-center'>
                                    <strong ><h7 className='text-center'>Da click en 'SUSCRIBIRTE' para que te genere los datos bancarios y/o depósito. Por favor usa tu número de pedido como la referencia de pago en Transferencias.
                                            Si haces tu pago en Efectivo puedes hacerlo en tiendas, ventanilla bancaria etc.</h7></strong>
                                </li>
                                <br/>
                                <li className="nav-item">
                                    <button className="btn btn-success btn-block mr-b2" >SUSCRIBIRTE</button>
                                </li>   
                            </div>
                        </ul>
                    </form>    
                )
            }


 // Method for get the total amount
    const getTotal = () => {
        return product.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        },0)
    }



const buy = (event) => {
        event.preventDefault()
    console.log(product)    
    console.log(data2)
    
    const createOrderData ={ 
        products:product,
        client_phone:number,
        details:instagramUser,
        client_email:isAuth().email,
        client_name:isAuth().name,
        state:state,
        address:address,
        zip:zip,
        client_id:isAuth()._id,
        amount:getTotal(product),
        user:isAuth()._id
        
    }

createOrder(userId,token,createOrderData)
.then(response =>{ 
    if (response.error){
        setData({...data, error: response.error})
        
    }else{
    emptyCart(() => {
        setRun(!run);
        setRedirect(true);
        toast.success(`La orden ha sido creada!`);
        console.log('order created and empty Cart');
        setData({
            loading:false,
            success:true
        })
    })
}})
.catch(error => {
    console.log(error)
    setData({...data, error: error.message})
})
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


const showError = error => {
            return (
            <div className="alert alert-danger" style={{display:error ? '' : 'none'}}>{error}</div>
            )
        }
const showSuccess = success => {
            return (
                <div className="alert alert-info" style={{display:success ? '':'none'}}>
                    Gracias por tu solicitud! en breve recibiras un E-mail. Ve a tu perfil para ver la orden y Datos Bancarios de Pagos
                </div>
            )
        }
const showLoading = (loading) => (
            loading && (
                <h3>Cargando...</h3>
            )
        )
    

        


    return (
        // <div>{JSON.stringify(product)}</div>
        <div>
        <div className='col-md-6 offset-md-3 mt-3'>
                <h2 className='text-center mb-5 mt-5' style={{border:'1px solid #b3b3b3', borderRadius:'1em', padding:'1em 1em'}}> Total: ${getTotal()}</h2>
        </div>
        <ToastContainer/>
        {/* {shouldRedirect(redirect)} */}
        
        <div className='col-md-6 offset-md-3 mt-3'>
            {showCheckout()}
            {showError(data.error)}
            {showSuccess(data.success)} 
        </div>
        </div>
    )

}

export default OxxoCheckout