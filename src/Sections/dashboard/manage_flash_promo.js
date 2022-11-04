import React from "react";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";
import {
  domain,
  get_request,
  post_request,
} from "../../Assets/js/utils/services";
import Countdown from "../../Components/countdown";
import { to_title } from "../../Assets/js/utils/functions";
import Handle_image_upload from "../../Components/handle_image_upload";
import Loadindicator from "../../Components/loadindicator";

class Manage_flash_promo extends Handle_image_upload {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let flash_promo = await get_request("flash_promo");

    this.setState({ flash_promo, ...flash_promo });
  };

  set_duration = ({ target }) => {
    let duration = target.value;
    this.setState({
      duration,
      duration_timestamp: new Date(duration).getTime(),
    });
  };

  submit = async () => {
    let {
      duration,
      short_description,
      image,
      image_hash,
      duration_timestamp,
      percentage_off,
      title,
    } = this.state;
    if (
      !duration ||
      !duration_timestamp ||
      !percentage_off ||
      !Number(percentage_off) ||
      !title ||
      !short_description ||
      !image
    )
      return;

    let flash_promo = {
      duration,
      duration_timestamp,
      percentage_off: Number(percentage_off),
      title,
      short_description,
      image,
      image_hash,
    };

    let response = await post_request("new_flash_promo", flash_promo);

    flash_promo._id = response._id;
    flash_promo.image = response.image;
    flash_promo.created = response.created;

    this.setState({
      flash_promo,
      duration: "",
      duration_timestamp: "",
      percentage_off: "",
      title: "",
      image: null,
      image_hash: null,
      short_description: "",
    });
  };

  remove_promo = async () => {
    if (!window.confirm("Are you sure to remove running promo?")) return;

    await post_request("remove_flash_promo");

    this.setState({ flash_promo: null });
  };

  render() {
    let {
      title,
      image,
      image_loading,
      percentage_off,
      short_description,
      duration,
      flash_promo,
    } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="flash promo" />

        <div className="row">
          {flash_promo ? (
            <span>
              <h4 className="text-center">{to_title(flash_promo.title)}</h4>
              <Countdown timestamp={flash_promo.duration_timestamp} />
              <br />
              <div className="form-group smalls">
                <button
                  onClick={this.remove_promo}
                  type="button"
                  className={`btn full-width text-danger`}
                  style={{ borderWidth: 1, borderColor: "red" }}
                >
                  {"Remove Running Promo"}
                </button>
              </div>
              <hr />
            </span>
          ) : null}

          <form className="forms_block">
            <div className="form-group smalls">
              <label>Promo Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="OctoberFest"
                value={title}
                onChange={({ target }) =>
                  this.setState({ title: target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Short Description*</label>
              <textarea
                onChange={({ target }) =>
                  this.setState({ short_description: target.value })
                }
                value={short_description}
                className="form-control"
              ></textarea>
            </div>

            <div className="form-group smalls">
              <label>Percentage Off</label>
              <input
                type="number"
                className="form-control"
                placeholder="% off"
                value={percentage_off}
                onChange={({ target }) =>
                  this.setState({ percentage_off: target.value })
                }
              />
            </div>

            <div className="form-group smalls">
              <label>Duration</label>
              <input
                type="date"
                className="form-control"
                placeholder="% off"
                value={duration}
                onChange={this.set_duration}
              />
            </div>

            <div className="form-group smalls">
              <label>Flier (1920 x 1200)*</label>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="customFile"
                  accept="image/*"
                  onChange={this.handle_image}
                />
                <label className="custom-file-label" for="customFile">
                  Choose image
                </label>
              </div>
              <div class="d-flex align-items-center justify-content-center">
                {image_loading ? (
                  <Loadindicator contained />
                ) : image ? (
                  <img
                    className="py-3"
                    style={{
                      maxHeight: 200,
                      maxWidth: 200,
                      resize: "both",
                    }}
                    src={
                      image.startsWith("data")
                        ? this.state.image
                        : `${domain}/Images/${image}`
                    }
                  />
                ) : null}
              </div>
            </div>

            <div className="form-group smalls">
              <button
                onClick={
                  title &&
                  short_description &&
                  percentage_off &&
                  duration &&
                  this.submit
                }
                type="button"
                className={`btn full-width ${
                  title && short_description && percentage_off && duration
                    ? "theme-bg"
                    : "grey"
                } text-white`}
              >
                {"Start Promo"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Manage_flash_promo;
