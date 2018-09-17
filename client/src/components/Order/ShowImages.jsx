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
import Gallery from 'react-grid-gallery';
import Lightbox from 'react-images';
import UploadFile from '../UploadFile/UploadFile.jsx';

class ShowImages extends Component {
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
    const newItem = {
      user_id: this.props.auth.user.user_id,
      username: this.props.auth.user.lastname,
      major: this.props.auth.user.major,
      department: this.props.auth.user.department,
      status: 0,
      type: this.state.selectedType.value
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

  render() {
    const { selectedType } = this.state;
    const { items, order, verify } = this.props.item;
    console.log(this.props);
    var imagess = [];
    if(order[0].image !== undefined) {
      {order[0].image.map((prop, key) => 
        imagess.push({'src':require("../../uploads/" + this.props.orderId + "/" + prop.name), 'thumbnail':require("../../uploads/" + this.props.orderId + "/" + prop.name), width: 3, height: 2})
      )}
    }
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={this.toggle}
        >
          Хавсралтууд
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg">
          <ModalHeader toggle={this.toggle}>Хавсаргасан зураг</ModalHeader>
          <ModalBody>
            <div>
              Механикчийн акт хавсаргах: <UploadFile od_id={order[0].order_id}/>
            </div>
            <div className="clearfix">
              <Gallery images={imagess} onClick={this.openLightbox} />
              <Lightbox images={imagess}
                onClose={this.closeLightbox}
                onClickPrev={this.gotoPrevious}
                onClickNext={this.gotoNext}
                currentImage={this.state.currentImage}
                isOpen={this.state.lightboxIsOpen}
              />
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

ShowImages.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  auth: PropTypes.object.isRequired
};


const mapStateToProps = (state) => ({
    item: state.item,
    auth: state.auth
})

export default connect(mapStateToProps, { addOrder })(withRouter(ShowImages));