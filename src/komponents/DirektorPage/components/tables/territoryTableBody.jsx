import React, { Component } from "react";
import Loading from "../../../../img/loading-5.gif";
class TerritoryTableBody extends Component {
  state = {};

  render() {
    let count = 0;
    if (typeof this.props.territoryList.results === "undefined") {
      return (
        <div className="loading-box">
          <img src={Loading} alt="" />
        </div>
      );
    } else {
      return (
        <>
          <tbody>
            {this.props.territoryList.results.map((data) => {
              count++;
              if (data !== undefined) {
                return (
                  <tr key={data.id}>
                    <td>{count}</td>
                    <td>{data.name}</td>
                    <td>{data.car.name}</td>
                    <td>
                      {data.agent.first_name + " " + data.agent.last_name}
                    </td>
                    <td>
                      <i
                        className="fas fa-edit"
                        onClick={this.props.onEdit.bind(this, data.id)}
                      ></i>
                      <i
                        className="fas fa-trash"
                        onClick={this.props.deleteFunction.bind(this, data.id)}
                      ></i>
                    </td>
                  </tr>
                );
              } else {
                return <h1>Loading...</h1>;
              }
            })}
          </tbody>
        </>
      );
    }
  }
}

export default TerritoryTableBody;
