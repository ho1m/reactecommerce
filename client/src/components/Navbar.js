import React from 'react';
import StorefrontIcon from '@material-ui/icons/Storefront';
import { Link } from 'react-router-dom';
import UserPopover from './NavPopovers/UserPopover';
import LoginPopover from './NavPopovers/LoginPopover';
import CartPopover from './NavPopovers/CartPopover';
import { Nav } from 'react-bootstrap';

const Navbar = () => {
  const user = true;

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container">

          <Link to="/" className="navbar-brand flex-fill">
            <StorefrontIcon fontSize="large" />
          </Link>


          <Nav className="mr-auto d-flex align-items-center">
            {user ? <UserPopover /> : <LoginPopover />}
            <CartPopover />
          </Nav>

        </div>
      </nav>
    </div>
  );
}

export default Navbar;
