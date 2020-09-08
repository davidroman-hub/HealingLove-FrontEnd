import React,{Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {isAuth,signout} from '../../User/Helpers'
import {itemTotal} from '../Cart/CartHelpers'

import './Layout.scss'
import './Layout.css'

const Layout = ({children,history}) => {

    const nav = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <Link className="navbar-brand" style={{marginRight:'100px', fontFamily:'Meie Script', fontSize:'35px' }} to='/'>healing love</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor03">
                <ul className='navbar-nav mr-auto'>
                    <li className=" nav-item">
                        <Link to='/home' className=" nav-link" > Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/acerca-de-mi' className="navigation-color nav-link"> Acerca de mí</Link>
                    </li>
                    <li className="nav-item mt-1"> 
                        <Link className="navigation-color nav-link fas fa-cart-arrow-down " 
                            to="/carrito">{""}
                            <sup>
                                <small className="cart-badge">
                                {itemTotal()}
                                </small>
                            </sup>              
                        </Link>
                    </li>
                    
                    {!isAuth() && (
                        <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" to='/inicia-sesion' style={{color:'#78c2ad'}}>Inicia Sesión</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/registro'style={{color:'#78c2ad'}} >Registrate</Link>
                    </li>
                        </Fragment>
                    )}
                    {isAuth() && isAuth().role === 1  && (
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/dashboard">
                        {isAuth().name}
                        </Link>    
                    </li>    
                    )}
                    {isAuth() && isAuth().role === 0  && (
                    <li className="nav-item">
                        <Link className="nav-link" to="/user/dashboard">
                        {isAuth().name}
                        </Link>    
                    </li>    
                    )}
                    {isAuth() && isAuth().role === '0'  && (
                    <li className="nav-item">
                        <Link className="nav-link" to="/user/dashboard">
                        {isAuth().name}
                        </Link>    
                    </li>    
                    )}
                    {isAuth() && (
                    <li className="nav-item">
                        <span className="nav-link"
                                style={{cursor: 'pointer', color: '#000'}}
                                onClick={()=>{
                                    signout(()=>{
                                        history.push('/')
                                    })
                                }}>Cerrar Sesión</span>
                    </li>    
                    )}
                

                
                
                
                </ul>
                {/* <form className='form-inline my-2 my-lg-0'>
                    <input class="form-control mr-sm-2" type="text" placeholder="Search"></input>
                    <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                </form> */}
            </div>
    </nav>
    )


    return(
        <Fragment>
            {nav()}
            {children}
        </Fragment>
    )
}

export default withRouter(Layout)