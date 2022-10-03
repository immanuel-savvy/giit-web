import React from "react";
import { get_request, post_request } from "../../Assets/js/utils/services";
import Loadindicator from "../../Components/loadindicator";
import { emitter } from "../../Giit";
import Combo_course from "../combo_course";
import Add_combo_form from "./add_combo_form";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";
import Toggle_form_btn from "./toggle_form_btn";

class Manage_combo_courses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let combos = await get_request("combo_courses");

    this.setState({ combos });

    this.new_combo_course = (combo) => {
      let { combos } = this.state;
      combos = new Array(...combos, combo);
      this.setState({ combos });
    };
    this.combo_removed = (combo_id) => {
      let { combos } = this.state;
      combos = combos.filter((combo) => combo._id !== combo_id);

      this.setState({ combos });
    };

    emitter.listen("new_combo_course", this.new_combo_course);
    emitter.listen("combo_removed", this.combo_removed);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("combo_removed", this.combo_removed);
    emitter.remove_listener("new_combo_course", this.new_combo_course);
  };

  remove_combo = async (combo_id) => (
    await post_request(`remove_combo_course/${combo_id}`),
    emitter.emit("combo_removed", combo_id)
  );

  toggle_form = () => this.setState({ show_form: !this.state.show_form });

  render() {
    let { combos, show_form, combo_to_update } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb
          crumb="combo courses"
          on_click={this.toggle_form}
          hide={show_form || !combos || (combos && !combos.length)}
          title="manage combo course"
        />
        <div class="row">
          {show_form ? (
            <div>
              <Add_combo_form
                combo={combo_to_update}
                toggle={this.toggle_form}
              />
              <hr />
            </div>
          ) : null}

          {combos ? (
            combos.length && combos.map ? (
              combos.map((combo) => (
                <Combo_course
                  remove_combo={() => this.remove_combo(combo._id)}
                  combo={combo}
                />
              ))
            ) : (
              <div className="d-flex align-items-center justify-content-center my-5">
                <Toggle_form_btn
                  hide={show_form}
                  on_click={this.toggle_form}
                  title="create combo"
                />
              </div>
            )
          ) : (
            <Loadindicator contained />
          )}
        </div>
      </div>
    );
  }
}

export default Manage_combo_courses;
