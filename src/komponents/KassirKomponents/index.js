import React from "react"; //kassir
import { BrowserRouter, Switch, Route, useRouteMatch } from "react-router-dom";
// import NewClients from "./Cashier/Clients/AddClient/NewClients";
// import AddProvider from "../AddProvider/AddProvider";
// import ClientsList from "./Cashier/Clients/ClientsList";
import SellOrderPayment from "./Cashier/Clients/SellOrderPayment";
import ProvidersList from "./Cashier/Providers/ProvidersList";
import SellOrderPaymentList from "./Cashier/Clients/SellOrderPaymentList";
import BuyOrderPaymentList from "./Cashier/Providers/BuyOrderPaymentList";
import DollarWarehouse from "./Cashier/Moliyaviy_Resurslar/dollarWarehouse";
import Sm_Sidebar from "./sidebar/sm-sidebar/sm-sidebar";
import Expense from "./Cashier/Moliyaviy_Resurslar/expense";
import Salary from "./Cashier/Moliyaviy_Resurslar/salary";
import Header from "../Header";
import TotalStatic from "./Cashier/DepartmentBudget/index";

import "./Cashier/main.css";
import "../DirektorPage/styles/table-style.css";

function CashierPage() {
  let { path, url } = useRouteMatch();

  return (
    <>
      <React.StrictMode>
        <BrowserRouter>
          <Sm_Sidebar url={url} />
          <div className="main-content-box" style={{ padding: "90px" }}>
            <Switch>
              <Route exact path={`/cashier/`}>
                <Header search={true} rolName="Kassir" /> <SellOrderPayment />
              </Route>
              <Route path={`/cashier/provider_list`}>
                <Header search={true} rolName="Kassir" /> <ProvidersList />
              </Route>
              <Route path={`/cashier/add_clinet`}>
                <Header search={true} rolName="Kassir" />
                <TotalStatic />
              </Route>
              {/* <Route path={`/cashier/add_provider`}> 
                  <Header search={true} rolName="Kassir"/> <AddProvider/> 
                  tinglashni ishlamasa yoki ishlaringiz haqida yommon gapirsa
              </Route> */}
              {/* <Route path={`/cashier/new_clients`}> 
                  <Header search={true} rolName="Kassir"/> <NewClients/>
              </Route> */}
              <Route path={`/cashier/sell_order_list`}>
                <Header search={true} rolName="Kassir" />{" "}
                <SellOrderPaymentList />
              </Route>
              <Route path={`/cashier/buy_order_list`}>
                <Header search={true} rolName="Kassir" />{" "}
                <BuyOrderPaymentList />
              </Route>
              <Route path={`/cashier/add_expence`}>
                <Header search={true} rolName="Kassir" /> <Expense />
              </Route>
              <Route path={`/cashier/add_salary`}>
                <Header search={true} rolName="Kassir" /> <Salary />
              </Route>
              {/* <Route path={`/cashier/add_dollars`}> 
                  <Header search={true} rolName="Kassir"/> <DollarWarehouse/>
              </Route> */}
            </Switch>
          </div>
        </BrowserRouter>
      </React.StrictMode>
    </>
  );
}

export default CashierPage;
