import { Link } from 'react-router-dom'
import './ProductCard.css'

function ProductCard({product}){

    return (
        <div className='product-card'>
            <h2>{product.title}</h2>
            <p>₹{product.price}</p>
            <p>category : {product.category}</p>
            <p>condition : {product.condition}</p>
            <p>seller : {product.seller}</p>
            <Link to={`/products/${product.id}`}>View Details</Link>
        </div>
    )
}

export default ProductCard