import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button, Container, Jumbotron } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';

import ProductsDeck from '../components/ProductsDeck';

const Home = () => {

  const descShortener = (desc) => desc.substr(0, 200) + '.';

  // get products, action + selector ?
  // addProduct (product) > addProductToCart({ product });

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

          <div className="h-100">
            <Jumbotron className="row align-items-center py-4 h-100">
            <div className="img__container col-12 col-md-4 rounded">
              <img className="rounded" alt="" src="http://img.bbystatic.com/BestBuy_US/images/products/1018/1018934_sa.jpg" />
            </div>
            <div className="product__text col-12 col-md-8 text-left">
              <h2>Lorem, ipsum.</h2>

              <p className="my-2">
                Lorem ipsum dolor sit amet.
              </p>

              <h4 className="mb-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, quos! Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum tenetur voluptate placeat similique tempore corporis necessitatibus nisi neque cupiditate sunt?
              </h4>

              <h5>$12.99</h5>

              <Button variant="primary" onClick={() => console.log("add to cart")}>Add To Cart</Button>
            </div>
            </Jumbotron>
          </div>
          <div className="h-100">
            <Jumbotron className="row align-items-center py-4 h-100">
            <div className="img__container col-12 col-md-4 rounded">
              <img className="rounded" alt="" src="http://img.bbystatic.com/BestBuy_US/images/products/1019/1019306_sa.jpg" />
            </div>
            <div className="product__text col-12 col-md-8 text-left">
              <h2>Lorem, ipsum.</h2>

              <p className="my-2">
                Lorem ipsum dolor sit amet.
              </p>

              <h4 className="mb-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, quos!
              </h4>

              <h5>$12.99</h5>

              <Button variant="primary" onClick={() => console.log("add to cart")}>Add To Cart</Button>
            </div>
            </Jumbotron>
          </div>
          <div className="h-100">
            <Jumbotron className="row align-items-center py-4 h-100">
            <div className="img__container col-12 col-md-4 rounded">
              <img className="rounded" alt="" src="http://img.bbystatic.com/BestBuy_US/images/products/1018/1018273_rc.jpg" />
            </div>
            <div className="product__text col-12 col-md-8 text-left">
              <h2>Lorem, ipsum.</h2>

              <p className="my-2">
                Lorem ipsum dolor sit amet.
              </p>

              <h4 className="mb-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, quos!
              </h4>

              <h5>$12.99</h5>

              <Button variant="primary" onClick={() => console.log("add to cart")}>Add To Cart</Button>
            </div>
            </Jumbotron>
          </div>
          
        </Carousel>

        <h4>All products</h4>
        <ProductsDeck products={null} />
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