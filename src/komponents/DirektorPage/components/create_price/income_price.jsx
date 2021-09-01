import axios from "axios";
import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

class CreateIncomePrice extends Component {
  state = {
    price: "",
    incomePriceList: [],
    product: "",
    product_name: "",
    btn_type: "Қўшиш",
    update: false,
    productList: [],
    updateData: false,
    id: "",
    is_usd: "",
  };
  componentDidMount() {
    this.getIncomePriceList();
    this.getProductList();
  }
  componentDidUpdate() {
    if (this.state.updateData !== false) {
      this.getIncomePriceList();
    }
  }
  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  getIncomePriceList = async () => {
    let incomePriceList = await axios.get("/api/product/income-price-list/");
    this.setState({
      incomePriceList: incomePriceList.data.results,
    });
  };
  getProductList = async () => {
    let productList = await axios.get("/api/product/product-list/");
    this.setState({
      productList: productList.data.products,
    });
  };
  createIncomePrice = (event) => {
    event.preventDefault();
    const url = "/api/product/income-price-list/";
    const check = document.getElementById("usd");
    let usd = check.checked ? true : false;
    const { price, product } = this.state;
    axios.post(url, { price, product, is_usd: usd }).then((data) =>
      this.setState((prevState) => ({
        incomePriceList: [
          ...prevState.incomePriceList,
          {
            ...data.data,
          },
        ],
      }))
    );
    this.setState({ price: "" });
  };
  onDelete = (e) => {
    const url = `/api/product/income-price-detail/`;
    axios.delete(url + e).then((response) => {
      if (response.data != null) {
        this.setState({
          incomePriceList: this.state.incomePriceList.filter(
            (data) => data.id != e
          ),
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
    const url = "/api/product/income-price-detail/";
    axios.get(url + id).then((response) => {
      this.setState({
        price: response.data.price,
        product: response.data.product.id,
        product_name: response.data.product.name,
        btn_type: "Сақлаш",
        update: true,
        id: id,
      });
    });
  };
  onUpdate = (e) => {
    e.preventDefault();
    const url = `/api/product/income-price-detail/${this.state.id}/`;
    const { price, product } = this.state;
    axios.put(url, { price, product }).then((data) => {
      this.setState(
        {
          btn_type: "Қўшиш",
          update: false,
          price: "",
          product_name: "",
          creditial: "Ўзгартириш муваффақиятли бажарилди Кутинг!",
        },
        () =>
          setTimeout(() => {
            this.setState({
              creditial: "",
            });
          }, 3000)
      );
    });
    this.setState({ updateData: true });
  };
  render() {
    let count = 0;
    return (
      <div className="solary-box">
        <div className="filter-box mb-4">
          <h4>Сотиб Олиш Нархи</h4>
        </div>
        <form
          className="input-form"
          onSubmit={this.state.update ? this.onUpdate : this.createIncomePrice}
        >
          <input
            type="number"
            name="price"
            value={this.state.price}
            onChange={this.handleInput}
            placeholder="Миқдори"
          />
          <span>
            <input id="usd" type="checkbox" />
            <label htmlFor="usd">Доллардами</label>
          </span>
          <select onChange={this.handleInput} name="product">
            <option value={this.state.product}>
              {"Жорий Маҳсулот " + this.state.product_name}
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
                <td scope="col">Маҳсулот</td>
                <td scope="col">Нархи</td>
                <td scope="col">USD</td>
                <td scope="col">Таҳрирлаш</td>
              </tr>
            </thead>
            <tbody>
              {this.state.incomePriceList.map((data) => {
                count++;
                if (data.length === 0) {
                  return <h1>Loading</h1>;
                } else {
                  return (
                    <tr key={data.id}>
                      <td>{count}</td>
                      <td>{data.product.name}</td>
                      <td>{data.price}</td>
                      <td>{data.is_usd ? "Долларда" : "Сўмда"}</td>
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

export default CreateIncomePrice;
