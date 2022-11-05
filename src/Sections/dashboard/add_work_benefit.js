import React from "react";
import { post_request } from "../../Assets/js/utils/services";
import Handle_image_upload from "../../Components/handle_image_upload";
import Loadindicator from "../../Components/loadindicator";
import Preview_image from "../../Components/preview_image";
import { emitter } from "../../Giit";

class Add_work_benefit extends Handle_image_upload {
  constructor(props) {
    super(props);

    this.state = {};
  }

  submit = async () => {
    let { image, image_hash, title, text } = this.state;

    let benefit = {
      image,
      image_hash,
      title,
      text,
    };

    let result = await post_request("add_work_benefit", benefit);
    benefit._id = result._id;
    benefit.created = result.created;
    benefit.image = result.image;

    emitter.emit("work_benefit_added", benefit);
    this.props.toggle();
  };

  render() {
    let { toggle } = this.props;
    let { image, title, text, image_hash, image_loading } = this.state;

    return (
      <div>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Work Benefit</h5>
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

                  <label>Image (400 x 400)</label>
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
                  <label>Text*</label>
                  <textarea
                    onChange={({ target }) =>
                      this.setState({ text: target.value })
                    }
                    value={text}
                    className="form-control"
                  ></textarea>
                </div>

                <div className="form-group smalls">
                  <button
                    onClick={title && text && image && this.submit}
                    type="button"
                    className={`btn full-width ${
                      title && text && image ? "theme-bg" : "grey"
                    } text-white`}
                  >
                    {"Add Benefit"}
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

export default Add_work_benefit;
