import React, { Component } from "react";
import axios from "axios";
import PageMap from "../../DirektorPage/components/page-road-map/page-map";
import FilterByTime from "../../DirektorPage/components/CalendarFilter/filterByTime";
import DailySaleStats from "../../DirektorPage/components/stats/dailySaleStats";
import MonthlyTurnOver from "../../DirektorPage/components/stats/monthlyTurnoverStats";

class Dashboard extends Component {
  state = {
    infos: [],
    total: 0,
    cash: 0,
    plastic: 0,
    transfer: 0,
    card_update: false,
    current_date: "Ҳафталик савдо",
    chart_date: "Ҳафталик савдо",
  };

  componentDidMount() {
    this.getSaleInfo();
  }
  //118 119 / 64 65
  getSaleInfo = async () => {
    let data_params;
    if (typeof sessionStorage.id === undefined) {
      data_params = {
        start_date: this.state.start_date,
        end_date: this.state.end_date,
      };
    } else {
      data_params = {
        start_date: this.state.start_date,
        end_date: this.state.end_date,
        department: sessionStorage.id,
      };
      this.setState({ department: sessionStorage.id });
    }
    const url = "/api/report/data-daily-sale/";
    await axios(url, { params: data_params }).then((info) =>
      this.setState({ infos: info.data, card_update: false })
    );
  };

  componentDidUpdate() {
    let total = 0;
    let cash = 0;
    let plastic = 0;
    let transfer = 0;
    this.state.infos.map((data) => {
      total = total + data.total;
      cash = cash + data.cash;
      plastic = plastic + data.plastic;
      transfer = transfer + data.transfer;
    });
    if (this.state.card_update === true) {
      this.getSaleInfo();
    }
  }

  onSetDay = async (date) => {
    await this.setState({
      start_date: date,
      card_update: true,
      current_date: "Бугун",
      chart_date: "Бугунги Савдо",
    });
    await this.getSaleInfo();
  };

  onSetWeek = async (date) => {
    await this.setState({
      start_date: date,
      card_update: true,
      current_date: "Ўтган Ҳафта",
      chart_date: "Ўтган Ҳафталик Савдо",
    });
    await this.getSaleInfo();
  };
  onSetMonth = async (date) => {
    await this.setState({
      start_date: date,
      card_update: true,
      current_date: "Ўтган Ой",
      chart_date: "Ўтган Ойлик Савдо",
    });
    await this.getSaleInfo();
  };
  onFilterDateSubmit = async (startDate, endDate) => {
    await this.setState({
      card_update: true,
      start_date: startDate,
      end_date: endDate,
      current_date: startDate + " дан " + endDate + " гача",
      chart_date: startDate + " дан " + endDate + " гача",
    });
    await this.getSaleInfo();
  };

  render() {
    return (
      <>
        <div className="page-header">
          <PageMap page_name={"Дашбоард"} />
          <FilterByTime
            onFilterDateSubmit={this.onFilterDateSubmit}
            onSetDay={this.onSetDay}
            onSetWeek={this.onSetWeek}
            onSetMonth={this.onSetMonth}
          />
        </div>

        <div className="dashboard-top">
          <div className="top-card">
            <div className="card-icon">
              <i className="fas fa-cart-arrow-down"></i>
            </div>
            <div className="card-title">Умумий Савдо</div>
            <div className="count">{this.state.total + " сўм"}</div>
            <div className="date">{this.state.current_date}</div>
          </div>
          <div className="top-card">
            <div className="card-icon">
              <i className="fas fa-dollar-sign"></i>
            </div>
            <div className="card-title">Нақд пул</div>
            <div className="count">{this.state.cash + " сўм"}</div>
            <div className="date">{this.state.current_date}</div>
          </div>
          <div className="top-card">
            <div className="card-icon">
              <i className="far fa-credit-card"></i>
            </div>
            <div className="card-title">Пластик</div>
            <div className="count">{this.state.plastic + " сўм"}</div>
            <div className="date">{this.state.current_date}</div>
          </div>
          <div className="top-card">
            <div className="card-icon">
              <i className="fas fa-university"></i>
            </div>
            <div className="card-title">Банк орқали</div>
            <div className="count">{this.state.transfer + " сўм"}</div>
            <div className="date">{this.state.current_date}</div>
          </div>
          <div className="top-card">
            <div className="card-icon">
              <i className="  fas fa-money-check-alt"></i>
            </div>
            <div className="card-title">Насия</div>
            <div className="count">{" сўм"}</div>
            <div className="date">{this.state.current_date}</div>
          </div>
        </div>

        <div className="graphics-box">
          <div className="graphics">
            <DailySaleStats
              title={{
                title: `${this.state.chart_date}`,
                titleAxisY: "Пул миқдори",
                suffix: "сўм",
              }}
              axisY={"quantity"}
              name={"name"}
              url={"/api/report/data-daily-sale/"}
              start_date={this.state.start_date}
              end_date={this.state.end_date}
              department={this.state.department}
            />
          </div>
        </div>
        <div className="graphics-box">
          <div className="graphics">
            <MonthlyTurnOver
              name={"Ойлик пул айланма"}
              nameAxisY={"сумма"}
              url={"/api/report/monthly-turnover/"}
              department={this.state.department}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
