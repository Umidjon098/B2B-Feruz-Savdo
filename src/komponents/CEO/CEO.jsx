import React, { Component } from "react";
import { BrowserRouter, Route, Switch, useRouteMatch } from "react-router-dom";
import BuyProducts from "../DirektorPage/components/buyProducts/buyProducts";
import SellProducts from "../DirektorPage/components/sellProducts/sellProducts";
import ClientStats from "../DirektorPage/components/CRM/clientStats";
import SettingSalary from "../DirektorPage/components/HRM/settingSalary";
import FixedSalary from "../DirektorPage/components/HRM/fixedSalary";
import Register from "../DirektorPage/components/HRM/addingStaff";
import AgentReport from "../DirektorPage/components/HRM/agentReport";
import KPI from "../DirektorPage/components/HRM/KPI";
import Expense from "../DirektorPage/components/Moliyaviy_Resurslar/expense";
import Discount from "../DirektorPage/components/discount/discount";
import Sm_Sidebar from "./components/sidebar/sm-sidebar/sm-sidebar";
import Dashboard from "../DirektorPage/components/dashboard/dashboard";
import _Expense from "../DirektorPage/components/Expense/_expense";
import SubmitExpense from "../DirektorPage/components/submitExpense/submitExpense";
class CEO extends Component {
  state = {
    dataUpdate: null,
    notif: true,
    count: true,
    department: "",
    car: "",
    agent: "",
  };

  handleCallback = (childData) => {
    this.setState({ dataUpdate: childData });
  };
  parentNotif = (childData, count) => {
    this.setState({ notif: childData, count });
  };
  handleDepartment = (id) => {
    this.setState({ department: id });
  };
  handleFilterCar = (car) => {
    this.setState({ car });
  };
  handleFilterAgent = (agent) => {
    this.setState({ agent });
  };
  render() {
    return (
      <React.StrictMode>
        <BrowserRouter>
          <Sm_Sidebar
            parentCallback={this.handleCallback}
            count={this.state.count}
            parentNotif={this.parentNotif}
            handleDepartment={this.handleDepartment}
          />
          <div className="main-content-box">
            <Switch>
              <Route exact path={`/ceo/`} component={Dashboard} />
              <Route path={`/ceo/dashboard`} component={Dashboard} />
              <Route path={`/ceo/buy_products`} component={BuyProducts} />
              <Route path={`/ceo/sell_products`} component={SellProducts} />
              <Route path={`/ceo/hrm_dashboard`} component={FixedSalary} />
              <Route path={`/ceo/cilent_stats`} component={ClientStats} />
              <Route path={`/ceo/_expense`} component={_Expense} />
              <Route path={`/ceo/expense`} component={Expense} />
              <Route path={`/ceo/discount`} component={Discount} />
              <Route path={`/ceo/kpi`} component={KPI} />
              <Route path={`/ceo/staff`} component={Register} />
              <Route path={`/ceo/monthly`} component={SettingSalary} />
              <Route path={`/ceo/image_report`} component={AgentReport} />
              <Route path={`/ceo/submite_expense`} component={SubmitExpense} />
            </Switch>
          </div>
        </BrowserRouter>
      </React.StrictMode>
    );
  }
}

export default CEO;
