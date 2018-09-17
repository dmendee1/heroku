import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Icon from "@material-ui/core/Icon";

import tableStyle from "../../assets/jss/material-dashboard-react/components/tableStyle";
import { getOrders, getOrder, updateOrderStatus } from '../../actions/orderActions';
import { connect } from 'react-redux';
import const_variables from '../../static/const_variables';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

function editFormatter(cell, row, id) {
  var holder = "/order/" + cell;
  return <Link to={holder}><Icon>details</Icon></Link>;
}

function departmentFormatter(cell, row, id) {  
  if(cell != null)
    return const_variables.departments[cell].label;
}

function statusFormatter(cell, row, id) {  
  if(cell != null)
    return const_variables.status[cell].label;
}

function priceFormatter(cell, row, id) {  
  var nf = new Intl.NumberFormat();
  if(cell != null)
    return "₮ " + nf.format(cell) + ".00";
}

class BSTable extends React.Component {
  
  cellEditProp = { 
    mode: 'click', 
    blurToSave: true,
    beforeSaveCell: this.onBeforeSaveCell
  }

  onBeforeSaveCell(row, cellName, cellValue) {
    console.log(cellValue);
    const updateOrderDetailData = {
      "id": row.order_id,
      "field": cellName,
      "value": cellValue
    }
    console.log(row[cellName]);
    if(row[cellName] === cellValue) {
    } else {
      axios.post('/api/orders/update', updateOrderDetailData).then(res=> res.json);
    }
  } 
  render() {
    if (this.props.data) {
      return (
        <BootstrapTable data={ this.props.data } cellEdit={this.cellEditProp}>
          <TableHeaderColumn dataField='order_id' width="0px" isKey>Field B</TableHeaderColumn>
          <TableHeaderColumn dataField='working' editable={ { type: 'textarea' } } tdStyle={ { whiteSpace: 'normal' } }>Хийгдэх ажил</TableHeaderColumn>
          <TableHeaderColumn dataField='during' editable={ { type: 'textarea' } } tdStyle={ { whiteSpace: 'normal' } }>Хугацаа</TableHeaderColumn>
          <TableHeaderColumn dataField='budget' editable={ { type: 'number' } } tdStyle={ { whiteSpace: 'normal' } } dataFormat={priceFormatter}>Төсөв</TableHeaderColumn>
          <TableHeaderColumn dataField='result' editable={ { type: 'textarea' } } tdStyle={ { whiteSpace: 'normal' } }>Үр дүн</TableHeaderColumn>
        </BootstrapTable>);
    } else {
      return (<p>?</p>);
    }
  }
}

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
    this.options = {
      exportCSVText: 'Эксел рүү хөрвүүлэх',
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
      paginationPosition: 'top',
      extendableY: true,
      showSelectedOnlyBtn: this.createCustomShowSelectButton,
      expandRowBgColor: 'rgb(242, 255, 163)'
    };
  }
  typeFormatter(cell, row, id) {
    if(cell != null)
      return const_variables.ordertype[cell].label;
  }

  rowClassNameFormat(row, rowIdx) {
    switch(row.status) {
      case 0:
        return 'bg-danger text-white';
      case 1:
        return 'bg-light text-black';
      case 11:
        return 'bg-success text-white';
      default:
        return '';
    }
  }

  componentDidMount() {
    this.props.getOrders(this.props.auth.user);
  }
  isExpandableRow(row) {
    if (row.status > 8) return true;
    else return false;
  }

  expandComponent(row) {
    var dt = [{"order_id":row.order_id, "working":row.working, "during":row.during, "budget":row.budget, "result":row.result}];
    return (
      <BSTable data={ dt } />
    );
  }

  expandColumnComponent({ isExpandableRow, isExpanded }) {
    let content = '';

    if (isExpandableRow) {
      content = (isExpanded ? '(-)' : '(+)' );
    } else {
      content = ' ';
    }
    return (
      <div> { content } </div>
    );
  }
  render() {
    const { user } = this.props.auth;
    const { items, loading } = this.props.item;
    console.log(this.props);
    if(this.state.isLoading) {
      return (
        <div>
          <BootstrapTable 
          version='4' 
          ref='table' 
          data={ items } 
          pagination={ true } 
          loading={true} 
          search={true} 
          options={ this.options } 
          trClassName={this.rowClassNameFormat}
          expandableRow={ this.isExpandableRow }
          expandComponent={ this.expandComponent }
          expandColumnOptions={ {
            expandColumnVisible: true,
            expandColumnComponent: this.expandColumnComponent,
            columnWidth: 50
          } }
          exportCSV>
            <TableHeaderColumn dataField='order_id' width="50px" dataFormat={editFormatter} export={false} >#</TableHeaderColumn>
            <TableHeaderColumn dataField='order_id' filter={ {type: 'TextFilter', delay: 500 } } isKey columnTitle dataSort={ true }>ЗАХИАЛГА ДУГААР</TableHeaderColumn>
            <TableHeaderColumn dataField='budget_name' filter={ {type: 'TextFilter', delay: 500 } } columnTitle dataSort={ true }>ТӨСВИЙН НЭР</TableHeaderColumn>
            <TableHeaderColumn dataField='username' filter={ {type: 'TextFilter', delay: 500 } } dataSort={ true }> АЖИЛТАНЫ НЭР</TableHeaderColumn>
            <TableHeaderColumn dataField='department' filter={ {type: 'SelectFilter', options: const_variables.departments_label } } dataFormat={departmentFormatter} dataSort={ true }>ХЭЛТЭС</TableHeaderColumn>
            <TableHeaderColumn dataField='status' filter={ {type: 'SelectFilter', options: const_variables.status_labels } } dataFormat={statusFormatter} width="250px" dataSort={ true }>ТӨЛӨВ</TableHeaderColumn>
            <TableHeaderColumn dataField='insertDate' dataSort={ true }>Огноо</TableHeaderColumn>
          </BootstrapTable>
        </div>
      );
    } else {
      return (
        <div>
          Loading ...
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  item: state.item,
  filter: state.filter,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getOrders, getOrder, updateOrderStatus }
)(withStyles(tableStyle)(Order));