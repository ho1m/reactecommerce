import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ecomAxios from '../ecomAxios';
import { addProductToCart } from '../features/cart/cartSlice';

const ProductPage = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  
  const getProduct = async () => {
    try {
      const productRes = await ecomAxios.get(`/products/getone/${productId}`)
      setProduct(productRes.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getProduct();
  }, [productId])

  return (
    <ProductPageContainer className="view">
      <Container className="row mx-auto my-5 px-0">

      <div className="img__container col-12 col-sm-6 rounded">
        <img src={product?.image} alt="" />
      </div>

      <div className="product__text col-12 col-sm-6 py-5">
        <h2>{product?.name}</h2>

        <p className="mt-2 mb-4">
          {product?.shortDesc}
        </p>

        <h4 className="mb-3">
          {product?.desc}
        </h4>

        <h4 className="mb-3">
          ${product?.price}
        </h4>

        <Button
        variant="primary"
        className="mt-3"
        onClick={() => dispatch(addProductToCart(product))}
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