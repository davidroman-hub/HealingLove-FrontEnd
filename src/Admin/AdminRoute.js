import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {isAuth} from '../User/Helpers'



const AdminRoute = ({component : Component, ...rest}) => (
    <Route {...rest} render={ props =>isAuth() && isAuth().role === 1 ? (
        <Component {...props}/>
    ) : (
        <Redirect to = {{
            pathname: '/registro', 
                state:{from: props.location}}}/>
        )
    } 
/>
);

export default AdminRoute
