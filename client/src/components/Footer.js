import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <div className="bg-dark overflow-hidden py-3 pt-4 mt-5" >
      <Container>
      <ul className="p-0 list-unstyled text-light">
        <li className="mb-4 border-bottom">
          <h5>ECOM AB</h5>
        </li>
        <li>
          <p>Policies</p>
        </li>
        <li>
          <p>About Us</p>
        </li>
        <li>
          <p>Cookies</p>
        </li>
      </ul>
      </Container>
    </div>
  );
}

export default Footer;
