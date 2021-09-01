import React, { Component } from "react";
import axios from "axios";
import PageMap from "../page-road-map/page-map";
import DataTable from "../tables/dataTable";
import StatisticsDataTable from "../tables/statistics_data_table";

class Statistics extends Component {
  state = {
    statisticsData: [],
  };
  async componentDidMount() {
    this.getStatisticsData();
  }
  getStatisticsData = async () => {
    const url = "/api/report/statistics/";
    await axios(url).then((response) => {
      this.setState({ statisticsData: response.data.total });
    });
  };

  render() {
    const headers = [
      "Т/Р",
      "Маҳсулот",
      "Қолдиқ",
      "Кирим Нархи",
      "Сотиш Нархи",
      "Ўртача Кунлик Савдо",
      "Норматив, кун",
      "Умимий Қолдиқ, сўм",
      "Қолдиқ, кун",
      "Ялпи даромад, кунлик",
      "Ялпи Даромадда улушлар",
      "Маржа",
      "Устама",
      "ООС сабабли йўқотиш",
      "Музлатилган пул",
      "Музлатилган пул қолдиққа нисбатан фоизда",
      "Керакли Маҳсулот",
      "Керакли пул",
    ];
    const name = "statistics";
    return (
      <>
        <div className="page-header mt-5">
          <PageMap page_name={"Overstock / Out of Stock Tahlil"} />
          <div className="total-datas">
            <div className="total-item">
              <span>ООС сабабли йўқотиш: </span>
              {this.state.statisticsData.OOS !== undefined
                ? this.state.statisticsData.OOS.toFixed(2) + " Сўм"
                : ""}
            </div>
            <div className="total-item">
              <span>Кунлик Ялпи Даромад: </span>
              {this.state.statisticsData.daily_total_income !== undefined
                ? this.state.statisticsData.daily_total_income.toFixed(2) +
                  " Сўм"
                : "" + " Сўм"}
            </div>
            <div className="total-item">
              <span>Музлатилган Пул: </span>
              {this.state.statisticsData.frozen_money !== undefined
                ? this.state.statisticsData.frozen_money.toFixed(2) + " Сўм"
                : "" + " Сўм"}
            </div>
            <div className="total-item">
              <span>Умумий Қолдиқ: </span>
              {this.state.statisticsData.total_residue !== undefined
                ? this.state.statisticsData.total_residue.toFixed(2) + " Сўм"
                : "" + " Сўм"}
            </div>
          </div>
        </div>
        <StatisticsDataTable
          headers={headers}
          name={name}
          url={"/api/report/statistics/"}
        />
      </>
    );
  }
}

export default Statistics;
