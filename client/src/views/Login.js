import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../features/appSlice';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const historyPush = () => {
    try {history.push(history.location.state.from.pathname)}
    catch {history.push('/')}
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({
      loginData: { email, password }, 
      historyMethod: historyPush
    }))
  }

  return (
    <div className="view d-flex align-items-center justify-content-center flex-column">
      <h3>Login</h3>
      <Form className="w-50 mt-3" autoComplete="off" onSubmit={handleSubmit}>

        <Form.Label className="" htmlFor="emailSignupInput">Email:</Form.Label>
        <Form.Control
          value={email}
          onChange={({target}) => setEmail(target.value)}
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
          value={password}
          onChange={({target}) => setPassword(target.value)}
          v-model="passwordInput"
          id="passwSignupInput"
          className="mb-3"
          required
          type="password"
          placeholder="password987!"
          autoComplete="off"
        ></Form.Control>

        <Button variant="primary" type="submit">Login</Button>
      </Form>
      <Link to="/signup">Or Sign Up</Link>
    </div>
  );
}

export default Login;
