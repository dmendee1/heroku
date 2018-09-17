import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/workerActions';
import classnames from 'classnames';
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Order from "../../components/Order/Order.jsx";
import AddOrder from "../../components/Order/AddOrder.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class Register extends Component {

    constructor(props) {

        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirm: '',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        }
        this.props.registerUser(user, this.props.history);
    }

    render() {
        const { classes } = this.props;
        const { errors } = this.state;
        return(
        <div className="container">
            <div>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader color="info">
                      <h4 className={classes.cardTitleWhite}>Registration</h4>
                      <p className={classes.cardCategoryWhite}>
                      </p>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={ this.handleSubmit }>
                            <div className="form-group">
                                <input
                                type="text"
                                placeholder="Name"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.name
                                })}
                                name="name"
                                onChange={ this.handleInputChange }
                                value={ this.state.name }
                                />
                                {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                            </div>
                            <div className="form-group">
                                <input
                                type="email"
                                placeholder="Email"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.email
                                })}
                                name="email"
                                onChange={ this.handleInputChange }
                                value={ this.state.email }
                                />
                                {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                            </div>
                            <div className="form-group">
                                <input
                                type="password"
                                placeholder="Password"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.password
                                })}
                                name="password"
                                onChange={ this.handleInputChange }
                                value={ this.state.password }
                                />
                                {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                            </div>
                            <div className="form-group">
                                <input
                                type="password"
                                placeholder="Confirm Password"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.password_confirm
                                })}
                                name="password_confirm"
                                onChange={ this.handleInputChange }
                                value={ this.state.password_confirm }
                                />
                                {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">
                                    Register User
                                </button>
                            </div>
                        </form>
                    </CardBody>
                  </Card>
                </GridItem>
              </GridContainer>
            </div>
        </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{ registerUser })(withRouter(withStyles(styles)(Register)))