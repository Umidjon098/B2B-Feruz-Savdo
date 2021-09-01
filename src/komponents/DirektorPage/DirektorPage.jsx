import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BuyProducts from "./components/buyProducts/buyProducts";
import SellProducts from "./components/sellProducts/sellProducts";
import ClientStats from "./components/CRM/clientStats";
import SettingSalary from "./components/HRM/settingSalary";
import FixedSalary from "./components/HRM/fixedSalary";
import Register from "./components/HRM/addingStaff";
import AgentReport from "./components/HRM/agentReport";
import KPI from "./components/HRM/KPI";
import Expense from "./components/Moliyaviy_Resurslar/expense";
import Discount from "./components/discount/discount";
import Sm_Sidebar from "./components/sidebar/sm-sidebar/sm-sidebar";
import Dashboard from "./components/dashboard/dashboard";
import _Expense from "./components/Expense/_expense";
import SubmitExpense from "./components/submitExpense/submitExpense";
import CreateProduct from "./components/Products/create_products";
import CreateDepartment from "./components/Products/create-department";
import CreateTerritory from "./components/Products/territory-create";
import CraeteCarLine from "./components/Products/create_car_line";
import CreateCategory from "./components/Products/create_category";
import Notification from "./components/notification/notification";
import CreatePriceType from "./components/create_price/create_price_type";
import CreateIncomePrice from "./components/create_price/income_price";
import CreateOutcomePrice from "./components/create_price/outcome_price";
import AgentPartner from "./components/CRM/agent-partner";
import Parent from "./components/CRM/addClient";
import CreateProvider from "./components/CRM/create_provider";
import SubmitReturnedProduct from "./components/Products/approve_returned_product";
import SubmitProducts from "./components/Products/submit_product";
import AgentPercent from "./components/HRM/agent_percent";
import Group from "./components/Products/group";
import ProductDiscount from "./components/discount/productDiscount";

class DirektorPage extends Component {
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
    console.log(id);
    this.setState({ department: id });
  };
  handleFilterCar = (car) => {
    this.setState({ car });
  };
  handleFilterAgent = (agent) => {
    this.setState({ agent });
  };
  render() {
    const { path, url } = this.props.match;
    return (
      <React.StrictMode>
        <Router>
          <Sm_Sidebar
            url={url}
            parentCallback={this.handleCallback}
            count={this.state.count}
            parentNotif={this.parentNotif}
            handleDepartment={this.handleDepartment}
          />
          <div
            className={
              this.state.dataUpdate
                ? "main-content-box toggle"
                : "main-content-box "
            }
          >
            <Notification
              notif={this.state.notif}
              parentNotif={this.parentNotif}
              count={this.state.count}
            />
            <Switch>
              <Route exact path={path} component={Dashboard} />
              <Route path={`${path}/dashboard`} component={Dashboard} />
              <Route path={`${path}/buy_products`} component={BuyProducts} />
              <Route path={`${path}/sell_products`} component={SellProducts} />
              <Route exact path={`${path}/group`} component={Group} />
              <Route
                path={`${path}/create_department`}
                component={CreateDepartment}
              />
              <Route
                path={`${path}/create_territory`}
                children={
                  <CreateTerritory
                    handleFilterCar={this.handleFilterCar}
                    handleFilterAgent={this.handleFilterAgent}
                    car={this.state.car}
                    agent={this.state.agent}
                  />
                }
              />
              <Route
                path={`${path}/create_category`}
                children={<CreateCategory department={this.state.department} />}
              />
              <Route
                path={`${path}/create_price_type`}
                component={CreatePriceType}
              />
              <Route
                path={`${path}/income_price_create`}
                component={CreateIncomePrice}
              />
              <Route
                path={`${path}/outcome_price_create`}
                component={CreateOutcomePrice}
              />
              <Route
                path={`${path}/create_agent_partner`}
                component={AgentPartner}
              />
              <Route
                path={`${path}/create_product`}
                component={CreateProduct}
              />
              <Route
                path={`${path}/returned_product`}
                component={SubmitReturnedProduct}
              />
              <Route
                path={`${path}/submit_products`}
                component={SubmitProducts}
              />
              <Route
                path={`${path}/create_provider`}
                component={CreateProvider}
              />
              <Route
                path={`${path}/create_car_line`}
                component={CraeteCarLine}
              />
              <Route path={`${path}/hrm_dashboard`} component={FixedSalary} />
              <Route path={`${path}/cilent_stats`} component={ClientStats} />
              <Route path={`${path}/add_client`} component={Parent} />
              <Route path={`${path}/agent_percent`} component={AgentPercent} />
              <Route path={`${path}/_expense`} component={_Expense} />
              <Route path={`${path}/expense`} component={Expense} />
              <Route path={`${path}/discount`} component={Discount} />
              <Route
                path={`${path}/productdiscount`}
                component={ProductDiscount}
              />

              <Route path={`${path}/kpi`} component={KPI} />
              <Route path={`${path}/staff`} component={Register} />
              <Route path={`${path}/monthly`} component={SettingSalary} />
              <Route path={`${path}/image_report`} component={AgentReport} />
              <Route
                path={`${path}/submite_expense`}
                component={SubmitExpense}
              />
              <Route
                path={`${path}/settings_salary`}
                component={SettingSalary}
              />
            </Switch>
          </div>
        </Router>
      </React.StrictMode>
    );
  }
}

export default DirektorPage;
