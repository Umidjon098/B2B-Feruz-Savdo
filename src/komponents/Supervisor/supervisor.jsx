import React, { Component } from "react";
import { BrowserRouter, Route, Switch, useRouteMatch } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Sm_Sidebar from "./components/sidebar/sm-sidebar/sm-sidebar";

class Supervisor extends Component {
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
    // console.log(this.state.department);
    return (
      <React.StrictMode>
        <BrowserRouter>
          <Sm_Sidebar
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
            <Switch>
              <Route path="/supervisor" component={Dashboard} />
            </Switch>
          </div>
        </BrowserRouter>
      </React.StrictMode>
    );
  }
}

export default Supervisor;
