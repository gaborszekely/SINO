import React, { Component } from "react";

class Services extends Component {
  state = {
    items: [0, 1, 2]
  };

  render() {
    return (
      <div className="topMargin leftMargin centered">
        <h2>Services</h2>

        <div className="listWrapper">
          {this.state.items.map((item, index) => (
            <div className="item">Item #{index + 1}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default Services;
