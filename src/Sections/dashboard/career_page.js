import React from "react";
import { post_request } from "../../Assets/js/utils/services";
import Handle_image_upload from "../../Components/handle_image_upload";
import Loadindicator from "../../Components/loadindicator";
import Preview_image from "../../Components/preview_image";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Career_page extends Handle_image_upload {
  constructor(props) {
    super(props);

    this.state = {
      careers_stuff: "fetching",
    };
  }

  componentDidMount = async () => {
    let careers_stuff = await post_request("careers_stuff");

    this.setState({ careers_stuff, ...careers_stuff });
  };

  submit = async () => {
    let {
      main_heading,
      sub_heading,
      image,
      image_hash,
      team_image,
      team_image_hash,
      block_quote,
      uploading,
    } = this.state;

    if (uploading) return;

    let careers_stuff = {
      main_heading,
      sub_heading,
      image,
      image_hash,
      team_image,
      team_image_hash,
      block_quote,
    };

    await post_request("update_careers_stuff", careers_stuff);

    this.setState({ uploading: false });
  };

  render() {
    let {
      careers_stuff,
      main_heading,
      sub_heading,
      image_loading,
      team_image,
      team_image_hash,
      block_quote,
      team_image_loading,
      image,
      image_hash,
      uploading,
    } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="career page stuffs" />
        <div class="row">
          <div>
            {careers_stuff !== "fetching" ? (
              <div className="row ">
                <div className="justify-content-center">
                  {image ? (
                    <Preview_image
                      style={{ marginBottom: 20 }}
                      image_hash={image_hash}
                      image={image}
                    />
                  ) : null}
                </div>
                <form>
                  <div class="row mt-3">
                    <div className="form-group smalls">
                      <label>Header Image (1920 x 1200)</label>
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
                      <label>Main Heading</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={({ target }) =>
                          this.setState({ main_heading: target.value })
                        }
                        value={main_heading}
                      />
                    </div>

                    <div className="form-group smalls">
                      <label>Sub Heading</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={({ target }) =>
                          this.setState({ sub_heading: target.value })
                        }
                        value={sub_heading}
                      />
                    </div>

                    <div className="form-group smalls">
                      <label>Blockquote</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={({ target }) =>
                          this.setState({ block_quote: target.value })
                        }
                        value={block_quote}
                      />
                    </div>

                    {team_image ? (
                      <Preview_image
                        style={{ marginBottom: 20 }}
                        image_hash={team_image_hash}
                        image={team_image}
                      />
                    ) : null}

                    <div className="form-group smalls">
                      <label>Team Image (1920 x 1200)</label>
                      {team_image_loading ? (
                        <Loadindicator />
                      ) : (
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            id="customFile"
                            accept="image/*"
                            onChange={(e) => this.handle_image(e, "team")}
                          />
                          <label className="custom-file-label" for="customFile">
                            Choose file
                          </label>
                        </div>
                      )}
                    </div>

                    <div class="col-lg-12 col-md-12 col-sm-12">
                      <div class="form-group">
                        {uploading ? (
                          <Loadindicator />
                        ) : (
                          <a
                            href="#"
                            style={{ color: "#fff" }}
                            onClick={
                              (image ||
                                block_quote ||
                                main_heading ||
                                sub_heading ||
                                team_image) &&
                              this.submit
                            }
                            class="btn theme-bg btn-md"
                          >
                            {"Save"}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <Loadindicator contained />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Career_page;
