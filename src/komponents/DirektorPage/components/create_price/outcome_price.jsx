import axios from "axios";
import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Loading from "../../../../img/loading-5.gif";

class CreateOutcomePrice extends Component {
  state = {
    outcomePriceList: [],
    productList: [],
    priceTypeList: [],
    clientList: [],
    price_type: "",
    price_type_name: "",
    price: "",
    product: "",
    product_name: "",
    client: "",
    client_name: "",
    btn_type: "Қўшиш",
    update: false,
    id: "",
    updateData: false,
  };
  componentDidMount() {
    this.getClientList();
    this.getPriceTypeList();
    this.getProductList();
    this.getOutcomePriceList();
  }
  componentDidUpdate() {
    if (this.state.updateData !== false) {
      this.getOutcomePriceList();
    }
  }
  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  getClientList = async () => {
    await axios("/api/client/client-list/", {
      params: {
        limit: 999999999999,
      },
    }).then((data) => {
      this.setState({
        clientList: data.data.clients,
      });
    });
  };
  getPriceTypeList = async () => {
    let priceTypeList = await axios.get("/api/client/price-type-list/");
    this.setState({
      priceTypeList: priceTypeList.data.results,
    });
  };
  getProductList = async () => {
    let productList = await axios.get("/api/product/product-list/");
    this.setState({
      productList: productList.data.products,
    });
  };
  getOutcomePriceList = async () => {
    const url = "/api/product/outcome-price-list/";
    await axios(url).then((response) => {
      this.setState({ outcomePriceList: response.data.results });
    });
    this.setState({ updateData: false });
  };
  createOutcomePrice = (event) => {
    event.preventDefault();
    const url = "/api/product/outcome-price-list/";
    const { price, product, price_type, client } = this.state;
    axios.post(url, { price, product, price_type, client }).then((data) =>
      this.setState((prevState) => ({
        outcomePriceList: [
          ...prevState.outcomePriceList,
          {
            ...data.data,
          },
        ],
      }))
    );
  };
  onDelete = (e) => {
    const url = `/api/product/outcome-price-detail/`;
    axios.delete(url + e).then((response) => {
      if (response.data != null) {
        this.setState({
          outcomePriceList: this.state.outcomePriceList.filter(
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
    const url = "/api/product/outcome-price-detail/";
    axios.get(url + id).then((response) => {
      this.setState({
        price: response.data.price,
        price_type_name: response.data.price_type.type,
        price_type: response.data.price_type.id,
        product_name: response.data.product.name,
        product: response.data.product.id,
        client: response.data.id,
        client_name: response.data.client.name,
        btn_type: "Сақлаш",
        update: true,
        id: id,
      });
    });
  };
  onUpdate = (e) => {
    e.preventDefault();
    const url = `/api/product/outcome-price-detail/${this.state.id}/`;
    const { price, price_type, product, client } = this.state;
    axios.put(url, { price, price_type, product, client }).then((data) => {
      this.setState(
        {
          btn_type: "Қўшиш",
          update: false,
          updateData: true,
          price: "",
          price_type_name: "",
          client_name: "",
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
  };
  render() {
    const { priceTypeList, productList, clientList } = this.state;
    let count = 0;
    return (
      <div className="solary-box">
        <div className="filter-box mb-4">
          <h4>Сотиш Нархини</h4>
        </div>
        <form
          className="input-form"
          onSubmit={this.state.update ? this.onUpdate : this.createOutcomePrice}
        >
          <input
            type="number"
            name="price"
            value={this.state.price}
            placeholder="Нархи"
            onChange={this.handleInput}
          />
          <select onChange={this.handleInput} name="product">
            <option value={this.state.product}>
              {"Жорий Маҳсулот " + this.state.product_name}
            </option>
            ;
            {productList.map((list) => {
              return (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              );
            })}
          </select>
          <select onChange={this.handleInput} name="price_type">
            <option value={this.state.price_type}>
              {"Жорий Нарх тури" + this.state.price_type_name}
            </option>
            ;
            {priceTypeList.map((list) => {
              return (
                <option key={list.id} value={list.id}>
                  {list.type}
                </option>
              );
            })}
          </select>
          <select onChange={this.handleInput} name="client">
            <option value={this.state.client}>
              {"Жорий Мижоз " + this.state.client_name}
            </option>
            ;
            {clientList.map((list) => {
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
                <td scope="col">Нарх тури</td>
                <td scope="col">Мижоз</td>
                <td scope="col">Таҳрирлаш</td>
              </tr>
            </thead>
            <tbody>
              {this.state.outcomePriceList.map((data) => {
                count++;
                if (data === undefined) {
                  return (
                    <div className="loading-box">
                      <img src={Loading} alt="" />
                    </div>
                  );
                } else {
                  return (
                    <tr key={data.id}>
                      <td>{count}</td>
                      <td>{data.product.name}</td>
                      <td>{data.price}</td>
                      <td>{data.price_type.type}</td>
                      <td>
                        {data.client === null
                          ? "Мижоз бириктирилмаган"
                          : data.client.name}
                      </td>
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

export default CreateOutcomePrice;
