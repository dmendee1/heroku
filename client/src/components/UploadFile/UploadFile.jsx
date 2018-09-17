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
import { uploadImageOrder } from '../../actions/orderActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";

class UploadFile extends Component {
  state = {
    modal: false,
    name: '',
    selectedType: null,
    selectedFile: null
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onSubmit = e => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('id', this.props.od_id);
    console.log(this.props.od_id);
    formData.append('image', this.state.selectedFile.name);
    formData.append('user_id', this.props.auth.user.user_id);
    formData.append('selectedFile', this.state.selectedFile);
    formData.append('src', '1233')
    
    console.log(this.state.selectedFile);
    console.log(formData);
    console.log(this.props.uploadImageOrder(formData));

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

  render() {
    const { selectedType } = this.state;
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={this.toggle}
        >
          Зураг оруулах
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg">
          <ModalHeader toggle={this.toggle}>Захиалга оруулах</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <div className="row">
                  <div className="col-md-6">
                    <Label for="item">Захиалгад хавсаргах материал{this.props.od_id}</Label>
                    <input type="file" name="selectedFile" onChange={this.fileSelectedHandler} />
                  </div>
                </div>
                <Button color="dark" style={{ marginTop: '2rem' }} block>
                  Зураг хавсаргах
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

UploadFile.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  auth: PropTypes.object.isRequired
};


const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { uploadImageOrder })(withRouter(UploadFile));