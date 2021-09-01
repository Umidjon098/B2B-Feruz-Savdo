import React, { Component } from "react";

class FilterByTime extends Component {
  state = {
    toggle: false,
    start_date: "",
  };

  onSetstartDate = (e) => {
    this.setState({ start_date: e.target.value });
  };
  onSetendDate = (e) => {
    this.props.onFilterDateSubmit(this.state.start_date, e.target.value);
  };
  onSetDay = () => {
    const start_date =
      new Date().getFullYear() +
      "-" +
      parseInt(new Date().getMonth() + 1) +
      "-" +
      parseInt(new Date().getDate());
    this.props.onSetDay(start_date);
  };
  onSetWeek = () => {
    const today = new Date();
    const lastWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );
    const lastWeekMonth = lastWeek.getMonth() + 1;
    const lastWeekDay = lastWeek.getDate();
    const lastWeekYear = lastWeek.getFullYear();
    const start_date = lastWeekYear + "-" + lastWeekMonth + "-" + lastWeekDay;
    this.props.onSetWeek(start_date);
  };
  onSetMonth = () => {
    const today = new Date();
    const lastWeek = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate()
    );
    const lastWeekMonth = lastWeek.getMonth() + 1;
    const lastWeekDay = lastWeek.getDate();
    const lastWeekYear = lastWeek.getFullYear();
    const start_date = lastWeekYear + "-" + lastWeekMonth + "-" + lastWeekDay;
    this.props.onSetMonth(start_date);
  };
  toggleDateRange = () => {
    this.setState({ toggle: !this.state.toggle });
  };
  render() {
    return (
      <div className="filter-box">
        <span className="today" onClick={this.onSetDay}>
          Бугун
        </span>
        <span className="weekly" onClick={this.onSetWeek}>
          Ҳафта
        </span>
        <span className="monthly" onClick={this.onSetMonth}>
          Ой
        </span>
        <span onClick={this.toggleDateRange}>Оралиқ-сана</span>
        <div
          className={this.state.toggle ? "date-range toggle" : "date-range "}
        >
          <input type="date" name="startDate" onChange={this.onSetstartDate} />
          <input type="date" name="endDate" onChange={this.onSetendDate} />
        </div>
      </div>
    );
  }
}

export default FilterByTime;
