import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container">

          <Link to="/" className="navbar-brand flex-fill">
            Dashboard
          </Link>

          <Button className="btn-sm btn-secondary">Logout</Button>
        </div>
      </nav>
    </div>
  );
}

export default AdminNavbar;
