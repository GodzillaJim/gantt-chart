import React from "react";
import Gantt from "./Gantt";
import Toolbar from "./Toolbar";
import "./styles.css";

import moment from "moment";

const data1 = {
  data: [
    {
      id: 1,
      text: "Task #1",
      start_date: "2020-4-19",
      duration: 3,
      progress: 0.6
    },
    {
      id: 2,
      text: "Task #2",
      start_date: "2020-3-15",
      duration: 3,
      progress: 0.4
    }
  ]
};

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export default class App extends React.Component {
  state = {
    currentZoom: "Months",
    data: data1
  };

  assignGeneratedData = () => {
    let d = [];
    for (let i = 0; i < 1000; i++) {
      d.push({
        id: `${i + 1}`,
        text: `Task #${i + 1}`,
        start_date: moment(randomDate(new Date(2020, 0, 1), new Date())).format(
          "YYYY-MM-DD"
        ),
        duration: 5,
        progress: 0.5
      });
    }

    console.log(d);

    this.setState({
      data: { data: d }
    });
  };

  handleZoomChange = zoom => {
    this.setState({
      currentZoom: zoom
    });
  };
  render() {
    const { currentZoom, data } = this.state;
    return (
      <div>
        <button onClick={this.assignGeneratedData}>Load Data</button>
        <Toolbar zoom={currentZoom} onZoomChange={this.handleZoomChange} />
        <div className="gantt-container">
          <Gantt tasks={data} zoom={currentZoom} />
        </div>
      </div>
    );
  }
}
