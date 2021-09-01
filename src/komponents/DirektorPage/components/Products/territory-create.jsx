import axios from "axios";
import React, { Component } from "react";
import DataTable from "../tables/dataTable";
class CreateTerritory extends Component {
  state = {
    name: "",
    territoryList: [],
    btn_type: "Қўшиш",
    update: false,
    carLineList: [],
    agentList: [],
    agent: "",
    agent_name: "",
    car: "",
    car_name: "",
    id: "",
    updateTable: false,
  };
  componentDidMount() {
    this.getAgentList();
    this.getCarLine();
  }
  setFilterCar = (e) => {
    const { value } = e.target;
    this.props.handleFilterCar(value);
  };
  setFilterAgent = (e) => {
    const { value } = e.target;
    this.props.handleFilterAgent(value);
  };
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
  getCarLine = async () => {
    let carLineList = await axios.get("/api/client/car-list/");
    this.setState({
      carLineList: carLineList.data.results,
    });
  };
  createTerritory = (event) => {
    event.preventDefault();
    const url = "/api/client/territory-list/";
    const { name, car, agent } = this.state;
    axios.post(url, { name, car, agent });
    this.setState({ name: "", car: "", agent: "", updateTable: true });
  };

  onEdit = (id) => {
    this.setState({ id });
    const url = "/api/client/territory-detail/";
    axios.get(url + id).then((response) => {
      this.setState({
        car: response.data.car.id,
        car_name: response.data.car.name,
        agent: response.data.agent.id,
        agent_name: response.data.agent.first_name,
        name: response.data.name,
        btn_type: "Сақлаш",
        update: true,
      });
    });
  };
  onUpdate = (e) => {
    e.preventDefault();
    const url = `/api/client/territory-detail/${this.state.id}/`;
    const { name, car, agent } = this.state;
    axios.put(url, { name, car, agent }).then((data) => {
      this.setState(
        {
          btn_type: "Қўшиш",
          update: false,
          updateTable: true,
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
  break = (childData) => {
    this.setState({ updateTable: childData });
  };
  render() {
    const { agentList, carLineList } = this.state;
    const name = "territoryList";
    const headers = ["Т/Р", "Номи", "Машрут номи", "Агент исми", "Таҳрирлаш"];

    return (
      <div className="solary-box">
        <div className="filter-box mb-4">
          <h4>Ҳудуд Қўшиш</h4>
          <select onChange={this.setFilterCar}>
            <option value="all">Барча Машрут</option>
            {carLineList.map((list) => {
              return (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              );
            })}
          </select>
          <select onChange={this.setFilterAgent}>
            <option value="all">Барча Агент</option>
            {agentList.map((list) => {
              return (
                <option key={list.id} value={list.id}>
                  {list.first_name + " " + list.last_name}
                </option>
              );
            })}
          </select>
        </div>
        <form
          className="input-form"
          onSubmit={this.state.update ? this.onUpdate : this.createTerritory}
        >
          <input
            type="text"
            name="name"
            value={this.state.name}
            placeholder="Территорй номи"
            onChange={this.handleInput}
          />
          <select onChange={this.handleInput} name="car">
            <option value={this.state.car}>
              {"Жорий Машрут " + this.state.car_name}
            </option>
            {carLineList.map((list) => {
              return (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              );
            })}
          </select>
          <select onChange={this.handleInput} name="agent">
            <option value={this.state.agent}>
              {"Жорий Агент  " + this.state.agent_name}
            </option>
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

        <DataTable
          name={name}
          headers={headers}
          onEdit={this.onEdit}
          url={"/api/client/territory-list/"}
          deleteUrl={"/api/client/territory-detail/"}
          updateTable={this.state.updateTable}
          break={this.break}
          agent={this.props.agent}
          car={this.props.car}
        />
      </div>
    );
  }
}

export default CreateTerritory;
