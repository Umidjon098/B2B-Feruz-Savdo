import React, { Component } from "react";
import SverkaTable from "./sverka-table";
import ReactToPrint from "react-to-print";
import "./sverka.css";
import axios from "axios";
class Sverka extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start_date: null,
      end_date: null,
    };
  }

  handledate = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    const url = "/api/order/sverka/";
    axios(url, {
      params: {
        start_date: this.state.start_date,
        end_date: this.state.end_date,
      },
    }).then((response) => {
      console.log(response.data);
    });
  }
  render() {
    return (
      <div className="sverka-box">
        <div className="filter-box">
          from:
          <input name="start_date" type="date" onChange={this.handledate} />
          to:
          <input name="end_date" type="date" onChange={this.handledate} />
        </div>
        <div>
          <ReactToPrint
            trigger={() => {
              return <a href="#">Print this out!</a>;
            }}
            content={() => this.componentRef}
          />
          <SverkaTable ref={(el) => (this.componentRef = el)} />
        </div>
      </div>
    );
  }
}

export default Sverka;
