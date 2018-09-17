import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import tableStyle from "../../assets/jss/material-dashboard-react/components/tableStyle";
import axios from 'axios';
import { getFilters, getVerifys, getOrderInformation, deleteOrderDetail, updateOrderDetail, changeOrderStatus } from '../../actions/orderActions';
import AddOrderDetail from './AddOrderDetail.jsx';
import { connect } from 'react-redux';
import TableList from '../../views/TableList/TableList.jsx';
import Icon from "@material-ui/core/Icon";
import Select from 'react-select';
import const_variables from '../../static/const_variables';
import UploadFile from '../UploadFile/UploadFile.jsx';
import Uploader from '../Uploader/Uploader.jsx';
import ShowImages from './ShowImages.jsx';
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
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable; 
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

const selectRowProp = {
  mode: 'checkbox'
};

function renderShowsTotal(start, to, total) {
  return (
    <p style={ { color: 'blue' } }>
      From { start } to { to }, totals is { total }&nbsp;&nbsp;(its a customize text)
    </p>
  );
}

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

class OrderDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = { currentImage: 0 };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);

    this.state = {
      isLoading: true,
      errormsg: ''
    }

    this.options = {
      exportCSVText: 'Эксел рүү хөрвүүлэх',
      afterDeleteRow: onAfterDeleteRow,
      deleteText: 'Устгах',
      clearSearch: true,
      page: 1,
      sizePerPageList: [ {
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }],
      sizePerPage: 5,
      pageStartIndex: 1,
      paginationSize: 5,
      prePage: 'Prev',
      nextPage: 'Next',
      firstPage: 'First',
      lastPage: 'Last',
      paginationTotalRenderer: renderShowsTotal,
      paginationPosition: 'top',
      extendableY: true
    };
    function onAfterDeleteRow(rowKeys) {
      rowKeys.map((key)=>
        props.deleteOrderDetail(key)
      );
      alert('The rowkey you drop: ' + rowKeys);
    };
  }
  cellEditProp = { 
    mode: 'click', 
    blurToSave: true,
    afterSaveCell: this.onAfterSaveCell
  }
  onAfterSaveCell(row, cellName, cellValue) {
    console.log('Hello');
    const updateOrderDetailData = {
      "id": row._id,
      "field": cellName,
      "value": cellValue
    }
    axios.post('/api/orderDetail/update', updateOrderDetailData).then(res=> res.json);
  };
  onChangeStatus(e) {
    e.preventDefault();
    const doc = {'order_id':this.props.orderId, user_id: this.props.auth.user.user_id, lastname:this.props.auth.user.lastname, 'authentication':this.props.auth.user.authentication};
    if(this.props.item.items.length > 0) {
      this.props.changeOrderStatus(doc);
      window.location.href = '/order';
    } else {
      this.setState({
        errormsg: 'Та сэлбэг оруулаагүй байна'
      })
    }
  }
  onSuccess(e) {
    e.preventDefault();
    const doc = {'order_id': this.props.orderId, user_id: this.props.auth.user.user_id, lastname: this.props.auth.user.lastname, 'authentication': this.props.auth.user.authentication};
    this.props.changeOrderStatus(doc);
    window.location.href = '/order';
  }
  onCancelStatus(e) {
    e.preventDefault();
    const doc = {'order_id':this.props.orderId, user_id: this.props.auth.user.user_id, lastname:this.props.auth.user.lastname, 'authentication':-1};
    if(this.props.item.items.length > 0) {
      this.props.changeOrderStatus(doc);
      window.location.href = '/order';
    } else {
      this.setState({
        errormsg: 'Та сэлбэг оруулаагүй байна'
      })
    }
  }
  componentDidMount() {
    const order_fil = {'order_id':this.props.orderId, 'authentication':this.props.auth.user.authentication};
    this.props.getFilters(this.props.orderId)
    this.props.getVerifys(order_fil);
    this.props.getOrderInformation(order_fil);
  }

  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }
  render() {
      const { user } = this.props.auth;
      const { items, order, verify } = this.props.item;
      console.log(this.props);
      if(order !== undefined) {
        console.log(order[0])
        console.log(this.props);
        return (
          <div>
            <div>
              <div className="row container">
                <div>
                  {user.authentication === 1 && user.authentication === order[0].status ? <AddOrderDetail orderId={this.props.orderId}/> : ''}
                </div>
                <div>
                  {user.authentication === order[0].status && user.authentication < 8 && user.authentication >= 1 ? <a link="" className="btn btn-success" onClick={this.onChangeStatus.bind(this)}> Баталгаажуулах </a> : ""}
                </div>
                <div>
                  {user.authentication === order[0].status && user.authentication == 8 ? <a link="" className="btn btn-success" onClick={this.onSuccess.bind(this)}> Төсөв батлагдсан </a> : ""}
                </div>
                <div>
                  {user.authentication === order[0].status && user.authentication < 6 && user.authentication >= 1 ? <a link="" className="btn btn-warning" onClick={this.onCancelStatus.bind(this)}> Цуцлах </a> : ""}
                </div>
                <div>
                  {user.authentication >= 10 ? <a link="" className="btn btn-success" onClick={this.onCancelStatus.bind(this)}> Дэлгэрэнгүй мэдээлэл </a> : ""}
                </div>
                <div>
                  {user.authentication >= 10 ? <Link to={`/order/` + this.props.orderId + `/log` } className="btn btn-info"> Log мэдээлэл </Link> : ""}
                </div>
                <div>
                  <Link to={`/order`} className="btn btn-info"> Буцах </Link>
                </div>
              </div>
            </div>
              <div className="row container">
                <div>
                  Захиалгын дугаар:
                  <Input type="text" value={order[0].order_id} disabled />
                </div>
                <div>
                  Төлөв:
                  <Input type="text" value={order[0].status} disabled />
                </div>
              </div>
              <div>
                {this.state.errormsg}
              </div>
              <BootstrapTable data={ items } pagination={ true } deleteRow={ user.authentication === 0 && user.authentication === order[0].status ? true : false } cellEdit={ user.authentication === 3 || user.authentication === 4 || user.authentication === 8 ? this.cellEditProp : '' } search={true} options={ this.options } selectRow={selectRowProp} exportCSV>
                <TableHeaderColumn dataField='_id' isKey width="0px" export={false} tdStyle={ { whiteSpace: 'normal' } }>#</TableHeaderColumn>
                <TableHeaderColumn dataField='product_code' filter={ {type: 'TextFilter', delay: 500 } } width="200px">Барааны код</TableHeaderColumn>
                <TableHeaderColumn dataField='spare_parts_code' filter={ {type: 'TextFilter', delay: 500 } } width="200px">Сэлбэгийн код</TableHeaderColumn>
                <TableHeaderColumn dataField='product_name' filter={ {type: 'TextFilter', delay: 500 } } editable={ { type: 'textarea', readOnly: true } } tdStyle={ { whiteSpace: 'normal' } } width="250px">БАРАА, АЖИЛ, ҮЙЛЧИЛГЭЭ (БАҮ)-НИЙ НЭР ТӨРӨЛ</TableHeaderColumn>
                <TableHeaderColumn dataField='unit' filter={ {type: 'TextFilter', delay: 500 } } editable={ { type: 'textarea', readOnly: true } } tdStyle={ { whiteSpace: 'normal' } } width="100px">ХЭМЖИХ НЭГЖ</TableHeaderColumn>
                <TableHeaderColumn dataField='residuals' filter={ {type: 'TextFilter', delay: 500 } } editable={ { type: 'number' } } tdStyle={ { whiteSpace: 'normal' } } width="100px">АГУУЛАХЫН ҮЛДЭГДЭЛ</TableHeaderColumn>
                <TableHeaderColumn dataField='quantity' filter={ {type: 'TextFilter', delay: 500 } } editable={ { type: 'number', readOnly: true } } tdStyle={ { whiteSpace: 'normal' } } width="100px">ЗАХИАЛСАН ХЭМЖЭЭ</TableHeaderColumn>
                <TableHeaderColumn dataField='technical_specifications' filter={ {type: 'TextFilter', delay: 500 } } editable={ { type: 'textarea', readOnly: true } } tdStyle={ { whiteSpace: 'normal' } } width="250px">БАҮ-НИЙ ТОДОРХОЙЛОЛТ ТЕХНИКИЙН ҮЗҮҮЛЭЛТ</TableHeaderColumn>
                <TableHeaderColumn dataField='purpose' filter={ {type: 'TextFilter', delay: 500 } } tdStyle={ { whiteSpace: 'normal' } }  editable={ { readOnly: true } } width="250px">ЗОРИУЛАЛТ</TableHeaderColumn>
                            
              </BootstrapTable>
                <ShowImages orderId={order[0].order_id}/>
              <div className="clearfix">
                <BootstrapTable data={ verify } search={true}>
                  <TableHeaderColumn dataField='order_id' filter={ {type: 'TextFilter', delay: 500 } }>Захиалгын дугаар</TableHeaderColumn>
                  <TableHeaderColumn dataField='lastname' filter={ {type: 'TextFilter', delay: 500 } }>Хэрэглэгч</TableHeaderColumn>
                  <TableHeaderColumn dataField='verify_text' filter={ {type: 'TextFilter', delay: 500 } }>Төлөв</TableHeaderColumn>
                  <TableHeaderColumn dataField='insertDate' filter={ {type: 'TextFilter', delay: 500 } }  editable={ { type: 'textarea', readOnly: true } } tdStyle={ { whiteSpace: 'normal' } }>Огноо</TableHeaderColumn>
                  <TableHeaderColumn dataField='_id' isKey width="0px" export={false} tdStyle={ { whiteSpace: 'normal' } }>#</TableHeaderColumn>
                </BootstrapTable>
              </div>
          </div>
        );
      }
      return(
        <div>Loading ...</div>
      )
  }  
}

OrderDetail.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getFilters, getVerifys, getOrderInformation, deleteOrderDetail, updateOrderDetail, changeOrderStatus }
)(withStyles(tableStyle)(OrderDetail));