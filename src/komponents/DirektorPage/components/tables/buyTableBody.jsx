import React, { Component } from "react";
import Loading from "../../../../img/loading-5.gif";

class BuyTableBody extends Component {
  state = {};
  render() {
    let count = 0;
    let total_price = 0;
    if (typeof this.props.orderList.buy_order_list === "undefined") {
      return (
        <div className="loading-box">
          <img src={Loading} alt="" />
        </div>
      );
    } else {
      return (
        <>
          <tbody>
            {this.props.orderList.buy_order_list.map((order) => {
              total_price += order.quantity * order.price;
              var splits = order.created_date.slice(0, 10);
              count++;
              return (
                <tr key={order.id}>
                  <td>{count}</td>
                  <td>{order.product.provider.name}</td>
                  <td>{order.product.category.name}</td>
                  <td>{order.product.name}</td>
                  <td>{order.quantity + `${""}` + order.product.unit}</td>
                  <td className="text-success">{order.price.price}</td>
                  <td>{order.quantity * order.price.price}</td>
                  <td className="text-danger">{order.debt}</td>
                  <td>{splits}</td>
                </tr>
              );
            })}
          </tbody>
          <div className="total-price">
            <span>Жами қиймати: </span>
            <p>{total_price + " So'm"}</p>
          </div>
        </>
      );
    }
  }
}

export default BuyTableBody;
