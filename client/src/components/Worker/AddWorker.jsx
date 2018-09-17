import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  FormGroup,
  Input
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { registerUser } from '../../actions/workerActions';
import { connect } from 'react-redux';
import const_variables from '../../static/const_variables';
import classnames from 'classnames';

class AddWorker extends Component {
  state = {
    modal: false,
    name: '',
    selectedAuth: null,
    selectedDepartment: null,
    errors: {}
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newItem = {
      user_id: this.state.user_id,
      lastname: this.state.lastname,
      department: this.state.selectedDepartment.value,
      authentication: this.state.selectedAuth.value,
      major: this.state.major,
      username: this.state.username,
      password: this.state.password
    };

    console.log(this.state.authentication);
    console.log(this.state.department)

    // Add item via addItem action
    this.props.registerUser(newItem);
    console.log(newItem);

    // Close modal
    this.toggle();
  };

  handleAuth = (selectedAuth) => {
    this.setState({ selectedAuth });
    console.log(`Option selected:`, selectedAuth.value);
  }
  handleDepartment = (selectedDepartment) => {
    this.setState({ selectedDepartment });
    console.log(`Option selected:`, selectedDepartment.value);
  }

  render() {
    const {errors} = this.state;
    const { selectedAuth, selectedDepartment } = this.state;
    return (
      <div>
        <Button
          color="info"
          style={{ marginBottom: '2rem' }}
          onClick={this.toggle}
        >
          Add Worker
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add Order</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Ажилтаны ID</Label>
                <Input
                  type="text"
                  name="user_id"
                  id="item"
                  placeholder="Ажилтаны ID"
                  onChange={this.onChange}
                />
                <Label for="item">Нэр</Label>
                <Input
                  type="text"
                  name="lastname"
                  id="item"
                  placeholder="Нэр"
                  onChange={this.onChange}
                />
                <Label for="item">Хэлтэс</Label>
                <Select
                  name="department"
                  value={selectedDepartment}
                  onChange={this.handleDepartment}
                  options={const_variables.departments}
                />
                <Label for="item">Албан тушаал</Label>
                <Input
                  type="text"
                  name="major"
                  id="item"
                  placeholder="Албан тушаал"
                  onChange={this.onChange}
                />
                <Label for="item">Хэрэглэгчийн эрх</Label>
                <Select
                  name="authentication"
                  value={selectedAuth}
                  onChange={this.handleAuth}
                  options={const_variables.authentication}
                />
                <Label for="item">Нэвтрэх нэр</Label>
                <Input
                  type="text"
                  name="username"
                  id="item"
                  placeholder="Нэвтрэх нэр"
                  onChange={this.onChange}
                />
                <Label for="item">Нууц үг</Label>
                <Input
                  type="password"
                  name="password"
                  id="item"
                  placeholder="Нууц үг"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: '2rem' }} block>
                  Ажилтан нэмэх
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}


AddWorker.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(AddWorker);