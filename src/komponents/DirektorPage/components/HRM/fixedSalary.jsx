import axios from "axios";
import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import

class FixedSalary extends Component {
  state = {
    salary: "",
    role: "",
    usersdata: [],
    btn_type: "Тасдиқлаш",
    update: false,
    updateTable: false,
    id: "",
    creditial: "",
  };

  componentDidMount() {
    this.getUsersData();
  }
  componentDidUpdate() {
    if (this.state.updateTable === true) {
      this.getUsersData();
    }
  }
  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  setSalary = (event) => {
    const url = "/api/salary/fixed-salary-list/";
    const { salary, role } = this.state;
    event.preventDefault();
    axios
      .post(url, {
        role,
        salary,
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
        salary: 0,
        role: "",
        btn_type: "Тасдиқлаш",
        update: false,
        flexible: false,
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
    const url = "/api/salary/fixed-salary-list/";
    axios(url).then((res) => {
      this.setState({ usersdata: res.data.results, updateTable: false });
    });
  };
  onEdit = (id) => {
    this.setState({ id });
    const url = "/api/salary/fixed-salary-detail/";
    axios.get(url + id).then((response) => {
      this.setState({
        salary: response.data.salary,
        role: response.data.role,
        btn_type: "Сақлаш",
        update: true,
      });
    });
  };
  onUpdate = (e) => {
    e.preventDefault();
    const url = `/api/salary/fixed-salary-detail/${this.state.id}/`;
    const { salary, role } = this.state;
    axios.put(url, {
      role,
      salary,
    });
    this.setState(
      {
        salary: "",
        role: "",
        flexible: false,
        btn_type: "Тасдиқлаш",
        update: false,
        updateTable: true,
        creditial: "Ўзгартириш муваффақиятли бажарилди Кутинг!",
      },
      () =>
        setTimeout(() => {
          this.setState({
            creditial: "",
          });
        }, 3000)
    );
  };
  onDelete = (e) => {
    const url = "/api/salary/fixed-salary-detail/";
    axios.delete(url + e).then((response) => {
      if (response.data != null) {
        this.setState({
          usersdata: this.state.usersdata.filter((data) => data.id != e),
          update: true,
        });
      }
    });
  };
  onDeleteAlert = (e) => {
    confirmAlert({
      message: "Ўчириш учун тасдиқланг",
      buttons: [
        {
          label: "Ўчириш",
          onClick: () => this.onDelete(e),
        },
        {
          label: "Қайтиш",
          onClick: () => console.log(""),
        },
      ],
    });
  };
  render() {
    const { usersdata } = this.state;
    let count = 0;
    return (
      <div className="solary-box">
        <h4 className="mb-3">Ўзгармас Ойлик белгилаш</h4>
        <form
          className="input-form"
          onSubmit={this.state.update ? this.onUpdate : this.setSalary}
        >
          <input
            type="text"
            name="salary"
            placeholder="Ойлик маош"
            value={this.state.salary}
            required
            onChange={this.handleInput}
          />
          <select name="role" onChange={this.handleInput}>
            <option value={this.state.role}>
              {"Жорий Лавозим " + this.state.role}
            </option>
            <option value="director">Директор</option>
            <option value="CEO">CEО</option>
            <option value="accountant">Омборчи</option>
            <option value="cashier">Кассир</option>
          </select>
          <button className="btn btn-primary" type="submit">
            {this.state.btn_type}
          </button>
        </form>
        <div className="solary-table table-responsive">
          <label className="notification">{this.state.creditial}</label>
          <table className="table  table-striped table-hover text-center  mb-0">
            <thead>
              <tr>
                <td scope="col">T/R</td>
                <td scope="col">Лавозим</td>
                <td scope="col">Ойлик Маош</td>
                <td scope="col">Таҳрирлаш</td>
              </tr>
            </thead>
            <tbody>
              {usersdata.map((user) => {
                count++;
                return (
                  <tr key={user.id}>
                    <td>{count}</td>
                    <th>
                      {user.role === "director"
                        ? "Директор"
                        : user.role === "cashier"
                        ? "Кассир"
                        : user.role === "accountant"
                        ? "Омборчи"
                        : user.role}
                    </th>
                    <td>{user.salary}</td>
                    <td>
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default FixedSalary;
