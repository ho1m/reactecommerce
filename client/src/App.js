import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './views/Home';
import Checkout from './views/Checkout';
import ProductPage from './views/ProductPage';
import Login from './views/Login';
import SignUp from './views/SignUp';
import Orders from './views/Orders';
import NotFound from './views/NotFound';

import './App.css';

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/checkout/success" exact component={Checkout} />
          <Route path="/productpage/view/:productId" exact component={ProductPage} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <ProtectedRoute path="/orders" exact component={Orders} />
          <Route path="*" component={NotFound} />
        </Switch>

        <Footer />
      </Router>
    </div>
  );
}

const ProtectedRoute = ({component: Component, ...rest}) => {
  const user = false;

  return <Route {...rest} render={(props) => {
    if (user) return <Component {...props} />
    return <Redirect 
    to={{
      pathname: '/login', 
      state: { from: props.location }
    }} />
  }}  />
}

export default App;
