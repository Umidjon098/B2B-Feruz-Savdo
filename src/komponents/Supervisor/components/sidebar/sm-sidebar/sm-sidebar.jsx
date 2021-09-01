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
        </nav>
        <div
          className={
            this.state.click ? "sm-sidebar-box toggle" : "sm-sidebar-box "
          }
        >
          <div className="sm-sidebar-link">
            <div className="mb-3 logo">
              <img src={Logo} alt="User logo" />
            </div>
            <ul>
              <li>
                <i className="fas fa-home"></i>
                <span>Dashboard</span>
                <div className="sub-menu">
                  <NavLink to="/supervisor">Dashboard</NavLink>
                </div>
              </li>
              <li>
                <a href="/">
                  <i className="far fa-arrow-alt-circle-left"></i>
                </a>
                <span>Chiqish</span>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default Sm_Sidebar;
