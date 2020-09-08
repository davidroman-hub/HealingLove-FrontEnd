import React,{useState, useEffect, Fragment} from 'react';
import Layout from '../components/Layout/Layout';
import {isAuth, getCookie} from '../User/Helpers';
import { listOrders, getStatusValues,updateOrderStatus} from './ApiAdmin';
import moment from 'moment'
import {Link} from 'react-router-dom'
import 'moment/locale/es'
import Card from '../components/Cards/CardIndex'
import './Orders.scss'

const Orders = () => {

    const [orders, setOrders] = useState([])
      //for take the status
    const [statusValues, setStatusValues] = useState([])

    const token = getCookie('token')  //// <-- right one
    const Id = getCookie('token')  //// <-- right one


    const loadOders = () => {
        listOrders(Id, token).then(data => {
            if (data.error){
                console.log(data.error)
            } else{
                setOrders(data)
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

    //to manage the status
    const handleStatusChange = (e, orderId) => {
        // console.log('update order status')
        updateOrderStatus(Id, token ,orderId, e.target.value).then(
            data => {
                if (data.error){
                    console.log('status update failed')
                } else {
                    loadOders()
                }
            }
        )
    }



      // for show the status
const showStatus = (o) => {
        return (
            <div className='form-group'>
            <h5 className='mark mb-4'>Estatus: {o.status}</h5>
            <select className='form-control' 
                    onChange={(e) => handleStatusChange(e, o._id)}>
                <option>Actualizar estado de orden</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>{status}</option>
                ) )}

            </select>
        </div>
        )
    }


    useEffect(()=>{
        loadOders();
        loadStatusValues()
    },[])

const showOrdersLength = () => {
    if(orders.length > 0 ){
        return (
        <h1 className="p-5 text-center text-danger "> Total de ordenes : {orders.length}</h1>
        )
    } else {
        return <h1 className="text-danger">No Hay ordenes</h1>
    }
}


const manageOrder = () => (
    <Fragment>
        <div>
                    {orders.map((o,i) => (
                        <div className='container'>
                        <ul key={i} className='list-group-item'>
                            <li className="mb-1 mt-2 text-center"  style={{color:'#888888', backgroundColor:'#efc8a7', fontWeight:'bolder'}}>Número de Orden: {o._id}</li>
                            <li className="mb-1 mt-2 text-center ">Email Cliente: {o.client_email}</li>
                            <li className="mb-1 mt-2 text-center " style={{fontWeight:'bold'}}>Comprado el dia:{" "}
                                            {moment(o.createdAt).locale('es').format('LL')}</li>
                            <li className='mb-1 mt-2 text-center'>    <Link to={`order/${o._id}`}>
                                    <span className='TallerButton' >Info</span>
                                </Link>
                            </li>    
                        </ul>
                        </div>
                    ))}
            </div>
    </Fragment>
)



const showOrderList = () => {
    return (
        <div className='order-list'>
            {orders.map((o,i) => {
                return (
                    <div  key={i} className="card mr-2 mt-2 mb-5">
                                <h5 className="mb-1 mt-2 text-center bg-primary"  style={{color:'red'}}>Numero de Orden: {o._id}</h5>
                                <ul className="list-group">
                                    <li className='list-group-item'>
                                    {/* {o.status} */}
                                        {showStatus(o)}
                                    </li>
                                    <li className='list-group-item'>ID cliente: {o.client_id} </li>   
                                    <li className="list-group-item">Télefono: {o.client_phone}</li>
                                    <li className="list-group-item"  style={{fontWeight:'bold'}}> Cuenta de <i class="fab fa-instagram"/>  vinculada al Taller: {o.details}</li>
                                    <li className="list-group-item">E-mail: {o.client_email}</li>
                                    <li className='list-group-item'>Total de la orden: ${o.amount}</li>
                                    <li className='list-group-item' style={{fontWeight:'bold'}}>Comprado el dia:{" "}
                                            {moment(o.createdAt).locale('es').format('LL')}
                                        </li>
                                    <li className='list-group-item'>Dirección : {o.address}</li>
                                    <li className='list-group-item'>Estado : {o.state}</li>
                                    <li className='list-group-item'>Código Postal: {o.zip}</li>
                                    <h4 className='mt-4 mb-4 font-italic text-center'>
                                        Total de productos en la orden:{o.products.length}
                                    </h4>
                                    {o.products((p, pIndex) => (
                                        <div className='' key={pIndex} style={{padding:'20px', border:'1px solid #e6c4ba'}}
                                        
                                        >
                                            {showInput('Nombre del producto:', p.name)} 
                                            {/* {showInput('Precio del producto $:', p.price)}  
                                            {showInput('Cantidad pedida del producto:', p.count)}  
                                            {showInput('ID del producto:', p._id)}    */}
                                </div>
                            ))}
                                </ul>
                    </div>
                )
            })}
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

    return (
    <Layout>
        <div className="">
            <div className="">
                {showOrdersLength()}
                {/* {showOrdersDisplay()} */}
                {/* {showOrderList()} */}
                {manageOrder()}
                {/* {JSON.stringify(orders)} */}
            </div>
        </div>
    </Layout>
    )

}
export default Orders