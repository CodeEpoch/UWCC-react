import React, { Component } from "react";
import NavBar from "./components/narbar";
import DashBoard from "./components/dashboard.jsx";
import Box from "./components/box.jsx";
import CS from "./course_data_json/CS.json";
import { all_subjects } from "./import_data.js";

import "./app.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      count: -1,
      offset: 0,
      term_filter: [], // "F", "W","S"
      subject_filter: [], // "CS", "GEOG" ...
      program_filter: [], // "enginner" "Bio student" ...
      takeable_c: [],
      user_courses: [],
      course_list: CS,
    };
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main role="main" className="container">
          <DashBoard
            key="dash"
            onCourseSearch={this.findTakeableCourse}
            onRemoveCourse={this.removeCourse}
            onClearCourse={this.clearCourse}
            onEnterCourse={this.enterCourse}
            userCourses={this.state.user_courses}
          />

          {/* show takeable courses */}
          <div className="row">{this.renderCourseFound()}</div>
        </main>
      </React.Fragment>
    );
  }

  findCoursePreq = () => {
    console.log("findCoursePreq....");
  };

  // find Takeable Courses vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  loop_preq = (preqs2, req_num, init) => {
    for (let i = init; i < preqs2.length; i++) {
      if (typeof preqs2[i] === "object") {
        let check_preq = this.can_take(preqs2[i], req_num); //check req_num, idk y -1 no work
        if (check_preq) {
          req_num -= 1;
        }
      } else if (this.state.user_courses.includes(preqs2[i])) {
        req_num -= 1;
      }
      if (req_num === 0) {
        return true;
      }
    }
    return false;
  };

  can_take = (preq, req_num) => {
    const offset = this.state.offset;
    if (preq) {
      if (typeof preq[0] === "number") {
        if (preq[0] < offset) {
          return true;
        }
        if (req_num === -1) {
          req_num = preq[0] - offset;
        } else {
          req_num += preq[0];
        }
        return this.loop_preq(preq, req_num, 1);
      } else if (typeof preq[0] == "string") {
        if (preq.length < offset) {
          return true;
        }
        req_num = preq.length - offset;
        return this.loop_preq(preq, req_num, 0);
      } else if (typeof preq[0] === "object") {
        let preq2 = preq.slice(1)[0];
        if (typeof preq2 != "undefined") {
          return (
            this.can_take(preq[0], req_num) && this.can_take(preq2, req_num)
          );
        } else {
          return this.can_take(preq[0], req_num);
        }
      } else {
        console.log(typeof preq[0], preq, req_num);
      }
      // return false;
    }
    return false;
  };

  findTakeableCourse = () => {
    const user_course = this.state.user_courses;
    // const subject_filter = this.state.subject_filter;
    const program_restriction = this.state.program_filter;
    let takeable_list = [];

    all_subjects.forEach((subject) => {
      // const subject_key = Object.keys(subject)[0];
      const subject_courses = Object.values(subject)[0];

      if (subject_courses.length > 0) {
        let takable = subject_courses.filter((course) => {
          const course_id = Object.keys(course)[0];
          const course_info = Object.values(course)[0];
          const preq = course_info.preq;
          let check_for_preq = true;
          let program_check = true;
          // let subject_check = true;
          let not_taken = false;

          //checks for preq
          if (typeof preq === "object" && !this.can_take(preq, -1)) {
            check_for_preq = false;
          }

          //filter out taken course
          if (!user_course.includes(course_id)) {
            not_taken = true;
          }

          //filter out programs thats not user dont want
          if (program_restriction.length > 0) {
            program_restriction.forEach((nos) => {
              if (course_info.preq_note.includes(nos)) {
                program_check = false;
              }
            });
          }

          // //filter by subject
          // if (subject_filter.length > 0) {
          //   subject_filter.forEach((subj) => {
          //     if (!course_id.includes(subj)) {
          //       subject_check = false;
          //     }
          //   });
          // }

          if (check_for_preq && program_check && not_taken) {
            takeable_list.push({ [course_id]: course_info });
            return true;
          }
          return false;
        });
        console.log(takable);
      }
    });

    this.setState({ takeable_c: takeable_list, count: takeable_list.length });

    // this.setState({ count: data.length, takeable_c: data });
  };

  // find Takeable Courses ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  //user course stuff vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  // remove user course
  removeCourse = (i) => {
    const newCourses = [...this.state.user_courses];
    newCourses.splice(i, 1);
    this.setState({ user_courses: newCourses });
  };

  // clear user course
  clearCourse = () => {
    this.setState({ user_courses: [] });
  };

  // Add course
  enterCourse = (val) => {
    this.setState({ user_courses: [...this.state.user_courses, val] });
  };
  //user course stuff ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  // rendering =====================================================
  // format Takeable Course found

  renderCourseFound() {
    if (this.state.takeable_c.length === 0 && this.state.count !== -1)
      return <p>No course for you right now</p>;

    return (
      <div>
        <div className="badge badge-primary">
          {this.state.count === -1 ? "" : `${this.state.count} courses found`}
        </div>
        <div className="row mx-auto">
          {this.state.takeable_c.map((course) => (
            <Box
              key={Object.keys(course)}
              id={Object.keys(course)}
              course={Object.values(course)[0]}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
