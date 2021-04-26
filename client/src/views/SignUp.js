import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="view d-flex align-items-center justify-content-center flex-column">
      <h3>Sign Up</h3>
      <Form className="w-50 mt-3" autocomplete="off" onSubmit={(e) => e.preventDefault()}>

        <Form.Label className="" for="nameSignupInput">Name:</Form.Label>
        <Form.Control
          v-model="nameInput"
          id="nameSignupInput"
          className="mb-3"
          required
          type="text"
          placeholder="Jane Doe"
          autocomplete="off"
        ></Form.Control>

        <Form.Label className="" for="emailSignupInput">Email:</Form.Label>
        <Form.Control
          v-model="emailInput"
          id="emailSignupInput"
          className="mb-3"
          required
          type="email"
          placeholder="example@gmail.com"
          autocomplete="off"
        ></Form.Control>

        <Form.Label className="" for="passwSignupInput">Password:</Form.Label>
        <Form.Control
          v-model="passwordInput"
          id="passwSignupInput"
          className="mb-3"
          required
          type="password"
          placeholder="password987!"
          autocomplete="off"
        ></Form.Control>

        <Button variant="primary" type="submit">SignUp</Button>
      </Form>
      <Link to="/login">Or login</Link>
    </div>
  );
}

export default SignUp;
