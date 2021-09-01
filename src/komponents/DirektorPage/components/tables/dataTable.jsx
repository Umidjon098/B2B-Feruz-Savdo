import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import Table from "./table";

class DataTable extends Component {
  state = {
    start_date: "",
    orderList: [],
    limit: 20,
    offset: 0,
    count: 0,
    next: null,
    previous: null,
    term: "",
    dataUpdate: false,
    create: true,
    break: "",
  };
  componentDidMount = async () => {
    this.getDateFromServer();
  };
  handleCallback = (childData) => {
    this.setState({ dataUpdate: childData });
  };

  onEditCallBack = (id) => {
    this.props.onEdit(id);
  };

  onDelete = async (id) => {
    await axios.delete(this.props.deleteUrl + id);
    this.getDateFromServer();
  };
  deleteCallBack = (id) => {
    confirmAlert({
      message: "Ўчириш учун тасдиқланг",
      buttons: [
        {
          label: "Ўчириш",
          onClick: () => this.onDelete(id),
        },
        {
          label: "Қайтиш",
          onClick: () => console.log(""),
        },
      ],
    });
  };
  async getDateFromServer() {
    let data_param;
    if (this.props.car === "all" && this.props.agent === "all") {
      data_param = {
        limit: this.state.limit,
        offset: this.state.offset,
        start_date: this.props.start_date,
        end_date: this.props.end_date,
      };
    } else if (this.props.car === "all") {
      data_param = {
        limit: this.state.limit,
        offset: this.state.offset,
        start_date: this.props.start_date,
        end_date: this.props.end_date,
        agent: this.props.agent,
      };
    } else if (this.props.agent === "all") {
      data_param = {
        limit: this.state.limit,
        offset: this.state.offset,
        start_date: this.props.start_date,
        end_date: this.props.end_date,
        car: this.props.car,
      };
    } else {
      data_param = {
        limit: this.state.limit,
        offset: this.state.offset,
        start_date: this.props.start_date,
        end_date: this.props.end_date,
        car: this.props.car,
        agent: this.props.agent,
      };
    }
    await axios(this.props.url, {
      params: data_param,
    }).then((response) => {
      this.setState({
        orderList: response.data,
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
        break: false,
      });
    });
    this.setState({ dataUpdate: false, create: false });
  }
  componentDidUpdate(prevProps) {
    if (this.state.dataUpdate === true) {
      this.getDateFromServer();
    }
    if (this.props.create === this.state.create) {
      this.getDateFromServer();
    }
    if (this.props.updateTable !== prevProps.updateTable) {
      this.getDateFromServer();
      this.props.break(false);
    }
    if (this.props.updateData !== prevProps.updateData) {
      this.getDateFromServer();
      console.log("Helo");
    }
    if (prevProps.car !== this.props.car) {
      this.getDateFromServer();
    }
    if (prevProps.agent !== this.props.agent) {
      this.getDateFromServer();
    }
  }
  handlePagination = async (count) => {
    let offset = this.state.limit * (count - 1);
    let response = await axios.get(this.props.url, {
      params: {
        limit: this.state.limit,
        offset: offset,
      },
    });
    this.setState({
      orderList: response.data,
      next: response.data.next,
      previous: response.data.previous,
    });
  };
  handlePages = () => {
    let count = Math.ceil(this.state.count / this.state.limit);
    return Array.from(Array(count), (e, i) => {
      return (
        <li key={i} className="page-item">
          <Link
            className="page-link"
            onClick={() => this.handlePagination(i + 1)}
            to="#"
          >
            {i + 1}
          </Link>
        </li>
      );
    });
  };
  handleNext = async () => {
    let response = await axios.get(this.state.next);
    this.setState({
      orderList: response.data,
      next: response.data.next,
      previous: response.data.previous,
    });
  };
  handlePrevious = async () => {
    let response = await axios.get(this.state.previous);
    this.setState({
      orderList: response.data,
      next: response.data.next,
      previous: response.data.previous,
    });
  };
  handleSelect = async (e) => {
    let limit = e.target.value;
    this.setState({ limit: limit });
    let response = await axios.get(this.props.url, {
      params: {
        limit: limit,
        offset: this.state.offset,
      },
    });
    this.setState({
      orderList: response.data,
      count: response.data.count,
      next: response.data.next,
      previous: response.data.previous,
    });
  };
  handleSearch = (e) => {
    let term = e.target.value;
    this.setState({ term: term });
  };
  onSearchSubmit = async (e) => {
    e.preventDefault();
    let response = await axios.get(this.props.url, {
      params: {
        term: this.state.term,
      },
    });
    this.setState({
      orderList: response.data,
      count: response.data.count,
      next: response.data.next,
      previous: response.data.previous,
    });
  };
  render() {
    return (
      <div>
        <Table
          name={this.props.name}
          headers={this.props.headers}
          orderList={this.state.orderList}
          parentCallback={this.handleCallback}
          deleteFunction={this.deleteCallBack}
          onEdit={this.onEditCallBack}
        />
        <div className="search">
          <select
            name="pagination-limit"
            value={this.state.limit}
            onChange={this.handleSelect}
          >
            <option value={11}>-----</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <form onSubmit={this.onSearchSubmit}>
            <input
              type="search"
              placeholder="Қидириш"
              onChange={this.handleSearch}
            />
          </form>
          <i className="fas fa-search"></i>
        </div>
        <div className="pagination-container">
          <ul className="pagination">
            {this.state.previous === null ? (
              <div></div>
            ) : (
              <li className="page-item">
                <Link
                  className="page-link"
                  to="#"
                  onClick={this.handlePrevious}
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                </Link>
              </li>
            )}

            {this.handlePages()}
            {this.state.next === null ? (
              <div></div>
            ) : (
              <li className="page-item">
                <Link
                  className="page-link"
                  to="#"
                  onClick={this.handleNext}
                  aria-label="Next"
                >
                  <span aria-hidden="true">&raquo;</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default DataTable;
