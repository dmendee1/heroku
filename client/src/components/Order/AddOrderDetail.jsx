import React, { Component } from 'react';
import Select from 'react-select';
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
import PropTypes from "prop-types";
import const_variables from "../../static/const_variables";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { addOrderDetail } from '../../actions/orderActions';
import { connect } from 'react-redux';

class AddOrderDetail extends Component {
  state = {
    modal: false,
    selectedOption: null,
    name: ''
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
      order_id: this.props.orderId,
      product_name: this.state.product_name,
      unit: this.state.selectedOption.value,
      quantity: this.state.quantity,
      technical_specifications: this.state.technical_specifications,
      purpose: this.state.purpose
    };

    this.props.addOrderDetail(newItem);

    this.toggle();
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption.value);
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <div>
        <Button
          color="danger"
          style={{ marginBottom: '2rem' }}
          onClick={this.toggle}
        >
        Сэлбэг нэмэх
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg">
          <ModalHeader toggle={this.toggle}>Add Order</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <div className="row">
                  <div className="col-md-6">
                    <Label for="item">Барааны нэр</Label>
                    <Input
                      type="text"
                      name="product_name"
                      id="item"
                      placeholder="Барааны нэр"
                      onChange={this.onChange}
                      required
                    />
                    <Label for="item">Хэмжээ нэгж</Label>
                    <Select
                      name="unit"
                      value={selectedOption}
                      onChange={this.handleChange}
                      options={const_variables.unit}
                    />
                  </div>
                  <div className="col-md-6">
                    <Label for="item">Захиалах хэмжээ</Label>
                      <Input
                        type="number"
                        name="quantity"
                        id="item"
                        placeholder="Захиалах хэмжээ"
                        onChange={this.onChange}
                        required
                      />
                      <Label for="item">БАҮ-ний тодорхойлолт техникийн үзүүлэлт</Label>
                      <Input
                        type="text"
                        name="technical_specifications"
                        id="item"
                        placeholder="БАҮ-ний тодорхойлолт техникийн үзүүлэлт"
                        onChange={this.onChange}
                        required
                      />
                      <Label for="item">Зориулалт</Label>
                      <Input
                        type="text"
                        name="purpose"
                        id="item"
                        placeholder="Зориулалт"
                        onChange={this.onChange}
                        required
                      />
                  </div>
                </div>
                <Button color="dark" style={{ marginTop: '2rem' }} block>
                  Нэмэх
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

AddOrderDetail.propTypes = {
  orderId: PropTypes.object.string
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { addOrderDetail }
)(AddOrderDetail);