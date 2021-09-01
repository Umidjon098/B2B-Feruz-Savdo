import axios from "axios";
import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { baseUrl } from "../../constants";
import ModalImage from "react-modal-image";
import ClientForm from "../CRM/client-form";
import Loading from "../../../../img/loading-5.gif";

class ClientStatTableBody extends Component {
  state = {
    show: false,
    clientData: [],
    carData: [],
    marketTypeData: [],
    priceTypeData: [],
    saleAgentData: [],
    territoryData: [],
    name: "",
    market_type: "",
    market_type_id: "",
    sale_agents: null,
    sale_agents_id: null,
    car: "",
    car_id: "",
    territory: "",
    territory_id: "",
    director: "",
    director_phone_number: "",
    birthdate: "",
    responsible_agent: "",
    work_phone_number: "",
    address: "",
    target: "",
    INN: "",
    price_type: "",
  };

  componentDidMount = () => {
    this.getCarLine();
    this.getPriceTypeData();
    this.getAgent();
    this.getTerritory();
    this.getMarketType();
  };

  handleInput = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  getTerritory = async () => {
    let territoryData = await axios.get("/api/client/territory-list/", {
      params: {
        limit: 500,
      },
    });
    this.setState({
      territoryData: territoryData.data.results,
    });
  };
  getCarLine = async () => {
    let carData = await axios.get("/api/client/car-list/");
    this.setState({
      carData: carData.data.results,
    });
  };
  getPriceTypeData = async () => {
    let priceTypeData = await axios.get("/api/client/price-type-list/");
    this.setState({
      priceTypeData: priceTypeData.data.results,
    });
  };
  getAgent = () => {
    const url = "/api/client/client-agents-partner-list/";
    axios(url).then((res) =>
      this.setState({ saleAgentData: res.data.results })
    );
  };
  getMarketType = async () => {
    const url = "/api/client/market-type-list/";
    axios(url).then((res) =>
      this.setState({ marketTypeData: res.data.results })
    );
  };
  onDelete = (e) => {
    const url = `/api/client/client-detail/`;
    axios.delete(url + e);
    this.props.parentCallback(true);
  };
  onDeleteAlert = (e) => {
    confirmAlert({
      message: "O'chirish uchun tasdiqlang",
      buttons: [
        {
          label: "O'chirish",
          onClick: () => this.onDelete(e),
        },
        {
          label: "Qaytish",
          onClick: () => console.log(""),
        },
      ],
    });
  };
  onEdit = (id) => {
    this.setState({ id });
    const url = "/api/client/client-detail/";
    axios.get(url + id).then((response) => {
      console.log(response);
      this.setState({
        clientData: response.data,
        name: response.data.name,
        market_type: response.data.market_type.id,
        market_type_name: response.data.market_type.name,
        sale_agents:
          response.data.sale_agents === null
            ? null
            : response.data.sale_agents.id,
        sale_agents_name:
          response.data.sale_agents === null
            ? "Biriktirilmagan"
            : response.data.sale_agents.sale_agent1.name,
        director: response.data.director,
        car: response.data.car.id,
        car_name: response.data.car.name,
        price_type:
          response.data.price_type === null
            ? null
            : response.data.price_type.id,
        price_type_name:
          response.data.price_type === null
            ? null
            : response.data.price_type.type,
        territory: response.data.territory.id,
        territory_name: response.data.territory.name,
        director_phone_number: response.data.director_phone_number,
        birthdate: response.data.birthdate,
        responsible_agent: response.data.responsible_agent,
        work_phone_number: response.data.work_phone_number,
        address: response.data.address,
        target: response.data.target,
        INN: response.data.INN,
        btn_type: "Saqlash",
        update: true,
        show: !this.state.show,
      });
    });
  };
  onUpdate = (e) => {
    e.preventDefault();
    this.props.parentCallback(true);
    const url = `/api/client/client-detail/${this.state.id}/`;
    const {
      name,
      market_type,
      sale_agents,
      car,
      territory,
      director,
      director_phone_number,
      birthdate,
      responsible_agent,
      work_phone_number,
      address,
      target,
      INN,
    } = this.state;
    axios
      .put(url, {
        name,
        market_type,
        sale_agents,
        car,
        territory,
        director,
        director_phone_number,
        birthdate,
        responsible_agent,
        work_phone_number,
        address,
        target,
        INN,
      })
      .then((data) => {
        this.setState(
          {
            btn_type: "Qo'shish",
            show: !this.state.show,
            creditial: "O'zgartirish muvaffaqiyatli bajarildi Kuting!",
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
    // console.log(this.props.clientList.clients);
    let count = 0;
    if (typeof this.props.clientList.clients === "undefined") {
      return (
        <div className="loading-box">
          <img src={Loading} alt="" />
        </div>
      );
    } else {
      return (
        <>
          <div
            className={
              this.state.show ? "form-edit-client toggle" : "form-edit-client "
            }
          >
            <form onSubmit={this.onUpdate}>
              <div className="row">
                <div className="col-md-3">
                  <input
                    type="text"
                    value={this.state.name}
                    name="name"
                    onChange={this.handleInput}
                  />

                  <select onChange={this.handleInput} name="market_type">
                    <option value={this.state.market_type}>
                      {"Joriy bozor turi  " + this.state.market_type_name}
                    </option>
                    {this.state.marketTypeData.map((data) => {
                      return (
                        <option key={data.id} value={data.id}>
                          {data.name}
                        </option>
                      );
                    })}
                  </select>
                  <select onChange={this.handleInput} name="price_type">
                    <option value={this.state.price_type}>
                      {"Joriy narx turi  " + this.state.price_type_name}
                    </option>
                    {this.state.priceTypeData.map((data) => {
                      return (
                        <option key={data.id} value={data.id}>
                          {data.type}
                        </option>
                      );
                    })}
                  </select>
                  <select onChange={this.handleInput} name="sale_agents">
                    <option value={this.state.sale_agents}>
                      {"Joriy agentlar " + this.state.sale_agents_name}
                    </option>
                    {this.state.saleAgentData.map((data) => {
                      return (
                        <option key={data.id} value={data.id}>
                          {data.sale_agent1.first_name +
                            " " +
                            data.sale_agent1.last_name.slice(0, 1) +
                            " " +
                            data.sale_agent2.first_name +
                            " " +
                            data.sale_agent2.last_name.slice(0, 1)}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-md-3">
                  <select onChange={this.handleInput} name="car">
                    <option value={this.state.car}>
                      {"Joriy Mashrut " + this.state.car_name}
                    </option>
                    {this.state.carData.map((data) => {
                      return (
                        <option key={data.id} value={data.id}>
                          {data.name}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    onChange={this.handleInput}
                    value={this.state.territory}
                    name="territory"
                  >
                    <option value={this.state.territory}>
                      {"Joriy hudud " + this.state.territory_name}
                    </option>
                    {this.state.territoryData.map((data) => {
                      return (
                        <option key={data.id} value={data.id}>
                          {data.name}
                        </option>
                      );
                    })}
                  </select>
                  <input
                    type="text"
                    value={this.state.director}
                    onChange={this.handleInput}
                    name="director"
                  />
                  <input
                    type="text"
                    value={this.state.director_phone_number}
                    onChange={this.handleInput}
                    name="director_phone_number"
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    value={this.state.birthdate}
                    onChange={this.handleInput}
                    name="birthdate"
                  />
                  <input
                    type="text"
                    value={this.state.responsible_agent}
                    onChange={this.handleInput}
                    name="responsible_agent"
                  />
                  <input
                    type="text"
                    value={this.state.work_phone_number}
                    onChange={this.handleInput}
                    name="work_phone_number"
                  />
                  <input
                    type="text"
                    value={this.state.address}
                    onChange={this.handleInput}
                    name="address"
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    value={this.state.target}
                    onChange={this.handleInput}
                    name="target"
                  />
                  <input
                    type="text"
                    value={this.state.INN}
                    onChange={this.handleInput}
                    name="INN"
                  />
                  <button type="submit" className="btn btn-primary">
                    Yangilash
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mt-4"
                    onClick={() => this.setState({ show: !this.state.show })}
                  >
                    Yopish
                  </button>
                </div>
              </div>
            </form>
          </div>
          <tbody>
            {this.props.clientList.clients.map((client) => {
              count++;
              return (
                <tr key={client.id}>
                  <td>{count}</td>
                  <td>{client.market_code}</td>
                  <td>{client.name}</td>
                  <td>{client.market_type.name}</td>
                  <td>
                    {client.price_type === null
                      ? "Belgilanmagan"
                      : client.price_type.type}
                  </td>
                  <td>
                    {client.sale_agent.first_name +
                      " " +
                      client.sale_agent.last_name}
                  </td>
                  <td>{client.car.name}</td>
                  <td>{client.territory.name}</td>
                  <td>{client.director}</td>
                  <td>{client.director_phone_number}</td>
                  <td>{client.birthdate}</td>
                  <td>{client.responsible_agent}</td>
                  <td>{client.work_phone_number}</td>
                  <td>{client.address}</td>
                  <td>{client.target}</td>
                  <td>{client.longitude}</td>
                  <td>{client.latitude}</td>
                  <td>{client.INN}</td>
                  <td className="image-td">
                    {
                      <ModalImage
                        small={`${baseUrl + client.image}`}
                        large={`${baseUrl + client.image}`}
                        alt="Agent report image"
                      />
                    }
                  </td>
                  <td>
                    {client.created_date === undefined
                      ? ""
                      : client.created_date.slice(2, 10)}
                  </td>
                  <td className="d-flex">
                    <i
                      className="fas fa-edit"
                      onClick={this.onEdit.bind(this, client.id)}
                    ></i>
                    <i
                      className="fas fa-trash"
                      onClick={this.onDeleteAlert.bind(this, client.id)}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </>
      );
    }
  }
}

export default ClientStatTableBody;
