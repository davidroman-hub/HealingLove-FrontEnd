import React,{useState,useEffect, Fragment} from 'react';
import Layout from '../components/Layout/Layout';
import { read, getStatusValues,updateOrderStatus } from './ApiAdmin';
import {getCookie} from '../User/Helpers';
import moment from 'moment'

const SingleOrder = (props) => {

    const token = getCookie('token')  //// <-- right one
    const Id = getCookie('token')  



    const [order, setOrder] = useState({});
    const [error, setError] = useState(false);
    const [statusValues, setStatusValues] = useState([])

    const loadSingleOrder = orderId => {
        read(orderId,token).then( data => {
            if (data.error){
                setError(data.error)
            } else {
                setOrder(data)
            }
        })
    }

    const loadStatusValues = () => {
        getStatusValues(Id, token).then(data => {
            if (data.error){
                console.log(data.error)
            } else{
                setStatusValues(data)
            }
        })
    }

    const handleStatusChange = (e, orderId) => {
        // console.log('update order status')
        updateOrderStatus(Id, token ,orderId, e.target.value).then(
            data => {
                if (data.error){
                    console.log('status update failed')
                } else {
                    // setRun(!run)
                    loadSingleOrder(orderId)
                    console.log('changed')
                    alert('Has Cambiado el estatus')
                }
            }
        )
    }

    const showStatus = (order) => {
        return (
            <div className='form-group'>
            <h5 className='mark mb-4'>Estatus: {order.status}</h5>
            <select className='form-control' 
                    onChange={(e) => handleStatusChange(e, order._id)}>
                <option>Actualizar estado de orden</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>{status}</option>
                ) )}

            </select>
        </div>
        )
    }

    


    const showInput = (key, value) => {
        return (
            <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                    <div className="input-group-text">{key}</div>
                </div>
                <input type="text" value={value} className="form-control" readOnly/>
            </div>
        )
    }

    useEffect (() => {
        const orderId = props.match.params.orderId
        loadSingleOrder(orderId)
        loadStatusValues()
    },[props])




    const showOrderList = () => {
        return (
            <div className="card mr-2 mt-2 mb-5">
                <h5 className="mb-1 mt-2 text-center bg-primary"  style={{color:'red'}}>Numero de Orden: {order._id}</h5>
                <ul className="list-group">
                                    <li className='list-group-item'>
                                    {/* {o.status} */}
                                        {showStatus(order)}
                                    </li>
                                    <li className='list-group-item'>ID cliente: {order.client_id} </li>   
                                    <li className="list-group-item">Télefono: {order.client_phone}</li>
                                    <li className="list-group-item"  style={{fontWeight:'bold'}}> Cuenta de <i class="fab fa-instagram"/>  vinculada al Taller: {order.details}</li>
                                    <li className="list-group-item">E-mail: {order.client_email}</li>
                                    <li className='list-group-item'>Total de la orden: ${order.amount}</li>
                                    <li className='list-group-item' style={{fontWeight:'bold'}}>Comprado el dia:{" "}
                                            {moment(order.createdAt).locale('es').format('LL')}
                                        </li>
                                    <li className='list-group-item'>Dirección : {order.address}</li>
                                    <li className='list-group-item'>Estado : {order.state}</li>
                                    <li className='list-group-item'>Código Postal: {order.zip}</li>
                                    {/* {JSON.stringify(order.products)} */}
                                
                                        <h3 className='mt-4 mb-4 font-italic text-center'>
                                            Total de Talleres en la orden : {order.products?.length}
                                        </h3>
                                        <h2 className='mt-2 mb-5 text-center' >Total de la orden $ : {order.amount}</h2>
                                        {order.products?.map((p, pIndex) => (
                                            <div className='mb-4' key={pIndex} style={{padding:'20px', border:'1px solid indigo'}}
                                            
                                            >
                                                
                                                {showInput('Nombre del Taller:', p.name)} 
                                                {showInput('Precio del Taller $:', p.price)}  
                                                {/* {showInput('Cantidad pedida del producto:', p.count)}   */}
                                                {/* {showInput('ID del producto:', p._id)}    */}

                                            </div>
                                        ))}
                                    

                                </ul>
                                
                                
            
            </div>
        )
    }



    return(
        <Layout>
            <div className='container'>
                {showOrderList()}

            </div>
        </Layout>
    )

}


export default SingleOrder