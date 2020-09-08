import React,{useState, useEffect} from 'react';
import Layout from '../components/Layout/Layout';
import {getCookie} from '../User/Helpers';
import {Link} from 'react-router-dom';
import {getProducts, deleteProduct} from './ApiAdmin';

const ManageTalleres = () => {
    
    const [talleres, manageTalleres] = useState([])


    const token = getCookie('token')
    const Id = getCookie('token')

    const loadTalleres = () => {
        getProducts().then(data => {
            if(data.error){
                console.log(data.error)
            } else{
                manageTalleres(data)
            }
        })
    }

    const destroyTaller = productId => {
        deleteProduct(productId,Id, token).then(data => {
            if (data.error){
                console.log(data.error)
            } else {
                loadTalleres()
            }
        }) 
    }

    const deleteConfirm = productId => {
        let answer = window.confirm ('Estas seguro que quieres eliminar el taller??')
        if(answer){
            destroyTaller(productId)
        }
    }

    useEffect(() => {
        loadTalleres()
    },[])


    return (
        <Layout>
            {/* {JSON.stringify(talleres)} */}
            <div>
                <h1 className='text-center mt-5'>Manejo de Talleres</h1>
                <h2 className='text-center mb-5 mt-3'>Total de Talleres: {talleres.length}</h2>
                    {talleres.map((t,i) => (
                        <div className='container'>
                        <li key={i} className='list-group-item d-flex align-items-center mb-3'>
                            <strong className='name-taller'>{t.name}</strong>
                                <Link to={`taller/update/${t._id}`}>
                                    <span className='TallerButton mr-2' >Actualizar</span>
                                </Link>
                                    <span onClick={() => deleteConfirm(t._id)} className='TallerButton' style={{cursor:'pointer'}}> Eliminar Taller</span>
                        </li>
                        </div>
                    ))}
            </div>
        </Layout>
    )
}

export default ManageTalleres