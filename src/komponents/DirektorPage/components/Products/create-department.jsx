import axios from "axios";
import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
class CreateDepartment extends Component {
  state = {
    name: "",
    departmentList: [],
    btn_type: "Қўшиш",
    update: false,
    table_update: false,
    updateData: false,
  };
  componentDidMount() {
    this.getDepartmentList();
  }
  componentDidUpdate() {
    if (this.state.updateData !== false) {
      this.getDepartmentList();
      this.setState({ updateData: false });
    }
  }
  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  getDepartmentList = async () => {
    let departmentList = await axios.get("/api/product/department-list/");
    this.setState({
      departmentList: departmentList.data.results,
    });
  };
  ceateDepartment = (event) => {
    event.preventDefault();
    const url = "/api/product/department-list/";
    const { name } = this.state;
    axios.post(url, { name }).then((data) =>
      this.setState((prevState) => ({
        departmentList: [
          ...prevState.departmentList,
          {
            ...data.data,
          },
        ],
      }))
    );
    this.setState({ name: "" });
  };
  onDelete = (e) => {
    const url = `/api/product/department-detail/`;
    axios.delete(url + e).then((response) => {
      if (response.data != null) {
        this.setState({
          departmentList: this.state.departmentList.filter(
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
    this.setState({ id });
    const url = "/api/product/department-detail/";
    axios.get(url + id).then((response) => {
      this.setState({
        name: response.data.name,
        btn_type: "Сақлаш",
        update: true,
      });
    });
  };
  onUpdate = (e) => {
    e.preventDefault();
    const url = `/api/product/department-detail/${this.state.id}/`;
    const { name } = this.state;
    axios.put(url, { name }).then((data) => {
      this.setState(
        {
          updateData: true,
          btn_type: "Қўшиш",
          update: false,
          name: "",
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
    // console.log(this.state.updateData);
    return (
      <div className="solary-box">
        <h4 className="mb-3">Департмент Қўшиш</h4>
        <form
          className="input-form"
          onSubmit={this.state.update ? this.onUpdate : this.ceateDepartment}
        >
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInput}
          />
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
                <td scope="col">Таҳрирлаш</td>
              </tr>
            </thead>
            <tbody>
              {this.state.departmentList.map((data) => {
                count++;
                if (data !== undefined) {
                  return (
                    <tr key={data.id}>
                      <td>{count}</td>
                      <td>{data.name}</td>
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
                } else {
                  return <h1>Loading...</h1>;
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default CreateDepartment;
