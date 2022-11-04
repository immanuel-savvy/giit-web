import React from "react";
import { Col } from "react-bootstrap";
import { domain, post_request } from "../../Assets/js/utils/services";
import Handle_image_upload from "../../Components/handle_image_upload";
import Loadindicator from "../../Components/loadindicator";
import Video from "../../Components/video";
import { emitter } from "../../Giit";

class Add_media extends Handle_image_upload {
  constructor(props) {
    super(props);

    let { media } = this.props;
    this.state = { ...media, show_vid: true };
  }

  submit = async (e) => {
    e.preventDefault();

    this.setState({ uploading: true });

    let { title, uploading, _id, image_hash, description, image, video } =
      this.state;
    if (uploading) return;

    let media = {
      title,
      description,
      image,
      image_hash,
      video,
      _id,
    };

    let response = await post_request(
      _id ? "update_media" : "new_media",
      media
    );

    media.image = response.image;
    media.video = response.video;
    media._id = response._id;
    media.created = response.created;

    emitter.emit(_id ? "media_updated" : "new_media", media);
    this.props.toggle();
  };

  render() {
    let { toggle } = this.props;
    let {
      video,
      image_name,
      video_name,
      show_vid,
      image,
      title,
      description,
      uploading,
      image_loading,
      video_loading,
    } = this.state;

    return (
      <div>
        <form>
          <div className="modal-header">
            <h5 className="modal-title">Add media</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={toggle}
            >
              <span>
                <i className="fas fa-times-circle"></i>
              </span>
            </button>
          </div>
          <div className="row my-3 justify-content-center">
            {image && show_vid ? (
              <Col lg={6} md={6} sm={12} className="align-items-center">
                <Video
                  url={
                    video
                      ? video.startsWith("data")
                        ? video
                        : `${domain}/Videos/${video}`
                      : null
                  }
                  thumbnail={image}
                />
              </Col>
            ) : null}
          </div>

          <div class="row">
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

            <div className="form-group smalls">
              <label>Image *</label>
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
              {image_name ? <p>{image_name}</p> : null}
            </div>
            <div className="form-group smalls">
              <label>Video</label>
              {video_loading ? (
                <Loadindicator />
              ) : (
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="customFile"
                    accept="video/*"
                    onChange={this.handle_video}
                    control
                  />
                  <label className="custom-file-label" for="customFile">
                    Choose file
                  </label>
                </div>
              )}
              {video_name ? <p>{video_name}</p> : null}
            </div>

            <div class="col-lg-12 col-md-12 col-sm-12">
              <div class="form-group">
                {uploading ? (
                  <Loadindicator />
                ) : (
                  <a
                    href="#"
                    style={{ color: "#fff" }}
                    onClick={title && description && image && this.submit}
                    class="btn theme-bg btn-md"
                  >
                    Add
                  </a>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Add_media;
