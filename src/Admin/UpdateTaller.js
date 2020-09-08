import React,{useState, useEffect} from 'react';
import Layout from '../components/Layout/Layout';
import {Redirect} from 'react-router-dom';
import {getCookie} from '../User/Helpers';
import {getProduct, getCategories, updateProduct} from './ApiAdmin';
import {QuillModules, QuillFormats} from './QuillHelpers';
import ReactQuill from 'react-quill';


const UpdateTaller = ({match}) => {

    const [values,setValues] = useState({
        name:'',
        description:'',
        price:'',
        categories:[], //<-- we have to put the categories from the backend
        category:'',
        shipping:'',
        quantity:'',
        photo:'',
        loading: false,
        error:'',
        createdProduct:'',
        redirectToProfile:false,
        formData:''
    })

    const token = getCookie('token')
    const Id = getCookie('token')

    const {

        name,
        //description,
        price,
        categories, //<-- we have to put the categories from the backend
        category,
        shipping,
        quantity,
        photo,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData // <-- we gonna send this to the back end 

    } = values;

    const initCategories = () => {
        getCategories().then( data => {
            if (data.error){
                setValues({...values, error: data.error})
            }else{
                setValues({categories:data, formData: new FormData()})
            }
        }) 
    };

    const init = productId => {
        getProduct(productId).then( data => {
            if(data.error){
                setValues({...values, error:data.error})
            }else{
                setValues({
                    ...values,
                    name:data.name,
                    //description: data.description,
                    price: data.price,
                    category: data.category._id,
                    shipping: data.shipping,
                    quantity: data.quantity,
                    formData: new FormData()
                })
                initCategories()
                setDescription(data.description)
            }
        })
    }

    useEffect(() => { 
        // setValues({...values, formData: new FormData()}); //<-- thats why we used here
        init(match.params.productId);
    }, [])

    // handleChange and clickSubmit

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name,value); //<-- faster name we gonna take the other values
        setValues({...values,[name]: value});
    } 

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error:'', loading: true}) 
    
        updateProduct(match.params.productId, Id, token, formData) //<-- the method back end and apiAdmin
            .then(data => { 
                if(data.error) { 
                    setValues({...values, error:data.error})
                } else {
                    setValues({
                    ...values, 
                    name:data.name, //<-- this name
                    description:'',
                    photo:'',
                    price:data.price,
                    quantity:data.quantity,
                    loading:false,
                    error: false,                
                    redirectToProfile:true,
                    createdProduct:data.name //we need the name 
                })
                alert(`EL taller ${data.name} ha sido Actualizado!`)
                //setDescription('')
            }
        })
    };

    const [description, setDescription] = useState('')
        
        const handleDescription = e => {
            //return console.log(e.target.value);
            setDescription(e)
            formData.set('description', e)
            if(typeof window !== 'undefined'){
                localStorage.setItem('description', JSON.stringify(e))
            }
        } 

    const updateTallerForm = () => {

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
                                    <option>Si quieres actualizar Por favor selecciona</option>
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
                                    <option>Si quieres actualizar Por favor selecciona</option>    
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
                        
                        <button className='btn btn-primary' > Actualizar Taller </button>
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
                    <h2>{`${createdProduct}`} ha sido actualizado!</h2>
                </div>
            )
        }

    return(
        <Layout>
            <h1 className='text-center'>Actualizar Taller </h1> 
            <div className='col-md-6 offset-md-3 mt-3'>       
                {updateTallerForm()}
                {showError()}
                {showSuccess()}
            </div>
            {/* {JSON.stringify(description)} */}
        </Layout>
    )
}


export default UpdateTaller