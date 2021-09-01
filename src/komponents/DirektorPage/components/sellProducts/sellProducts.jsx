import React, { Component } from "react";
import axios from "axios";
import DataTable from "../tables/dataTable";
import PageMap from "../page-road-map/page-map";
import FilterByTime from "../CalendarFilter/filterByTime";
import ABCStats from "../stats/abcStats";
import ABCTable from "./abcTable";

class SellProducts extends Component {
  state = {
    ABCProfit: [],
    ABCSale: [],
    start_date:
      new Date().getFullYear() +
      "-" +
      parseInt(new Date().getMonth() + 1) +
      "-" +
      new Date().getDate(),
    update: false,
  };
  headers = [
    "Т/Р",
    "Мижоз",
    "Манзил",
    "Телефон рақам",
    "Агент",
    "Маҳсулот",
    "Миқдори",
    "Нархи",
    "Чегирма",
    "Ҳолати",
    "Кирим куни",
  ];
  async componentDidMount() {
    this.getNetProfitABC();
    this.getSaleABC();
  }
  getNetProfitABC = async () => {
    const url = "/api/report/net-profit-abc-analysis/";
    await axios(url).then((response) =>
      this.setState({ ABCProfit: response.data })
    );
  };
  getSaleABC = async () => {
    const url = "/api/report/sale-abc-analysis/";
    await axios(url).then((response) =>
      this.setState({ ABCSale: response.data })
    );
  };

  onSetDay = async (start_date) => {
    await this.setState({
      start_date,
      update: true,
    });
  };

  onSetWeek = async (start_date) => {
    await this.setState({
      start_date,
      update: true,
    });
  };
  onSetMonth = async (start_date) => {
    await this.setState({
      start_date,
      update: true,
    });
  };
  onFilterDateSubmit = async (startDate, endDate) => {
    await this.setState({
      start_date: startDate,
      end_date: endDate,
      update: true,
    });
  };
  breakUpdate = (value) => {
    this.setState({ update: value });
  };
  render() {
    const name = "sellProduct";
    if (typeof this.state.ABCSale && this.state.ABCProfit !== undefined) {
      return (
        <div>
          <div className="page-header">
            <PageMap page_name={"Маҳсулотларни бошқариш"} />
            <FilterByTime
              onFilterDateSubmit={this.onFilterDateSubmit}
              onSetDay={this.onSetDay}
              onSetWeek={this.onSetWeek}
              onSetMonth={this.onSetMonth}
            />
          </div>
          <DataTable
            name={name}
            headers={this.headers}
            url={"/api/order/sell-order-list/"}
            start_date={this.state.start_date}
            end_date={this.state.end_date}
          />
          <div className="graphics-box">
            <div className="graphics">
              <div className="column-graphics">
                <div className="graphics-item">
                  <ABCStats
                    name={"АБC Савдо Таҳлили"}
                    code={"sale"}
                    url={"/api/report/sale-abc-analysis/"}
                    params={this.state.start_date}
                  />
                </div>
                <div className="graphics-item">
                  <ABCStats
                    name={"АБC Ялпи Даромад Таҳлили"}
                    code={"net-profit"}
                    url={"/api/report/net-profit-abc-analysis/"}
                    params={this.state.start_date}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="total-datas control-product">
            <div className="control-product-item">
              <div className="total-item">
                <span>А Умумий Савдо: </span>
                {this.state.ABCSale.a_category_data === undefined
                  ? ""
                  : this.state.ABCSale.a_category_data.total_price.toFixed(2) +
                    " Сўм"}
              </div>
              <div className="total-item">
                <span>B Умумий Савдо: </span>
                {this.state.ABCSale.b_category_data === undefined
                  ? ""
                  : this.state.ABCSale.b_category_data.total_price.toFixed(2) +
                    " Сўм"}
              </div>
              <div className="total-item">
                <span>C Умумий Савдо: </span>
                {this.state.ABCSale.c_category_data === undefined
                  ? ""
                  : this.state.ABCSale.c_category_data.total_price.toFixed(2) +
                    " Сўм"}
              </div>
            </div>
            <div className="control-product-item">
              <div className="total-item">
                <span>A Ялпи даромад: </span>
                {this.state.ABCProfit.a_category_data === undefined
                  ? ""
                  : this.state.ABCProfit.a_category_data.total_profit.toFixed(
                      2
                    ) + " Сўм"}
              </div>
              <div className="total-item">
                <span>B Ялпи даромад: </span>
                {this.state.ABCProfit.b_category_data === undefined
                  ? ""
                  : this.state.ABCProfit.b_category_data.total_profit.toFixed(
                      2
                    ) + " Сўм"}
              </div>
              <div className="total-item">
                <span>C Ялпи даромад: </span>
                {this.state.ABCProfit.c_category_data === undefined
                  ? ""
                  : this.state.ABCProfit.c_category_data.total_profit.toFixed(
                      2
                    ) + " Сўм"}
              </div>
            </div>
          </div>

          <div className="abc-table">
            <div className="box">
              <ABCTable
                url={"/api/report/sale-abc-analysis/"}
                params={this.state.start_date}
              />
            </div>
            <div className="box">
              <ABCTable
                url={"/api/report/net-profit-abc-analysis/"}
                params={this.state.start_date}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
}

export default SellProducts;
