import axios from "axios";
import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
class AgentPartner extends Component {
  state = {
    agentPartnerList: [],
    update: false,
    agentList: [],
    sale_agent1: "",
    sale_agent2: "",
    id: "",
    btn_type: "Қўшиш",
    updateDate: false,
  };
  componentDidMount() {
    this.getAgentPartner();
    this.getAgentList();
  }
  componentDidUpdate() {
    if (this.state.updateDate !== false) {
      this.getAgentPartner();
      this.setState({ updateDate: false });
    }
  }
  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  getAgentPartner = async () => {
    let agentPartnerList = await axios.get(
      "/api/client/client-agents-partner-list/"
    );
    this.setState({
      agentPartnerList: agentPartnerList.data.results,
    });
  };
  getAgentList = async () => {
    let agentList = await axios.get("/api/user/agent-list/");
    this.setState({
      agentList: agentList.data,
    });
  };

  createAgentPartner = (event) => {
    event.preventDefault();
    const url = "/api/client/client-agents-partner-list/";
    const { sale_agent1, sale_agent2 } = this.state;
    axios.post(url, { sale_agent1, sale_agent2 }).then((data) =>
      this.setState((prevState) => ({
        agentPartnerList: [
          ...prevState.agentPartnerList,
          {
            ...data.data,
          },
        ],
      }))
    );
    // this.setState({ name: "" });
  };
  onDelete = (e) => {
    const url = `/api/client/client-agents-partner-detail/`;
    axios.delete(url + e).then((response) => {
      if (response.data != null) {
        this.setState({
          agentPartnerList: this.state.agentPartnerList.filter(
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
    const url = "/api/client/client-agents-partner-detail/";
    axios.get(url + id).then((response) => {
      this.setState({
        sale_agent1: response.data.sale_agent1.id,
        sale_agent2: response.data.sale_agent2.id,
        btn_type: "Сақлаш",
        update: true,
        id,
      });
    });
  };
  onUpdate = (e) => {
    e.preventDefault();
    const url = `/api/client/client-agents-partner-detail/${this.state.id}/`;
    const { sale_agent1, sale_agent2 } = this.state;
    axios.put(url, { sale_agent1, sale_agent2 }).then((data) => {
      this.setState(
        {
          btn_type: "Қўшиш",
          updateDate: true,
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
    const { agentList } = this.state;
    let count = 0;
    return (
      <div className="solary-box">
        <h4 className="mb-3">Агент Жуфтлик Яратиш</h4>
        <form
          className="input-form"
          onSubmit={this.state.update ? this.onUpdate : this.createAgentPartner}
        >
          <select
            onChange={this.handleInput}
            value={this.state.sale_agent1}
            name="sale_agent1"
          >
            <option>Агент 1 танланг</option>
            {agentList.map((list) => {
              return (
                <option key={list.id} value={list.id}>
                  {list.first_name + " " + list.last_name}
                </option>
              );
            })}
          </select>
          <select
            onChange={this.handleInput}
            value={this.state.sale_agent2}
            name="sale_agent2"
          >
            <option>Агент 2 танланг</option>
            {agentList.map((list) => {
              return (
                <option key={list.id} value={list.id}>
                  {list.first_name + " " + list.last_name}
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
                <td scope="col">Агент 1 Исм</td>
                <td scope="col">Телефон Рақам</td>
                <td scope="col">Агент 2 Исм</td>
                <td scope="col">Телефон Рақам</td>
                <td scope="col">Таҳрирлаш</td>
              </tr>
            </thead>
            <tbody>
              {this.state.agentPartnerList.map((data) => {
                count++;
                if (data !== undefined) {
                  return (
                    <tr key={data.id}>
                      <td>{count}</td>
                      <td>
                        {data.sale_agent1.first_name +
                          " " +
                          data.sale_agent1.last_name}
                      </td>
                      <td>{data.sale_agent1.phone_number}</td>
                      <td>
                        {data.sale_agent2.first_name +
                          " " +
                          data.sale_agent2.last_name}
                      </td>
                      <td>{data.sale_agent1.phone_number}</td>
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

export default AgentPartner;
