import React from "react";
import { Col } from "react-bootstrap";
import Loadindicator from "../../Components/loadindicator";
import Modal_form_title from "../../Components/modal_form_title";
import Stretch_button from "../../Components/stretch_button";
import Video from "../../Components/video";
import Handle_image_upload from "../../Components/handle_image_upload";
import { domain } from "../../Constants/constants";
import { post_request } from "../../Assets/js/utils/services";
import { emitter } from "../../Giit";

class Add_video_review extends Handle_image_upload {
  constructor(props) {
    super(props);

    let { review } = this.props;

    this.state = {
      ...review,
      image: review?.thumbnail,
      image_file_hash: review?.image_hash,
      show_vid: true,
      video: review?.url,
    };
  }

  submit = async () => {
    this.setState({ uploading: true });
    let { on_submit, admin } = this.props;

    let { image, thumbnail, video, video_url, url, _id, image_hash } =
      this.state;
    image = image || image;

    video = {
      thumbnail: image || thumbnail,
      url: video || url,
      _id,
      video_url,
      image_hash,
    };
    let res = await post_request(
      _id ? "update_video_review" : "new_video_review",
      video
    );

    video.url = res.url;
    video.thumbnail = res.thumbnail;

    on_submit && on_submit(video);
    admin &&
      emitter.emit(_id ? "video_review_updated" : "new_video_review", video);

    this.setState({ uploading: false });
  };

  render() {
    let { toggle, admin } = this.props;

    let {
      image,
      url,
      url_file_loading,
      show_vid,
      image_file_loading,
      uploading,
      video_url,
    } = this.state;

    return (
      <div className="ed_view_box">
        <Modal_form_title title="Video Review" toggle={toggle} />

        <div className="row justify-content-center mb-3">
          {(image || url) && show_vid ? (
            <Col lg={6} md={6} sm={12} className="align-items-center">
              {
                <Video
                  url={
                    url?.startsWith("data") ? url : `${domain}/videos/${url}`
                  }
                  thumbnail={image}
                />
              }
            </Col>
          ) : null}
        </div>
        <hr />
        <div className="row ">
          <form>
            <div class="row">
              <div className="form-group smalls">
                <label>Thumbnail *</label>
                {image_file_loading ? (
                  <Loadindicator />
                ) : (
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFile"
                      accept="image/*"
                      onChange={(e) => this.handle_image(e)}
                    />
                    <label className="custom-file-label" for="customFile">
                      Choose file
                    </label>
                  </div>
                )}
              </div>
              <div className="form-group smalls">
                <label>Video</label>
                {url_file_loading ? (
                  <Loadindicator />
                ) : (
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFile"
                      accept="video/*"
                      onChange={(e) => this.handle_video(e)}
                      control
                    />
                    <label className="custom-file-label" for="customFile">
                      Choose file
                    </label>
                  </div>
                )}
              </div>

              <div class="form-group">
                <label>Video URL</label>
                <input
                  class="form-control"
                  type="text"
                  placeholder="https://youtube.com/watch"
                  value={video_url}
                  onChange={({ target }) =>
                    this.setState({ video_url: target.value })
                  }
                />
              </div>

              <Stretch_button
                title="Submit"
                loading={uploading}
                action={this.submit}
                disabled={(!url && !video_url) || !image}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Add_video_review;
