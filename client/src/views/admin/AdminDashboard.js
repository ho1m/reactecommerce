import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
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

  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const statuses = ['Processing', 'Sent', 'Delivered'];

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
    dispatch(orderStatusChange({ orderId, status }))
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
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
