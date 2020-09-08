import React,{useState, Fragment} from 'react';
import {Link,Redirect} from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { authenticate,isAuth } from './Helpers';
import './FormsDesign.scss';
//imports
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Facebook from './FaceBookAuth';
import Google from './GoogleAuth';

const Singup = ({history}) => {

    const [values, setValues] = useState({
        name:'david',
        email:'davidroman1@gmail.com',
        password:'123456',
        buttonText:'Registrate'
    })
    
    const {name, email, password, buttonText} = values;

    const handleChange = name => event => {
        setValues({...values,[name]: event.target.value });
    }

    const informParent = response => {
    
        authenticate(response, () => {
            isAuth() && isAuth().role === 1 ? history.push('/admin/dashboard') : history.push('/user/dashboard')
        });
    }


    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, buttonText:"Registrando.." });
        console.log(values);
        axios({
            method:'POST',
            url: `${process.env.REACT_APP_API}/signup`,
            data: { name, email, password }
        })
        .then(response => {
            console.log('SIGNUP SUCCESS', response);
            setValues({ ...values, name: '', email: '', password: '', buttonText: 'Registrado' });
            toast.success(response.data.message);
        })
        .catch(error => {
            console.log('SIGNUP ERROR', error.response.data);
            setValues({ ...values, buttonText: 'Registrate' });
            toast.error(error.response.data.error);
        });


    }
    
    const SignupForm = () => {
        return(
            <div className='Form-design'>    
                <form className=''>
                    <div className='form-group'>
                    <label className="text-muted">Nombre</label>
                        <input type='text' onChange={handleChange('name')} value={name} className='form-control'/>
                    </div>
                    <div className='form-group'>
                    <label className="text-muted">E-mail</label>
                        <input onChange={handleChange('email')} value={email} type='email' className='form-control'/>
                    </div>
                    <div className='form-group'>
                    <label className="text-muted">Contraseña</label>
                        <input onChange={handleChange('password')} value={password} type='password' className='form-control'/>
                    </div>
                    <div>
                        <button className='btn btn-primary send-button btn-lg' onClick={clickSubmit} >{buttonText}</button>
                    </div>
                </form>
            </div>    
        )
    }


    const SignUPForm2 = () => {
        return(
            <Fragment>
                <div className="singinForm col-md-6 offset-md-3 mt-3">
                    <ToastContainer/>
                    {isAuth() ? <Redirect to='/'/> : null}
                    <br/>
                    <h1>REGISTRATE</h1>
                    <div className='plant mb-2'>
                        <img className='plant text-center img img-fluid' src='https://res.cloudinary.com/dm8dxwvix/image/upload/v1596538045/Healing%20love/welcome_o7jzli.jpg' alt='healing-love'/>
                    </div>
                        {SignupForm()}
                        <br/>
                            <h2 className='text-center'>Ó</h2>
                            <h2 className='text-center'>Registrate con: </h2>
                        <br/>    
                        <Google informParent={informParent}/>
                        <Facebook informParent={informParent}/>
                        <div className='mt-4'> 
                            <Link className='text-muted' to='/inicia-sesion' >Ya tienes cuenta?</Link><br/>
                            <Link className='text-muted' to='/aviso-privacidad' >Al registrarte aceptas el Aviso de PRIVACIDAD</Link>      
                            <br/>
                        </div>
                </div>
            </Fragment>
        )
    }

    return (
        <Layout>
            {SignUPForm2()}
        </Layout>
        
    )
}
    

export default Singup
