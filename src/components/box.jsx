import React, { Component } from "react";

class Box extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <Card className="col-md-4 border flex m-2">
          <p>{this.props.course.title}</p>
          <p>
            { <a className="btn btn-secondary btn-sm" href="#" role="button">
              View details »
            </a> }
          </p>
        </Card> */}

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{this.props.id}</h5>
            <p className="card-text">{this.props.course.title}</p>
            <p className="card-text text-muted">
              {this.props.course.preq_note}
            </p>

            {/* <a href="#" class="card-link">
              Card link
            </a> */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Box;
