import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button, Container, Jumbotron } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';
import ecomAxios from '../ecomAxios';

import ProductsDeck from '../components/ProductsDeck';
import { useDispatch } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const descShortener = (desc) => desc.substr(0, 200) + '.';
  const getProducts = async () => {
    try {
      const productsRes = await ecomAxios.get('/products/getall')
      setProducts(productsRes.data)
    } catch (error) {
      console.error(error)
    }
  }
  const addProductToCart = (product) => {
    // addProduct (product) > addProductToCart({ product });
    // dispatch(addProductToCart(product))
  }
  useEffect(() => {
    getProducts()
  }, [])

  return (
    <HomeContainer className="view">
      <Container>
        <Carousel
        className="mb-5"
        showThumbs={false}
        axis="horizontal"
        autoPlay={true}
        infiniteLoop={true}
        emulateTouch={true}
        >

          {products.length ? products.slice(0,3).map(product => (
            <div className="h-100" key={product._id}>
              <Jumbotron className="row align-items-center py-4 h-100">
              <div className="img__container col-12 col-md-4 rounded">
                <img className="rounded" alt="" src={product.image} />
              </div>
              <div className="product__text col-12 col-md-8 text-left">
                <h2>{product.name}</h2>

                <p className="my-2">
                  {product.shortDesc}
                </p>

                <h4 className="mb-3">
                  {descShortener(product.desc)}
                </h4>

                <h5>
                  ${product.price}
                </h5>

                <Button variant="primary" onClick={() => console.log("add to cart")}>Add To Cart</Button>
              </div>
              </Jumbotron>
            </div>
          )) : ''}
          
        </Carousel>

        <h4>All products</h4>
        <ProductsDeck products={products} />
      </Container>
    </HomeContainer>
  );
}

export default Home;

const HomeContainer = styled.div`
  .img__container {
    height: 15em;
    width: 12em;
    overflow: hidden;
  }
`;