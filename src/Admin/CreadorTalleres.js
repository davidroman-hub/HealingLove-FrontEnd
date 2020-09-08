import React,{useState, useEffect} from 'react';
import Layout from '../components/Layout/Layout';
import { getCookie } from '../User/Helpers';
import { createProduct, getCategories } from './ApiAdmin';
import {QuillModules, QuillFormats} from './QuillHelpers';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddProduct = () => {
    
        const token = getCookie('token')
        const user = getCookie('token')

        const [values, setValues] = useState({//<-- have to be an object because we gonna send props

            name:'',
           // description:'',
            price:'',
            categories:[], //<-- we gonna put the categories from the backend
            category:'',
            shipping:'',
            quantity:'',
            photo:'',
            loading:false,
            error:'',
            createdProduct:'',
            redirectToProfile:false,
            formData:''
        })

        const {

            name,
           // description,
            price,
            categories, //<-- we gonna put the categories from the backend
            category,
            shipping,
            quantity,
            photo,
            loading,
            error,
            createdProduct,
            redirectToProfile,
            formData // <--  we gonna send this to the backend
        
        } = values;

        const init = () => {
            getCategories().then( data => {
                if (data.error){
                    setValues({...values, error: data.error})
                }else{
                    setValues({...values,categories:data, formData: new FormData()})
                }
            }) 
        }

        useEffect(() => { 
            //setValues({...values, formData: new FormData()}); //<-- thats why we used here
        init();
        }, [])

        const handleChange = name => event => {
            const value = name === 'photo' ? event.target.files[0]: event.target.value;
            formData.set(name, value);//<-- first we gonna take the fisrt value 'name' and after we gonna take the other values
            setValues({...values, [name]: value})
        }
        
        const clickSubmit= (event) => { 
            event.preventDefault()
            console.log(values)
                setValues({...values, error:'', loading: true}) 
                createProduct(user._id, token, formData)
                .then(data => { 
                    if(data.error) { 
                        setValues({...values, error:data.error})
                    } else {
                        setValues({
                        ...values, 
                        name:'', //<-- this name
                        description:'',
                        photo:'',
                        price:'',
                        quantity:'',
                        loading:false,
                        createdProduct:data.name //we need the name 
                    })
                    setDescription('')
                }
            })
        }

        const [description, setDescription] = useState([])
        
        const handleDescription = e => {
            //return console.log(e.target.value);
            setDescription(e)
            formData.set('description', e)
            if(typeof window !== 'undefined'){
                localStorage.setItem('description', JSON.stringify(e))
            }
        } 
    


        const newPostForm = () => {

            return(
        
        
            <form className='product-form' onSubmit={clickSubmit} id='header-content'>
                <h4>Agrega una foto</h4>
                <div className='container'>
                    <label className='btn btn-secondary'>
                        <input
                            onChange={handleChange('photo')}
                            type='file'
                            name='photo'
                            accept='image/*'
                        />
                    </label>
                </div>
        
                <form className='mb-3'>
                            <div className='form-group'>
                                <label className='text-muted'> </label>
                                    <input 
                                        placeholder='Nombre del Taller ó Producto'
                                        onChange={handleChange('name')} 
                                        type='text' 
                                        className='form-control' 
                                        value={name} 
                                    />
                            </div>
        
        
        
        
                            <div className='form-group'>
                            <label className='text-muted'></label>
                                {/* <textarea 
                                    placeholder='Descripción del Taller ó Producto'
                                    onChange={handleChange('description')}  
                                    className='form-control' 
                                    value={description} /> */}
                                <ReactQuill 
                                modules={QuillModules} 
                                formats={QuillFormats} 
                                value={description} 
                                placeholder='Escribe algo increible...' 
                               onChange={handleDescription}  
                                />
                            </div>
        
                            <div className='form-group'>
                                <label className='text-muted'> Precio </label>
                                    <input 
                                        onChange={handleChange('price')} 
                                        type='number' 
                                        className='form-control' 
                                        value={price} />
                                </div>
        
                            <div className='form-group'>
                                <label className='text-muted'> Categoría </label>
                                    <select 
                                        onChange={handleChange('category')} 
                                        className='form-control' 
                                        >
                                        <option>Por favor selecciona</option>
                                            {categories && categories.map((c, i) => 
                                            (<option key={i} 
                                                value={c._id} > {c.name} 
                                        </option>))}
                                    </select>
                            </div>
        
        
                            <div className='form-group'>
                                <label className='text-muted'>Envio</label>
                                    <select 
                                        onChange={handleChange('shipping')} 
                                        className='form-control' 
                                        >
                                        <option>Por favor selecciona</option>    
                                        <option value='0'>No</option>
                                        <option value='1'>Si</option>      
                                    </select>
                            </div>
        
        
                            <div className='form-group'>
                                <label className='text-muted'>Cantidad?</label>
                                    <input 
                                        onChange={handleChange('quantity')} 
                                        type='number' 
                                        className='form-control' 
                                        value={quantity} 
                                    />
                            </div>
                            
                            <button className='btn btn-primary' > Crear Taller </button>
                            </form>
                    </form>
                    )
            }
        


            
        const showError = () => {
            return(
                <div className='alert alert-danger' style={{display:error ? '' : 'none'}}>
                    {error}
                </div>
            )
        }

        const showSuccess = () => {
        return(
            <div className='alert alert-info' style={{display:createdProduct ? '' : 'none'}}>
                <h4>{`${createdProduct}`} Ha sido creado! recarga la pagina para crear otro producto</h4>
            </div>
            )
        }

        const showLoading = () => {
        return(
            loading && (<div className='alert alert-success'> Cargando...</div>)
            )
        }

        return(

            <Layout >
                <div className=''>
                <h1 className='text-center mt-4'>Creador de Talleres</h1>
                    <div className='col-md-6 offset-md-3 mt-3'>
                        {showLoading()}
                        {showSuccess()}
                        {showError()}
                        {newPostForm()}
                    </div>
                </div>
        
            </Layout>
        
                )

    }


    export default AddProduct