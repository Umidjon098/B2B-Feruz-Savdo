import axios from "axios";
import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import "./carline.css";

class Carline extends Component {
  state = {
    carLineList: [],
    agentList: [],
    model: "",
    number: "",
    start_cursor: "",
    end_cursor: "",
    work_day: "",
    user: "",
    id: "",
    update: false,
    updateTable: false,
    btn_type: "Қўшиш",
  };

  componentDidUpdate() {
    if (this.state.updateTable) {
      this.getCarList();
    }
  }

  componentDidMount() {
    this.getAgentList();
    this.getCarList();
  }

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  getAgentList = async () => {
    let agentList = await axios.get("/api/user/agent-list/");
    this.setState({
      agentList: agentList.data,
    });
  };
  getCarList = async () => {
    let carLineList = await axios.get("/api/user/car/");
    this.setState({
      carLineList: carLineList.data,
      updateTable: false,
    });
  };
  createCarLine = (event) => {
    const form = document.getElementsByClassName("car-line-input");
    event.preventDefault();
    const url = "/api/user/car/";
    const { model, number, start_cursor, end_cursor, work_day, user } =
      this.state;
    axios
      .post(url, {
        model,
        number,
        start_cursor,
        end_cursor,
        work_day,
        user,
      })
      .then(() => {
        this.setState({
          updateTable: true,
          model: "",
          number: "",
          start_cursor: "",
          end_cursor: "",
          work_day: "",
          user: "",
        });
      });
  };

  onDelete = (e) => {
    const url = `/api/user/car/`;
    axios.delete(url + e).then((response) => {
      if (response.data != null) {
        this.setState({
          carLineList: this.state.carLineList.results.filter(
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
    const url = "/api/user/car/";
    axios.get(url + id).then((response) => {
      console.log(response.data);
      this.setState({
        model: response.data.model,
        number: response.data.number,
        start_cursor: response.data.start_cursor,
        end_cursor: response.data.end_cursor,
        work_day: response.data.work_day,
        user: response.data.user.id,
        btn_type: "Сақлаш",
        update: true,
        id: id,
      });
    });
  };
  onUpdate = (e) => {
    e.preventDefault();
    const url = `/api/user/car/${this.state.id}/`;
    const { model, number, start_cursor, end_cursor, work_day, user } =
      this.state;
    axios
      .put(url, { model, number, start_cursor, end_cursor, work_day, user })
      .then(() => {
        this.setState(
          {
            model: "",
            number: "",
            start_cursor: "",
            end_cursor: "",
            work_day: "",
            user: "",
            updateTable: true,
            btn_type: "Қўшиш",
            update: false,
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
      <div className="solary-box carline-box">
        <h4 className="mb-3">Car Line Яратиш</h4>
        <form
          ref={(form) => (this.form = form)}
          className="input-form car-line-input"
          onSubmit={this.state.update ? this.onUpdate : this.createCarLine}
        >
          <input
            type="text"
            name="model"
            placeholder="model"
            value={this.state.model}
            onChange={this.handleInput}
          />
          <input
            type="text"
            name="number"
            placeholder="number"
            value={this.state.number}
            onChange={this.handleInput}
          />
          <input
            type="text"
            name="start_cursor"
            placeholder="start_cursor"
            value={this.state.start_cursor}
            onChange={this.handleInput}
          />
          <input
            type="text"
            name="end_cursor"
            placeholder="end_cursor"
            value={this.state.end_cursor}
            onChange={this.handleInput}
          />
          <input
            type="date"
            name="work_day"
            placeholder="work day"
            value={this.state.work_day}
            onChange={this.handleInput}
          />
          <select name="user" onChange={this.handleInput}>
            <option value={this.state.user}>Agent</option>
            {this.state.agentList.map((data) => {
              return (
                <option key={data.id} value={data.id}>
                  {data.first_name + " " + data.last_name}
                </option>
              );
            })}
          </select>
          <button className="btn btn-primary mr-0" type="submit">
            {this.state.btn_type}
          </button>
        </form>
        <div className="solary-table table-responsive">
          <label className="notification">{this.state.creditial}</label>
          <table className="table table-striped table-hover text-center  mb-0">
            <thead>
              <tr>
                <td scope="col">T/P</td>
                <td scope="col">Model</td>
                <td scope="col">Number</td>
                <td scope="col">Start Cursor</td>
                <td scope="col">End Cursor</td>
                <td scope="col">Work Day</td>
                <td scope="col">Agent</td>
                <td scope="col">Таҳрирлаш</td>
              </tr>
            </thead>
            <tbody>
              {this.state.carLineList.results === undefined ? (
                <div>Loading</div>
              ) : (
                this.state.carLineList.results.map((data) => {
                  count++;
                  return (
                    <tr key={data.id}>
                      <td>{count}</td>
                      <td>{data.model}</td>
                      <td>{data.number}</td>
                      <td>{data.start_cursor}</td>
                      <td>{data.end_cursor}</td>
                      <td>{data.work_day}</td>
                      <td>
                        {data.user.first_name + " " + data.user.last_name}
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
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Carline;
