import React, { Component } from "react";
// import "../../../KassirKomponents/Cashier/DepartmentBudget/department.css"

class FilterByTime extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      month: false,
      today: false,
      week: false
    }
  }
  
  onSetDate = (e) => {
    this.props.onFilterDateSubmit(e.target.value);
  };
  
  onSetDay = () => {
    const start_date =
      new Date().getFullYear() +
      "-" +
      parseInt(new Date().getMonth() + 1) +
      "-" +
      parseInt(new Date().getDate());
    this.props.onSetDay(start_date);
    this.setState({
      today: true,
      month: false,
      week: false
    })
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
    this.setState({
      today: false,
      month: false,
      week: true
    })
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
    this.setState({
      today: false,
      month: true,
      week: false
    })
  };
  render() {
    return (
      <div className="filter-box">
        <span className={this.state.today?`today activespan`: "today"}  onClick={this.onSetDay}>
          Бугун
        </span>
        <span className={this.state.week?`weekly activespan`: "week"} onClick={this.onSetWeek}>
          Ҳафта 
        </span>
        <span className={this.state.month?`monthly activespan`: "monthly"} onClick={this.onSetMonth}>
          Ой
        </span>
        <input type="date" name="startDate" onChange={this.onSetDate} />
        <input type="date" name="startDate" onChange={this.onSetDate} />
      </div>
    );
  }
}

export default FilterByTime;
