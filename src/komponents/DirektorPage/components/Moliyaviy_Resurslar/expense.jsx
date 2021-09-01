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
    usersdata: [],
    userList: [],
    deleteItem: [],
    btn_type: "Тасдиқлаш",
    update: false,
    id: "",
    creditial: "",
  };
  componentDidMount() {
    this.getUsersData();
    this.getUserList();
  }

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  createUser = (event) => {
    event.preventDefault();
    const url = "/api/expense_discount/expense-list/";
    const { nomi, izox, miqdori, foydalanuvchi } = this.state;
    axios
      .post(url, {
        name: nomi,
        description: izox,
        quantity: miqdori,
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
        nomi: "",
        izox: "",
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
    const url = "/api/expense_discount/expense-list/";
    axios(url).then((res) => this.setState({ usersdata: res.data }));
  };

  getUserList = () => {
    const url = "/api/user/user-list/";
    axios(url).then((res) => this.setState({ userList: res.data }));
  };

  onExpenseDelete = (e) => {
    const url = "/api/expense_discount/expense-detail/";
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
    const url = "/api/expense_discount/expense-detail/";
    axios.get(url + id).then((response) => {
      this.setState({
        nomi: response.data.name,
        izox: response.data.description,
        miqdori: response.data.quantity,
        btn_type: "Сақлаш",
        update: true,
      });
    });
  };

  onUpdate = (e) => {
    e.preventDefault();
    const url = `/api/expense_discount/expense-detail/${this.state.id}/`;
    const { nomi, izox, miqdori } = this.state;
    axios.put(url, {
      name: nomi,
      description: izox,
      quantity: miqdori,
    });
    this.getUsersData();
    this.setState(
      {
        nomi: "",
        izox: "",
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
      message: "Ўчириш учун тасдиқланг",
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
  render() {
    const { usersdata, userList } = this.state;
    let count = 0;
    return (
      <div className="register-box">
        <div className="register-form">
          <div className="title">
            <h2>Харажатлар</h2>
          </div>
          <form
            className="input-form"
            onSubmit={this.state.update ? this.onUpdate : this.createUser}
          >
            <input
              type="text"
              name="nomi"
              placeholder="Номи"
              required
              onChange={this.handleInput}
              value={this.state.nomi}
            />
            <textarea
              name="izox"
              placeholder="Изох"
              value={this.state.izox}
              onChange={this.handleInput}
            />
            <input
              type="number"
              name="miqdori"
              placeholder="Миқдори"
              value={this.state.miqdori}
              required
              onChange={this.handleInput}
            />
            <select name="foydalanuvchi" onChange={this.handleInput}>
              {userList.map((user) => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.first_name + " " + user.last_name}
                  </option>
                );
              })}
            </select>
            <label className="notification">{this.state.creditial}</label>
            <button className="btn btn-primary" type="submit">
              {this.state.btn_type}
            </button>
          </form>
        </div>
        <div className="register-table-box table-responsive">
          <table className="table table-striped table-hover text-center  mb-0">
            <thead>
              <tr>
                <td scope="col">T/R</td>
                <td scope="col">Номи</td>
                <td scope="col">Изох</td>
                <td scope="col">Миқдори</td>
                <td scope="col">Фойдаланувчи</td>
                <td scope="col">Таҳрирлаш</td>
              </tr>
            </thead>

            {usersdata.map((user) => {
              count++;
              return (
                <tbody key={user.id}>
                  <tr>
                    <td>{count}</td>
                    <td>{user.name}</td>
                    <td>{user.description}</td>
                    <td>{user.quantity}</td>
                    <td>
                      {user.user === null
                        ? "Ism kiritilmagan"
                        : user.user.first_name + " " + user.user.last_name}
                    </td>
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
    );
  }
}

export default Expense;
