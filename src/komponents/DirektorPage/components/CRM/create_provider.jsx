import axios from "axios";
import React, { Component } from "react";
import DataTable from "../tables/dataTable";

class CreateProvider extends Component {
  state = {
    name: "",
    address: "",
    phone_number1: "",
    phone_number2: "",
    account_number: "",
    bank: "",
    bank_code: "",
    INN: "",
    director: "",
    responsible_agent: "",
    MFO: "",
    NDS: "",
    id: "",
    update: false,
    updateTable: false,
    btn_type: "Қўшиш",
    providerList: [],
  };

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  onEdit = (id) => {
    const url = "/api/provider/provider-detail/";
    axios.get(url + id).then((response) => {
      this.setState({
        name: response.data.name,
        address: response.data.address,
        phone_number1: response.data.phone_number1,
        phone_number2: response.data.phone_number2,
        account_number: response.data.account_number,
        bank: response.data.bank,
        bank_code: response.data.bank_code,
        INN: response.data.INN,
        director: response.data.director,
        responsible_agent: response.data.responsible_agent,
        MFO: response.data.MFO,
        NDS: response.data.NDS,
        update: true,
        id: id,
        btn_type: "Сақлаш",
      });
    });
  };

  onUpdate = (e) => {
    e.preventDefault();
    const url = `/api/provider/provider-detail/${this.state.id}/`;
    const {
      name,
      address,
      phone_number1,
      phone_number2,
      account_number,
      bank,
      bank_code,
      INN,
      director,
      responsible_agent,
      MFO,
      NDS,
    } = this.state;
    axios.put(url, {
      name,
      address,
      phone_number1,
      phone_number2,
      account_number,
      bank,
      bank_code,
      INN,
      director,
      responsible_agent,
      MFO,
      NDS,
    });
    this.setState(
      {
        name: "",
        address: "",
        phone_number1: "",
        phone_number2: "",
        account_number: "",
        bank: "",
        bank_code: "",
        INN: "",
        director: "",
        responsible_agent: "",
        MFO: "",
        NDS: "",
        update: false,
        updateTable: true,
        creditial: "Ўзгартириш муваффақиятли бажарилди Кутинг!",
        btn_type: "Қўшиш",
      },
      () =>
        setTimeout(() => {
          this.setState({
            creditial: "",
          });
        }, 3000)
    );
  };
  createProvider = async (e) => {
    e.preventDefault();
    const {
      name,
      address,
      phone_number1,
      phone_number2,
      account_number,
      bank,
      bank_code,
      INN,
      director,
      responsible_agent,
      MFO,
      NDS,
    } = this.state;
    const url = "/api/provider/provider-list/";
    await axios
      .post(url, {
        name,
        address,
        phone_number1,
        phone_number2,
        account_number,
        bank,
        bank_code,
        INN,
        director,
        responsible_agent,
        MFO,
        NDS,
      })
      .then((response) => {
        this.setState({
          name: "",
          address: "",
          phone_number1: "",
          phone_number2: "",
          account_number: "",
          bank: "",
          bank_code: "",
          INN: "",
          director: "",
          responsible_agent: "",
          MFO: "",
          NDS: "",
          updateTable: true,
        });
      });
  };
  break = (childData) => {
    this.setState({ updateTable: childData });
  };
  render() {
    const headers = [
      "Т/Р",
      "Таминотчи",
      "Манзил",
      "Телефон рақам 1",
      "Телефон рақам 2",
      "Ҳисоб рақам",
      "Банк",
      "Банк коди",
      "ИНН",
      "Директор",
      "МФО",
      "НДС",
      "Масул Агент",
      "Яратилган кун",
      "Таҳрирлаш",
    ];
    const name = "providerList";
    return (
      <>
        <div className="adding-staff-box">
          <h4 className="mb-3">Таминотчи Яратиш</h4>
          <div className="form-box m-0 ">
            <label className="notification">{this.state.creditial}</label>
            <form
              onSubmit={this.state.update ? this.onUpdate : this.createProvider}
            >
              <div className="row">
                <div className="col-md-3 col-lg-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Номи"
                    value={this.state.name}
                    required
                    onChange={this.handleInput}
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Манзил"
                    value={this.state.address}
                    required
                    onChange={this.handleInput}
                  />
                  <input
                    type="text"
                    name="phone_number1"
                    placeholder="Телефон рақам 1"
                    value={this.state.phone_number1}
                    required
                    onChange={this.handleInput}
                  />
                </div>
                <div className="col-md-3 col-lg-3">
                  <input
                    type="text"
                    name="phone_number2"
                    placeholder="Телефон рақам 2"
                    value={this.state.phone_number2}
                    required
                    onChange={this.handleInput}
                  />
                  <input
                    type="text"
                    name="account_number"
                    placeholder="Ҳисоб рақам"
                    value={this.state.account_number}
                    required
                    onChange={this.handleInput}
                  />
                  <input
                    type="text"
                    name="bank"
                    placeholder="Банк"
                    value={this.state.bank}
                    required
                    onChange={this.handleInput}
                  />
                </div>
                <div className="col-md-3 col-lg-3">
                  <input
                    type="text"
                    name="bank_code"
                    placeholder="Банк коди"
                    value={this.state.bank_code}
                    required
                    onChange={this.handleInput}
                  />
                  <input
                    type="text"
                    name="INN"
                    placeholder="ИНН"
                    value={this.state.INN}
                    required
                    onChange={this.handleInput}
                  />
                  <input
                    type="text"
                    name="director"
                    placeholder="Директор"
                    value={this.state.director}
                    required
                    onChange={this.handleInput}
                  />
                </div>
                <div className="col-md-3 col-lg-3">
                  <input
                    type="text"
                    name="MFO"
                    placeholder="Банк коди"
                    value={this.state.MFO}
                    onChange={this.handleInput}
                  />
                  <input
                    type="text"
                    name="NDS"
                    placeholder="НДС"
                    value={this.state.NDS}
                    onChange={this.handleInput}
                  />
                  <input
                    type="text"
                    name="responsible_agent"
                    placeholder="Масул агент"
                    value={this.state.responsible_agent}
                    onChange={this.handleInput}
                  />
                  <button className="btn btn-primary mt-2" type="submit">
                    {this.state.btn_type}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <DataTable
          name={name}
          headers={headers}
          onEdit={this.onEdit}
          url={"/api/provider/provider-list/"}
          deleteUrl={"/api/provider/provider-detail/"}
          updateTable={this.state.updateTable}
          break={this.break}
        />
      </>
    );
  }
}

export default CreateProvider;
