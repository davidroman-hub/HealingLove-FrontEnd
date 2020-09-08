import React,{useState,useEffect} from 'react'
import Layout from '../Layout/Layout'
import { read } from '../../User/apiCore'
import DescriptionCard from '../../components/Cards/DescriptionCard'


const SingleProduct = (props) => {

    const [product, setProduct] = useState({})
    const [error, setError] = useState(false)
   // const[relatedProduct, setRelatedProduct] = useState([])

    const loadSingleProduct = productId => {
        read(productId).then( data => {
            if (data.error){
                setError(data.error)
            } else {
                setProduct(data)
            }
        })
    }

    useEffect (() => {
            const productId = props.match.params.productId
            loadSingleProduct(productId)
    },[props])
        
    return(
        <Layout>
            {/* {JSON.stringify(product)} */}
            <div>
                <h1 className='text-center mt-4'>{product.name}</h1>
                <div className='product-card'>
                {
                                product &&
                                product.description &&
                                <DescriptionCard product={product} />
                            }
                </div>
            </div>
        </Layout>
    )
}

export default SingleProduct