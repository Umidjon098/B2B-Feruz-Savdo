import React, { Component } from "react";
import CanvasJSReact from "../../assets/canvasjs.react";
import Loading from "../../../../img/loading-5.gif";

//var CanvasJSReact = require('./canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ColumnProfitChart extends Component {
  render() {
    let abcData = this.props.abcData;
    if (abcData.length === 0) {
      return (
        <div className="loading-box">
          <img src={Loading} alt="" />
        </div>
      );
    } else {
      const options = {
        backgroundColor: "transparent",
        title: {
          text: this.props.name,
          fontColor: "#a8b2bc",
          fontSize: 24,
        },
        axisY: {
          titleFontColor: "#a8b2bc",
          labelFontColor: "#a8b2bc",
        },
        axisX: {
          titleFontColor: "#a8b2bc",
          labelFontColor: "#a8b2bc",
        },
        data: [
          {
            // Change type to "doughnut", "line", "splineArea", etc.
            type: "column",
            dataPoints: [
              {
                label: `${abcData.a_category_data.total_profit_percent.toFixed(
                  2
                )}`,
                y: abcData.a_category_data.total_profit,
              },
              {
                label: `${abcData.b_category_data.total_profit_percent.toFixed(
                  2
                )}`,
                y: abcData.b_category_data.total_profit,
              },
              {
                label: `${abcData.c_category_data.total_profit_percent.toFixed(
                  2
                )}`,
                y: abcData.c_category_data.total_profit,
              },
            ],
          },
        ],
      };
      return (
        <div>
          <CanvasJSChart
            options={options}
            onRef={(ref) => (this.chart = ref)}
          />
        </div>
      );
    }
  }
}

export default ColumnProfitChart;
