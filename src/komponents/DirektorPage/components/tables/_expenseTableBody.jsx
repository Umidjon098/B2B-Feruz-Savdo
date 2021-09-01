import React, { Component } from "react";
import Loading from "../../../../img/loading-5.gif";

class _ExpenseTableBody extends Component {
  state = {};
  render() {
    let count = 0;
    if (typeof this.props.expenseList.expenses === "undefined") {
      return (
        <div className="loading-box">
          <img src={Loading} alt="" />
        </div>
      );
    } else {
      return (
        <>
          {this.props.expenseList.expenses.map((user) => {
            count++;
            {
              if (user.approved === true) {
                return (
                  <tbody key={user.id}>
                    <tr>
                      <td>{count}</td>
                      <td>{user.name}</td>
                      <td>{user.description}</td>
                      <td>{user.quantity}</td>
                      <td>
                        {user.user === null
                          ? "Ism kiritilmagan"
                          : user.user.first_name + " " + user.user.last_name}
                      </td>
                      <td>{user.created_date.slice(0, 10)}</td>
                      <td className="d-flex justify-content-center">
                        <i
                          className="fas fa-trash"
                          onClick={this.props.deleteFunction.bind(
                            this,
                            user.id
                          )}
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                );
              }
            }
          })}
        </>
      );
    }
  }
}

export default _ExpenseTableBody;
