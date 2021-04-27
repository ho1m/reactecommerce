import { Avatar } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import { Button, ListGroup, Overlay, Popover } from 'react-bootstrap';
import styled from 'styled-components';

const UserPopover = () => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(prev => !prev);
    setTarget(event.target);
  };

  const handleHover = (event) => {
    setShow(true);
    setTarget(event.target);
  };

  return (
    <UserPopoverContainer ref={ref} onMouseLeave={() => setShow(false)}>
      <Button onClick={handleClick} onMouseEnter={handleHover} variant="transparent p-0">
        <Avatar />
      </Button>

      <Overlay
        show={show}
        target={target}
        placement="bottom-end"
        container={ref.current}
        containerPadding={20}
      >
        <Popover id="popover-contained" className="w-50 p-1">
          <Popover.Content>

          <div className="user__info">
            <p className="mb-1">Logged in as: <b>username</b></p>
            <p>user@email.com</p>
          </div>
          <ListGroup className="text-center">
            <ListGroup.Item to="/orders">
              {/* <b-icon icon="cart-check-fill" /> */}
              Orders
            </ ListGroup.Item>
            <ListGroup.Item disabled>
              {/* <b-icon icon="tools" /> */}
              Settings
            </ListGroup.Item>
            <ListGroup.Item className="bg-secondary text-light font-weight-bold" onClick={() => console.log("signout")}>Sign Out</ListGroup.Item>
          </ListGroup>

          </Popover.Content>
        </Popover>
      </Overlay>
    </UserPopoverContainer>
  );
}

export default UserPopover;

const UserPopoverContainer = styled.div`
  .MuiAvatar-root {
    width: 35px;
    height: 35px;
  }
`;