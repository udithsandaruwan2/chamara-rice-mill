import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Rating from './Rating';
import { Link } from 'react-router-dom';

function Product({ product }) {
  return (
    <Card className='my-3 p-3 rounded'>
      {/* Correctly pass the _id in the URL */}
      <Link to={`/product/${String(product._id)}`}>
        <Card.Img src={`http://127.0.0.1:8000${product.image}`} alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${String(product._id)}`}>
          <Card.Title as='div'>
            <strong>{product.name} - {product._id}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <div className='my-3'>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} color='#f8e825' />
          </div>
        </Card.Text>

        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,  // Adjusted to allow either string or number for _id
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    numReviews: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default Product;
