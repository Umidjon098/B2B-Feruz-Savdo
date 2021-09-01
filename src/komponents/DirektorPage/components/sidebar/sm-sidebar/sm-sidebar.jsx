import axios from "axios";
import React, { Component } from "react";
import { NavLink, BrowserRouter as Router } from "react-router-dom";
import Logo from "../../../../../img/zarbon.png";
import "./style/sm-sidebar.css";

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
          <div className="sm-sidebar-link">
            <div className="mb-3 logo mt-0 pt-0">
              <img src={Logo} alt="User logo" />
            </div>
            <ul>
              <li
                className={
                  this.state.active === "/director/dashboard"
                    ? "active-link"
                    : ""
                }
              >
                <i className="fas fa-home"></i>
                <span>Дашбоард</span>
                <div className="sub-menu">
                  <NavLink
                    to="/director/dashboard"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/director/dashboard"
                    )}
                  >
                    Дашбоард
                  </NavLink>
                </div>
              </li>
              <li
                className={
                  this.state.active === "/director/buy_products"
                    ? "active-link"
                    : ""
                }
              >
                <i className="fas fa-warehouse"></i>
                <span>Омборхона</span>
                <div className="sub-menu">
                  <NavLink
                    to="/director/buy_products"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/director/buy_products"
                    )}
                  >
                    Омбор Менежмент
                  </NavLink>
                </div>
              </li>
              <li
                className={
                  this.state.active === "/director/create_product"
                    ? "active-link"
                    : ""
                }
              >
                <i className="fas fa-plus"></i>
                <span>Cтруктура</span>
                <div className="sub-menu">
                  <NavLink
                    to="/director/group"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/director/create_product"
                    )}
                  >
                    {/* Департмент Қўшиш */}
                    Гурухлаш
                  </NavLink>
                  <NavLink
                    to="/director/create_provider"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/director/create_product"
                    )}
                  >
                    Таминотчи
                  </NavLink>
                </div>
              </li>
              <li
                className={
                  this.state.active === "/director/create_price_type"
                    ? "active-link"
                    : ""
                }
              >
                <i className="fas fa-tags"></i>
                <span>Тип сена</span>
                <div className="sub-menu">
                  <NavLink
                    to="/director/create_price_type"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/director/create_price_type"
                    )}
                  >
                    Тип сена Қўшиш
                  </NavLink>
                  <NavLink
                    to="/director/income_price_create"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/director/create_price_type"
                    )}
                  >
                    Сотиб олиш нархи
                  </NavLink>
                  <NavLink
                    to="/director/outcome_price_create"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/director/create_price_type"
                    )}
                  >
                    Сотиш Нархи
                  </NavLink>
                </div>
              </li>
              <li
                className={
                  this.state.active === "/director/sell_products"
                    ? "active-link"
                    : ""
                }
              >
                <i className="fas fa-poll"></i>
                <span>Маҳсулотлар</span>
                <div className="sub-menu">
                  <NavLink
                    to="/director/sell_products"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/director/sell_products"
                    )}
                  >
                    Маҳсулотларни <br /> Бошқариш
                  </NavLink>
                  <NavLink
                    to="/director/create_product"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/director/sell_products"
                    )}
                  >
                    Маҳсулот Қўшиш
                  </NavLink>
                  <NavLink
                    to="/director/returned_product"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/director/sell_products"
                    )}
                  >
                    Тасдиқлаш
                  </NavLink>
                </div>
              </li>
              <li
                className={
                  this.state.active === "/director/cilent_stats"
                    ? "active-link"
                    : ""
                }
              >
                <i className="far fa-user"></i>
                <span>Маркетинг</span>
                <div className="sub-menu">
                  <NavLink
                    to="/director/create_agent_partner"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/director/cilent_stats"
                    )}
                  >
                    Агент Жуфтлик Яратиш
                  </NavLink>

                  {/* <NavLink
                    to="/director/add_client"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/director/cilent_stats"
                    )}
                  >
                    Мижозлар Қўшиш
                  </NavLink> */}
                  <NavLink
                    to="/director/cilent_stats"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/director/cilent_stats"
                    )}
                  >
                    Мижозлар рўйхати
                  </NavLink>
                  <NavLink
                    to="/director/discount"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/director/cilent_stats"
                    )}
                  >
                    Мижозларга Чегирмалар
                  </NavLink>
                  <NavLink
                    to="/director/productdiscount"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/director/cilent_stats"
                    )}
                  >
                    Маҳсулотларга Чегирмалар
                  </NavLink>
                </div>
              </li>
              <li
                className={
                  this.state.active === "/director/moliya" ? "active-link" : ""
                }
              >
                <i className="fas fa-hand-holding-usd"></i>
                <span>Молия</span>
                <div className="sub-menu">
                  <NavLink
                    to="/director/_expense"
                    onClick={this.AddActiveClass.bind(this, "/director/moliya")}
                  >
                    Харажатлар
                  </NavLink>
                  <NavLink
                    to="/director/submite_expense"
                    onClick={this.AddActiveClass.bind(this, "/director/moliya")}
                  >
                    Возврат
                  </NavLink>
                </div>
              </li>
              <li
                className={
                  this.state.active === "/director/hrm" ? "active-link" : ""
                }
              >
                <i className="fas fa-list"></i>
                <span>HRM</span>
                <div className="sub-menu">
                  <NavLink
                    to="/director/hrm_dashboard"
                    onClick={this.AddActiveClass.bind(this, "/director/hrm")}
                  >
                    Ойлик
                  </NavLink>
                  {/* <NavLink
                    to="/director/kpi"
                    onClick={this.AddActiveClass.bind(this, "/director/hrm")}
                  >
                    КПИ қўйиш
                  </NavLink> */}
                  <NavLink
                    to="/director/settings_salary"
                    onClick={this.AddActiveClass.bind(this, "/director/hrm")}
                  >
                    Ойлик Белгилаш
                  </NavLink>
                  <NavLink
                    to="/director/agent_percent"
                    onClick={this.AddActiveClass.bind(this, "/director/hrm")}
                  >
                    КПИ қўйиш
                  </NavLink>
                  <NavLink
                    to="/director/staff"
                    onClick={this.AddActiveClass.bind(this, "/director/hrm")}
                  >
                    Ходимлар
                  </NavLink>
                  <NavLink
                    to="/director/image_report"
                    onClick={this.AddActiveClass.bind(this, "/director/hrm")}
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
