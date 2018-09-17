import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import const_variables from '../../static/const_variables';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addOrder, uploadDocumentRequest } from '../../actions/orderActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";

class AddOrder extends Component {
  state = {
    modal: false,
    name: ''
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onSubmit = e => {
    e.preventDefault();

    let formData = new FormData();
    const newItem = {
      order_id: this.state.order_id,
      budget_name: this.state.budget_name,
      user_id: this.props.auth.user.user_id,
      username: this.props.auth.user.lastname,
      major: this.props.auth.user.major,
      department: this.props.auth.user.department,
      status: 1,
    };

    console.log(this.props.addOrder(newItem));
    console.log(newItem);

    this.toggle();
    //window.location.href = '/order/'+this.props.auth.user.user_id;
  };

  fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }



  handleType = (selectedType) => {
    this.setState({ selectedType });
    console.log(`Option selected:`, selectedType.value);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { selectedType } = this.state;
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={this.toggle}
        >
          Захиалга нэмэх
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg">
          <ModalHeader toggle={this.toggle}>Захиалга оруулах</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <div className="row">
                  <div className="col-md-6">
                    <Label for="item">Захиалгын төрөл</Label>
                    <Input
                      type="text"
                      name="order_id"
                      id="item"
                      placeholder="Захиалгын дугаар"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <Label for="item">Төсвийн нэр</Label>
                    <Input
                      type="text"
                      name="budget_name"
                      id="item"
                      placeholder="Төсвийн нэр"
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <Button color="dark" style={{ marginTop: '2rem' }} block>
                  Захиалга Нэмэх
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

AddOrder.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  auth: PropTypes.object.isRequired
};


const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { addOrder })(withRouter(AddOrder));