import React,{useState, useEffect} from 'react';
import Layout from '../components/Layout/Layout';
import {getCookie} from '../User/Helpers';
import { getStatusValues,updateOrderStatus,listOrders2} from './ApiAdmin';
import moment from 'moment'
import 'moment/locale/es'



const Search = () => { 

// State of search bar

const [ data, setData] = useState({
    search:'',
    results:[], 
    searched: false
})

// Destructure 

const {
    search,
    results, 
    searched
} = data

const token = getCookie('token')  //// <-- right one
    const Id = getCookie('token')  //// <-- right one

    const [statusValues, setStatusValues] = useState([])


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
                searchData()
            }
        }
    )
}

const showStatus = (o) => {
    return (
        <div className='form-group'>
        <h3 className='mark mb-4'>Estatus: {o.status}</h3>
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
    loadStatusValues()
    searchData()
},[])



const handleChange = (name) => event=> {
    //set data for set the state 
                                                //searched
    setData({...data,[name]:event.target.value, searched:false})
}

// second step is create searchsubmit
const searchSubmit = (e) => {
    //
    e.preventDefault()
    searchData()

}


const searchData = () => {

    if(search){ // the fisrt thing we want to send, if not unde, after its the category                            
        listOrders2({search:search || undefined})
        .then( response =>{
            if(response.error){
                console.log(response.error)
            } else {
                setData({...data,results:response, searched:true})
            }
        })
    }

}

// last step  // after when we found the data and made the new method to the back end we need to put 
// in cards so, the method for render the data its this:

const searchedProducts = ( results = []) => {
    return (
        <div>
            <h2 className="ml-4 mb-4 mt-5">
                {searchMessage(searched, results)}
            </h2>
        <div className='row'>
        <div className='col-md-8 offset-md-2'>
            {results.map((o,i)=> 
            (
                <div  className='mt-5' key={i} style={{borderBottom:"5px solid indigo"}}>
                    <h6 className='bg-primary'>ID de la orden:{o._id}</h6>
                    <ul className='list-group mb-2'>
                        <li className='list-group-item'>
                            {/* {o.status} */}
                            {showStatus(o)}
                            </li>
                        <li className='list-group-item'><h4>Cuenta de <i class="fab fa-instagram"/>  vinculada al Taller: {o.details}</h4></li>
                        <li className='list-group-item'>Comprado el dia:{" "}
                                        {moment(o.createdAt).locale('es').format('LL')}
                                    </li>
                        <li className='list-group-item'>Dirección: {o.address}</li>
                        <li className='list-group-item'>Estado : {o.state}</li>
                        <li className='list-group-item'>Código Postal: {o.zip}</li>
                        <li className='list-group-item'>Telefono en orden: {o.client_phone} </li>
                        <li className='list-group-item'>E-mail del cliente: {o.client_email} </li>
                        <li className='list-group-item'>Nombre del cliente: {o.client_name} </li>                           
                        <li className='list-group-item'>ID cliente:{o.client_id} </li>
                        <h3 className='mt-4 mb-4 font-italic text-center'>
                            Total de Talleres en la orden : {o.products.length}
                        </h3>

                        <h2 className='mt-2 mb-5 text-center' >Total de la orden $ : {o.amount}</h2>

                        {o.products.map((p, pIndex) => (
                            <div className='mb-4' key={pIndex} style={{padding:'20px', border:'1px solid indigo'}}
                            
                            >
                                {showInput('Nombre del producto:', p.name)} 
                                {showInput('Precio del producto $:', p.price)}  
                                {showInput('Cantidad pedida del producto:', p.count)}  
                                {showInput('ID del producto:', p._id)}   

                            </div>
                        ))}


                    </ul>
                </div>
            )
            )}
        </div>
        </div>
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

// and the last thing is  show the message to the users if they found or not something

const searchMessage = (searched, results) => {
    if(searched && results.length > 0){
        return (`Encontramos ${results.length} Talleres con ese E-mail!`)
    }
    if( searched && results.length < 1){
        return (`No encontramos lo que buscas :(`)
    }
}




const searchForm = () => { 

    return(
        <form onSubmit={searchSubmit}>
        <span className='input-group-text'>
            <div className='input-group input-group-lg'>
                <div className='input-group-prepend'>
                    
                </div> 
                <input type='email' 
                className='form-control' 
                onChange={handleChange('search')}
                placeholder="Busqueda por E-mail "
            />
                </div>
                <div className='btn input-group-appened' style={{border:'none'}}>
                    <button className='input-group-text' >Busqueda</button>
                </div>
            </span>
        </form>
    )
    
}





return (
    <Layout>
    <div className='row'>
         {/* <h2> Search bar {JSON.stringify(categories)}</h2> */}
        <div className="col-md-8 offset-md-2 mt-5">
            <h2 className='text-center'>Aquí podras bucar ordenes especificas con E-mail</h2>
            <br/>
            <p style={{textAlign:'justify'}} className='text-center'>Y podrás Cambiar el Status de las ordenes de los clientes sin necesidad de buscar en el dashboard de ordenes</p>
            {searchForm()}
            <div className='container-fluid mb-5'>
                {searchedProducts(results)}
                {/* {JSON.stringify(results)} */}
            </div>
        
            </div>
    </div>
        </Layout>
    )



}

export default Search