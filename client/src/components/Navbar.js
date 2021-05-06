import React from 'react';
import StorefrontIcon from '@material-ui/icons/Storefront';
import { Link, useHistory } from 'react-router-dom';
import UserPopover from './NavPopovers/UserPopover';
import LoginPopover from './NavPopovers/LoginPopover';
import CartPopover from './NavPopovers/CartPopover';
import { Button, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/appSlice';

const Navbar = () => {
  const history = useHistory();
  const user = useSelector(selectUser);

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container">

          <Link to="/" className="navbar-brand flex-fill">
            <StorefrontIcon fontSize="large" />
          </Link>


          {!user && 
            <Button
            className="mr-4 btn-sm btn-dark"
            onClick={() => history.push('/admin/auth')}
            >
              Admin
            </Button>
          }

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
