import axios from "axios";
import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
class CraeteCarLine extends Component {
  state = {
    name: "",
    carLineList: [],
    btn_type: "Қўшиш",
    update: false,
    table_update: false,
    updateData: false,
  };
  componentDidMount() {
    this.getCarLine();
  }

  componentDidUpdate() {
    if (this.state.updateData !== false) {
      this.getCarLine();
      this.setState({ updateData: false });
    }
  }
  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  getCarLine = async () => {
    let carLineList = await axios.get("/api/client/car-list/");
    this.setState({
      carLineList: carLineList.data.results,
    });
  };
  CreateCarLine = (event) => {
    event.preventDefault();
    const url = "/api/client/car-list/";
    const { name } = this.state;
    axios.post(url, { name }).then((data) =>
      this.setState((prevState) => ({
        carLineList: [
          ...prevState.carLineList,
          {
            ...data.data,
          },
        ],
      }))
    );
    this.setState({ name: "" });
  };
  onDelete = (e) => {
    const url = `/api/client/car-detail/`;
    axios.delete(url + e).then((response) => {
      if (response.data != null) {
        this.setState({
          carLineList: this.state.carLineList.filter((data) => data.id != e),
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
    const url = "/api/client/car-detail/";
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
    const url = `/api/client/car-detail/${this.state.id}/`;
    const { name } = this.state;
    axios.put(url, { name }).then((data) => {
      this.setState(
        {
          btn_type: "Қўшиш",
          updateData: true,
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
    return (
      <div className="solary-box">
        <h4 className="mb-3">Машрут Қўшиш</h4>
        <form
          className="input-form"
          onSubmit={this.state.update ? this.onUpdate : this.CreateCarLine}
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
              {this.state.carLineList.map((data) => {
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

export default CraeteCarLine;
