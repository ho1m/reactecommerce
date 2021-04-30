import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { register } from '../features/appSlice';

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({
      registerData: { email, password, name },
      historyMethod: history.push('/') 
    }))
  }

  return (
    <div className="view d-flex align-items-center justify-content-center flex-column">
      <h3>Sign Up</h3>
      <Form className="w-50 mt-3" autoComplete="off" onSubmit={handleSubmit}>

        <Form.Label className="" htmlFor="nameSignupInput">Name:</Form.Label>
        <Form.Control
          v-model="nameInput"
          id="nameSignupInput"
          className="mb-3"
          required
          type="text"
          placeholder="Jane Doe"
          autoComplete="off"
        ></Form.Control>

        <Form.Label className="" htmlFor="emailSignupInput">Email:</Form.Label>
        <Form.Control
          v-model="emailInput"
          id="emailSignupInput"
          className="mb-3"
          required
          type="email"
          placeholder="example@gmail.com"
          autoComplete="off"
        ></Form.Control>

        <Form.Label className="" htmlFor="passwSignupInput">Password:</Form.Label>
        <Form.Control
          v-model="passwordInput"
          id="passwSignupInput"
          className="mb-3"
          required
          type="password"
          placeholder="password987!"
          autoComplete="off"
        ></Form.Control>

        <Button variant="primary" type="submit">Sign Up</Button>
      </Form>
      <Link to="/login">Or login</Link>
    </div>
  );
}

export default SignUp;
