import React,{useState} from 'react';
import Layout from '../components/Layout/Layout';
import {getCookie, isAuth } from '../User/Helpers';
import {Link} from 'react-router-dom';
import { createCategory } from './ApiAdmin';



const AddCategory = () => {
    

    //State 
const [value, setValue] = useState({
    name:''
});
const [error, setError] = useState(false);
const [success, setSuccess ] = useState(false);

const { name } = value;
// destructure user and info (token) from localstorage

const token = getCookie('token');
const user = getCookie('token');

//we need to create 2 method, for handleChange and for clickSubmit

const handleChange = name => (e) => {
    setError('')
    setValue({ ...value, [name]: e.target.value });
}

const clickSubmit = (e) => { 
    e.preventDefault()
    setError('')
    setSuccess(false)
    
//make request to API to create category
createCategory( user._id,token,{name})
.then( data => {
    if(data.error){
        setError(true)
    } else {
        setValue({ name:'',})
        setError('')
        setSuccess(true)
        alert(`${name} Ha sido creado! regresa al Dashboard o crea otra categoria!`)
        }
    })
};

    // Method for Show error and success of the new category

// const showSuccess = () => { 
//     if(success){
//         return  <h3 className='text-success'>{name} Ha sido creado, regresa al Dashboard o crea otra categoria!</h3>
//     }
// }

const showError = () => { 
    if(error){
        return<h3 className='text-danger'> La categoria debe ser unica! crea otra con nombre diferente</h3>
    }
}

const mouseMoveHandler  = e => {
    setValue({...value, error: false, success:false})
}
// button for go back

const goBack= () => (
    <div className='mt-5'>
        <Link to='/admin/dashboard' className='text-warning'>Vuelve al inicio</Link>
    </div>
)


const newCategoryForm = () => (

    <form onSubmit = {clickSubmit} id='header-content'>
        <div className='form-group'>
            <label className='text-muted'>
                Nombre de la nueva categoria:
            </label>
            <input type='text'
            className='form-control'
            onChange={handleChange('name')}
            value={name}
            autoFocus
            required //<-- need to be something inside of the input
            />

        </div>

    <button className='btn btn-primary'>
        Crear una categoria!
    </button>


    </form>
);

return (

    <Layout >
        <div className='row'>
            <div className='col-md-6 offset-md-3 mt-3'>
                <h1 className="p-5 text-center">Hola!! {isAuth().name}. Listo para crear una categoria?</h1>
                <div onMouseMove = {mouseMoveHandler}>
                    {newCategoryForm()}
                </div>
                <br/>
                {showError()}
                {/* {showSuccess()}        */}
                {goBack()}
            </div>
        </div>



    </Layout>

        )

}

export default AddCategory