import React, { useRef, useState } from 'react';
import { Popover, Overlay, Button, Badge } from 'react-bootstrap';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import styled from 'styled-components';

const CartPopover = () => {
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
    <CartPopoverContainer ref={ref} onMouseLeave={() => setShow(false)} className="ml-4">
      <Button onClick={handleClick} onMouseEnter={handleHover} variant="transparent">
        <ShoppingCartOutlinedIcon />
        <Badge variant="secondary">0</Badge>
      </Button>

      <Overlay
        show={show}
        target={target}
        placement="bottom-end"
        container={ref.current}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Title as="h3">Popover bottom</Popover.Title>
          <Popover.Content>
            <strong>Holy guacamole!</strong> Check this info.
          </Popover.Content>
        </Popover>
      </Overlay>
    </CartPopoverContainer>
  );
}

export default CartPopover;

const CartPopoverContainer = styled.div`

`;