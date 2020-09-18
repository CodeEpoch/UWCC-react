import React, { Component } from "react"; //imrc
import "../app.css";
//cc
class DashBoard extends Component {
  state = {
    count: -1,
    search_input: "",
    course_input: "",
    takeable_c: [],
  };

  // constructor() {
  //   super();
  //   this.search = this.search.bind(this);
  // }

  render() {
    return (
      <div className="m-2">
        {/* User Inputs */}
        <form>
          <div>
            <input
              type="text"
              name="search_input"
              placeholder="BIOL 225"
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
          </div>

          <div>
            <input
              type="text"
              name="course_input"
              placeholder="Enter your courses"
              onChange={this.handleChange}
              onKeyDown={this.addCourse}
              ref={(input) => (this.userCourseInput = input)}
            />
            <input
              type="button"
              onClick={this.addCourseClick}
              value="Add course(s) taken"
              className="btn btn-secondary btn-sm ml-1"
            />
          </div>
        </form>

        {/* Show Courses taken */}
        {this.renderCourseTaken()}
        <button
          onClick={this.props.onCourseSearch}
          className="btn btn-secondary btn-block m-2 "
        >
          Find Takeable Courses
        </button>
      </div>
    );
  }

  // handle change for in the two user input
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value,
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
      // this.findCoursePreq();
    }
  };

  renderCourseTaken() {
    if (this.props.userCourses.length === 0) return <p> </p>;
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
}

export default DashBoard;
