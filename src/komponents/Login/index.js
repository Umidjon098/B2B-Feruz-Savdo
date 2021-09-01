import React, { Component } from "react";
import "./login-style.css";
import Logo from "../../img/zarbon.png";
import { NavLink } from "react-router-dom";
import axios from "./../../baseUrl";
import { setUser } from "./../../globalState";
class Login extends Component {
  state = {
    username: "",
    password: "",
    data: [],
    error: false,
  };

  LogIn = (e) => {
    e.preventDefault();
    const url = "/user/login/";
    const { username, password } = this.state;
    axios
      .post(url, {
        username,
        password,
      })
      .then((response) => {
        if (response.data.user.role === "director") {
          this.props.history.push("/director");
        } else if (response.data.user.role === "CEO") {
          this.props.history.push("/ceo");
        } else if (response.data.user.role === "accountant") {
          this.props.history.push("/accountant");
        } else if (response.data.user.role === "cashier") {
          this.props.history.push("/cashier");
        } else if (response.data.user.role === "agent") {
          this.props.history.push("/agent");
        } else if (response.data.user.role === "hr") {
          this.props.history.push("/hr");
        } else if (response.data.user.role === "control_buy_products") {
          this.props.history.push("/control_buy_products");
        } else if (
          response.data.user.role === "supervisor" &&
          response.data.user.department.id !== undefined
        ) {
          this.props.history.push("/supervisor");
        } else if (response.data.user.role === "sverka") {
          this.props.history.push("/sverka");
        } else {
          alert("Departament mavjud emas!");
        }

        this.setState({ data: response.data });
        setUser(response);
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  };
  render() {
    return (
      <div className="account-page">
        <div className="container">
          <div className="card">
            <div className="card-header p-4">
              <h5>Zarbonga Xush kelibsiz !</h5>
              <p>Xizmatlaridan foydalanish uchun tizimga kiring.</p>
              <NavLink to="/" className="logo">
                <img src={Logo} alt="logo" />
              </NavLink>
            </div>
            <div className="card-body p-4">
              <form onSubmit={this.LogIn}>
                <div className="mt-5">
                  <label className="error">
                    {this.state.error ? "Qaytadan urinib ko'ring!" : ""}
                  </label>
                  <label htmlFor="phone">Telefon raqam</label>
                  <input
                    id="phone"
                    type="text"
                    name="phone"
                    placeholder="Telefon raqam"
                    className="form-control"
                    required
                    onChange={(event) => {
                      this.setState({ username: event.target.value });
                    }}
                  />
                  <label htmlFor="password">Parol</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Parol"
                    className="form-control"
                    name="password"
                    required
                    onChange={(event) => {
                      this.setState({ password: event.target.value });
                    }}
                  />
                  <button type="submit" className="btn btn-primary">
                    Tasdiqlash
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
