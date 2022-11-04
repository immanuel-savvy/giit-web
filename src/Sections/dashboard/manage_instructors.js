import React from "react";
import { get_request, post_request } from "../../Assets/js/utils/services";
import Listempty from "../../Components/list_empty";
import Loadindicator from "../../Components/loadindicator";
import { emitter } from "../../Giit";
import Instructor from "../instructor";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_instructors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let instructors = await get_request("instructors/all");

    this.setState({ instructors });
  };

  remove_instructor = async (instructor_id) => {
    if (!window.confirm("Are you sure to delete instructor?")) return;

    let { instructors } = this.state;
    instructors = instructors.filter(
      (instructor) => instructor._id !== instructor_id
    );

    this.setState({ instructors });

    await post_request(`remove_instructor/${instructor_id}`);
  };

  edit_instructor = (instructor) => emitter.emit("edit_instructor", instructor);

  render() {
    let { instructors } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="manage instructors" />

        <div className="row">
          {instructors ? (
            instructors.length ? (
              instructors.map((instructor) => (
                <Instructor
                  instructor={instructor}
                  key={instructor._id}
                  remove={() => this.remove_instructor(instructor._id)}
                  edit={() => this.edit_instructor(instructor)}
                />
              ))
            ) : (
              <Listempty />
            )
          ) : (
            <Loadindicator />
          )}
        </div>
      </div>
    );
  }
}

export default Manage_instructors;
