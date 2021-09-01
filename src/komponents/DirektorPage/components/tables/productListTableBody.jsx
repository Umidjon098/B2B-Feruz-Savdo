import axios from "axios";
import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import Loading from "../../../../img/loading-5.gif";

class ProductListTableBody extends Component {
  onDelete = (e) => {
    const url = "/api/product/product-detail/";
    axios.delete(url + e);
    this.props.parentCallback(true);
  };
  onDeleteAlert = (e) => {
    confirmAlert({
      message: "O'chirish uchun tasdiqlang",
      buttons: [
        {
          label: "O'chirish",
          onClick: () => this.onDelete(e),
        },
        {
          label: "Qaytish",
          onClick: () => console.log(""),
        },
      ],
    });
  };

  render() {
    let count = 0;
    if (typeof this.props.productList.products === "undefined") {
      return (
        <div className="loading-box">
          <img src={Loading} alt="" />
        </div>
      );
    } else {
      return (
        <>
          <tbody>
            {this.props.productList.products.map((list) => {
              count++;
              return (
                <tr key={list.id}>
                  <td>{count}</td>
                  <td>{list.name}</td>
                  <td>{list.category.name}</td>
                  <td>{list.provider.name}</td>
                  <td>{list.unit}</td>
                  <td>
                    {list.product_type === "limited"
                      ? "Cheklangan"
                      : "Cheklanmagan"}
                  </td>
                  <td>{list.estimated_delivery_days}</td>
                  <td className="d-flex justify-content-center">
                    <i
                      className="fas fa-edit"
                      onClick={this.props.onEdit.bind(this, list.id)}
                    ></i>
                    <i
                      className="fas fa-trash"
                      onClick={this.onDeleteAlert.bind(this, list.id)}
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

export default ProductListTableBody;
