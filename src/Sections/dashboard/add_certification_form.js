import React from "react";
import { domain, post_request } from "../../Assets/js/utils/services";
import Handle_image_upload from "../../Components/handle_image_upload";
import { emitter } from "../../Giit";

class Add_certification_form extends Handle_image_upload {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    let { certification } = this.props;
    certification &&
      this.setState({
        ...certification,
        image: `${domain}/Images/${certification.image}`,
      });

    this.certification_to_update = (certification) =>
      this.setState({ ...certification });

    emitter.listen("certification_to_update", this.certification_to_update);
  };

  componentWillUnmount = () => {
    emitter.remove_listener(
      "certification_to_update",
      this.certification_to_update
    );
  };

  set_title = ({ target }) => this.setState({ title: target.value });

  set_description = ({ target }) =>
    this.setState({ description: target.value });

  submit = async () => {
    let { title, description, image_hash, _id, courses, image, created } =
      this.state;

    let new_certification = {
      title,
      image_hash,
      image,
      description,
      courses: 0,
    };

    if (!_id) {
      let response = await post_request("new_certification", new_certification);
      new_certification._id = response._id;
      new_certification.created = response.created;

      emitter.emit("new_certification", new_certification);
    } else {
      new_certification._id = _id;
      new_certification.courses = courses;
      new_certification.created = created;
      if (new_certification.image)
        if (new_certification.image.startsWith("http"))
          new_certification.image = this.props.certification.image;

      await post_request("update_certification", new_certification);
      emitter.emit("certification_updated", new_certification);
    }

    this.props.toggle();
  };

  render() {
    let { toggle } = this.props;
    let { image, title, description, _id } = this.state;

    return (
      <div>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Certification Form</h5>
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
                  <label>Certification Image</label>
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
                  <div class="d-flex align-items-center justify-content-center">
                    {image ? (
                      <img
                        className="py-3"
                        style={{
                          maxHeight: 200,
                          maxWidth: 200,
                          resize: "both",
                        }}
                        src={this.state.image}
                      />
                    ) : null}
                  </div>
                </div>

                <div className="form-group smalls">
                  <label>Certification Title*</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.set_title}
                    value={title}
                  />
                </div>

                <div className="form-group">
                  <label>Certification Description*</label>
                  <textarea
                    onChange={this.set_description}
                    value={description}
                    className="form-control"
                  ></textarea>
                </div>
                <br />
                <div className="form-group smalls">
                  <button
                    onClick={title && description && this.submit}
                    type="button"
                    className={`btn full-width ${
                      title && description ? "theme-bg" : "grey"
                    } text-white`}
                  >
                    {_id ? "Update Certification" : "Add Certification"}
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

export default Add_certification_form;
