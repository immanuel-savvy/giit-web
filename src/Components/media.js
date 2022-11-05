import React from "react";
import { domain } from "../Constants/constants";
import Video from "./video";

class Media extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { media, remove, edit } = this.props;
    let { video, image, image_hash, title, description } = media;

    return (
      <div className="col-lg-4 col-xl-3 col-md-6 col-sm-12 mb-3">
        <span
          style={{
            justifyContent: "flex-end",
            alignItems: "flex-end",
            display: "flex",
          }}
        >
          {edit ? (
            <a onClick={edit} className="btn btn-action">
              <i className={`fas fa-edit`}></i>
            </a>
          ) : null}
          {remove ? (
            <a onClick={remove} className="btn btn-action">
              <i className={`fas fa-window-close`}></i>
            </a>
          ) : null}
        </span>
        <Video
          thumbnail={image}
          thumbnail_hash={image_hash}
          url={video ? `${domain}/Videos/${video}` : null}
        />
        <p className="h4 mt-2">{title}</p>
        <span>{description}</span>
      </div>
    );
  }
}

export default Media;
