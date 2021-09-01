import React, { Component } from "react";
import axios from "axios";

import PieChart from "../charts/pieChart";

class DateSaleStats extends Component {
  state = {
    litr: [],
    kg: [],
    dona: [],
  };

  async componentDidMount() {
    this.getChartDataFromServer();
  }
  async getChartDataFromServer() {
    let response = await axios.get(this.props.url, {
      params: {
        start_date: this.props.start_date,
        end_date: this.props.end_date,
      },
    });
    this.setState({
      litr: response.data["litr"],
      kg: response.data["kg"],
      dona: response.data["dona"],
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.updateData !== prevProps.updateData) {
      this.getChartDataFromServer();
    }
  }
  render() {
    return (
      <div className="chart-box">
        <div className="pie-chart-box">
          <PieChart
            suffix={" Litr"}
            title={"Литр"}
            saleData={this.state.litr}
          />
          <PieChart
            suffix={" Кг"}
            title={"Килограм"}
            saleData={this.state.kg}
          />
          <PieChart suffix={" та"} title={"Дона"} saleData={this.state.dona} />
        </div>
      </div>
    );
  }
}

export default DateSaleStats;
