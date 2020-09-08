import React, { Fragment, useState } from 'react';
import {Link,Redirect} from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import './FormsDesign.scss';
import Google from './GoogleAuth';
import Facebook from './FaceBookAuth';


//Imports

import axios from 'axios';
import {authenticate, isAuth} from './Helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


const Signin = ({history}) => {
    
    const [values, setValues] = useState({
        email: 'davidroman1@gmail.com',
        password: '123456',
        buttonText: 'ENTRAR'
    });

    const informParent = response => {
    
        authenticate(response, () => {
            isAuth() && isAuth().role === 1 ? history.push('/admin/dashboard') : history.push('/user/dashboard')
        });
    }

    const { email, password, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    }

    const clickSubmit = event  => {
        event.preventDefault();
        console.log(values)
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: { email, password }
        })
            .then(response => {
                    console.log('SIGNIN SUCCESS', response);
                    // save the respnse (user, token) in local storage/cookie  
                    authenticate(response, () => {
                    setValues({ ...values, name: '', email: '', password: '', buttonText: 'ENTRANDO...' });
                    //toast.success(`Hey ${response.data.user.name}, Welcome back!`);
                    isAuth() && isAuth().role === 1 ? history.push('/admin/dashboard') : history.push('/user/dashboard')
                });
            })
            .catch(error => {
                console.log('SIGNIN ERROR', error.response.data);
                setValues({ ...values, buttonText: 'ENTRAR' });
                toast.error(error.response.data.error);
            });

    }

    const SigninForm = () => {
        return(
        <div className='Form-design'>
            <form className=''>
                <div className='form-group'>
                <label className="text-muted">E-mail</label>
                    <input onChange={handleChange('email')} value={email} type='email' className='form-control my-input'/>
                </div>
                <div className='form-group'>
                <label className="text-muted">Contraseña</label>
                    <input onChange={handleChange('password')} value={password} type='password' className='form-control my-input'/>
                </div>
                <div className='text-center'>
                    <button className='btn btn-primary send-button btn-lg' onClick={clickSubmit}>{buttonText}</button>
                </div>
            </form>
        </div>
        )
    }

    const SigninForm2 = () => {
        return(
            <Fragment>
                <div className="singinForm col-md-6 offset-md-3 mt-3">
                    <ToastContainer/>
                    {isAuth() ? <Redirect to='/'/> : null}
                    <br/>
                    <h1>INICIA SESIÓN</h1>
                    <div className='plant mb-2'>
                        <img className='plant text-center img img-fluid' src='https://res.cloudinary.com/dm8dxwvix/image/upload/v1596538045/Healing%20love/welcome_o7jzli.jpg' alt='healing-love'/>
                    </div>
                        {SigninForm()}
                        <br/>
                            <h2 className='text-center'>Ó</h2>
                            <h2 className='text-center'>Inicia Sesión con: </h2>
                        <br/>    
                        <Google informParent={informParent}/>
                        <Facebook informParent={informParent}/>
                        <div className='mt-4'> 
                            <Link className='text-muted' to='/auth/password/forgot' >Olvidaste tu contraseña?</Link><br/>
                            <Link className='text-muted' to='/aviso-privacidad' >Aviso de PRIVACIDAD</Link>      
                            <br/>
                        </div>
                </div>
            </Fragment>
        )
    }

    return (
        <Layout>
            {SigninForm2()}
        </Layout>
        
    )
}

export default Signin
