import React, { Component } from "react";
import Loading from "../../../../img/loading-5.gif";

class SellTableBody extends Component {
  state = {};
  render() {
    let count = 0;
    let total_price = 0;
    if (typeof this.props.orderList.sell_order_list === "undefined") {
      return (
        <div className="loading-box">
          <img src={Loading} alt="" />
        </div>
      );
    } else {
      return (
        <>
          <tbody>
            {this.props.orderList.sell_order_list.map((order) => {
              var splits = order.created_date.slice(0, 10);
              total_price += order.quantity * order.price.price;
              count++;
              return (
                <tr key={order.id}>
                  <td>{count}</td>
                  <td>{order.client.name}</td>
                  <td>{order.client.address}</td>
                  <td>{order.client.work_phone_number}</td>
                  <td>
                    {order.dairy === null
                      ? "Agent navjud emas!"
                      : order.dairy.agent.first_name +
                        " " +
                        order.dairy.agent.last_name}
                  </td>
                  <td>{order.product.name}</td>
                  <td>
                    {order.given_quantity === null ? 0 : order.given_quantity}
                  </td>
                  <td>{order.price.price}</td>
                  <td>{order.discount + " %"}</td>
                  <td className="text-success">{order.status}</td>
                  <td>{splits}</td>
                </tr>
              );
            })}
          </tbody>
          {/* <div className="total-price">
            <span>Жами қиймати: </span>
            <p>{total_price + " So'm"}</p>
          </div> */}
        </>
      );
    }
  }
}

export default SellTableBody;
