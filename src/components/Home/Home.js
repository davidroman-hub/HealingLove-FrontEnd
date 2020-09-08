import React, { Fragment, useState , useEffect} from 'react'
import {useSpring, animated} from 'react-spring'
import {Link} from 'react-router-dom'
//imports

import CardBody from './Cards'
import { getProducts } from '../../Admin/ApiAdmin'
import Card from '../../components/Cards/CardIndex'


// animations
import styled, {keyframes} from 'styled-components'
import {bounce}  from "react-animations"
import Layout from '../Layout/Layout'
import ScrollAnimation from 'react-animate-on-scroll'
import '../Layout/Layout.scss'
import './Home.scss'

const Home = () => {

    const [productsBySell, setProductsByArrival] = useState([])
    const [error, setError] = useState(false) 

    const loadProductBySell = () => {
        getProducts('sold').then(
        data => {
            if (data.error){
                setError(data.error)
            } else {
                setProductsByArrival(data)
            }
        })
    }

    useEffect(()=>{
        loadProductBySell();
        },[])


    //const titlesAnimated = useSpring({opacity: 1, from: {opacity: 0}})
    
    const Bounce = styled.div`animation: 4s ${keyframes`${bounce}`} infinite`

    const header = () => (
        <Fragment>

            <div className="header-content"  id="home"/>
            <div className='logo-4 text-center'>
                <img className='img img-fluid'
                style={{maxHeight:''}} 
                src='https://res.cloudinary.com/dm8dxwvix/image/upload/v1596535714/Healing%20love/Healing_love-logo_web_color_Mesa_de_trabajo_1_1_ku0cxv.png'
                alt='Logo-1'
                />
                </div> 


        </Fragment>
    )



    const homeBody = () => (
        <Fragment>
            <div className='homeBody1 text-center'>
                <h2>Meditación ♡ Studio</h2>
            </div>
            <div className='cards'>
                <div>{CardBody()}</div>
            </div>
            <div className='homeBody2 text-center'>
                <h2>TALLERES</h2>
            </div>     
            
        </Fragment>
    )

    
        const CardExample = () => (
            <Fragment>
            <div className='mb-5'>
                <section className='section1'>
                <h1> Reto Gratuito Medita Healing</h1>
                <div className="content">
                    <div className="img-card">
                        <img src='https://res.cloudinary.com/dm8dxwvix/image/upload/v1596538186/Healing%20love/4db0e614ec3f74e8eb79e303afcb2e0b_ahcpef.jpg' alt='/' />   
                    </div>    
                    </div>
                    <div className="excerpt-position">
                        <p>-Durante 5 días tendrás la oportunidad de experimentar los beneficios de la meditación,
                            expandirás tu conciencia y podrás crear nuevos y mejores hábitos que te beneficiaran en todos los
                            aspectos de tu vida.  (Ejemplo CARD)  </p>
                        <p className='mt-4'>PRECIO: $0</p>
                        <div className='text-center'>
                            <Link to='/'> Leer Más</Link>
                        </div>
                    </div>
    
                </section>
            </div>
        </Fragment>
        )
    

    const ShowTalleres = () => (
        <Fragment>
            {/* {JSON.stringify(productsByArrival)} */}
            <div className=''>
                {productsBySell.map((products, i)=>(
                    <Card key={i} product={products}/>
                    ))}
            </div>

        </Fragment>
    )


    
    return(
        <Layout>
            {header()}
            {homeBody()}
            {ShowTalleres()}
            {/* {CardExample()} */}
        </Layout>
    )
}

export default Home