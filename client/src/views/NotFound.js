import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const NotFound = () => {

  const history = useHistory();

  useEffect(() => {
    const timeout = setTimeout(() => {
      history.push('/');
    }, 2000)

    return () => clearTimeout(timeout)
  }, [history]);

  return (
    <div className="view">
      Not found page
    </div>
  );
}

export default NotFound;
