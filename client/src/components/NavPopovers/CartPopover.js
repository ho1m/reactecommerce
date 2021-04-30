import React, { useRef, useState } from 'react';
import { Popover, Overlay, Button, Badge, Card, ListGroup } from 'react-bootstrap';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import { ArrowDownward, ArrowUpward, DeleteOutlineOutlined } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { selectCart } from '../../features/cart/cartSlice';

const CartPopover = () => {
  const cart = useSelector(selectCart);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(prev => !prev);
    setTarget(event.target);
  };

  const handleHover = (event) => {
    setShow(true);
    setTarget(event.target);
  };

  return (
    <CartPopoverContainer ref={ref} onMouseLeave={() => setShow(false)} className="ml-4">
      <Button onClick={handleClick} onMouseEnter={handleHover} variant="transparent pr-0">
        <ShoppingCartOutlinedIcon />
        <Badge variant="secondary">0</Badge>
      </Button>

      <Overlay
        show={show}
        target={target}
        placement="bottom-end"
        container={ref.current}
        containerPadding={20}
      >
        <Popover id="popover-contained" className="cart__pop">
          <Popover.Title as="h3">Cart</Popover.Title>
          <Popover.Content>

            {cart && (
            <ListGroup>
            
            {cart?.products.length ? cart.products.map(product => (
              <ListGroup.Item className="d-flex align-items-center p-2" >
                <Avatar size="2.5em" />
                <div className="w-100 ml-2 d-flex align-items-center justify-content-between">
                  <div className="flex-grow-2">
                    <h6 className="mb-0">Lorem, ipsum. <span>x 123</span></h6>
                    <p className="mb-0">Price: $12.99</p>
                  </div>
                  <div className="ml-2 d-flex align-items-center">
                    <div className="d-flex flex-column align-items-stretch justify-content-center mr-1">
                      {/* <!-- add to product quantity --> */}
                      <Button variant="transparent p-0" className="border border-1" > {/* @click="() => updateProductInCart({ type: 'add', productId: product.product._id })" */}
                        <ArrowUpward />
                      </Button>
                      {/* <!-- sub to product quantity --- if quantity is 1 then resolve to delete--> */}
                      <Button variant="transparent p-0" className="border border-1" > {/* @click="() => updateProductInCart({ type: 'sub', productId: product.product._id })" */}
                        <ArrowDownward />
                      </Button>
                    </div>
                    {/* <!-- delete product from cart products deleteProductFromCart -->  */}
                    <Button id="" variant="danger" > {/* @click="() => deleteProductFromCart({ productId: product.product._id })" */}
                      <DeleteOutlineOutlined />
                    </Button>
                  </div>
                </div>
              </ListGroup.Item>
            )) : ''}

            </ListGroup>
            )}

            <Card
            className="mt-3 p-2"
            >
            <h6>{`TOTAL PRICE: $${cart?.products.length ? 12.99 : 0.00}`}</h6>
            <Button variant="primary w-100" onClick={() => console.log("checkout")} >CHECKOUT</Button>
            </Card>
          </Popover.Content>
        </Popover>
      </Overlay>
    </CartPopoverContainer>
  );
}

export default CartPopover;

const CartPopoverContainer = styled.div`
  .cart__pop {
    min-width: 30% !important;
  }
`;