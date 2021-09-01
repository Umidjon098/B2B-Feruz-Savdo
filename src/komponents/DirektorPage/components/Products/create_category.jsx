import axios from "axios";
import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
class CreateCategory extends Component {
  state = {
    name: "",
    categoryList: [],
    department: "",
    department_name: "",
    btn_type: "Қўшиш",
    update: false,
    updateData: false,
    departmentList: [],
  };
  componentDidMount() {
    this.getCategoryList();
    this.getDepartmentList();
  }
  componentDidUpdate(prevProps) {
    if (this.state.updateData !== false) {
      this.getCategoryList();
    }
    if (prevProps.department !== this.props.department) {
      this.getCategoryList();
    }
  }

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  getCategoryList = async () => {
    let query_param;
    if (this.props.department == "all") {
      query_param = {};
    } else {
      query_param = {
        department: this.props.department,
      };
    }
    // if department == "fdf"{params = {}}

    const url = "/api/product/category-list/";
    await axios(url, {
      params: query_param,
    }).then((data) => {
      this.setState({ categoryList: data.data, updateData: false });
    });
  };
  getDepartmentList = async () => {
    let departmentList = await axios.get("/api/product/department-list/");
    this.setState({
      departmentList: departmentList.data.results,
    });
  };
  createCategory = (event) => {
    event.preventDefault();
    const url = "/api/product/category-list/";
    const { name, department } = this.state;
    axios.post(url, { name, department }).then((data) =>
      this.setState((prevState) => ({
        categoryList: [
          ...prevState.categoryList,
          {
            ...data.data,
          },
        ],
      }))
    );
    this.setState({ name: "" });
  };
  onDelete = (e) => {
    const url = `/api/product/category-detail/`;
    axios.delete(url + e).then((response) => {
      if (response.data != null) {
        this.setState({
          categoryList: this.state.categoryList.filter((data) => data.id != e),
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
    const url = "/api/product/category-detail/";
    axios(url + id).then((response) => {
      this.setState({
        department: response.data.department.id,
        department_name: response.data.department.name,
        name: response.data.name,
        btn_type: "Сақлаш",
        update: true,
        id: id,
      });
    });
  };
  onUpdate = (e) => {
    e.preventDefault();
    const url = `/api/product/category-detail/${this.state.id}/`;
    const { name, department } = this.state;
    axios.put(url, { name, department }).then((data) => {
      this.setState(
        {
          btn_type: "Қўшиш",
          updateData: true,
          update: false,
          name: "",
          department_name: "",
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
    let count = 0;
    return (
      <div className="solary-box">
        <h4 className="mb-3">Категория Қўшиш</h4>
        <form
          className="input-form"
          onSubmit={this.state.update ? this.onUpdate : this.createCategory}
        >
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInput}
            placeholder="Категория Номи"
          />
          <select onChange={this.handleInput} name="department">
            <option value={this.state.department}>
              {"Жорий Департмент " + this.state.department_name}
            </option>
            {this.state.departmentList.map((list) => {
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
                <td scope="col">Т/Р</td>
                <td scope="col">Номи</td>
                <td scope="col">Департмент</td>
                <td scope="col">Таҳрирлаш</td>
              </tr>
            </thead>
            <tbody>
              {this.state.categoryList.map((data) => {
                count++;
                if (data === undefined) {
                  return <h1>Loading</h1>;
                } else {
                  return (
                    <tr key={data.id}>
                      <td>{count}</td>
                      <td>{data.name}</td>
                      <td>
                        {data.department.name === ""
                          ? "-"
                          : data.department.name}
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

export default CreateCategory;
