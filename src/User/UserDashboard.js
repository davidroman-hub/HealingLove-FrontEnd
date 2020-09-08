import React,{useEffect,useState, Fragment} from 'react'
import Layout from '../components/Layout/Layout'
import {Link} from 'react-router-dom'
import {isAuth, getCookie, signout } from './Helpers'
import axios from 'axios';
import { getPurchaseHistory2, getPurchaseHistory } from './apiCore'
import { listOrders } from '../Admin/ApiAdmin'
import moment from 'moment'
import 'moment/locale/es'




const UserDashboard = ({history}) => {


    const token = getCookie('token')
    const Id = getCookie('token')

    const [values, setValues] = useState({
        role:'',
        name: '',
        email: '',
        phone:'',
        password: '',
        buttonText: 'Update'
    })

    const { role, name, phone ,email} = values;

    const loadProfile = () => {
        axios({
            method: 'GET',
            url:`${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                Authorization:`Bearer ${token}`
            }
        })
        .then(response=>{
            console.log('profile ', response) //<-- populate state
            const {role, name , phone, email} = response.data
            setValues({...values, role, name, phone ,email})
        })
        .catch(error => {
            console.log('Profile error', error.response.data.error)
            if(error.response.status == 401){
                signout(() => {
                    history.push('/'); //<-- for signout automatically
                })
            } 
        })
    }

    const LoadProfileInfo = () => (
        <Fragment>
            <div className=' card mb-5' id="header-content">
            <h3 className='card-header'>Información del Usuario</h3>
            <ul className='list-group'>
                <li className='list-group-item'>
                    Hola! {name}
                </li>
                <li className='list-group-item'>
                    E-mail: {email}
                </li>
                <li className='list-group-item'>
                Rol:{role}
                </li>
            </ul>
        </div>
            
        <div className='card mb-5'>
            {/* <h4 className='text-center'>Antes de Ordenar es importante actualizar tu información!!</h4> */}
        
            {/* <h5 className='text-center'>Necesitamos tu dirección de envío y tu telefono para poder contactarte!</h5> */}
            <li className='list-group-item'>
                <Link to='/user/private' >Actualizar mi información</Link>
            </li>
        </div>
    </Fragment>
    )
            /////////////////////// PURCHASE HISTORY ORDERS

            const [orders, setOrders] = useState([])

            const loadOrders = () => {
                listOrders(Id, token).then( data => {
                    if( data.error){
                        console.log(data.error)
                    } else {
                        setOrders(data)
                    }
                })
            }


    const [historyP, setHistoryP] = useState([])

    

    const loadinit  = (Id,token) => {
        getPurchaseHistory(Id,token).then(data => {
            if (data.error){
                console.log(data.error)
            } else {
                setHistoryP(data)
            }
        })
    }



    const purchaseInfo = (historyP) => {
        return(
            <Fragment>
            <h1>Mis Talleres</h1>
            <div className='card mb-5'  >
            <ul className='list-group'>
                <li className='list-group-item'>
                 {/* {JSON.stringify(history)} */}
                    {historyP.map((h, i) => {
                            return (
                                <div>             
                                    <hr />
                                    <div style={{borderBottom:"5px solid #e6c4ba"}} />
                                    <br/>
                                    <h2 className='mt-2' >Total de la orden $: {h.amount}</h2>
                                    <h3 style={{color:'red'}}> NÚMERO DE PEDIDO : {h._id}</h3>
                                    <h4 style={{color: 'orange'}}>Estatus de la orden : {h.status}</h4>
                                    <br/>
                                    <h4>Cuenta de <i class="fab fa-instagram"/>  vinculada al Taller: {h.details}</h4>
                                    <br/>
                                    <h6> Ordenado por:<h6 style={{textTransform:'uppercase'}}> {name} </h6></h6>
                                    <h6>Teléfono de contacto: {h.client_phone}</h6>
                                    <h6>
                                        Comprado el dia:{" "}
                                        {moment(h.createdAt).locale('es').format('LL')}
                                        {/* {h.createdAt}                                                     */}
                                    </h6>
                                    <br/>
                                    <h2>Datos de Facturación : </h2>
                                    <br/>
                                    <h6>Estado: {h.state}</h6>
                                    <h6>Dirección: {h.address}</h6>
                                    <h6>Código Postal: {h.zip}</h6>
                                    <br/>
                                    <h3 style={{color:'red'}}> DATOS DE PAGO : </h3><br/>
                                    <p>Aqui van los datos de pago por parte del cliente</p>
    
                                    <br/>
                                    <h2>Productos en la orden:{h.products.length}</h2>
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <br/>
                                                <h6>Nombre del Producto: {p.name}</h6>
                                                <h6>Cantidad del Producto: {p.count}</h6>
                                                <h6>Precio: ${p.price}</h6>
                                                <br/>                             
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}     
              </li>
           </ul>
      </div>
        </Fragment>
        )
    }

    useEffect(() => {
        loadinit(Id, token)
        loadProfile()
        loadOrders()
    },[])


    const notTallerMessage = () => (
        <h2>Aún No te has subscrito a ningún Taller!<br/>
            <Link to='/'>Checa los Talleres</Link>
        </h2>
    )

    return(
        <Layout>
            <h1 className='text-center  mt-4'>Perfíl de {name}</h1>
            <div className='col-md-6 offset-md-3 mt-3'>
            {LoadProfileInfo()}
            {historyP.length > 0 ? purchaseInfo(historyP) : notTallerMessage()}
            {/* {purchaseInfo(historyP)} */}

            </div>
            
        </Layout>
    )
}
export default UserDashboard