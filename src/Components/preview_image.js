import React from "react";
import { domain } from "../Constants/constants";
import { Blurhash } from "react-blurhash";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loadindicator from "./loadindicator";

class Preview_image extends React.Component {
  constructor(props) {
    super(props);

    let { height, width } = this.props;
    this.state = { height, width: width || this.default_width() };
  }

  default_width = () => {
    let { parent_size } = this.props;
    let w;
    if (window.innerWidth < 500) w = window.innerWidth - 30;
    else if (window.innerWidth > 500 && window.innerWidth < 1200)
      w = (window.innerWidth - 100) / 3 - 45;
    else w = (window.innerWidth - 160) / 4 - 80;

    parent_size && parent_size({ width: w });
    return w;
  };

  render() {
    let { image_loaded, height, width } = this.state;
    let {
      onclick,
      style,
      no_preview,
      image,
      class_name,
      parent_size,
      responsive,
      image_hash,
    } = this.props;

    return (
      <span>
        <LazyLoadImage
          src={
            (image &&
              (image.startsWith("/") ||
                image.startsWith("http") ||
                image.startsWith("data"))) ||
            typeof image !== "string"
              ? image
              : `${domain}/Images/${image}`
          }
          onLoad={({ target }) => {
            let set = { image_loaded: true };
            if (responsive) {
              if (typeof responsive === "boolean") responsive = 5;
              set.height = target.naturalHeight / responsive;
              set.width = target.naturalWidth / responsive;

              if (window.innerWidth < 500) {
                let x = window.innerWidth / set.width;
                set.width *= x;
                set.height *= x;
                set.width -= 30;
              } else if (window.innerWidth > 500 && window.innerWidth < 1200) {
                let x = (window.innerWidth - 100) / 3 / set.width;
                set.width = (window.innerWidth - 100) / 3;
                set.height *= x;
                set.width -= 45;
              } else {
                let x = (window.innerWidth - 160) / 4 / set.width;
                set.width = (window.innerWidth - 160) / 4;
                set.height *= x;
                set.width -= 80;
              }

              parent_size && parent_size(set);
            }
            this.setState(set);
          }}
          beforeLoad={() => this.setState({ image_load_started: true })}
          className={
            responsive
              ? "p-2 rounded"
              : class_name || "img-fluid rounded image-responsive"
          }
          onClick={onclick}
          style={{
            height: image_loaded ? height || null : 0,
            width: width || null,
            ...style,
          }}
        />
        {!image_loaded && image_hash ? (
          no_preview ? (
            <Loadindicator small />
          ) : (
            <Blurhash
              hash={image_hash}
              height={height || 210}
              width={width || 600}
              className={class_name || "img-fluid rounded"}
              punch={1}
              onClick={onclick}
            />
          )
        ) : null}
      </span>
    );
  }
}

export default Preview_image;
