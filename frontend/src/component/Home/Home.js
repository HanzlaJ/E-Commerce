import React, { Fragment } from 'react';
import {CgMouse} from "react-icons/all";
import "../Home/Home.css";
import Product from "./Product.js";
import MetaData from "../layout/MetaData.js"
// import {useSelector, useDispatch} from "react-redux"
// import {getProduct} from '../../Actions/productActions'

const product={
    name:"Blue Tshirt",
    images:[{url:"https://i.ibb.co/DRST11n/1.webp"}],
    price:" 3000 Pkr",
    _id:"abishek"
}

const Home = () => {
    
  return (
    <Fragment>

        <MetaData title='Ecommerce'/>
        <div className = "banner">
            <p>
                Welcome to Ecommerce
            </p>

            <h1>
                FIND AMAZING PRODUCTS BELOW
            </h1>

            <a href ="#container">
            <button>
                Select <CgMouse/>
            </button>
            </a>
        </div>
        <h2 className='homeHeading'>Featured Products</h2>

        <div className='container' id="container">
        <Product product={product}/>
        </div>
    </Fragment>
  )
}

export default Home
