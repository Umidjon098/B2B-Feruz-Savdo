import React, { Component } from "react";
import Loading from "../../../../img/loading-5.gif";
class ProviderTableBody extends Component {
  state = {};

  render() {
    let count = 0;
    if (typeof this.props.providerList.providers === "undefined") {
      return (
        <div className="loading-box">
          <img src={Loading} alt="" />
        </div>
      );
    } else {
      return (
        <>
          <tbody>
            {this.props.providerList.providers.map((list) => {
              count++;
              return (
                <tr key={list.id}>
                  <td>{count}</td>
                  <td>{list.name}</td>
                  <td>{list.address}</td>
                  <td>{list.phone_number1}</td>
                  <td>{list.phone_number2}</td>
                  <td>{list.account_number}</td>
                  <td>{list.bank}</td>
                  <td>{list.bank_code}</td>
                  <td>{list.INN}</td>
                  <td>{list.director}</td>
                  <td>{list.MFO === null ? "Mavjud emas" : list.MFO}</td>
                  <td>{list.NDS === null ? "Mavjud emas" : list.NDS}</td>
                  <td>{list.responsible_agent}</td>
                  <td>{list.created_date.slice(0, 10)}</td>
                  <td className="d-flex justify-content-center">
                    <i
                      className="fas fa-edit"
                      onClick={this.props.onEdit.bind(this, list.id)}
                    ></i>
                    <i
                      className="fas fa-trash"
                      onClick={this.props.deleteFunction.bind(this, list.id)}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </>
      );
    }
  }
}

export default ProviderTableBody;
