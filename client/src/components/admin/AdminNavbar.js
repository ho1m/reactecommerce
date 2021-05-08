import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout, selectAdmin } from '../../features/admin/adminSlice';

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const admin = useSelector(selectAdmin);

  const logout = () => {
    dispatch(adminLogout());
    history.push('/');
  }
  
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container">

          <Link to="/" className="navbar-brand flex-fill">
            Dashboard <small>({admin.email})</small>
          </Link>

          <Button className="btn-sm btn-secondary" onClick={logout}>Logout</Button>
        </div>
      </nav>
    </div>
  );
}

export default AdminNavbar;
