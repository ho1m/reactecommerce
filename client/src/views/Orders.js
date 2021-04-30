import { Avatar } from '@material-ui/core';
import React from 'react';
import { Accordion, Button, Card, Container, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/appSlice';
import { selectNameTest } from '../features/cart/cartSlice';

const Orders = () => {
  const totalPrice = (productsList) => {
    return productsList.map(({ product, quantity }) => product.price * quantity).reduce((a, b) => a + b, 0)
  }

  return (
    <div className="view">
      <Container>
      <h3 className="align-self-start">Orders</h3>
      
        <Accordion>

          <Card className="mb-1" v-for="order in list">
            <Card.Header header-tag="header" className="p-1" role="tab">
              <Accordion.Toggle as={Button} variant="link" eventKey="2" className="w-100 bg-dark text-light">
                ORDER #orderid • {'dd,mm,yyyy' | ("dddd, MMMM Do YYYY") } • TOTAL PRICE: ${'$12.99'}
              </Accordion.Toggle>
            </Card.Header>

            <Accordion.Collapse eventKey="2">
              <Card.Body>
                <ListGroup>

                  <ListGroup.Item className="d-flex">
                    <Avatar />
                    <div className="flex-fill ml-3">
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">Lorem, ipsum.</h5>
                        <small>x 123</small>
                      </div>

                      <p className="mb-1">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus quod autem quis obcaecati. Perferendis, dolorum!
                      </p>

                      <small>${12.99}</small>
                    </div>
                  </ListGroup.Item>

                </ListGroup>
              </Card.Body>
            </Accordion.Collapse>

          </Card>

        </Accordion>
      
      </Container>
    </div>
  );
}

export default Orders;
