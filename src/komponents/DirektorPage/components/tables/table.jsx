import React, { Component } from "react";
import "../../styles/table-style.css";
import BuyTableBody from "./buyTableBody";
import SellTableBody from "./sellTableBody";
import ClientStatTableBody from "./clientStatTableBody";
import WarehouseTableBody from "./warehouseTableBody";
import StatisticsTableBody from "./statisticsTableBody";
import ProductListTableBody from "./productListTableBody";
import ProviderTableBody from "./providerTableBody";
import TerritoryTableBody from "./territoryTableBody";
import _ExpenseTableBody from "./_expenseTableBody";

class Table extends Component {
  state = {};
  handleTableBody = () => {
    if (this.props.name === "buyProduct") {
      return <BuyTableBody orderList={this.props.orderList} />;
    } else if (this.props.name === "sellProduct") {
      return <SellTableBody orderList={this.props.orderList} />;
    } else if (this.props.name === "clientStat") {
      return (
        <ClientStatTableBody
          clientList={this.props.orderList}
          parentCallback={this.handleCallback}
        />
      );
    } else if (this.props.name === "warehouse") {
      return <WarehouseTableBody productList={this.props.orderList} />;
    } else if (this.props.name === "statistics") {
      return <StatisticsTableBody statisticsData={this.props.orderList} />;
    } else if (this.props.name === "productList") {
      return (
        <ProductListTableBody
          onEdit={this.props.onEdit}
          onDeleteAllert={this.props.onDeleteAllert}
          productList={this.props.orderList}
          parentCallback={this.handleCallback}
        />
      );
    } else if (this.props.name === "providerList") {
      return (
        <ProviderTableBody
          providerList={this.props.orderList}
          deleteFunction={this.props.deleteFunction}
          onEdit={this.props.onEdit}
        />
      );
    } else if (this.props.name === "territoryList") {
      return (
        <TerritoryTableBody
          territoryList={this.props.orderList}
          deleteFunction={this.props.deleteFunction}
          onEdit={this.props.onEdit}
        />
      );
    } else if (this.props.name === "expenseList") {
      return (
        <_ExpenseTableBody
          expenseList={this.props.orderList}
          deleteFunction={this.props.deleteFunction}
        />
      );
    }
  };
  handleCallback = (childData) => {
    this.props.parentCallback(childData);
  };

  render() {
    return (
      <div className="table-responsive">
        <table className="table table-striped table-hover text-center  mb-0">
          <thead>
            <tr>
              {this.props.headers.map((header) => {
                return (
                  <td scope="col" key={header}>
                    {header}
                  </td>
                );
              })}
            </tr>
          </thead>
          {this.handleTableBody()}
        </table>
      </div>
    );
  }
}

export default Table;
