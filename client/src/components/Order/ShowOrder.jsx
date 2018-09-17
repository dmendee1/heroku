import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import OrderDetail from "./OrderDetail.jsx";
import OrderList from "../../views/OrderList/OrderList.jsx";
import Log from "../Log/Log.jsx";

const ShowOrder = () => (
  <Router>
    <div>
      <Route exact path="/order" component={OrderList} />
      <Route exact path="/order/:id" component={Child} />
      <Route path="/order/:id/log" component={ChildLog} />
    </div>
  </Router>
);

const Child = ({ match }) => (
  <div>
    <div>
      <OrderDetail
        tableHeaderColor="primary"
        orderId={match.params.id}
      />
    </div>
  </div>
);

const ChildLog = ({ match }) => (
  <div>
    <div>
      <Log
        tableHeaderColor="primary"
        tableHead={[["inputItem[0].id","Захиалгын дугаар", null, "isKey"], ["lastname","Ажилтны нэр"], ["coll","Хэлтэс"], ["modify","Төлөв"], ["verify","Төрөл"],["insertDate","Огноо"]]}
        orderId={match.params.id}
      />
    </div>
  </div>
);

export default ShowOrder;