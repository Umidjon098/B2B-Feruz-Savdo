import React, { Component } from "react";
import axios from "axios";
import PageMap from "../page-road-map/page-map";
import FilterByTime from "../CalendarFilter/filterByTime";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import DataTable from "../tables/dataTable";

class _Expense extends Component {
  state = {
    usersdata: [],
    salarydata: [],
    start_date: "",
  };
  componentDidMount() {
    this.getSalaryData(this.state.start_date);
  }

  getSalaryData = async (start_date) => {
    const url = "/api/salary/salary-list/";
    axios(url, {
      params: {
        start_date: start_date,
      },
    }).then((res) => this.setState({ salarydata: res.data }));
  };

  onSetDay = async (start_date) => {
    await this.getSalaryData(start_date);
  };
  onSetWeek = async (start_date) => {
    await this.getSalaryData(start_date);
  };
  onSetMonth = async (start_date) => {
    await this.getSalaryData(start_date);
  };
  onFilterDateSubmit = async (startDate) => {
    await this.getSalaryData(startDate);
  };

  render() {
    const name = "expenseList";
    const headers = [
      "Т/Р",
      "Номи",
      "Изох",
      "Миқдори",
      "Фойдаланувчи",
      "Сана",
      "Ўчириш",
    ];
    const { usersdata, salarydata } = this.state;
    let marketing_quantity = 0;
    let others_quantity = 0;
    let total_salary = 0;
    usersdata.forEach((element) => {
      if (element.category === "marketing") {
        marketing_quantity =
          parseInt(marketing_quantity) + parseInt(element.quantity);
      } else {
        others_quantity =
          parseInt(others_quantity) + parseInt(element.quantity);
      }
    });
    salarydata.forEach((element) => {
      total_salary = parseInt(total_salary) + parseInt(element.salary);
    });
    return (
      <>
        <div className="page-header">
          <PageMap page_name={"Харажатларни бошқариш"} />
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
            <div className="count">{total_salary + " Сўм"}</div>
            <div className="card-title">Ойлик Харажатлар</div>
          </div>
          <div className="crm-box">
            <div className="card-icon">
              <i className="fas fa-dollar-sign"></i>
            </div>
            <div className="count">{marketing_quantity + " Сўм"}</div>
            <div className="card-title">Маркетинг Харажатлари</div>
          </div>
          <div className="crm-box">
            <div className="card-icon">
              <i className="far fa-credit-card"></i>
            </div>
            <div className="count">{others_quantity + " Сўм"}</div>
            <div className="card-title">Бошқа Харажатлар</div>
          </div>
        </div>
        <DataTable
          name={name}
          headers={headers}
          url={"/api/expense_discount/expense-list/"}
          deleteUrl={"/api/expense_discount/expense-detail/"}
        />
      </>
    );
  }
}

export default _Expense;
