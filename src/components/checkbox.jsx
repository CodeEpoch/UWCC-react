import React, { Component } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

class CheckBox extends Component {
  //   constructor(prop) {
  //     super();
  //     console.log(prop.checked);
  //   }

  render() {
    return (
      <div>
        <FormGroup row>
          {this.props.list.map((item) => {
            let check = false;
            if (
              this.props.checked.length > 0 &&
              this.props.checked.includes(item)
            ) {
              check = true;
            }
            return (
              <FormControlLabel
                key={item}
                control={
                  <Checkbox
                    checked={check}
                    onChange={this.handleChange}
                    name={item}
                    color="primary"
                  />
                }
                label={item}
              />
            );
          })}
        </FormGroup>
      </div>
    );
  }

  handleChange = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.checked });
    this.props.onChange({
      subject: event.target.name,
      checked: event.target.checked,
    });
  };
}

export default CheckBox;
