import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ProductCard = ({ product }) => {
  const descShortener = (desc) => desc.substr(0, 150) + '.';

  return (
    <Col xs={12} sm={6} md={4} className="mb-4">
      <Link to={`/productpage/view/${product._id}`}>
      <CardContainer className="card">
        <div className="img__container mb-3">
          <img src={product.image} alt="" />
        </div>
        <Card.Body>
          <Card.Title className="mb-2">{product.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{product.shortDesc}</Card.Subtitle>
          <Card.Text>
          {descShortener(product.shortDesc)}
          </Card.Text>
          <Card.Text>
            <b>${product.price}</b>
          </Card.Text>
        </Card.Body>
      </CardContainer>
      </Link>
    </Col>
  );
}

export default ProductCard;

const CardContainer = styled.div`
  cursor: pointer;
  transition: transform .2s ease-in-out;
  
  :hover {
    transform: scale(1.05);
  }

  .img__container {
    width: 100% !important;
    height: 300px;
  }
`;