import React from "react";
import { Link } from "react-router-dom";
import { to_title } from "../Assets/js/utils/functions";
import { emitter } from "../Giit";
import Add_university from "../Sections/dashboard/add_university";
import Modal from "./modal";
import Preview_image from "./preview_image";

class University_progress extends React.Component {
  constructor(props) {
    super(props);

    let { universities } = this.props.university_progress;
    this.state = { unis: universities.length };
  }

  componentDidMount = () => {
    let { university_progress } = this.props;

    this.new_uni = ({ country, uni }) => {
      if (university_progress._id !== country) return;

      let { unis } = this.state;
      unis++;
      this.setState({ unis });

      university_progress.universities.unshift(uni);
    };

    this.university_removed = ({ country, uni }) => {
      if (university_progress._id !== country) return;
      let { unis } = this.state;
      unis--;
      this.setState({ unis });

      university_progress.universities =
        university_progress.universities.filter((uni_) => uni_.name !== uni);
    };

    emitter.listen("new_uni", this.new_uni);
    emitter.listen("university_removed", this.university_removed);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("university_removed", this.university_removed);
    emitter.remove_listener("new_uni", this.new_uni);
  };

  render() {
    let { unis } = this.state;
    let { edit, remove, university_progress } = this.props;

    let { image, name, image_hash, universities, _id, url } =
      university_progress || new Object();

    return (
      <div class={"col-md-4 col-lg-3 col-sm-12 mb-3" || "lios_item"}>
        <div class="crs_trt_grid shadow_none brd">
          <div class="crs_trt_thumb">
            <Link to="#" class="crs_trt_thum_link">
              <Preview_image image={image} image_hash={image_hash} />
            </Link>
          </div>
          {edit ? (
            <div className="crs_video_ico" onClick={edit}>
              <i className={`fa fa-edit`}></i>
            </div>
          ) : null}
          {remove ? (
            <div className="crs_locked_ico" onClick={remove}>
              <i className={`fa fa-${remove ? "trash" : "lock"}`}></i>
            </div>
          ) : null}
          <div class="crs_trt_caption large" style={{ padding: 20 }}>
            <div class="instructor_tag">
              <span>{unis || 0}</span>
            </div>
            <div class="instructor_title">
              <h4>
                <a target="_blank" href={url}>
                  {to_title(name)}
                </a>
              </h4>
            </div>
          </div>
          <div class="crs_trt_footer">
            <div class="crs_fl_last">
              <div class="foot_list_info">
                <div class="crs_trt_caption" style={{ padding: 0 }}>
                  <span
                    onClick={() => this.add_university?.toggle()}
                    class="btn btn_view_detail theme-bg text-light"
                  >
                    {edit ? "Manage Universities" : "View Universities"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          title={edit ? "Universities" : "Manage University"}
          ref={(add_university) => (this.add_university = add_university)}
        >
          <Add_university
            country={university_progress}
            admin={!!edit}
            toggle={() => this.add_university?.toggle()}
          />
        </Modal>
      </div>
    );
  }
}

export default University_progress;
