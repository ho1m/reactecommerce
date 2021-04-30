import React from 'react';
import { Row } from 'react-bootstrap';

import ProductCard from './ProductCard';

const ProductsDeck = ({ products }) => {

  return (
    <Row>
      {products.length ? products.map(product => (
        <ProductCard product={product} key={product._id} />
      )) : ''}
    </Row>
  );
}

export default ProductsDeck;
