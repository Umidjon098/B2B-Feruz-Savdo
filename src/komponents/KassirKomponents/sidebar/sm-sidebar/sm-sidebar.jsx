import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./style/kassir-sm-sidebar.css";

class Sm_Sidebar extends Component {
  state = {
    active: "",
  };
  AddActiveClass = (e) => {
    this.setState({ active: e });
  };
  render() {
    return (
      <>
        <div className="sm-sidebar-box kassir-sidebar">
          <div className="sm-sidebar-link">
            <ul>
              <li
                className={
                  this.state.active === "/cashier" ? "active-link" : ""
                }
              >
                <i class="fas fa-list-ul"></i>
                <span>Пулларни тасдиқлаш </span>
                <div className="sub-menu">
                  <NavLink
                    exact
                    to="/cashier"
                    onClick={this.AddActiveClass.bind(this, "/cashier")}
                  >
                    Пулларни тасдиқлаш
                  </NavLink>
                </div>
              </li>
              <li
                className={
                  this.state.active === "/cashier/sell_order_list"
                    ? "active-link"
                    : ""
                }
              >
                <i class="fas fa-money-bill-wave"></i>
                <span>Тўловлар рўйхати </span>
                <div className="sub-menu">
                  <NavLink
                    exact
                    to="/cashier/sell_order_list"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/cashier/sell_order_list"
                    )}
                  >
                    Тўловлар рўйхати
                  </NavLink>
                </div>
              </li>
              <li
                className={
                  this.state.active === "/cashier/provider_list"
                    ? "active-link"
                    : ""
                }
              >
                <i class="fas fa-list"></i>
                <span>Таминотчилар рўйхати </span>
                <div className="sub-menu">
                  <NavLink
                    exact
                    to="/cashier/provider_list"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/cashier/provider_list"
                    )}
                  >
                    Таминотчилар рўйхати
                  </NavLink>
                </div>
              </li>
              <li
                className={
                  this.state.active === "/cashier/buy_order_list"
                    ? "active-link"
                    : ""
                }
              >
                <i class="fas fa-money-check-alt"></i>
                <span>Тўланганлар рўйхати </span>
                <div className="sub-menu">
                  <NavLink
                    exact
                    to="/cashier/buy_order_list"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/cashier/buy_order_list"
                    )}
                  >
                    Тўланганлар рўйхати
                  </NavLink>
                </div>
              </li>
              <li
                className={
                  this.state.active === "/cashier/add_clinet"
                    ? "active-link"
                    : ""
                }
              >
                <i class="fas fa-user-plus"></i>
                <span>Харажатлар рўйхати </span>
                <div className="sub-menu">
                  <NavLink
                    exact
                    to="/cashier/add_clinet"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/cashier/add_clinet"
                    )}
                  >
                    Харажатлар рўйхати
                  </NavLink>
                </div>
              </li>
              <li
                className={
                  this.state.active === "/cashier/add_expence"
                    ? "active-link"
                    : ""
                }
              >
                <i class="fas fa-cart-plus"></i>
                <span>Харажатлар қўшиш </span>
                <div className="sub-menu">
                  <NavLink
                    exact
                    to="/cashier/add_expence"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/cashier/add_expence"
                    )}
                  >
                    Харажатлар қўшиш
                  </NavLink>
                </div>
              </li>
              <li
                className={
                  this.state.active === "/cashier/add_salary"
                    ? "active-link"
                    : ""
                }
              >
                <i class="fas fa-shopping-cart"></i>
                <span>Ойликлар қўшиш</span>
                <div className="sub-menu">
                  <NavLink
                    exact
                    to="/cashier/add_salary"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/cashier/add_salary"
                    )}
                  >
                    Ойликлар қўшиш
                  </NavLink>
                </div>
              </li>
              {/* <li 
                className={
                  this.state.active === "/cashier/add_dollars" ? "active-link" : ""
                }
              >
                <i class="fas fa-shopping-cart"></i>
                <span>Доллор қўшиш</span>
                <div className="sub-menu">
                  <NavLink
                    exact
                    to="/cashier/add_dollars"
                    onClick={this.AddActiveClass.bind(this, "/cashier/add_dollars")}
                  >
                    Доллор қўшиш
                  </NavLink>
                </div>
              </li> */}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default Sm_Sidebar;
