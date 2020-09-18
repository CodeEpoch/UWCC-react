import React, { Component } from "react";
import "../app.css";

export default class PopUp extends Component {
  handleClick = () => {
    this.props.toggle();
  };

  render() {
    return (
      <div className="popup_bg">
        <div className="popup_content">
          <span className="close" onClick={this.handleClick}>
            &times;
          </span>
          {this.props.content}
        </div>
      </div>
    );
  }
}
