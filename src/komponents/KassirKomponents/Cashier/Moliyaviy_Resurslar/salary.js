import React, { Component } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

class Expense extends Component {
  state = {
    nomi: "",
    izox: "",
    miqdori: "",
    foydalanuvchi: "",
    kategoriyasi: "",
    usersdata: [],
    userList: [],
    deleteItem: [],
    btn_type: "Тасдиқлаш ",
    update: false,
    id: "",
    creditial: "",
    lavozimi: ""
  };
  componentDidMount() {
    this.getUsersData();
    this.getUserList();
  }
  componentDidUpdate(prevState) {
    if (prevState !== this.state.usersdata) {
      this.getUsersData();
    }
  }
  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  createUser = (event) => {
    event.preventDefault();
    const url = "/api/salary/salary-list/";
    const { miqdori, foydalanuvchi } = this.state;
    axios
      .post(url, {
        salary: miqdori,
        user: foydalanuvchi,
      })
      .then((data) =>
        this.setState((prevState) => ({
          usersdata: [
            ...prevState.usersdata,
            {
              ...data.data,
            },
          ],
        }))
      );
    this.setState(
      {
        miqdori: "",
        foydalanuvchi: "",
        creditial: "Қўшиш муваффақиятли бажарилди",
      },
      () =>
        setTimeout(() => {
          this.setState({
            creditial: "",
          });
        }, 3000)
    );
  };

  getUsersData = async () => {
    const url = "/api/salary/salary-list/";
    axios(url).then((res) => this.setState({ usersdata: res.data }));
  };

  getUserList = () => {
    const url = "/api/user/user-list/";
    axios(url).then((res) => this.setState({ userList: res.data }));
  };

  onExpenseDelete = (e) => {
    const url = "/api/salary/salary-detail/";
    axios.delete(url + e).then((response) => {
      if (response.data != null) {
        this.setState({
          usersdata: this.state.usersdata.filter((user) => user.id != e),
        });
      }
    });
  };

  onEdit = (id) => {
    this.setState({ id });
    const url = "/api/salary/salary-detail/";
    axios.get(url + id).then((response) => {
      this.setState({
        miqdori: response.data.salary,
        nomi: response.data.name,
        btn_type: "Saqlash",
        update: true,
      });
    });
  };

  onUpdate = (e) => {
    e.preventDefault();
    const url = `/api/salary/salary-detail/${this.state.id}/`;
    const { nomi, miqdori } = this.state;
    axios.put(url, {
      name: nomi,
      salary: miqdori,
    });
    this.setState(
      {
        miqdori: "",
        btn_type: "Тасдиқлаш",
        update: false,
        creditial: "Муваффақиятли янгиланди Кутинг!",
      },
      () =>
        setTimeout(() => {
          this.setState({
            creditial: "",
          });
        }, 3000)
    );
  };
  onDeleteAlert = (e) => {
    confirmAlert({
      message: "Ўчириш учун тасдиқланг ",
      buttons: [
        {
          label: "Ўчириш",
          onClick: () => this.onExpenseDelete(e),
        },
        {
          label: "Қайтиш",
          onClick: () => console.log(""),
        },
      ],
    });
  };

  roleDefine = (lavozimi1) => {
    if (lavozimi1 === "other") 
        lavozimi1 = "Бошқа лавозимда"
    if (lavozimi1 === "commodity_accountant")
        lavozimi1 = "Омборчи"
    if (lavozimi1 === "director")
        lavozimi1 = "директор"
    if (lavozimi1 === "cashier")
        lavozimi1 = "Кассир"
    if (lavozimi1 === "agent")
        lavozimi1 = "Сотув агенти"
    if (lavozimi1 === "accountant")
        lavozimi1 = "Buxgalter"
    this.state.lavozimi = lavozimi1;
  }
  render() {
    const { usersdata, userList } = this.state;
    console.log(usersdata)
    let count = 0;
    return (
      <div className="register-box">
        <div className="register-form">
          <div className="title mb-5">
            <h2>Oyliklar</h2>
          </div>
          <form
            className="input-form"
            onSubmit={this.state.update ? this.onUpdate : this.createUser}
          >
            <select name="nomi" onChange={this.handleInput}>
              <option value=""></option>
              {userList.map((user) => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.first_name + " " + user.last_name + " " + this.state.lavozimi}
                  </option>
                );
              })}
            </select>
            <input
              type="number"
              name="miqdori"
              placeholder="Миқдори"
              value={this.state.miqdori}
              required
              onChange={this.handleInput}
            />
            <label className="notification">{this.state.creditial}</label>
            <button className="btn btn-primary" type="submit">
              {this.state.btn_type}
            </button>
          </form>
        </div>
        <div className="row">
          <h3 className="ml-3">Oyliklar</h3>
          <div className="register-table-box table-responsive mt-5">
            <table className="table table-striped table-hover text-center  mb-0">
              <thead>
                <tr>
                  <td scope="col">Т/Р</td>
                  <td scope="col">Фойдаланувчи</td>
                  <td scope="col">Миқдори</td>
                  <td scope="col">Ҳаражат куни</td>
                  <td scope="col">Ҳаражат санаси </td>
                  <td scope="col">Таҳрирлаш</td>
                </tr>
              </thead>
              {usersdata.map((user) => {
                count++;
                if (user.user !== null)
                  this.roleDefine(user.user.role)
                return (
                  <tbody key={user.id}>
                    <tr>
                      <td>{count}</td>
                      <td>
                        {user.user === null
                          ? "Ism kiritilmagan"
                          : user.user.first_name + " " + user.user.last_name + " " + this.state.lavozimi}
                      </td>
                      <td>{user.salary}</td>
                      <td>{user.created_date.slice(0, 10)}</td>
                      <td>{user.created_date.slice(11, 19)}</td>
                      <td className="d-flex justify-content-center">
                        <i
                          className="fas fa-edit"
                          onClick={this.onEdit.bind(this, user.id)}
                        ></i>
                        <i
                          className="fas fa-trash"
                          onClick={this.onDeleteAlert.bind(this, user.id)}
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Expense;
