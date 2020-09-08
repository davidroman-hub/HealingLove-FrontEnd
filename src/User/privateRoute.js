import React, { Component } from 'react'
import {Route, Redirect} from 'react-router-dom'
import {isAuth} from './Helpers'



const PrivateRoute = ({component : Component, ...rest}) => (
    <Route {...rest} render={ props => isAuth() ? (
                <Component {...props}/>
            ) : (
                <Redirect to = {{
                    pathname: '/registro', 
                        state:{from: props.location}}}/>
                )
            } 
        />
);

export default PrivateRoute