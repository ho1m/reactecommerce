import React from 'react';
import { Button, Container } from 'react-bootstrap';
import styled from 'styled-components';

const ProductPage = () => {
  // get product


  return (
    <ProductPageContainer className="view">
      <Container className="row mx-auto my-5 px-0">

      <div class="img__container col-12 col-sm-6 rounded">
        <img src="http://img.bbystatic.com/BestBuy_US/images/products/1018/1018934_sa.jpg" alt="" />
      </div>

      <div class="product__text col-12 col-sm-6 py-5">
        <h2>Lorem, ipsum dolor.</h2>

        <p class="mt-2 mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, molestiae! Consectetur quia reiciendis maxime excepturi!
        </p>

        <h4 class="mb-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, fuga voluptatibus dolorum commodi sit illo nesciunt corrupti similique? Quia deserunt repudiandae doloribus animi aut eius nemo est amet adipisci eligendi?
        </h4>

        <h4 class="mb-3">
          $12.99
        </h4>

        <Button
        variant="primary"
        class="mt-3"
        onClick={() => console.log("add product")}
        >Add To Cart</Button>
      </div>

      </Container>
    </ProductPageContainer>
  );
}

export default ProductPage;

const ProductPageContainer = styled.div`
  .img__container {
    overflow: hidden;
    max-height: 500px;
  }
`;