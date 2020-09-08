import React,{useEffect,useState, Fragment} from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'
import { isAuth, getCookie, signout } from '../User/Helpers'
import axios from 'axios'


const AdminDashboard = ({history}) => {

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
            <h3 className='card-header'>Información del Administrador</h3>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        Hola! Administrador@ {name}
                    </li>
                    <li className='list-group-item'>
                        E-mail: {email}
                    </li>
                </ul>
        </div>
        <div className=' card mb-5' id="header-content">
            <h3 className='card-header'>Funciones de Administrador</h3>
                <ul className='list-group'>
                <li className='list-group-item'>
                        <Link to='/admin/crear-categoria' > Crear Categorías </Link>
                    </li>
                    <li className='list-group-item'>
                        <Link to='/admin/crear-taller' >Creador de Nuevos Talleres</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link to='/admin/administrar-talleres' >Administrar Talleres (Actualizar o Eliminar)</Link>
                    </li>
                    <li className='list-group-item'>
                        <Link to='/admin/orders' > Ordenes de clientes </Link>
                    </li>
                    <li className='list-group-item'>
                        <Link to='/admin/search/orders' > Busqueda de Ordenes </Link>
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

    useEffect(() => {
        loadProfile()
    },[])

    return(
        <Layout>
            <h1 className='text-center mt-4'>Administrador {name}</h1>
            <div className='col-md-6 offset-md-3 mt-3'>
                {LoadProfileInfo()}
            </div>
        </Layout>
    )
}

export default AdminDashboard