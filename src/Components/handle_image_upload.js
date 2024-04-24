import React from "react";
import { encode } from "blurhash";

class Handle_image_upload extends React.Component {
  load_image = async (src) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute("crossOrigin", "Anonymous");
      img.onload = () => resolve(img);
      img.onerror = (...args) => reject(args);
      img.src = src;
    });

  get_image_data = (image) => {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);
    return context.getImageData(0, 0, image.width, image.height);
  };

  encode_image_to_blurhash = async (image_url) => {
    const image = await this.load_image(image_url);
    const image_data = this.get_image_data(image);
    return encode(image_data.data, image_data.width, image_data.height, 4, 4);
  };

  handle_file = ({ target }, prefix, maxsize, cb) => {
    let file = target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    let prop = "file",
      prop_hash = "file_hash",
      prop_size = "file_size",
      prop_type = "filetype",
      prop_filename = "filename",
      prop_oversize = "oversize",
      prop_loading = "file_loading";
    if (prefix) {
      prop_hash = `${prefix}_${prop_hash}`;
      prop_loading = `${prefix}_${prop_loading}`;
      prop_filename = `${prefix}_${prop_filename}`;
      prop_oversize = `${prefix}_${prop_oversize}`;
      prop_size = `${prefix}_${prop_size}`;
      prop = `${prefix}`;
    }
    this.setState({ [prop_loading]: true });

    reader.onloadend = async (e) => {
      console.log(file);
      this.setState(
        {
          file_result: file,
          [prop]: reader.result,
          [prop_filename]: file.name,
          [prop_type]: file.type,
          [prop_loading]: false,
          [prop_size]: file.size,
          [prop_oversize]: file.size > maxsize,
        },
        cb
      );
    };
  };

  handle_image = ({ target }, prefix, cb) => {
    let file = target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    let prop = "image",
      prop_hash = "image_hash",
      prop_loading = "image_loading";
    if (prefix) {
      prop_hash = `${prefix}_${prop_hash}`;
      prop_loading = `${prefix}_${prop_loading}`;
      prop = `${prefix}_${prop}`;
    }
    this.setState({ [prop_loading]: true });

    reader.onloadend = async (e) => {
      file?.type?.startsWith("image") &&
        (await this.encode_image_to_blurhash(reader.result)
          .then((res) => this.setState({ [prop_hash]: res }))
          .catch((err) => console.log(err)));
      this.setState(
        {
          file,
          [prop]: reader.result,
          image_name: file.name,
          [prop_loading]: false,
        },
        cb
      );
    };
  };

  handle_video = ({ target }) => {
    let file = target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    this.setState({ video_loading: true });
    reader.onloadend = async (e) =>
      this.setState(
        {
          video: reader.result,
          video_name: file.name,
          show_vid: false,
          video_loading: false,
        },
        () => this.setState({ show_vid: true })
      );
  };
}

export default Handle_image_upload;
