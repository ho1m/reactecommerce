import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { adminLogin, adminRegister } from '../../features/admin/adminSlice';


const AdminAuth = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selected, setSelected] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selected === 'Login') {
      dispatch(adminLogin({
        loginData: { email, password }, 
        historyMethod: () => history.push('/admin')
      }))
    } else {
      dispatch(adminRegister({ email, password, setMethod: () => setSelected('Login') }))
    }
  }

  return (
    <div className="view">
      <div className="container">
        <h2>Admin Portal</h2>
        <div className="btns my-3">
          <Button
          onClick={() => setSelected('Login')}
          className={`mr-2 btn-sm ${selected === 'Login' && 'bg-dark'}`}
          >Login</Button>
          <Button
          onClick={() => setSelected('Register')}
          className={`btn-sm ${selected !== 'Login' && 'bg-dark'}`}
          >Register</Button>
        </div>
        <div className="w-75">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={({target}) => setEmail(target.value)} value={email}  />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={({target}) => setPassword(target.value)} value={password}  />
            </Form.Group>

            <Button variant="primary" type="submit">
              {selected}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AdminAuth;
