import React from 'react'
import {Link} from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

const Product = ({product}) => {

    const options = {
        eidt:false,
        color:"rgba(21, 21, 21, 0.1)",
        isHalf:true,
        activeColor:'tomato',
        value:2.5,
        size: window.innerWidth < 600 ? 20 : 25
    }
  return (
      <Link className='productCard' to={product._id}>
      <img src={product.images[0].url} alt={product.name}></img>
      <p>{product.name}</p>
      <div>
      <ReactStars {...options}/> <span>(270 reviews)</span>
      </div>
      <span>{product.price}</span>
      </Link>
  )
}

export default Product

