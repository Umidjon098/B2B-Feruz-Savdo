import axios from "axios";
import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
class AgentPercent extends Component {
  state = {
    percent: "",
    percentList: [],
    agent: "",
    agent_name: "",
    btn_type: "Қўшиш",
    update: false,
    updateData: false,
    agentList: [],
  };
  componentDidMount() {
    this.getPercentList();
    this.getAgentList();
  }
  componentDidUpdate(prevProps) {
    if (this.state.updateData !== false) {
      this.getPercentList();
    }
    if (prevProps.department !== this.props.department) {
      this.getPercentList();
    }
  }

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  getPercentList = async () => {
    const url = "/api/salary/agent-salary-percent/";
    await axios(url).then((data) => {
      this.setState({ percentList: data.data.results, updateData: false });
    });
  };
  getAgentList = async () => {
    let agentList = await axios.get("/api/user/agent-list/");
    this.setState({
      agentList: agentList.data,
    });
  };
  createAgentPercent = (event) => {
    event.preventDefault();
    const url = "/api/salary/agent-salary-percent/";
    const { percent, agent } = this.state;
    axios.post(url, { percent, agent }).then((data) =>
      this.setState((prevState) => ({
        percentList: [
          ...prevState.percentList,
          {
            ...data.data,
          },
        ],
      }))
    );
    this.setState({ percent: "" });
  };

  onEdit = (id) => {
    const url = "/api/salary/agent-salary-percent-detail/";
    axios(url + id).then((response) => {
      this.setState({
        agent: response.data.results.user,
        agent_name: response.data.results.user,
        percent: response.data.results.percent,
        btn_type: "Сақлаш",
        update: true,
        id: id,
      });
    });
  };
  onUpdate = (e) => {
    e.preventDefault();
    const url = `/api/salary/agent-salary-percent-detail/${this.state.id}/`;
    const { percent, agent } = this.state;
    axios.put(url, { percent, agent }).then((data) => {
      this.setState(
        {
          btn_type: "Қўшиш",
          updateData: true,
          update: false,
          percent: "",
          agent_name: "",
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
        <h4 className="mb-3">Агентга ойлик фоиз белгилаш</h4>
        <form
          className="input-form"
          onSubmit={this.state.update ? this.onUpdate : this.createAgentPercent}
        >
          <input
            type="text"
            name="percent"
            value={this.state.percent}
            onChange={this.handleInput}
            placeholder="фоиз"
          />
          <select onChange={this.handleInput} name="agent">
            <option value={this.state.agent}>
              {"Жорий Агент " + this.state.agent_name}
            </option>
            {this.state.agentList.map((list) => {
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
                <td scope="col">Т/Р</td>
                <td scope="col">Агент</td>
                <td scope="col">Фоиз</td>
                <td scope="col">Таҳрирлаш</td>
              </tr>
            </thead>
            <tbody>
              {this.state.percentList.map((data) => {
                count++;
                if (data === undefined) {
                  return <h1>Loading</h1>;
                } else {
                  return (
                    <tr key={data.id}>
                      <td>{count}</td>
                      <td>{data.user}</td>
                      <td>{data.percent}</td>
                      <td>
                        <i
                          className="fas fa-edit"
                          onClick={this.onEdit.bind(this, data.id)}
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

export default AgentPercent;
