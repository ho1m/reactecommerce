import { Avatar } from '@material-ui/core';
import React from 'react';
import { Accordion, Button, Card, Container, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/appSlice';
import { selectNameTest, selectOrders } from '../features/cart/cartSlice';

const Orders = () => {
  const orders = useSelector(selectOrders);
  const totalPrice = (productsList) => {
    return productsList.map(({ product, quantity }) => product.price * quantity).reduce((a, b) => a + b, 0)
  }

  return (
    <div className="view">
      <Container>
      <h3 className="align-self-start">Orders</h3>
      
        <Accordion>

          {orders.length ? orders.map((order, i) => (
            <Card className="mb-1" key={order._id}>

              <Card.Header header-tag="header" className="p-1" role="tab">
                <Accordion.Toggle as={Button} variant="link" eventKey={`${i}`} className="w-100 bg-dark text-light">
                  ORDER #{order._id} • {new Date(order.updatedAt).toDateString()} • TOTAL PRICE: ${totalPrice(order.products)}
                </Accordion.Toggle>
              </Card.Header>

              <Accordion.Collapse eventKey={`${i}`}>
                <Card.Body>
                  <ListGroup>

                    {order.products.map(({ product, quantity}) => (
                      <ListGroup.Item className="d-flex" key={product._id}>
                        <Avatar src={product.image} />
                        <div className="flex-fill ml-3">
                          <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{product.name}</h5>
                            <small>x {quantity}</small>
                          </div>

                          <p className="mb-1">
                            {product.shortDesc}
                          </p>

                          <small>${product.price}</small>
                        </div>
                      </ListGroup.Item>
                    ))}
                    
                  </ListGroup>
                </Card.Body>
              </Accordion.Collapse>

            </Card>
          )) : ''}

        </Accordion>
      
      </Container>
    </div>
  );
}

export default Orders;
