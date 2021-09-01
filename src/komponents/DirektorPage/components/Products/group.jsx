import React, { Component } from "react";
import Departament from "../../components/Products/create-department";
import Category from "../../components/Products/create_category";
import Territory from "../../components/Products/territory-create";
import CarLine from "../../components/Products/create_car_line";
import "../../styles/group-nav.css";

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page_name: "departament",
    };
  }
  render() {
    if (this.state.page_name === "departament") {
      return (
        <div className="group-box">
          <div className="group-nav">
            <div onClick={() => this.setState({ page_name: "departament" })}>
              Департмент
            </div>
            <div onClick={() => this.setState({ page_name: "category" })}>
              Категория
            </div>
            <div onClick={() => this.setState({ page_name: "territory" })}>
              Территорй
            </div>
            <div onClick={() => this.setState({ page_name: "carline" })}>
              Машрут
            </div>
          </div>
          <Departament />
        </div>
      );
    } else if (this.state.page_name === "category") {
      return (
        <div className="group-box">
          <div className="group-nav">
            <div onClick={() => this.setState({ page_name: "departament" })}>
              Департмент
            </div>
            <div onClick={() => this.setState({ page_name: "category" })}>
              Категория
            </div>
            <div onClick={() => this.setState({ page_name: "territory" })}>
              Территорй
            </div>
            <div onClick={() => this.setState({ page_name: "carline" })}>
              Машрут
            </div>
          </div>
          <Category />
        </div>
      );
    } else if (this.state.page_name === "territory") {
      return (
        <div className="group-box">
          <div className="group-nav">
            <div onClick={() => this.setState({ page_name: "departament" })}>
              Департмент
            </div>
            <div onClick={() => this.setState({ page_name: "category" })}>
              Категория
            </div>
            <div onClick={() => this.setState({ page_name: "territory" })}>
              Территорй
            </div>
            <div onClick={() => this.setState({ page_name: "carline" })}>
              Машрут
            </div>
          </div>
          <Territory />
        </div>
      );
    } else if (this.state.page_name === "carline") {
      return (
        <div className="group-box">
          <div className="group-nav">
            <div onClick={() => this.setState({ page_name: "departament" })}>
              Департмент
            </div>
            <div onClick={() => this.setState({ page_name: "category" })}>
              Категория
            </div>
            <div onClick={() => this.setState({ page_name: "territory" })}>
              Территорй
            </div>
            <div onClick={() => this.setState({ page_name: "carline" })}>
              Машрут
            </div>
          </div>
          <CarLine />
        </div>
      );
    }
  }
}

export default Group;
