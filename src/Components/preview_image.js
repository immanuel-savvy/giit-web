import React from "react";
import { domain } from "../Constants/constants";
import { Blurhash } from "react-blurhash";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Image from "next/image";

class Preview_image extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { image_loaded } = this.state;
    let { onclick, image, image_hash, height, width } = this.props;

    return (
      <span>
        <LazyLoadImage
          src={
            (image && (image.startsWith("/") || image.startsWith("http"))) ||
            typeof image !== "string"
              ? image
              : `${domain}/Images/${image}`
          }
          onLoad={() => this.setState({ image_loaded: true })}
          beforeLoad={() => this.setState({ image_load_started: true })}
          className="img-fluid rounded"
          onClick={onclick}
          style={{
            height: image_loaded ? height || null : 0,
            width: width || null,
          }}
        />
        {!image_loaded && image_hash ? (
          <Blurhash
            hash={image_hash}
            height={height || 210}
            width={width || 600}
            className="img-fluid rounded"
            punch={1}
            onClick={onclick}
          />
        ) : null}
      </span>
    );
  }
}

export default Preview_image;
