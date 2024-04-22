import React from "react";
import { domain, post_request } from "../../Assets/js/utils/services";
import Handle_image_upload from "../../Components/handle_image_upload";
import Loadindicator from "../../Components/loadindicator";
import Modal_form_title from "../../Components/modal_form_title";
import Stretch_button from "../../Components/stretch_button";

class Add_sponsor extends Handle_image_upload {
  constructor(props) {
    super(props);

    let { sponsor } = this.props;
    this.state = { logo: "", name: "", url: "", ...sponsor };
  }

  add = async () => {
    let { toggle, on_add } = this.props;
    let { name, url, image_hash, logo, logo_hash, image, _id } = this.state;

    let sponsor = {
      url,
      name,
      logo_hash: image_hash || logo_hash,
      logo: image || logo,
      _id,
    };

    let res = await post_request(
      _id ? "update_sponsor" : "new_sponsor",
      sponsor
    );

    if (res?._id) {
      sponsor._id = res._id;
      sponsor.logo = res.logo;
      sponsor.created = res.created;

      on_add && on_add(sponsor);
      toggle();
    } else {
      this.setState({
        message: res?.message || "Cannot add sponsor at the moment",
        loading: false,
      });
    }
  };

  render() {
    let { toggle } = this.props;
    let {
      _id,
      logo,
      url,
      name,
      image,
      image_hash,
      logo_hash,
      logo_file_loading,
      loading,
    } = this.state;

    if (image) logo = image;
    if (image_hash) logo_hash = image_hash;

    return (
      <div>
        <div class="modal-content overli" id="loginmodal">
          <Modal_form_title title="Sponsor" toggle={toggle} />
          <div class="modal-body">
            <div class="login-form">
              <form>
                <div className="form-group smalls">
                  <label>Picture*</label>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFile"
                      accept="image/*"
                      onChange={(e) => this.handle_image(e)}
                    />
                    <label className="custom-file-label" for="customFile">
                      Choose Logo
                    </label>
                  </div>
                  {logo_file_loading ? (
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
                            logo && logo.startsWith("data")
                              ? logo
                              : `${domain}/Images/${logo}`
                          }
                        />
                      </span>
                    </div>
                  )}
                </div>

                <div class="form-group">
                  <label>Sponsor Name</label>
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
                      placeholder="Full Name"
                    />
                    <i class="ti-text"></i>
                  </div>
                </div>

                <div class="form-group">
                  <label>Url</label>
                  <div class="input-with-icon">
                    <input
                      type="url"
                      class="form-control"
                      value={url}
                      onChange={({ target }) =>
                        this.setState({
                          url: target.value,
                          message: "",
                        })
                      }
                      placeholder="URL"
                    />
                    <i class="ti-link"></i>
                  </div>
                </div>

                <div class="form-group">
                  <Stretch_button
                    disabled={!name.trim() || !url.trim() || !logo.trim()}
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

export default Add_sponsor;
