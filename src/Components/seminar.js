import React from "react";
import Preview_image from "./preview_image";
import {
  domain,
  seminar_backend,
  seminar_frontend,
} from "../Constants/constants";
import {
  commalise_figures,
  date_string,
  time_string,
} from "../Assets/js/utils/functions";
import { save_to_session, scroll_to_top } from "../Sections/footer";

class Seminar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      in_attendance: "fetching",
    };
  }

  parse_datetime = (datetime) => {
    let date = new Date(datetime).getTime();

    return `${date_string(date)}, ${time_string(date)}`;
  };

  toggle_read_more = () => this.setState({ full: !this.state.full });

  render() {
    let { full } = this.state;
    let {
      seminar,
      edit,
      ticket,
      class_name,
      in_seminars,
      remove,
      ticket_code,
    } = this.props;
    if (!seminar) return;

    let {
      title,
      speaker,
      speaker_linkedin,
      images,
      date,
      category,
      speaker_image,
      speaker_image_hash,
      meet_link,
      attendees,
      _id,
    } = seminar;

    return (
      <div
        className={
          class_name ||
          (in_seminars
            ? "col-xl-4 col-lg-6 col-md-6 col-sm-12"
            : "col-xl-3 col-lg-4 col-md-6 col-sm-12")
        }
      >
        <div className="crs_grid">
          <div className="crs_grid_thumb">
            <a
              href={`${seminar_frontend}/seminar?${_id}`}
              target="_blank"
              onClick={() => {
                save_to_session("seminar", {
                  ...seminar,
                  attendees,
                  ticket_code,
                  ticket,
                });
                scroll_to_top();
              }}
              className="crs_detail_link"
            >
              <Preview_image
                image={`${domain}/Images/${images[0]?.url}`}
                image_hash={images[0]?.image_hash}
                class_name="img img-fluid rounded"
              />
            </a>

            {remove ? (
              <div className="crs_locked_ico" onClick={remove}>
                <i className={`fa fa-trash`}></i>
              </div>
            ) : null}
            {edit ? (
              <div className="crs_video_ico cursor-pointer" onClick={edit}>
                <i className={`fa fa-edit`}></i>
              </div>
            ) : null}
          </div>
          <div className="crs_grid_caption">
            <div className="crs_flex">
              <div className="crs_fl_first">
                <div className="crs_cates cl_8">
                  <span>{category}</span>
                </div>
              </div>
              <div className="crs_fl_last">
                <div
                  onClick={edit ? this.toggle_Attendees : null}
                  style={edit ? { cursor: "pointer" } : null}
                  className="crs_inrolled"
                >
                  <strong>{commalise_figures(attendees || 0, true)}</strong>
                  Attendants
                </div>
              </div>
            </div>
            <div className="crs_title">
              <h4>
                <a
                  target="_blank"
                  href={`${seminar_frontend}/seminar?${_id}`}
                  onClick={() => {
                    save_to_session("seminar", {
                      ...seminar,
                      attendees,
                      ticket_code,
                      ticket,
                    });
                    scroll_to_top();
                  }}
                  className="crs_title_link"
                >
                  {title}
                </a>
              </h4>
            </div>
            <p>
              <i className="fas fa-map-marker"></i>{" "}
              <b>
                {meet_link?.includes("youtube")
                  ? "Youtube Live"
                  : "Google Meet"}
              </b>
            </p>

            <div class="crs_info_detail">
              <ul>
                <i class="fa fa-clock text-danger"></i>&nbsp;&nbsp;
                <span>{this.parse_datetime(date)}</span>
              </ul>
            </div>
          </div>

          <div className="crs_grid_foot">
            <div className="crs_flex">
              <div className="crs_fl_first">
                <div className="crs_tutor">
                  <div className="crs_tutor_thumb">
                    <a href={speaker_linkedin} target="_blank">
                      <Preview_image
                        class_name="img-fluid circle"
                        style={{ height: 30, width: 30 }}
                        image={`${seminar_backend}/images/${speaker_image}`}
                        image_hash={speaker_image_hash}
                      />
                    </a>
                  </div>
                  <div className="crs_tutor_name">
                    <a href={speaker_linkedin} target="_blank">
                      {speaker}
                    </a>
                  </div>
                </div>
              </div>
              <div className="crs_fl_last">
                <div className="crs_price"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Seminar;
