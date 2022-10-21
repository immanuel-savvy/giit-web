import React from "react";
import { domain } from "../Constants/constants";
import { Blurhash } from "react-blurhash";
import { LazyLoadImage } from "react-lazy-load-image-component";

class Preview_image extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { image_load_started, image_loaded } = this.state;
    let { onclick, image, image_hash } = this.props;

    return (
      <>
        <LazyLoadImage
          height={200}
          src={
            (image && image.startsWith("/")) || typeof image !== "string"
              ? image
              : `${domain}/Images/${image}`
          }
          onLoad={() => this.setState({ image_loaded: true })}
          beforeLoad={() => this.setState({ image_load_started: true })}
          className="img-fluid rounded"
          width={600}
          onClick={onclick}
        />
        {!image_loaded && image_load_started && image_hash ? (
          <Blurhash
            hash={image_hash}
            height={200}
            width={600}
            className="img-fluid rounded"
            punch={1}
            onClick={onclick}
          />
        ) : null}
      </>
    );
  }
}

export default Preview_image;
