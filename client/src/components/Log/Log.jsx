import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import tableStyle from "../../assets/jss/material-dashboard-react/components/tableStyle";
import { getLog, getOrderInformation } from '../../actions/orderActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Icon from "@material-ui/core/Icon";
import Gallery from 'react-grid-gallery';

var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable; 
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

function detailFormatter(cell, row, id) {
  var holder = "/order/" + cell;
  return <Link to={holder}><Icon>details</Icon></Link>;
}

function noFormatter(cell, row, id) {
  return cell;
}

class CustomTable extends React.Component {
  constructor(props) {
    super(props);

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
      showSelectedOnlyBtn: this.createCustomShowSelectButton
    };
  }

  componentDidMount() {
    this.props.getLog(this.props.orderId);
  }
  render() {
    const { classes, tableHead, tableConfig, tableHeaderColor } = this.props;
    const { items, order } = this.props.item;
    const { user } = this.props.auth;
    return (
      <div>
        <BootstrapTable ref='table' data={ items } pagination={ true } search={true} options={ 
        this.options } exportCSV>
          {tableHead.map((prop, key) => {
            return(
              <TableHeaderColumn dataField={prop[0]} width={prop[2] != null ? "50px" : "auto"} filter={prop[2] == null ? {type: 'TextFilter', delay: 500 } : false} isKey={prop[3] === "isKey" ? true : false} dataFormat={prop[2] != null ? detailFormatter : noFormatter } >{prop[1]}</TableHeaderColumn>
            )
          })}
        </BootstrapTable>
      </div>
    );
  }
}
CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  item: PropTypes.object.isRequired,
  tableConfig: PropTypes.arrayOf(PropTypes.string)
};


const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getLog, getOrderInformation }
)(withStyles(tableStyle)(CustomTable));
