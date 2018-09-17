import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Route, Redirect } from 'react-router-dom';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/workerActions';
import withStyles from "@material-ui/core/styles/withStyles";

import Login from './views/Dashboard/Login.jsx';
import DashboardPage from './layouts/Dashboard/Dashboard.jsx';
import dashboardRoutes from "./routes/dashboard.jsx";

import 'bootstrap/dist/css/bootstrap.min.css';
import dashboardStyle from "./assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";


import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";

import image from "./assets/img/sidebar-2.jpg";
import logo from "./assets/img/reactlogo.png";


if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.jwtToken ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
          <div className="container">
            <Route exact path="/login" component={ Login } />
          </div>
          <div>
            <PrivateRoute exact path="/" component={ DashboardPage } />
          </div>
          { localStorage.jwtToken ? (
          <div className={classes.wrapper}>
              <Sidebar
                routes={dashboardRoutes}
                logoText={"Supply Team"}
                logo={logo}
                image={image}
                handleDrawerToggle={this.handleDrawerToggle}
                open={this.state.mobileOpen}
                color="blue"
                {...rest}
              />
            
          
            <div className={classes.mainPanel} ref="mainPanel">
              <Header
                routes={dashboardRoutes}
                handleDrawerToggle={this.handleDrawerToggle}
                {...rest}
              />
              {this.getRoute() ? (
                  <div className={classes.container}>
                    {dashboardRoutes.map((prop, key) => {
                      return <Route path={prop.path} component={prop.component} key={key} />;
                    })}
                  </div>
              ) : (
                <div className={classes.map}></div>
              )}
              {this.getRoute() ? <Footer /> : null}
            </div>

          </div>
          ) : (
              <div className={classes.map}></div>
            )}
        </div>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(App);