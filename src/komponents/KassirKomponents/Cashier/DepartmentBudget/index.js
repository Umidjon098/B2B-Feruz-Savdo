import React, {Component} from "react"
import axios from "../../../../baseUrl"
import PageMap from "../../../DirektorPage/components/page-road-map/page-map";
import FilterByTime from "./filterByTime"
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import FilterByDepartment from "./filterByDepartment";

class Expense extends Component {
    state = {
        nomi: "",
        izox: "",
        miqdori: "",
        foydalanuvchi: "",
        usersdata: [],
        salarydata: [],
        deleteItem: [],
        btn_type: "Tasdiqlash",
        update: false,
        id: "",
        credential: "",
        start_date: "",
    };
    componentDidMount() {
        this.getUserData(this.state.start_date);
        this.getSalaryData(this.state.start_date);
    }
    getUserData = async (start_date) => {
        const url = "/api/expense_discount/expense-list/";
        axios(url, {
            params: {
                start_date: start_date,
            },
        }).then((res) => {
            this.setState({ usersdata: res.data.expense})
        });
    };
    getSalaryData = async (start_date) => {
        const url = "/api/salary/salary-list/";
        axios(url, {
            params: {
                start_date: start_date,
            },
        }).then((res) => this.setState({ salarydata: res.data}));
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
    onDeleteAlert = (e) => {
        confirmAlert({
            message: "O'chirish uchun tasdiqlang",
            button : [
                {
                    label: "O'chirish",
                    onClick: () => this.onExpenseDelete(e),
                },
                {
                    label: "Qaytish",
                    onClick: () => console.log(""),
                },
            ],
        });
    };
    onSetDay = async (start_date) => {
        await this.getUserData(start_date);
        await this.getSalaryData(start_date);
    };
    onSetWeek = async (start_date) => {
        await this.getUserData(start_date);
        await this.getSalaryData(start_date);
    };
    onSetMonth = async (start_date) => {
        await this.getUserData(start_date);
        await this.getSalaryData(start_date);
    };
    onFilterDateSubmit = async (start_date) => {
        await this.getUserData(start_date);
        await this.getSalaryData(start_date);
    };

    render() {
        const { usersdata, salarydata } = this.state;
        let marketing_quantity = 0;
        let other_quantity = 250;
        let total_salary = 500;
        usersdata.forEach((element) => {
          alert(element.quantity)
            if (element.user.department === 1) {
                marketing_quantity = 
                    parseInt(marketing_quantity) + parseInt(element.quantity);
            } else {
                other_quantity = 
                    parseInt(other_quantity) + parseInt(element.quantity);
            }
        });
        salarydata.forEach((element) => {
            total_salary = parseInt(total_salary) + parseInt(element.salary);
        });
        return (
            <>
              <div className="page-header">
                <PageMap page_name={"Xarajatlarni boshqarish"} />
                <FilterByDepartment/>
                <FilterByTime
                  onFilterDateSubmit={this.onFilterDateSubmit}
                  onSetDay={this.onSetDay}
                  onSetWeek={this.onSetWeek}
                  onSetMonth={this.onSetMonth}
                />

              </div>
              <div className="crm-page-header _expense">
                <div className="crm-box">
                  <div className="card-icon">
                    <i className="fas fa-cart-arrow-down"></i>
                  </div>
                  <div className="count">{total_salary + " So'm"}</div>
                  <div className="card-title">Oylik Xarajatlar</div>
                </div>
                <div className="crm-box">
                  <div className="card-icon">
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                  <div className="count">{marketing_quantity + " So'm"}</div>
                  <div className="card-title">Marketing Xarajatlari</div>
                </div>
                <div className="crm-box">
                  <div className="card-icon">
                    <i className="far fa-credit-card"></i>
                  </div>
                  <div className="count">{other_quantity + " So'm"}</div>
                  <div className="card-title">Boshqa Xarajatlar</div>
                </div>
              </div>
              <div className="register-box _expense">
                <div className="register-table-box table-responsive">
                  <table className="table table-striped table-hover text-center  mb-0">
                    <thead>
                      <tr>
                        <td scope="col">T/R</td>
                        <td scope="col">Nomi</td>
                        <td scope="col">Izox</td>
                        <td scope="col">Miqdori</td>
                        <td scope="col">Foydalanuvchi</td>
                        <td scope="col">Sana</td>
                        <td scope="col">Tahrirlash</td>
                      </tr>
                    </thead>
                    {usersdata.map((user, index) => {
                      {
                        if (user.approved === true) {
                          return (
                            <tbody key={user.id}>
                              <tr>
                                <td>{index}</td>
                                <td>{user.name}</td>
                                <td>{user.description}</td>
                                <td>{user.quantity}</td>
                                <td>
                                  {user.user === null
                                    ? "Ism kiritilmagan"
                                    : user.user.first_name +
                                      " " +
                                      user.user.last_name}
                                </td>
                                <td>{user.created_date.slice(0, 10)}</td>
                                <td className="d-flex justify-content-center">
                                  <i
                                    className="fas fa-trash"
                                    onClick={this.onDeleteAlert.bind(this, user.id)}
                                  ></i>
                                </td>
                              </tr>
                            </tbody>
                          );
                        }
                      }
                    })}
                  </table>
                </div>
              </div>
            </>
          );
    }

}
export default Expense;
