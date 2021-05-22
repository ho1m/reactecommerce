import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import ecomAxios from '../ecomAxios';

const Checkout = () => {
  const history = useHistory();
  const [order, setOrder] = useState(null);
  const { cartId } = useParams()

  function totalPrice () {
    if (!order?.products.length) return 0
    return order.products.map(({ product, quantity }) => product.price * quantity).reduce((a, b) => a + b, 0)
  }
  
  const getOrder = async () => {
    try {
      const cartRes = await ecomAxios.get(`/carts/one/${cartId}`)
      setOrder(cartRes.data);
    } catch (error) {
      console.error(error)
      history.replace('/');
    }
  };

  useEffect(() => {
    getOrder(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartId]); 

  useEffect(() => {console.log(order)}, [order])

  return (
    <div className="view d-flex align-items-center justify-content-center">
          <Container>
            <h3 className="text-center">Thank you for your purchase!</h3>
            <p className="text-center">Order Number: ({cartId})</p>
            <Card className="pt-1"> {/* v-if="order_data" */}
              <Card.Header className="rounded mx-3">
                Total purchase: ${totalPrice()}
              </Card.Header>
              <Card.Body>
                <ListGroup>
                  
                  {(order && order?.products.length) && order.products.map((item, i) => (
                    <ListGroup.Item className="d-flex align-items-center" key={item.product._id+i}>
                      <Avatar fontSize="large" size="large" src={item.product.image} />
                      <div className="flex-fill ml-3">
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">{item.product.name}</h5>
                          <small>x {item.quantity}</small>
                        </div>

                        <p className="mb-1">
                          {item.product.shortDesc}
                        </p>

                        <small>${item.product.price}</small>
                      </div>
                    </ListGroup.Item>
                  ))}

                </ListGroup>
              </Card.Body>
            </Card>
          </Container>
    </div>
  );
}

export default Checkout;
