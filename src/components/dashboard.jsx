import React, { Component } from "react";
import CheckBox from "./checkbox.jsx";
import { subject_names } from "../subject_names.js";
import PopUp from "./popup";
import "../app.css";

class DashBoard extends Component {
  state = {
    search_input: "",
    course_input: "",
    takeable_c: [],
    seen: false,
    preq_pop: false,
  };

  render() {
    return (
      <div className="m-2">
        {/* User Inputs */}
        <form>
          <div>
            <input
              type="text"
              name="search_input"
              placeholder="CS136"
              onChange={this.handleChange}
              onKeyDown={this.courseSearch}
              ref={(input) => (this.searchInput = input)}
            />
            <input
              type="button"
              onClick={this.courseSearchClick}
              value="Search"
              className="btn btn-secondary btn-sm ml-1"
            />

            {this.state.preq_pop ? (
              <PopUp
                key="preq"
                content={
                  <div>
                    <h2>{this.props.preqResult.title}</h2>
                    <div>{this.props.preqResult.content}</div>
                  </div>
                }
                toggle={this.togglePreqPop}
              />
            ) : null}
          </div>

          <div>
            <input
              type="text"
              name="course_input"
              placeholder="Enter your course"
              onChange={this.handleChange}
              onKeyDown={this.addCourse}
              ref={(input) => (this.userCourseInput = input)}
            />
            <input
              type="button"
              onClick={this.addCourseClick}
              value="Add course taken"
              className="btn btn-secondary btn-sm ml-1"
            />
          </div>
        </form>

        {/* Show Courses taken */}
        {this.renderCourseTaken()}

        <div>
          <button
            className="btn btn-secondary btn-sm mb-1"
            onClick={this.togglePop}
          >
            Subject Filter
          </button>

          {/* Show Filter subjects taken */}
          {this.renderSubjectFilter()}

          {this.state.seen ? (
            <PopUp
              key="subject_filters"
              content={
                <CheckBox
                  list={subject_names}
                  checked={this.props.subjectFilter}
                  onChange={this.updateCheckbox}
                />
              }
              toggle={this.togglePop}
            />
          ) : null}
        </div>

        <label>
          Offset:
          <input
            name="offset"
            type="number"
            value={this.props.offset}
            onChange={this.handleChange2}
          />
        </label>

        <button
          onClick={this.props.onCourseSearch}
          className="btn btn-secondary btn-block m-2 "
        >
          Find Takeable Courses
        </button>
      </div>
    );
  }

  // handle change for the search and course input
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value,
    });
  };

  // handle change for subject filter and offset
  handleChange2 = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    if (name === "offset") {
      value < 0 ? (target.value = 0) : this.props.offsetChange(value);
    }
  };

  //checkbox
  updateCheckbox = (item) => {
    this.props.updateSubject(item);
  };

  //popup
  togglePop = () => {
    this.setState({
      seen: !this.state.seen,
    });
  };

  togglePreqPop = () => {
    this.setState({
      preq_pop: !this.state.preq_pop,
    });
  };

  // button click for adding user Course
  addCourseClick = (e) => {
    this.addCourse({
      key: "click",
      target: { value: this.state.course_input },
    });
  };

  // Add course
  addCourse = (e) => {
    if (e) {
      const val = e.target.value.toUpperCase();
      if ((e.key === "Enter" && val) || (e.key === "click" && val)) {
        // check existence
        if (this.props.userCourses.includes(val)) {
          return;
        }
        this.props.onEnterCourse(val);
        this.userCourseInput.value = null;
      }
    }
  };

  // button click for preq search
  courseSearchClick = () => {
    this.courseSearch({
      key: "click",
      target: { value: this.state.search_input },
    });
  };

  // Search for preq
  courseSearch = (e) => {
    const val = e.target.value.toUpperCase();
    if ((e.key === "Enter" && val) || e.key === "click") {
      this.searchInput.value = null;
      val === ""
        ? this.props.onPreqSearch("CS136")
        : this.props.onPreqSearch(val);
      this.togglePreqPop();
    }
  };

  renderCourseTaken() {
    if (this.props.userCourses.length === 0) return;
    return (
      <div>
        <span>Courses taken: </span>
        {this.props.userCourses.map((course, i) => (
          <span className="badge badge-primary ml-1" key={course}>
            {course}
            <button
              type="button"
              onClick={() => {
                this.props.onRemoveCourse(i);
              }}
              className="user_course_button"
            >
              x
            </button>
          </span>
        ))}
        <button
          className="btn btn-danger btn-sm m-1"
          onClick={this.props.onClearCourse}
        >
          Clear
        </button>
      </div>
    );
  }

  renderSubjectFilter() {
    if (this.props.subjectFilter.length === 0) return;
    return (
      <span>
        {this.props.subjectFilter.map((course, i) => (
          <span className="badge badge-primary ml-1" key={course}>
            {course}
            <button
              type="button"
              onClick={() => {
                this.props.updateSubject(i);
              }}
              className="user_course_button"
            >
              x
            </button>
          </span>
        ))}
        <button
          className="btn btn-danger btn-sm m-1"
          onClick={this.props.onClearSubjectFilter}
        >
          Clear
        </button>
      </span>
    );
  }
}

export default DashBoard;
