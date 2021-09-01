import React, { Component } from "react";
import PageMap from "../page-road-map/page-map";
import DataTable from "../tables/dataTable";
import "./crm-style.css";
class ClientStats extends Component {
  state = {};
  render() {
    const name = "clientStat";
    const headers = [
      "Т/Р",
      "Дўкон коди",
      "Исм",
      "Дўкон тури",
      "Нарх тури",
      "Сотув агенти",
      "Машрут",
      "Ҳудуд",
      "Директор",
      "Телефон рақами(директор)",
      "Туғилган сана",
      "Масъул агент",
      "Телефон Рақам(ишчи)",
      "Манзили",
      "Таргет",
      "Узунлик",
      "Кенглик",
      "ИНН",
      "Расм",
      "Яратилган сана",
      "Таҳрирлаш",
    ];
    return (
      <>
        <PageMap page_name={"Мижозлар Рўйхати"} />
        <DataTable
          name={name}
          headers={headers}
          url={"/api/client/client-list/"}
          params={this.state.start_date}
        />
      </>
    );
  }
}

export default ClientStats;
