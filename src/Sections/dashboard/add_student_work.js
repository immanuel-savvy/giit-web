import React from "react";
import Stretch_button from "../../Components/stretch_button";
import Loadindicator from "../../Components/loadindicator";
import Handle_image_upload from "../../Components/handle_image_upload";
import { domain } from "../../Constants/constants";
import { post_request } from "../../Assets/js/utils/services";

class Add_student_work extends Handle_image_upload {
  constructor(props) {
    super(props);

    let { work } = this.props;
    this.state = { name: "", ...work };
  }

  add = async () => {
    let { toggle, on_add } = this.props;
    let { name, link, image, image_hash, _id } = this.state;
    this.setState({ loading: true });

    let cat = {
      name: name.trim(),
      _id,
      image,
      image_hash,
      link,
    };

    let result = await post_request(
      _id ? "update_student_work" : "add_student_work",
      cat
    );

    if (result && result._id) {
      cat._id = result._id;
      cat.image = result.image;
      cat.created = result.created;

      on_add && on_add(cat);
      toggle();
    } else {
      this.setState({
        message:
          (result && result.message) || "Cannot create company at the moment.",
        loading: false,
      });
    }
  };

  render() {
    let { toggle } = this.props;
    let { name, link, loading, _id, image, image_name, image_loading } =
      this.state;

    return (
      <div>
        <div class="modal-content overli" id="loginmodal">
          <div class="modal-body">
            <div class="login-form">
              <form>
                <div className="form-group smalls">
                  <label>Logo*</label>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFile"
                      accept="image/*"
                      onChange={this.handle_image}
                    />
                    <label className="custom-file-label" for="customFile">
                      {image_name || "Choose Image"}
                    </label>
                  </div>
                  {image_loading ? (
                    <Loadindicator />
                  ) : (
                    <div
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <span>
                        <img
                          className="py-3 rounded"
                          style={{
                            maxHeight: 200,
                            maxWidth: 200,
                            marginRight: 10,
                          }}
                          src={
                            image && image.startsWith("data")
                              ? image
                              : `${domain}/Images/${image}`
                          }
                        />
                      </span>
                    </div>
                  )}
                </div>

                <div class="form-group">
                  <label>Name</label>
                  <div class="input-with-icon">
                    <input
                      type="text"
                      class="form-control"
                      value={name}
                      onChange={({ target }) =>
                        this.setState({
                          name: target.value,
                          message: "",
                        })
                      }
                      placeholder="Name"
                    />
                    <i class="ti-text"></i>
                  </div>
                </div>

                <div class="form-group">
                  <label>Link</label>
                  <div class="input-with-icon">
                    <input
                      type={"text"}
                      class="form-control"
                      placeholder="https://giitafrica.com"
                      value={link}
                      onChange={({ target }) =>
                        this.setState({
                          link: target.value,
                          message: "",
                        })
                      }
                    />
                    <i class="ti-link"></i>
                  </div>
                </div>

                <div class="form-group">
                  <Stretch_button
                    disabled={!name.trim() || !name.trim()}
                    loading={loading}
                    title={_id ? "Update" : "Add"}
                    action={this.add}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Add_student_work;
