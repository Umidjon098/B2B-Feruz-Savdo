import React, { Component } from "react";
import axios from "axios";
import DailySaleChart from "../charts/dailySaleChart";

class DailySaleStats extends Component {
  state = {
    chartData: [],
  };
  componentDidMount = async () => {
    this._makeApiRequest();
  };

  async _makeApiRequest() {
    let cash = [];
    let credit_card = [];
    let money_transfer = [];
    let debt = [];
    const response = await axios.get(this.props.url, {
      params: {
        start_date: this.props.start_date,
        end_date: this.props.end_date,
        department: this.props.department,
      },
    });
    response.data.forEach((element) => {
      cash = [
        ...cash,
        {
          date: element.date,
          quantity: element.cash,
        },
      ];
      credit_card = [
        ...credit_card,
        {
          date: element.date,
          quantity: element.credit_card,
        },
      ];
      money_transfer = [
        ...money_transfer,
        {
          date: element.date,
          quantity: element.money_transfer,
        },
      ];
      // debt = [
      //   ...debt,
      //   {
      //     date: element.date,
      //     quantity: element.debt,
      //   },
      // ];
    });

    let dataChart = [
      { name: "naqd", data: cash },
      {
        name: "plastik karta",
        data: credit_card,
      },
      {
        name: "pul o'tkazish",
        data: money_transfer,
      },
      // {
      //   name: "debt",
      //   data: debt,
      // },
    ];
    this.setState({ chartData: dataChart });
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this._makeApiRequest();
    }
  }
  render() {
    return (
      <div className="chart-box">
        <DailySaleChart
          name={this.props.name}
          title={this.props.title}
          chartData={this.state.chartData}
          axisY={this.props.axisY}
        />
      </div>
    );
  }
}

export default DailySaleStats;
