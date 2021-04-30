import React, { useRef, useState } from 'react';
import { Popover, Overlay, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../features/appSlice';

const LoginPopover = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({
      loginData: { email, password }, 
    }))
  }

  const handleClick = (event) => {
    setShow(prev => !prev);
    setTarget(event.target);
  };

  const handleHover = (event) => {
    setShow(true);
    setTarget(event.target);
  };

  return (
    <div ref={ref} onMouseLeave={() => setShow(false)}>
      <Button onClick={handleClick} onMouseEnter={handleHover} variant="transparent border">Login</Button>

      <Overlay
        show={show}
        target={target}
        placement="bottom-end"
        container={ref.current}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Title as="h3">Login to your account here</Popover.Title>
          <Popover.Content>

            <Form onSubmit={(e) => e.preventDefault()}>
              <Form.Label className="sr-only" htmlFor="emailLoginInput">Email</Form.Label>
              <Form.Control
                id="emailLoginInput"
                className="mb-2"
                required
                type="email"
                placeholder="Email"
              ></Form.Control>

              <Form.Label className="sr-only" htmlFor="passwLoginInput">Password</Form.Label>
              <Form.Control
                id="passwLoginInput"
                className="mb-2"
                required
                type="password"
                placeholder="Password"
              ></Form.Control>

              <Button variant="primary" type="submit" className="my-2">Login</Button>
            </Form>
            <Link to="/signup">or Sign Up here.</Link>

          </Popover.Content>
        </Popover>
      </Overlay>
    </div>
  );
}

export default LoginPopover;
