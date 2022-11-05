import React from "react";
import { post_request } from "../../Assets/js/utils/services";
import Handle_image_upload from "../../Components/handle_image_upload";
import Loadindicator from "../../Components/loadindicator";
import Preview_image from "../../Components/preview_image";
import { emitter } from "../../Giit";
import { scroll_to_top } from "../../Pages/Adminstrator";

class Add_vacancy extends Handle_image_upload {
  constructor(props) {
    super(props);

    this.state = { ...this.props.vacancy };
  }

  componentDidMount = () => {
    this.vacancy_in_edit = (vacancy) =>
      this.setState({ ...vacancy }, scroll_to_top);

    emitter.listen("vacancy_in_edit", this.vacancy_in_edit);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("vacancy_in_edit", this.vacancy_in_edit);
  };

  submit = async () => {
    let { image, image_hash, job_profile, _id, part_time, title, description } =
      this.state;

    let vacancy = {
      image,
      image_hash,
      title,
      description,
      part_time,
      job_profile,
      _id,
    };

    let result = await post_request(
      _id ? "update_vacancy" : "create_vacancy",
      vacancy
    );
    vacancy._id = result._id;
    vacancy.created = result.created;
    vacancy.image = result.image;

    emitter.emit(_id ? "vacancy_updated" : "vacancy_created", vacancy);
    this.props.toggle();
  };

  render() {
    let { toggle } = this.props;
    let {
      image,
      title,
      _id,
      description,
      part_time,
      image_hash,
      image_loading,
      job_profile,
    } = this.state;

    return (
      <div>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Vacancy</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={toggle}
              >
                <span aria-hidden="true">
                  <i className="fas fa-times-circle"></i>
                </span>
              </button>
            </div>
            <div className="modal-body">
              <form className="forms_block">
                <div className="form-group smalls">
                  {image ? (
                    <Preview_image
                      style={{ marginBottom: 20 }}
                      image_hash={image_hash}
                      image={image}
                    />
                  ) : null}

                  <label>Job Flier (400 x 400)</label>
                  {image_loading ? (
                    <Loadindicator />
                  ) : (
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="customFile"
                        accept="image/*"
                        onChange={this.handle_image}
                      />
                      <label className="custom-file-label" for="customFile">
                        Choose file
                      </label>
                    </div>
                  )}
                </div>

                <div className="form-group smalls">
                  <label>Title*</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={({ target }) =>
                      this.setState({ title: target.value })
                    }
                    value={title}
                  />
                </div>

                <div className="form-group">
                  <label>Description*</label>
                  <textarea
                    onChange={({ target }) =>
                      this.setState({ description: target.value })
                    }
                    value={description}
                    className="form-control"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Part Time</label>
                  <div className="form-group smalls">
                    <input
                      className="checkbox-custom"
                      name="part_time"
                      id="part_time"
                      type="checkbox"
                      checked={part_time}
                      onChange={({ target }) =>
                        this.setState({ part_time: target.checked })
                      }
                    />
                    <label for="part_time" className="checkbox-custom-label">
                      Part Time
                    </label>
                  </div>
                </div>

                <div className="form-group smalls">
                  <label>Job Profile</label>
                  <input
                    type="url"
                    className="form-control"
                    onChange={({ target }) =>
                      this.setState({ job_profile: target.value })
                    }
                    value={job_profile}
                  />
                </div>

                <div className="form-group smalls">
                  <button
                    onClick={title && description && image && this.submit}
                    type="button"
                    className={`btn full-width ${
                      title && description && image ? "theme-bg" : "grey"
                    } text-white`}
                  >
                    {_id ? "Vacancy Updated" : "Create Vacancy"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Add_vacancy;
