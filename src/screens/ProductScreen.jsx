import { useState, useEffect } from 'react';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = '/api';

function ProductScreen() {
  const [product, setProduct] = useState({});
  const { id } = useParams(); // Extracting _id from route parameters

  useEffect(() => {
    async function fetchProduct() {
      try {
        // Convert _id to a number before making the API call
        const { data } = await axios.get(`/products/${Number(id)}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }

    fetchProduct();
  }, [id]); // Add _id as a dependency to re-run useEffect when it changes

  return (
    <div>
      {/* Back button to return to the homepage */}
      <Link to='/' className='btn btn-light my-3'>Go Back</Link>
      <Row>
        {/* Product image section */}
        <Col md={6}>
          <Image src={`http://127.0.0.1:8000${product.image}`} alt={product.name} fluid />
        </Col>

        {/* Product details and rating */}
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
            </ListGroup.Item>
            <ListGroup.Item>
              Price: ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description: {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Purchase options (Price, Stock Status, Add to Cart) */}
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {/* The button is fully width-aligned with 'w-100' */}
                <Button
                  className='w-100'
                  type='button'
                  disabled={product.countInStock === 0} // Disable button if the product is out of stock
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;
