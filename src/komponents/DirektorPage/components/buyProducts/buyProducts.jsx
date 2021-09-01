import React, { Component } from "react";
import FilterByTime from "../CalendarFilter/filterByTime";
import PageMap from "../page-road-map/page-map";
import Statistics from "../statistics/statistics";
import DateSaleStats from "../stats/dateSaleStats";
import DataTable from "../tables/dataTable";

class BuyProducts extends Component {
  state = {
    infos: [],
    start_date: "",
    end_date: "",
    update: false,
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
    const headers = [
      "Т/Р",
      "Таминотчи",
      "Категория",
      "Маҳсулот",
      "Миқдори",
      "Кирим нархи",
      "Қиймати",
      "Дебт",
      "Кирим куни",
    ];
    const name = "buyProduct";
    return (
      <div>
        <div className="page-header">
          <PageMap page_name={"Маҳсулотлар Кирими"} />
          <FilterByTime
            onFilterDateSubmit={this.onFilterDateSubmit}
            onSetDay={this.onSetDay}
            onSetWeek={this.onSetWeek}
            onSetMonth={this.onSetMonth}
          />
        </div>
        <DataTable
          name={name}
          headers={headers}
          url={"/api/order/buy-order-list/"}
          start_date={this.state.start_date}
          end_date={this.state.end_date}
        />

        <div>
          <Statistics />
        </div>
        <div className="pie-chart">
          <DateSaleStats
            url={"/api/order/data-pie-chart/"}
            start_date={this.state.start_date}
            end_date={this.state.end_date}
            updateData={this.state.update}
          />
        </div>
      </div>
    );
  }
}

export default BuyProducts;
