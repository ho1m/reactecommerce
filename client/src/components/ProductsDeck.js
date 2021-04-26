import React from 'react';
import { Row } from 'react-bootstrap';

import ProductCard from './ProductCard';

const ProductsDeck = ({ products }) => {

  return (
    <Row>
      <ProductCard product={null} />
      <ProductCard product={null} />
      <ProductCard product={null} />
      <ProductCard product={null} />
      <ProductCard product={null} />
      <ProductCard product={null} />
    </Row>
  );
}

export default ProductsDeck;
