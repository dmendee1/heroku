import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import tableStyle from "../../assets/jss/material-dashboard-react/components/tableStyle";
import { getWorkers, deleteWorker } from '../../actions/workerActions';
import { connect } from 'react-redux';
import const_variables from '../../static/const_variables';

var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable; 
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
var ExportCSVButton = ReactBsTable.ExportCSVButton;

const cellEditProp = {
  mode: 'dbclick',
  blurToSave: true
};

function renderShowsTotal(start, to, total) {
  return (
    <p style={ { color: 'blue' } }>
      From { start } to { to }, totals is { total }&nbsp;&nbsp;(its a customize text)
    </p>
  );
}

const selectRowProp = {
  mode: 'checkbox'
};
class Worker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
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
        props.deleteWorker(key)
      );
    }
  }
  componentDidMount() {
    this.props.getWorkers();
  }
  
  render() {
    const { items } = this.props.item;
    const { isLoading } = this.props;
    console.log(this.props);
    if(isLoading) {
      return (<div>Loading</div>);
    }
    return (
      <div>
        <BootstrapTable ref='table' data={ items } pagination={ true } loading={true} deleteRow={ true } selectRow={ selectRowProp }  search={true} cellEdit={cellEditProp} options={ this.options } exportCSV>
          <TableHeaderColumn dataField='_id' isKey filter={ { type: 'TextFilter', delay: 1000 } } dataSort={ true }>Ажилтаны ID</TableHeaderColumn>
          <TableHeaderColumn dataField='lastname' filter={ { type: 'TextFilter', delay: 1000 } } dataSort={ true }>Нэр</TableHeaderColumn>
          <TableHeaderColumn dataField='major' filter={ { type: 'TextFilter', delay: 1000 } } dataSort={ true }>Мэргэжил</TableHeaderColumn>
          <TableHeaderColumn dataField='department' filter={ { type: 'TextFilter', delay: 1000 } } editable={ { type: 'select', readOnly: false, options: { text: const_variables.departments }} }>Хэлтэс</TableHeaderColumn>
          <TableHeaderColumn dataField='authentication' filter={ { type: 'TextFilter', delay: 1000 } } >Эрх</TableHeaderColumn>
          <TableHeaderColumn dataField='username' filter={ { type: 'TextFilter', delay: 1000 } } dataSort={ true }>Нэвтрэх нэр</TableHeaderColumn>
          <TableHeaderColumn dataField='insertDate' filter={ { type: 'TextFilter', delay: 1000 } } editable={{type: 'date', readOnly: true}}>Бүртгэсэн огноо</TableHeaderColumn>
        </BootstrapTable>
        </div>
      );
  }
}

const mapStateToProps = state => ({
  item: state.item
});
export default connect(
  mapStateToProps,
  { getWorkers, deleteWorker }
)(withStyles(tableStyle)(Worker));