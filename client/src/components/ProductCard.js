import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ProductCard = ({ product }) => {
  return (
    <Col xs={12} sm={6} md={4} className="mb-4">
      <Link to={`/productpage/view/${'123'}`}>
      <CardContainer className="card">
        <div class="img__container mb-3">
          <img src="http://img.bbystatic.com/BestBuy_US/images/products/1018/1018934_sa.jpg" alt="" />
        </div>
        <Card.Body>
          <Card.Title className="mb-2">Card Title</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text>
          <Card.Text>
            <b>$12.99</b>
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
    width: 100%;
    height: 300px;
  }
`;