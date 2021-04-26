import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const NotFound = () => {

  const history = useHistory();

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     history.push('/');
  //   }, 2000)

  //   return () => clearTimeout(timeout)
  // }, [history]);

  return (
    <NotFoundContainer className="view d-flex align-items-center justify-content-center flex-column">
      <p className="title mb-0">404</p>
      <p className="text mt-0">
        Page not found
      </p>
    </NotFoundContainer>
  );
}

export default NotFound;

const NotFoundContainer = styled.div`
  .title {
    font-size: 9rem;
  }
  .text {
    font-size: 2rem;
  }
`;