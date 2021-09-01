import axios from "axios";
import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import preLoader from "../../../../img/loading-5.gif";

class ProductDiscount extends Component {
  state = {
    discount: "",
    is_active: "",
    product: "",
    productList: [],
    discountList: [],
    btn_type: "Қўшиш",
    update: false,
    updateData: false,
    id: "",
  };
  componentDidMount() {
    this.getProductList();
    this.getDuscountList();
  }
  componentDidUpdate() {
    if (this.state.updateData !== false) {
      this.getDuscountList();
    }
  }
  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  getProductList = async () => {
    let productList = await axios.get("/api/product/product-list/");
    this.setState({
      productList: productList.data.products,
    });
  };
  getDuscountList = async () => {
    let discountList = await axios.get(
      "/api/expense_discount/product-discount/"
    );
    this.setState({
      discountList: discountList.data.results,
      updateData: false,
    });
  };

  createDiscount = (event) => {
    event.preventDefault();
    const url = "/api/expense_discount/product-discount/";
    const check = document.getElementById("usd");
    let is_active = check.checked ? true : false;
    const { discount, product } = this.state;
    axios.post(url, { discount, product, is_active }).then((data) => {
      this.setState({ updateData: true });
    });
  };
  onDelete = (e) => {
    const url = `/api/expense_discount/product-discount-detail/`;
    axios.delete(url + e).then((response) => {
      if (response.data != null) {
        this.setState({
          discountList: this.state.discountList.filter((data) => data.id != e),
        });
      }
    });
  };
  onDeleteAlert = (e) => {
    confirmAlert({
      message: "Ўчириш учун тасдиқланг",
      buttons: [
        {
          label: "Ўчириш",
          onClick: () => this.onDelete(e),
        },
        {
          label: "Қайтиш",
          onClick: () => console.log(""),
        },
      ],
    });
  };
  onEdit = (id) => {
    const url = "/api/expense_discount/product-discount-detail/";
    axios.get(url + id).then((response) => {
      this.setState({
        product: response.data.product.name,
        discount: response.data.discount,
        is_active: response.data.is_active,
        btn_type: "Сақлаш",
        update: true,
        id: id,
      });
    });
  };
  onUpdate = (e) => {
    e.preventDefault();
    const url = `/api/expense_discount/product-discount-detail/${this.state.id}/`;
    const { product, discount, is_active } = this.state;
    axios.put(url, { discount, product, is_active }).then(() => {
      this.setState(
        {
          btn_type: "Қўшиш",
          update: false,
          creditial: "Ўзгартириш муваффақиятли бажарилди Кутинг!",
          updateData: true,
        },
        () =>
          setTimeout(() => {
            this.setState({
              creditial: "",
              updateData: false,
            });
          }, 3000)
      );
    });
  };
  render() {
    let count = 0;
    return (
      <div className="solary-box">
        <div className="filter-box mb-4">
          <h4>Маҳсулотга чегирма белгилаш</h4>
        </div>
        <form
          className="input-form"
          onSubmit={this.state.update ? this.onUpdate : this.createDiscount}
        >
          <input
            type="number"
            name="discount"
            value={this.state.discount}
            onChange={this.handleInput}
            placeholder="Миқдори"
          />
          <span>
            <input id="usd" type="checkbox" />
            <label htmlFor="usd">Фаол</label>
          </span>
          <select onChange={this.handleInput} name="product">
            <option value={this.state.product}>
              {"Жорий Маҳсулот " + this.state.product}
            </option>
            {this.state.productList.map((list) => {
              return (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              );
            })}
          </select>
          <button className="btn btn-primary" type="submit">
            {this.state.btn_type}
          </button>
        </form>
        <div className="solary-table table-responsive">
          <label className="notification">{this.state.creditial}</label>
          <table className="table table-striped table-hover text-center  mb-0">
            <thead>
              <tr>
                <td scope="col">T/P</td>
                <td scope="col">Миқдори</td>
                <td scope="col">Маҳсулот</td>
                <td scope="col">Холати</td>
                <td scope="col">Таҳрирлаш</td>
              </tr>
            </thead>
            <tbody>
              {this.state.discountList.map((data) => {
                count++;
                if (data.length === 0) {
                  return <img src={preLoader} alt="" />;
                } else {
                  return (
                    <tr key={data.id}>
                      <td>{count}</td>
                      <td>{data.discount}</td>
                      <td>{data.product.name}</td>
                      <td>{data.is_active ? "Фаол" : "Фаолемас"}</td>
                      <td>
                        <i
                          className="fas fa-edit"
                          onClick={this.onEdit.bind(this, data.id)}
                        ></i>
                        <i
                          className="fas fa-trash"
                          onClick={this.onDeleteAlert.bind(this, data.id)}
                        ></i>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ProductDiscount;
