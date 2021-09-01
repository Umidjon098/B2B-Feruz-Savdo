import axios from "axios";
import React, { Component } from "react";
import NotifImg from "../../image/notification.svg";
import "./notification.css";
class Notification extends Component {
  state = {
    userList: [],
    userList: [],
  };

  remindLater = () => {
    this.props.parentNotif(false, false);
  };
  closeNotification = () => {
    this.props.parentNotif(false, true);
    document.cookie = "Notification=Birthday; max-age=" + 60 * 60 * 24;
  };

  componentDidMount() {
    let checkCookie = document.cookie.indexOf("Notification=Birthday");
    if (checkCookie) {
      this.getUserList();
      this.getuserList();
    }
  }
  getUserList = () => {
    const url = "/api/user/user-list/";
    axios(url).then((response) => {
      this.setState({ userList: response.data });
    });
  };

  getuserList = () => {
    const url = "/api/user/user-list/";
    axios(url).then((response) => {
      this.setState({ userList: response.data });
    });
  };

  render() {
    let checkCookie = document.cookie.indexOf("Notification=Birthday");
    const current_date = new Date();
    let count = 0;
    return (
      <div
        className={
          checkCookie
            ? this.props.notif
              ? "dark-overlay"
              : "dark-overlay hidden"
            : "dark-overlay hidden"
        }
      >
        <div
          className={
            checkCookie
              ? "card notification-box"
              : "card notification-box hidden"
          }
        >
          <div className="card-body">
            <div className="box">
              <div className="left-box">
                <div className="n-img-box">
                  <img src={NotifImg} alt="notification-img" />
                </div>
              </div>
              <div className="right-box notif-data">
                <div>
                  <div className="title">Eslatma!</div>
                  {this.state.userList.map((user) => {
                    if (user.self_birth_date !== null) {
                      let date = new Date(user.self_birth_date);
                      let date_father = new Date(user.birthdate_father);
                      let date_mother = new Date(user.birthdate_mother);
                      if (
                        current_date.getDate() + 1 === date.getDate() &&
                        current_date.getMonth() + 1 === date.getMonth() + 1
                      ) {
                        count++;
                        return (
                          <>
                            <table class="table text-dark table-responsive">
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Hodim</th>
                                  <th scope="col">Tug'ilgan sanasi</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th scope="row">{count}</th>
                                  <td>
                                    {user.first_name + " " + user.last_name}
                                  </td>
                                  <td>{user.self_birth_date}</td>
                                </tr>
                              </tbody>
                            </table>
                          </>
                        );
                      } else if (
                        current_date.getDate() + 1 === date_father.getDate() &&
                        current_date.getMonth() + 1 ===
                          date_father.getMonth() + 1
                      ) {
                        count++;
                        return (
                          <>
                            <table class="table text-dark table-responsive">
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Hodim</th>
                                  <th scope="col">Otasi</th>
                                  <th scope="col">Tug'ilgan sanasi</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th scope="row">{count}</th>
                                  <td>
                                    {user.first_name + " " + user.last_name}
                                  </td>
                                  <td> {user.full_name_father}</td>
                                  <td>{user.birthdate_father}</td>
                                </tr>
                              </tbody>
                            </table>
                          </>
                        );
                      } else if (
                        current_date.getDate() + 1 === date_mother.getDate() &&
                        current_date.getMonth() + 1 ===
                          date_mother.getMonth() + 1
                      ) {
                        count++;
                        return (
                          <>
                            <table class="table text-dark">
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Hodim</th>
                                  <th scope="col">Onasi</th>
                                  <th scope="col">Tug'ilgan sanasi</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th scope="row">{count}</th>
                                  <td>
                                    {user.first_name + " " + user.last_name}
                                  </td>
                                  <td> {user.full_name_mother}</td>
                                  <td>{user.birthdate_mother}</td>
                                </tr>
                              </tbody>
                            </table>
                          </>
                        );
                      }
                    }
                  })}
                </div>
                <div className="btn-box">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={this.closeNotification}
                  >
                    Yopish
                  </button>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={this.remindLater}
                  >
                    Keyinroq eslat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Notification;
