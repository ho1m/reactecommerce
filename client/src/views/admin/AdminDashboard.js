import React, { useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import { Button, Form, Accordion, Card, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ecomAxios from '../../ecomAxios';
import { orderStatusChange, selectToken, updateUser } from '../../features/admin/adminSlice';
import { v4 as uuidv4 } from 'uuid';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const adminToken = useSelector(selectToken);

  const [userId, setUserId] = useState('');
  const [orderId, setOrderId] = useState('');

  const [user, setUser] = useState(null);
  const [order, setOrder] = useState(null);
  const [checkedOutOrders, setCheckedOutOrders] = useState([]);

  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const statuses = ['Processing', 'Sent', 'Delivered'];

  const totalPrice = (productsList) => {
    return productsList.map(({ product, quantity }) => product.price * quantity).reduce((a, b) => a + b, 0)
  }

  const getAllOrders = async () => {
    try {
      const ordersRes = await ecomAxios.get(`/carts/checkedout`, {
        headers: {
          authorization: `Bearer ${adminToken}`
        }
      })
      setCheckedOutOrders(ordersRes.data)
    } catch (error) {
      alert(error.message)
    }
  }
  useEffect(() => {
    if (adminToken) getAllOrders() // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminToken])

  useEffect(() => {
    setOrder(null)
  }, [orderId])

  const getOrder = async (e) => {
    e.preventDefault()
    try {
      const orderRes = await ecomAxios.get(`/carts/one/${orderId}`)
      setOrder(orderRes.data)
      setStatus(orderRes?.data.status)
    } catch (error) {
      alert(error.message)
    }
  }
  const getUser = async (e) => {
    e.preventDefault()
    try {
      const userRes = await ecomAxios.get(`/users/user/${userId}`, {
        headers: {
          authorization: `Bearer ${adminToken}`
        }
      })
      setUser(userRes.data)
      setName(userRes.data.name)
      setEmail(userRes.data.email)
    } catch (error) {
      alert(error.message)
    }
  }

  const updateOrderSubmit = (e) => {
    e.preventDefault();
    dispatch(orderStatusChange({ orderId, status, loadMethod: getAllOrders }))
    setOrder(null)
  }

  const updateUserSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ 
      userId, userData: {
        name, email
      } 
    }))
    setUser(null)
  }

  return (
    <div className="view">
      <div className="container">
        <div className="edit__user bg-dark text-light p-4 rounded">
          <small>Edit user</small>
          <Form onSubmit={getUser} className="">
            <Form.Group controlId="formBasicUserid" className="">
              <Form.Label>User id:</Form.Label>
              <Form.Control type="text" className="w-75" placeholder="Enter user id..." onChange={({target}) => setUserId(target.value)} value={userId}  />
            </Form.Group>

            <Button variant="primary" type="submit" className="">
              Search User
            </Button>
          </Form>
          {user && (
            <Form onSubmit={updateUserSubmit} className="bg-secondary p-2 rounded mt-3">
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Name: </Form.Label>
                <Form.Control type="text" className="w-75" placeholder="User email..." onChange={({target}) => setName(target.value)} value={name}  />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Email: </Form.Label>
                <Form.Control type="text" className="w-75" placeholder="User email..." onChange={({target}) => setEmail(target.value)} value={email}  />
              </Form.Group>
  
              <Button variant="primary" type="submit" className="">
                Save
              </Button>
            </Form>
          )}
        </div>


        <div className="edit__order bg-dark text-light p-4 rounded mt-4">
          <small>Edit order status</small>
          <Form onSubmit={getOrder} className="">
            <Form.Group controlId="formBasicEmail" className="">
              <Form.Label>Order id:</Form.Label>
              <Form.Control type="text" className="w-75" placeholder="Enter order id" onChange={({target}) => setOrderId(target.value)} value={orderId}  />
            </Form.Group>

            <Button variant="primary" type="submit" className="">
              Search Order
            </Button>
          </Form>
          {order && (
            <Form onSubmit={updateOrderSubmit} className="bg-secondary p-2 rounded mt-3">
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Status: </Form.Label>
                <Form.Control as="select" value={status} onChange={({target}) => setStatus(target.value)}>

                  {statuses.map(item => <option key={uuidv4()} value={item}>{item}</option>)}
                  
                </Form.Control>
              </Form.Group>
  
              <Button variant="primary" type="submit" className="">
                Save
              </Button>
            </Form>
          )}
          <div>
            <h3 className="align-self-start mt-3 mb-2">Orders</h3>
              <Accordion>
                {checkedOutOrders.length ? [...checkedOutOrders].reverse().map((order, i) => (
                  <Card className="mb-1" key={order._id} onClick={() => setOrderId(order._id)}>

                    <Card.Header header-tag="header" className="p-1" role="tab">
                      <Accordion.Toggle as={Button} variant="link" eventKey={`${i}`} className="w-100 bg-dark text-light">
                        ORDER: #{order._id} • USER: {order.user_id || 'NOT A REGISTERED USER'} • {new Date(order.updatedAt).toDateString()} <br></br> • TOTAL PRICE: ${totalPrice(order.products)} • ORDER STATUS: {order.status}
                      </Accordion.Toggle>
                    </Card.Header>

                    <Accordion.Collapse eventKey={`${i}`}>
                      <Card.Body>
                        <ListGroup>

                          {order.products.map(({ product, quantity}) => (
                            <ListGroup.Item className="d-flex text-dark" key={product._id}>
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
            </div>

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
