import React from "react";
import { post_request } from "../../Assets/js/utils/services";
import Handle_image_upload from "../../Components/handle_image_upload";
import Loadindicator from "../../Components/loadindicator";
import { domain } from "../../Constants/constants";
import { emitter } from "../../Giit";

class Add_country extends Handle_image_upload {
  constructor(props) {
    super(props);

    this.state = { ...this.props.country };
  }

  sumbit = async () => {
    let { name, image, image_hash, universities, _id } = this.state;

    let country = {
      _id,
      name,
      image,
      image_hash,
      universities: universities || new Array(),
    };

    let response = await post_request(
      _id ? "update_country" : "add_country",
      country
    );
    country._id = response._id;
    country.created = response.created;

    emitter.emit(_id ? "country_updated" : "new_country", country);
    this.props.toggle();
  };

  render() {
    let { toggle } = this.props;

    let { name, image, image_loading, _id } = this.state;

    return (
      <div>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Country</h5>
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
                  <label>Image (700 x 550)*</label>
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
                        Choose image
                      </label>
                    </div>
                  )}
                  <div class="d-flex align-items-center justify-content-center">
                    {image ? (
                      <img
                        className="py-3"
                        style={{
                          maxHeight: 200,
                          maxWidth: 200,
                          resize: "both",
                        }}
                        src={
                          image.startsWith("data")
                            ? image
                            : `${domain}/Images/${image}`
                        }
                      />
                    ) : null}
                  </div>
                </div>

                <div className="form-group smalls">
                  <label>Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={({ target }) =>
                      this.setState({ name: target.value })
                    }
                    value={name}
                  />
                </div>

                <div className="form-group smalls">
                  <button
                    onClick={name && image && this.sumbit}
                    type="button"
                    className={`btn full-width ${
                      name && image ? "theme-bg" : "grey"
                    } text-white`}
                  >
                    {_id ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <hr className="mb-5" />
      </div>
    );
  }
}

export default Add_country;
