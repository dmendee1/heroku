import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Worker from "../../components/Worker/Worker.jsx";
import AddWorker from "../../components/Worker/AddWorker.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import PropTypes from "prop-types";
import { connect } from 'react-redux';

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

class WorkerList extends React.Component {
  render() {
    const { classes } = this.props;
    const { user } = this.props.auth;
    return (
       <div>
        {user.authentication > 4 ? (
          <div>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="danger">
                    <h4 className={classes.cardTitleWhite}>Worker List</h4>
                    <p className={classes.cardCategoryWhite}>
                    </p>
                  </CardHeader>
                  <CardBody>
                    <AddWorker />
                    <Worker/>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        ) : (
        <div>
          Та хандах эрхгүй байна.
        </div>
        )}
       </div>
    );
  }
}

WorkerList.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withStyles(styles)(WorkerList));
