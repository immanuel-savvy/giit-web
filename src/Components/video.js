import React from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

class Video extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  tap_play = () => this.setState({ play: !this.state.play });

  render() {
    let { url, thumbnail, thumbnail_class } = this.props;
    let { play } = this.state;

    return (thumbnail && !play) || !url ? (
      <div className="property_video">
        <div className="thumb">
          <img
            className={thumbnail_class || "pro_img img rounded"}
            src={thumbnail}
            alt="About_us_video"
          />
          <div className="overlay_icon">
            {url ? (
              <div className="bb-video-box" onClick={this.tap_play}>
                <div className="bb-video-box-inner">
                  <div className="bb-video-box-innerup">
                    <Link to="#" className="theme-cl">
                      <i className="fa fa-play"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    ) : typeof url === "string" && url.startsWith("http") ? (
      <ReactPlayer
        url={url}
        height="100%"
        width="100%"
        autoPlay
        className="react-players embed-responsive embed-responsive-16by9 rounded"
      />
    ) : (
      <video
        className="embed-responsive embed-responsive-16by9 rounded"
        autoPlay
        controls
      >
        <source
          crossOrigin="true"
          className="embed-responsive-item"
          src={url}
          type="video/mp4"
        />
      </video>
    );
  }
}

export default Video;
