import React from "react";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";
import Add_student_work from "./add_student_work";
import Student_work from "../../Components/student_work";
import Modal from "../../Components/modal";
import Small_btn from "../../Components/small_btn";
import Loadindicator from "../../Components/loadindicator";
import Listempty from "../../Components/list_empty";
import { get_request, post_request } from "../../Assets/js/utils/services";

class Manage_student_works extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let works = await get_request("student_works");

    if (!Array.isArray(works)) works = new Array();

    this.setState({ works });
  };

  toggle_add_work = () => this.student?.toggle();

  on_add = (work) => {
    let { works, work_in_edit } = this.state;

    if (work_in_edit)
      works = works.map((student) =>
        student._id === work_in_edit._id ? work : student
      );
    else works = new Array(work, ...works);

    this.setState({
      works,
      work_in_edit: null,
    });
  };

  edit = (work) => {
    this.setState({ work_in_edit: work }, this.toggle_add_work);
  };

  remove = async (work) => {
    let { works } = this.state;

    if (!window.confirm("Are you sure to remove student work?")) return;

    works = works.filter((student) => student._id !== work._id);
    this.setState({ works });

    await post_request(`remove_student_work/${work._id}`);
  };

  render() {
    let { works, work_in_edit } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb
          crumb="manage Works"
          right_btn={
            <Small_btn title="Add Company" action={this.toggle_add_work} />
          }
        />
        <div className="row justify-content-center">
          {works ? (
            works.length ? (
              works.map((work) => (
                <Student_work
                  edit={this.edit}
                  remove={this.remove}
                  work={work}
                  key={work._id}
                />
              ))
            ) : (
              <Listempty />
            )
          ) : (
            <Loadindicator />
          )}
        </div>

        <Modal ref={(student) => (this.student = student)}>
          <Add_student_work
            work={work_in_edit}
            on_add={this.on_add}
            toggle={this.toggle_add_work}
          />
        </Modal>
      </div>
    );
  }
}

export default Manage_student_works;
