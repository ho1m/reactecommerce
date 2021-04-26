import { Avatar } from '@material-ui/core';
import React from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';

const Checkout = () => {
  // get cart id

  return (
    <div className="view d-flex align-items-center justify-content-center">
          <Container>
            <h3 className="text-center">Thank you for your purchase!</h3>
            <p className="text-center">Order Number: (123)</p>
            <Card className="pt-1"> {/* v-if="order_data" */}
              <Card.Header className="rounded mx-3">
                $12.99
              </Card.Header>
              <Card.Body>
                <ListGroup>

                  <ListGroup.Item className="d-flex align-items-center">
                    <Avatar fontSize="large" size="large" />
                    <div className="flex-fill ml-3">
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">Lorem, ipsum dolor.</h5>
                        <small>x 123</small>
                      </div>

                      <p className="mb-1">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime quaerat incidunt illo esse nam nesciunt!
                      </p>

                      <small>$12.99</small>
                    </div>
                  </ListGroup.Item>

                </ListGroup>
              </Card.Body>
            </Card>
          </Container>
    </div>
  );
}

export default Checkout;
