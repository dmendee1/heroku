import React, {Component} from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from 'react-redux';
import Icon from "@material-ui/core/Icon";
import { logoutUser } from '../../actions/workerActions';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import headerStyle from "../../assets/jss/material-dashboard-react/components/headerStyle.jsx";

class Header extends Component {

  onLogout(e) {
      e.preventDefault();
      this.props.logoutUser(this.props.history);
  }

  render() {
      const {isAuthenticated, user} = this.props.auth;
      const authLinks = (
          <ul className="navbar-nav ml-auto">
              <a href="/settings" className="nav-link">
                Сайн уу: {user.lastname}
              </a>
              <a href="" className="nav-link" onClick={this.onLogout.bind(this)}>
                Logout
              </a>
          </ul>
      )
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
          <li className="nav-item">
              <Link className="nav-link" to="/login">Нэвтрэх</Link>
          </li>
      </ul>
    )
      return(
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link className="navbar-brand" to="/"></Link>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  {isAuthenticated ? authLinks : guestLinks}
              </div>
          </nav>
      )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};


const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(withStyles(headerStyle)(Header)));
