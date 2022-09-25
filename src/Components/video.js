import React from "react";
import { Link } from "react-router-dom";

class Video extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  tap_play = () => this.setState({ play: !this.state.play });

  render() {
    let { url, thumbnail } = this.props;
    let { play } = this.state;

    return thumbnail && !play ? (
      <div className="property_video">
        <div className="thumb">
          <img
            className="pro_img img rounded"
            src={thumbnail}
            alt="About_us_video"
          />
          <div className="overlay_icon">
            <div className="bb-video-box" onClick={this.tap_play}>
              <div className="bb-video-box-inner">
                <div className="bb-video-box-innerup">
                  <Link to="#" className="theme-cl">
                    <i className="fa fa-play"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <video
        className="embed-responsive embed-responsive-16by9 rounded"
        autoPlay
        controls
      >
        <source className="embed-responsive-item" src={url} type="video/mp4" />
      </video>
    );
  }
}

export default Video;
