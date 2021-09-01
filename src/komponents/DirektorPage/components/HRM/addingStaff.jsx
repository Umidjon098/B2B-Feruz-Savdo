import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import PageMap from "../page-road-map/page-map";
import "../../styles/adding-stuff.css";
import axios from "axios";

class Register extends Component {
  state = {
    users: [],
    first_name: "",
    last_name: "",
    self_birth_date: "",
    self_address: "",
    full_name_father: "",
    birthdate_father: "",
    phone_father: "",
    full_name_mother: "",
    birthdate_mother: "",
    phone_mother: "",
    full_name_children: "",
    birthdate_children: "",
    family_address: "",
    department: "",
    role: "",
    phone_number: "",
    password: "",
    password2: "",
    usersdata: [],
    departmentList: [],
    btn_type: "Қўшиш",
    update: false,
    id: "",
    creditial: "",
    disabled: true,
    adding_stuff_toggle: false,
  };
  componentDidMount() {
    this.getUsersData();
    this.getDepartment();
  }
  componentDidUpdate() {
    if (this.state.usersdata !== this.state.usersdata) {
      this.getUsersData();
    }
    // if (this.state.role === "agent") {
    //   this.setState({ disabled: false });
    // }
  }
  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  createUser = (event) => {
    const url = "/api/user/register/";
    const {
      first_name,
      last_name,
      self_birth_date,
      self_address,
      full_name_father,
      birthdate_father,
      phone_father,
      full_name_mother,
      birthdate_mother,
      phone_mother,
      full_name_children,
      birthdate_children,
      family_address,
      role,
      phone_number,
      password,
      department,
      password2,
    } = this.state;
    event.preventDefault();
    axios
      .post(url, {
        first_name,
        last_name,
        self_birth_date,
        self_address,
        full_name_father,
        birthdate_father,
        phone_father,
        full_name_mother,
        birthdate_mother,
        phone_mother,
        full_name_children,
        birthdate_children,
        family_address,
        department,
        role,
        phone_number,
        password,
        password2,
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
        first_name: "",
        last_name: "",
        self_birth_date: "",
        self_address: "",
        full_name_father: "",
        birthdate_father: "",
        phone_father: "",
        full_name_mother: "",
        birthdate_mother: "",
        phone_mother: "",
        full_name_children: "",
        birthdate_children: "",
        family_address: "",
        department: "",
        role: "",
        phone_number: "",
        password: "",
        password2: "",
        creditial: "Қўшиш муваффақиятли бажарилди Кутинг!",
      },
      () =>
        setTimeout(() => {
          this.setState({
            creditial: "",
          });
        }, 3000)
    );
  };

  getUsersData = () => {
    const url = "/api/user/user-list/";
    axios(url).then((res) => this.setState({ usersdata: res.data }));
  };
  getDepartment = () => {
    const url = "/api/product/department-list/";
    axios(url).then((res) =>
      this.setState({ departmentList: res.data.results })
    );
  };
  onDelete = (e) => {
    const url = `/api/user/user-detail/`;
    axios.delete(url + e).then((response) => {
      if (response.data != null) {
        this.setState({
          usersdata: this.state.usersdata.filter((data) => data.id != e),
        });
      }
    });
  };

  onEdit = (id) => {
    this.setState({ id });
    const url = "/api/user/user-detail/";
    axios.get(url + id).then((response) => {
      this.setState({
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        self_birth_date: response.data.self_birth_date,
        self_address: response.data.self_address,
        full_name_father: response.data.full_name_father,
        birthdate_father: response.data.birthdate_father,
        phone_father: response.data.phone_father,
        full_name_mother: response.data.full_name_mother,
        birthdate_mother: response.data.birthdate_mother,
        phone_mother: response.data.phone_mother,
        full_name_children: response.data.full_name_children,
        birthdate_children: response.data.birthdate_children,
        family_address: response.data.family_address,
        department: response.data.department,
        role: response.data.role,
        phone_number: response.data.phone_number,
        btn_type: "Сақлаш",
        update: true,
        adding_stuff_toggle: !this.state.adding_stuff_toggle,
      });
    });
  };

  onUpdate = (e) => {
    e.preventDefault();
    const url = `/api/user/user-detail/${this.state.id}/`;
    const {
      first_name,
      last_name,
      self_birth_date,
      self_address,
      full_name_father,
      birthdate_father,
      phone_father,
      full_name_mother,
      birthdate_mother,
      phone_mother,
      full_name_children,
      birthdate_children,
      family_address,
      department,
      role,
      phone_number,
    } = this.state;

    axios.put(url, {
      first_name,
      last_name,
      self_birth_date,
      self_address,
      full_name_father,
      birthdate_father,
      phone_father,
      full_name_mother,
      birthdate_mother,
      phone_mother,
      full_name_children,
      birthdate_children,
      family_address,
      department,
      role,
      phone_number,
    });
    this.setState(
      {
        first_name: "",
        last_name: "",
        self_birth_date: "",
        self_address: "",
        full_name_father: "",
        birthdate_father: "",
        phone_father: "",
        full_name_mother: "",
        birthdate_mother: "",
        phone_mother: "",
        full_name_children: "",
        birthdate_children: "",
        family_address: "",
        department: "",
        role: "",
        password: "",
        phone_number: "",
        btn_type: "Қўшиш",
        update: false,
        creditial: "Ўзгартириш муваффақиятли бажарилди Кутинг!",
        // usersdata: this.state.usersdata,
      },
      () =>
        setTimeout(() => {
          this.setState({
            creditial: "",
          });
        }, 3000)
    );
  };
  toggleForm = () => {
    this.setState({
      adding_stuff_toggle: !this.state.adding_stuff_toggle,
      first_name: "",
      last_name: "",
      self_birth_date: "",
      self_address: "",
      full_name_father: "",
      birthdate_father: "",
      phone_father: "",
      full_name_mother: "",
      birthdate_mother: "",
      phone_mother: "",
      full_name_children: "",
      birthdate_children: "",
      family_address: "",
      department: "",
      role: "",
      phone_number: "",
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
    const { usersdata, departmentList } = this.state;
    let count = 0;
    return (
      <div className="adding-staff-box adding-staff">
        <PageMap page_name={"Ходим қўшиш"} />
        <button className="btn btn-primary btn-plus" onClick={this.toggleForm}>
          <i className="fas fa-plus"></i>
        </button>
        <div
          className={
            this.state.adding_stuff_toggle
              ? "form-box m-0 toggle"
              : "form-box m-0 "
          }
        >
          <label className="notification">{this.state.creditial}</label>
          <form onSubmit={this.state.update ? this.onUpdate : this.createUser}>
            <div className="row">
              <div className="col-md-4 col-lg-4">
                <input
                  type="text"
                  name="first_name"
                  placeholder="Исм"
                  value={this.state.first_name}
                  required
                  onChange={this.handleInput}
                />
                <input
                  type="text"
                  name="last_name"
                  placeholder="Фамиля"
                  value={this.state.last_name}
                  required
                  onChange={this.handleInput}
                />
                <input
                  type="date"
                  name="self_birth_date"
                  placeholder="Туғилган Санаси"
                  value={this.state.self_birth_date}
                  required
                  onChange={this.handleInput}
                />
                <input
                  type="text"
                  name="self_address"
                  placeholder="Манзили"
                  value={this.state.self_address}
                  required
                  onChange={this.handleInput}
                />
                <select
                  name="role"
                  value={this.state.role}
                  onChange={this.handleInput}
                >
                  <option value="director">Директор</option>
                  <option value="CEO">CEO</option>
                  <option value="accountant">Омборчи</option>
                  <option value="cashier">Кассир</option>
                  <option value="agent">Агент</option>
                  <option value="hr">HR Менежер</option>
                  <option value="control_buy_products">
                    Кирим Маҳсулотлар Менежери
                  </option>
                </select>
                <input
                  type="number"
                  name="phone_number"
                  placeholder="Телефон Рақам"
                  value={this.state.phone_number}
                  onChange={this.handleInput}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Парол"
                  value={this.state.password}
                  onChange={this.handleInput}
                />
              </div>

              <div className="col-md-4 col-lg-4">
                <input
                  type="password"
                  name="password2"
                  placeholder="Тасдиқлаш"
                  value={this.state.password2}
                  onChange={this.handleInput}
                />
                <input
                  type="text"
                  name="full_name_father"
                  placeholder="Отаси ФИО"
                  value={this.state.full_name_father}
                  required
                  onChange={this.handleInput}
                />
                <input
                  type="date"
                  name="birthdate_father"
                  placeholder="Туғилган Санаси"
                  value={this.state.birthdate_father}
                  required
                  onChange={this.handleInput}
                />
                <input
                  type="text"
                  name="phone_father"
                  placeholder="Телефон Рақам"
                  value={this.state.phone_father}
                  required
                  onChange={this.handleInput}
                />
                <input
                  type="text"
                  name="full_name_mother"
                  placeholder="Онаси ФИО"
                  value={this.state.full_name_mother}
                  required
                  onChange={this.handleInput}
                />
                <input
                  type="date"
                  name="birthdate_mother"
                  placeholder="Туғилган Санаси"
                  value={this.state.birthdate_mother}
                  required
                  onChange={this.handleInput}
                />
                <input
                  type="text"
                  name="phone_mother"
                  placeholder="Телефон Рақам"
                  value={this.state.phone_mother}
                  required
                  onChange={this.handleInput}
                />
              </div>
              <div className="col-md-4 col-lg-4">
                <textarea
                  type="text"
                  name="full_name_children"
                  placeholder="Фарзанди ФИО"
                  value={this.state.full_name_children}
                  required
                  onChange={this.handleInput}
                />
                <textarea
                  type="text"
                  name="birthdate_children"
                  placeholder="Туғилган Санаси"
                  value={this.state.birthdate_children}
                  required
                  onChange={this.handleInput}
                />
                <textarea
                  type="text"
                  name="family_address"
                  placeholder="Ота Она Яшаш Манзили"
                  value={this.state.family_address}
                  required
                  onChange={this.handleInput}
                />
                <select
                  name=""
                  disabled={this.state.role === "agent" ? false : true}
                  // value={this.state.role}
                  onChange={this.handleInput}
                >
                  {departmentList === undefined
                    ? console.log("undefined")
                    : departmentList.map((dep) => {
                        return (
                          <option key={dep.id} value={dep.id}>
                            {dep.name}
                          </option>
                        );
                      })}
                </select>
                <button className="btn btn-primary" type="submit">
                  {this.state.btn_type}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="register-table-box table-responsive p-0">
          <table className="table table-striped table-hover text-center  m-0">
            <thead>
              <tr>
                <td scope="col">T/R</td>
                <td scope="col">ФИО</td>
                <td scope="col">Лавозими</td>
                <td scope="col">Туғилган Санаси</td>
                <td scope="col">Телефон Рақам</td>
                <td scope="col">Манзили</td>
                <td scope="col">Отасини ФИО</td>
                <td scope="col">Отаси Туғилган Сана</td>
                <td scope="col">Отаси Телефон Рақам</td>
                <td scope="col">Онаси ФИО</td>
                <td scope="col">Онаси Туғилган Сана</td>
                <td scope="col">Онаси Телефон Рақам</td>
                <td scope="col">Фарзандлари ФИО</td>
                <td scope="col">Фарзандлари Туғилган Сана</td>
                <td scope="col">Оилавий манзили</td>
                <td scope="col">Таҳрирлаш</td>
              </tr>
            </thead>

            {usersdata.map((user) => {
              count++;
              return (
                <tbody key={user.id}>
                  <tr>
                    <td>{count}</td>
                    <td>{user.first_name + " " + user.last_name}</td>
                    <td>
                      {user.role === "director"
                        ? "Директор"
                        : user.role === "agent"
                        ? "Агент" + " " + user.department.name
                        : user.role === "cashier"
                        ? "Кассир"
                        : user.role === "accountant"
                        ? "Омборчи" + " " + user.department.name
                        : user.role === "hr"
                        ? "Менежер"
                        : user.role}
                    </td>
                    <td>{user.self_birth_date}</td>
                    <td>{user.phone_number}</td>
                    <td>{user.self_address}</td>
                    <td>{user.full_name_father}</td>
                    <td>{user.birthdate_father}</td>
                    <td>{user.phone_father}</td>
                    <td>{user.full_name_mother}</td>
                    <td>{user.birthdate_mother}</td>
                    <td>{user.phone_mother}</td>
                    <td>{user.full_name_children}</td>
                    <td>{user.birthdate_children}</td>
                    <td>{user.family_address}</td>
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
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    );
  }
}

export default Register;
