import axios from "axios";
import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Modal } from "./modal";
import "./price_style.css";
class CreatePriceType extends Component {
  state = {
    type: "",
    priceTypeList: [],
    clientList: [],
    btn_type: "Қўшиш",
    update: false,
    show: false,
    updateData: false,
    id: "",
    requiredData: [],
  };
  componentDidMount() {
    this.getPriceTypeList();
    this.getClientList();
  }
  componentDidUpdate() {
    if (this.state.updateData !== false) {
      this.getPriceTypeList();
      this.setState({ updateData: false });
    }
  }
  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  closeModalHandler = () => this.setState({ show: false });
  getPriceTypeList = async () => {
    let priceTypeList = await axios.get("/api/client/price-type-list/");
    this.setState({
      priceTypeList: priceTypeList.data.results,
    });
  };
  createPriceType = (event) => {
    event.preventDefault();
    const url = "/api/client/price-type-list/";
    const { type } = this.state;
    axios.post(url, { type }).then((data) =>
      this.setState((prevState) => ({
        priceTypeList: [
          ...prevState.priceTypeList,
          {
            ...data.data,
          },
        ],
      }))
    );
    this.setState({ type: "" });
  };

  getClientList = async () => {
    const url = `/api/client/client-list/`;
    await axios.get(url).then((response) => {
      this.setState({ clientList: response.data.clients });
    });
  };

  showData = (e) => {
    const Array = [];
    this.state.clientList.map((list) => {
      if (list.price_type.type === e) {
        Array.push(list);
        this.setState({ requiredData: Array });
      } else {
        this.setState({ requiredData: Array });
      }
    });
  };
  onDelete = (e) => {
    const url = `/api/client/price-type-detail/`;
    axios.delete(url + e).then((response) => {
      if (response.data != null) {
        this.setState({
          priceTypeList: this.state.priceTypeList.filter(
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
    const url = "/api/client/price-type-detail/";
    axios.get(url + id).then((response) => {
      this.setState({
        type: response.data.type,
        btn_type: "Сақлаш",
        update: true,
        id: id,
      });
    });
  };
  onUpdate = (e) => {
    e.preventDefault();
    const url = `/api/client/price-type-detail/${this.state.id}/`;
    const { type } = this.state;
    axios.put(url, { type }).then((data) => {
      this.setState(
        {
          updateData: true,
          btn_type: "Қўшиш",
          update: false,
          type: "",
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
        {this.state.show ? (
          <div onClick={this.closeModalHandler} className="back-drop"></div>
        ) : null}
        <Modal
          show={this.state.show}
          close={this.closeModalHandler}
          requiredData={this.state.requiredData}
        />
        <h4 className="mb-3">Нарх Тип Яратиш</h4>
        <form
          className="input-form"
          onSubmit={this.state.update ? this.onUpdate : this.createPriceType}
        >
          <input
            type="text"
            name="type"
            value={this.state.type}
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
                <td scope="col">T/P</td>
                <td scope="col">Номи</td>
                <td scope="col">Таҳрирлаш</td>
              </tr>
            </thead>
            <tbody>
              {this.state.priceTypeList.map((data) => {
                count++;
                if (data !== undefined) {
                  return (
                    <tr key={data.id}>
                      <td>{count}</td>
                      <td
                        onClick={() =>
                          this.setState(
                            { show: true },
                            this.showData(data.type)
                          )
                        }
                      >
                        {data.type}
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

export default CreatePriceType;
