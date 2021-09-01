import axios from "axios";
import React, { Component } from "react";
import { NavLink, BrowserRouter as Router } from "react-router-dom";
import Logo from "../../../../../img/zarbon.png";

class Sm_Sidebar extends Component {
  state = {
    active: "",
    fullScreen: false,
    click: false,
    mode: false,
    departmentList: [],
    department: "",
  };
  handleSelect = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleDepartment = (e) => {
    const { value } = e.target;
    this.props.handleDepartment(value);
  };
  componentDidMount() {
    this.getDepartmentList();
  }
  AddActiveClass = (e) => {
    this.setState({ active: e });
  };
  handleNotification = () => {
    this.props.parentNotif(true, true);
  };
  handleClick = () => {
    this.setState({ click: !this.state.click });
    this.props.parentCallback(!this.state.click);
  };
  getDepartmentList = async () => {
    const url = "/api/product/department-list/";
    await axios(url).then((response) => {
      this.setState({ departmentList: response.data.results });
    });
  };
  openFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
    this.setState({ fullScreen: true });
  };
  /* Close fullscreen */
  closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
    this.setState({ fullScreen: false });
  };
  render() {
    return (
      <>
        <nav className={this.state.click ? "navbar " : "navbar toggle"}>
          <div className="navbar-left">
            <div className="menu-icon" onClick={this.handleClick}>
              <i className="fas fa-bars" />
            </div>
          </div>
          <div className="navbar-right">
            <select name="department" onChange={this.handleDepartment}>
              <option value="all">Барчаси</option>
              {this.state.departmentList.map((data) => {
                return (
                  <option key={data.id} value={data.id}>
                    {data.name}
                  </option>
                );
              })}
            </select>
            <div className="full-screen">
              <i
                className="fas fa-expand"
                onClick={
                  this.state.fullScreen
                    ? this.closeFullscreen
                    : this.openFullscreen
                }
              ></i>
            </div>
            <div className="notification" onClick={this.handleNotification}>
              <i className="far fa-bell"></i>
              <div className={this.props.count ? "count d-none" : "count"}>
                1
              </div>
            </div>
            <div
              className="user-logo"
              onClick={() => this.setState({ mode: !this.state.mode })}
            >
              <i
                className={
                  this.state.mode === false ? "fas fa-moon" : "fas fa-sun"
                }
              ></i>
            </div>
          </div>
        </nav>
        <div
          className={
            this.state.click ? "sm-sidebar-box toggle" : "sm-sidebar-box "
          }
        >
          <div className="sm-sidebar-link mt-1">
            <div className="mb-3 logo">
              <img src={Logo} alt="User logo" />
            </div>
            <ul>
              <li
                className={
                  this.state.active === "/ceo/dashboard" ? "active-link" : ""
                }
              >
                <i className="fas fa-home"></i>
                <span>Дашбоард</span>
                <div className="sub-menu">
                  <NavLink
                    to="/ceo/dashboard"
                    onClick={this.AddActiveClass.bind(this, "/ceo/dashboard")}
                  >
                    Дашбоард
                  </NavLink>
                </div>
              </li>
              <li
                className={
                  this.state.active === "/ceo/buy_products" ? "active-link" : ""
                }
              >
                <i className="fas fa-warehouse"></i>
                <span>Омборхона</span>
                <div className="sub-menu">
                  <NavLink
                    to="/ceo/buy_products"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/ceo/buy_products"
                    )}
                  >
                    Омбор Менежмент
                  </NavLink>
                </div>
              </li>

              <li
                className={
                  this.state.active === "/ceo/sell_products"
                    ? "active-link"
                    : ""
                }
              >
                <i className="fas fa-poll"></i>
                <span>Маҳсулотларни Бошқариш</span>
                <div className="sub-menu">
                  <NavLink
                    to="/ceo/sell_products"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/ceo/sell_products"
                    )}
                  >
                    Маҳсулотларни Бошқариш
                  </NavLink>
                </div>
              </li>
              <li
                className={
                  this.state.active === "/ceo/cilent_stats" ? "active-link" : ""
                }
              >
                <i className="far fa-user"></i>
                <span>CРМ</span>
                <div className="sub-menu">
                  <NavLink
                    to="/ceo/cilent_stats"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/ceo/cilent_stats"
                    )}
                  >
                    Мижозлар рўйхати
                  </NavLink>
                </div>
              </li>
              <li
                className={
                  this.state.active === "/ceo/moliya" ? "active-link" : ""
                }
              >
                <i className="fas fa-hand-holding-usd"></i>
                <span>Молия</span>
                <div className="sub-menu">
                  <NavLink
                    to="/ceo/_expense"
                    onClick={this.AddActiveClass.bind(this, "/ceo/moliya")}
                  >
                    Харажатлар
                  </NavLink>
                </div>
              </li>
              <li
                className={
                  this.state.active === "/ceo/hrm" ? "active-link" : ""
                }
              >
                <i className="fas fa-list"></i>
                <span>HRM</span>
                <div className="sub-menu">
                  <NavLink
                    to="/ceo/image_report"
                    onClick={this.AddActiveClass.bind(this, "/ceo/hrm")}
                  >
                    Агентлар ҳисоботи
                  </NavLink>
                </div>
              </li>
              <li>
                <a href="/">
                  <i className="far fa-arrow-alt-circle-left"></i>
                </a>
                <span>Чиқиш</span>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default Sm_Sidebar;
