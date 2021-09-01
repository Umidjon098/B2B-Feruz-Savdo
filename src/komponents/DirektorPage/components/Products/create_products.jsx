import axios from "axios";
import React, { Component } from "react";
import "./create-product.css";
import DataTable from "../tables/dataTable";

class CreateProduct extends Component {
  state = {
    productList: [],
    categoryList: [],
    providerList: [],
    name: "",
    unit: "",
    product_type: "",
    category: "",
    category_name: "",
    provider: "",
    provider_name: "",
    estimated_delivery_days: "",
    btn_type: "Қўшиш",
    updateTable: false,
    update: false,
    id: "",
  };

  componentDidMount() {
    this.getCategoryList();
    this.getProviderList();
  }
  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  getCategoryList = async () => {
    const url = "/api/product/category-list/";
    await axios(url).then((response) => {
      this.setState({ categoryList: response.data });
    });
  };
  getProviderList = async () => {
    const url = "/api/provider/provider-list/";
    await axios(url).then((response) => {
      this.setState({ providerList: response.data.providers });
    });
  };
  onEdit = (id) => {
    const url = "/api/product/product-detail/";
    axios.get(url + id).then((response) => {
      console.log(response);
      this.setState({
        name: response.data.product.name,
        unit: response.data.product.unit,
        product_type: response.data.product.product_type,
        estimated_delivery_days: response.data.product.estimated_delivery_days,
        category: response.data.product.category.id,
        category_name: response.data.product.category.name,
        provider: response.data.product.provider.id,
        provider_name: response.data.product.provider.name,
        id: id,
        btn_type: "Сақлаш",
        update: true,
      });
    });
  };

  onUpdate = (e) => {
    e.preventDefault();
    const url = `/api/product/product-detail/${this.state.id}/`;
    const {
      name,
      unit,
      product_type,
      estimated_delivery_days,
      category,
      provider,
    } = this.state;
    axios.put(url, {
      name,
      unit,
      product_type,
      estimated_delivery_days,
      category,
      provider,
    });
    this.setState(
      {
        name: "",
        unit: "",
        product_type: "",
        category_name: "",
        provider_name: "",
        estimated_delivery_days: "",
        updateTable: true,
        creditial: "Ўзгартириш муваффақиятли бажарилди Кутинг!",
        btn_type: "Қўшиш",
        update: false,
      },
      () =>
        setTimeout(() => {
          this.setState({
            creditial: "",
          });
        }, 3000)
    );
  };
  createProduct = async (e) => {
    e.preventDefault();
    const url = "/api/product/product-list/";
    const {
      name,
      unit,
      product_type,
      category,
      provider,
      estimated_delivery_days,
    } = this.state;
    await axios.post(url, {
      name,
      unit,
      product_type,
      category,
      provider,
      estimated_delivery_days,
    });
    this.setState({ updateTable: true });
  };
  break = (childData) => {
    this.setState({ updateTable: childData });
  };
  render() {
    const { categoryList, providerList } = this.state;
    const headers = [
      "Т/Р",
      "Номи",
      "Категория",
      "Таминотчи",
      "Ўлчов тури",
      "Маҳсулот тури",
      "Етказиш муддати",
      "Таҳрирлаш",
    ];
    const name = "productList";
    return (
      <>
        <div className="adding-staff-box">
          <div className="form-box m-0 ">
            <label className="notification">{this.state.creditial}</label>
            <form
              onSubmit={this.state.update ? this.onUpdate : this.createProduct}
            >
              <div className="row">
                <div className="col-md-4 col-lg-4">
                  <span>Маҳсулот номи</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Номи"
                    value={this.state.name}
                    required
                    onChange={this.handleInput}
                  />
                  <span>Ўлчов тури</span>
                  <select name="unit" onChange={this.handleInput}>
                    <option value={this.state.unit}>
                      {"Жорий ўлчов тури  " + this.state.unit}
                    </option>
                    <option value="litr">Литр</option>
                    <option value="kg">Кг</option>
                    <option value="ta">Дона</option>
                  </select>
                </div>
                <div className="col-md-4 col-lg-4">
                  <span>Маҳсулот тури</span>
                  <select name="product_type" onChange={this.handleInput}>
                    <option value={this.state.product_type}>
                      {"Жорий Маҳсулот тури " + this.state.product_type ===
                      "limited"
                        ? "Чекланган"
                        : this.state.product_type}
                    </option>
                    <option value="limited">Чекланган</option>
                    <option value="unlimited">Чекланмаган</option>
                  </select>
                  <span>Етказиш муддати</span>
                  <input
                    type="number"
                    name="estimated_delivery_days"
                    value={this.state.estimated_delivery_days}
                    required
                    onChange={this.handleInput}
                  />
                </div>
                <div className="col-md-4 col-lg-4">
                  <span>Маҳсулот категорияси</span>
                  <select name="category" onChange={this.handleInput}>
                    <option value={this.state.category}>
                      {"Жорий категория " + this.state.category_name}
                    </option>
                    {categoryList === undefined
                      ? console.log("undefined")
                      : categoryList.map((category) => {
                          return (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          );
                        })}
                  </select>
                  <span>Таминотчи</span>
                  <select name="provider" onChange={this.handleInput}>
                    <option value={this.state.provider}>
                      {"Жорий таминотчи  " + this.state.provider_name}
                    </option>
                    {providerList === undefined
                      ? console.log("undefined")
                      : providerList.map((provider) => {
                          return (
                            <option key={provider.id} value={provider.id}>
                              {provider.name}
                            </option>
                          );
                        })}
                  </select>
                  <button className="btn btn-primary" type="submit">
                    {this.state.btn_type}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <DataTable
          url={"/api/product/product-list/"}
          name={name}
          headers={headers}
          onEdit={this.onEdit}
          deleteUrl={"/api/product/product-detail/"}
          updateTable={this.state.updateTable}
          break={this.break}
        />
      </>
    );
  }
}

export default CreateProduct;
