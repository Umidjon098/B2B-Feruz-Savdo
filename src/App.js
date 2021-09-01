import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DirektorPage from "./komponents/DirektorPage/DirektorPage";
import CEO from "./komponents/CEO/CEO";
import Omborchi from "./komponents/Omborchi";
import CashierPage from "./komponents/KassirKomponents";
import "./komponents/DirektorPage/styles/salary-style.css";
import "./komponents/DirektorPage/styles/table-style.css";
import "./komponents/DirektorPage/styles/expense.css";
import "./komponents/DirektorPage/styles/chart.css";
import Login from "./komponents/Login";
import "./App.css";
import HR from "./komponents/HR/hr";
import ControlBuyProduct from "./komponents/ControlIncomeProduct/new_role";
import Supervisor from "./komponents/Supervisor/supervisor";
import Sverka from "./komponents/Sverka/sverka";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/director" component={DirektorPage} />
        <Route path="/control_buy_products" component={ControlBuyProduct} />
        <Route path="/hr" component={HR} />
        <Route path="/supervisor" component={Supervisor} />
        <Route path="/ceo" component={CEO} />
        <Route path="/accountant" component={Omborchi} />
        <Route path="/cashier" component={CashierPage} />
        <Route path="/sverka" component={Sverka} />
      </Switch>
    </Router>
    // <PrintThisComponent/>
  );
}
