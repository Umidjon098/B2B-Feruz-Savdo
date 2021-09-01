import axios from "axios";
import React, { Component } from "react";

class SettingSalary extends Component {
  state = {
    users: [],
    salaryList: [],
    user: "",
    user_name: "",
    salary: "",
    btn_type: "Тасдиқлаш",
    update: false,
    updateTable: false,
    id: "",
    creditial: "",
  };

  getSalaryList = async () => {
    let salaryList = await axios.get("/api/salary/salary-list/");
    this.setState({
      salaryList: salaryList.data,
    });
  };
  componentDidMount = async () => {
    let users = await axios.get("/api/user/user-list/");
    this.setState({
      users: users.data,
    });
    this.getSalaryList();
  };

  componentDidUpdate() {
    if (this.state.updateTable === true) {
      this.getSalaryList();
    }
  }

  handleInput = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };
  setSalary = (e) => {
    e.preventDefault();
    const { salary, user } = this.state;
    axios.post("/api/salary/salary-list/", { salary, user }).then((data) =>
      this.setState(
        (prevState) => (
          {
            salaryList: [
              ...prevState.salaryList,
              {
                ...data.data,
              },
            ],
            creditial: "Қўшиш муваффақиятли бажарилди",
            updateTable: false,
          },
          () =>
            setTimeout(() => {
              this.setState({
                creditial: "",
              });
            }, 3000)
        )
      )
    );
  };
  onEdit = (id) => {
    const url = "/api/salary/get-staff-salary/";
    axios.get(url + id).then((response) => {
      console.log(response);
      this.setState({
        salary: response.data.salary,
        user: response.data.user,
        btn_type: "Сақлаш",
        update: true,
        id,
      });
    });
  };
  onUpdate = (e) => {
    e.preventDefault();
    const url = `/api/salary/salary-detail/${this.state.id}/`;
    const { user, salary } = this.state;
    axios.put(url, {
      user,
      salary,
    });

    this.setState(
      {
        salary: "",
        user_name: "",
        btn_type: "Тасдиқлаш",
        updateTable: true,
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
  render() {
    let count = 0;
    return (
      <div className="solary-box">
        <h4 className="mb-3">Ойлик Белгилаш</h4>
        <form
          className="input-form"
          onSubmit={this.state.update ? this.onUpdate : this.setSalary}
        >
          <select
            name="userID"
            value={this.state.userID}
            onChange={this.handleInput}
          >
            <option value={0}>Кимга...</option>
            {this.state.users.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.first_name + " " + user.last_name}
                </option>
              );
            })}
          </select>
          <input
            type="number"
            name="roleID"
            value={this.state.roleID}
            onChange={this.handleInput}
          />
          <button className="btn btn-primary" type="submit">
            {this.state.btn_type}
          </button>
        </form>
        <div className="solary-table table-responsive">
          <label className="notification">{this.state.creditial}</label>
          <table className="table table-striped table-hover text-center  mb-0">
            <thead>
              <tr>
                <td scope="col">T/P</td>
                <td scope="col">Ҳодим</td>
                <td scope="col">Ойлик Маош</td>
                <td scope="col">Таҳрирлаш</td>
              </tr>
            </thead>
            <tbody>
              {this.state.salaryList.map((data) => {
                count++;
                if (data === undefined) {
                  return undefined;
                } else {
                  return (
                    <tr key={data.id}>
                      <td>{count}</td>
                      <td>
                        {data.user === null
                          ? "Бириктирилмаган"
                          : data.user.first_name + " " + data.user.last_name}
                      </td>
                      <td>{data.salary}</td>
                      <td>
                        <i
                          className="fas fa-edit"
                          onClick={this.onEdit.bind(this, data.id)}
                        ></i>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default SettingSalary;
