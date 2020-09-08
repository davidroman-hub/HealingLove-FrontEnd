import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

//Imports
//Public Routes
import Home from './components/Home/Home'
import Signin from './User/Signin'
import Signup from './User/Singup'
import Activate from './User/AccountActivation'
import SingleProduct from './components/SingleProduct/Product'
import Cart from './components/Cart/Cart'
import OxxoCart from './components/Cart/CartOxxo'

//Admin Routes
import AdminRoute from './Admin/AdminRoute'
import AddCategory from './Admin/addCategory'
import AddProduct from './Admin/CreadorTalleres'
import ManageTalleres from './Admin/ManageTaller'
import UpdateTaller from './Admin/UpdateTaller'
import Orders from './Admin/ClientOrders'
import Search from './Admin/search'
import SingleOrder from './Admin/singleOrder'
//User Routes
import PrivateRoute from './User/privateRoute'
import UserDashboard from './User/UserDashboard'
import AdminDashboard from './Admin/AdminDashBoard';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/inicia-sesion' component={Signin}/>
        <Route exact path='/Registro' component={Signup}/>
        <Route exact path="/auth/activate/:token" component={Activate}/>
        <Route exact path="/product/:productId" component={SingleProduct}/>
        <Route exact path="/carrito" component={Cart}/>
        <Route exact path="/pago/oxxo" component={OxxoCart}/>
        {/* //user routes */}
        <PrivateRoute exact path="/user/dashboard" component={UserDashboard}/>


        {/* //Admin Routes */}

        <AdminRoute exact path='/admin/dashboard' component = {AdminDashboard}/>
        <AdminRoute exact path='/admin/crear-categoria' component = {AddCategory}/>
        <AdminRoute exact path='/admin/crear-taller' component = {AddProduct}/>
        <AdminRoute exact path='/admin/administrar-talleres' component = {ManageTalleres}/>
        <AdminRoute exact path="/admin/taller/update/:productId" component={UpdateTaller}/>
        <AdminRoute exact path="/admin/orders" component={Orders}/>
        <AdminRoute exact path="/admin/search/orders" component={Search}/>
        <AdminRoute exact path="/admin/order/:orderId" component={SingleOrder}/>
      </Switch>
    </Router>
  );
}

export default App;
