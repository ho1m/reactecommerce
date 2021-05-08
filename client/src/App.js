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
import { useSelector } from 'react-redux';
import { selectUser } from './features/appSlice';

import AdminAuth from './views/admin/AdminAuth';
import AdminDashboard from './views/admin/AdminDashboard';
import AdminNavbar from './components/admin/AdminNavbar';
import { selectAdmin } from './features/admin/adminSlice';

function App() {
  const admin = useSelector(selectAdmin);

  return (
    <div className="app">
      {admin ? (
        <Router>
          <AdminNavbar />

          <Switch>
            <Route path="/admin" exact component={AdminDashboard} />
          </Switch>

        </Router>
      ) : 
      (
        <Router>
          <Navbar />

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/checkout/success/:cartId" exact component={Checkout} />
            <Route path="/productpage/view/:productId" exact component={ProductPage} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/admin/auth" exact component={AdminAuth} />
            <ProtectedRoute path="/orders" exact component={Orders} />
            <Route path="*" component={NotFound} />
          </Switch>

          <Footer />
        </Router>
      )}
    </div>
  );
}

const ProtectedRoute = ({component: Component, ...rest}) => {
  const user = useSelector(selectUser);

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
