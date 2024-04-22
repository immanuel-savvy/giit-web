import React from "react";
import { Logged_user } from "../Contexts";
import Header from "../Sections/header";
import Footer, { get_session, go_back } from "../Sections/footer";
import Text_input from "../Components/text_input";
import Padder from "../Components/padder";
import Loadindicator from "../Components/loadindicator";
import { domain } from "../Constants/constants";
import Handle_image_upload from "../Components/handle_image_upload";
import Stretch_button from "../Components/stretch_button";
import { post_request } from "../Assets/js/utils/services";

class Edit_profile extends Handle_image_upload {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    if (!this.loggeduser) {
      this.loggeduser = get_session("loggeduser");
      if (!this.loggeduser) return go_back();
    }

    this.setState({ ...this.loggeduser });
  };

  update = async () => {
    let { firstname, lastname, email, image, image_hash, loading, _id } =
      this.state;
    if (loading || !firstname.trim() || !email.trim() || !lastname.trim())
      return;

    this.setState({ loading: true });
    await post_request(`update_user/${_id}`, {
      firstname,
      lastname,
      email,
      image,
      image_hash,
    });

    this.update_loggeduser({ firstname, lastname, email, image, image_hash });

    this.setState({ loading: false }, go_back);
  };

  render = () => {
    let { firstname, lastname, email, image, updating, image_loading } =
      this.state;

    return (
      <Logged_user.Consumer>
        {({ loggeduser, update_loggeduser }) => {
          this.loggeduser = loggeduser;
          this.update_loggeduser = update_loggeduser;

          return (
            <div>
              <Header />
              <div className="clearfix"></div>
              <Padder height={100} />

              <div>
                <section>
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-xl-7 col-lg-8 col-md-12 col-sm-12">
                        <form>
                          <div className="crs_log_wrap">
                            <div className="crs_log__thumb">
                              <img
                                src={require("../Assets/css/img/breadcrumb_bg.jpg")}
                                className="img-fluid"
                                alt=""
                              />
                            </div>

                            <div className="rcs_log_123">
                              <div className="rcs_ico">
                                <i className="fas fa-users"></i>
                              </div>
                            </div>

                            <div className="rcs_log_124">
                              <div className="Lpo09">
                                <h4>Update Your Profile</h4>
                              </div>
                            </div>

                            <div className="form-group smalls px-4">
                              <label>Image*</label>
                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  id="customFile"
                                  accept="image/*"
                                  onChange={(e) => this.handle_image(e)}
                                />
                                <label
                                  className="custom-file-label"
                                  for="customFile"
                                >
                                  Choose Image
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

                            <div className="crs_log__caption">
                              <div className="row">
                                <Text_input
                                  col_width="6"
                                  value={firstname}
                                  on_blur={this.check_name}
                                  title="Firstname"
                                  action={(firstname) =>
                                    this.setState({
                                      firstname,
                                      message: "",
                                      name_error: "",
                                    })
                                  }
                                />
                                <Text_input
                                  col_width="6"
                                  value={lastname}
                                  title="Lastname"
                                  action={(lastname) =>
                                    this.setState({
                                      lastname,
                                      message: "",
                                      name_error: "",
                                    })
                                  }
                                />
                                <Text_input
                                  value={email}
                                  disabled
                                  title="Email"
                                  action={(email) =>
                                    this.setState({
                                      email,
                                      message: "",
                                      name_error: "",
                                    })
                                  }
                                />
                              </div>

                              <Stretch_button
                                title="Update"
                                action={this.update}
                                loading={updating}
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <Footer />
            </div>
          );
        }}
      </Logged_user.Consumer>
    );
  };
}

export default Edit_profile;
