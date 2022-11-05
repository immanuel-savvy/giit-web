import React from "react";
import { domain, post_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import { emitter } from "../Giit";

class Add_student_review extends React.Component {
  constructor(props) {
    super(props);

    this.default_image = "user_image_placeholder.png";
    this.state = {
      image: `${domain}/Images/${this.default_image}`,
    };
  }

  set_name = ({ target }) => this.setState({ name: target.value });

  set_email = ({ target }) => this.setState({ email: target.value });

  set_organisation = ({ target }) =>
    this.setState({ organisation: target.value });

  set_text = ({ target }) => this.setState({ text: target.value });

  set_position = ({ target }) => this.setState({ position: target.value });

  handle_image = ({ target }) => {
    let file = target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = (e) => this.setState({ file, image: reader.result });
  };

  toggle_image_selector = () =>
    document.getElementById("alumni_image_selector").click();

  on_post_review = async (e) => {
    e.preventDefault();

    let { name, email, text, image, organisation, position, posting } =
      this.state;
    if (posting) return;

    this.setState({ posting: true });

    let review = {
      name,
      email,
      text,
      image: image.startsWith("http") ? this.default_image : image,
      organisation,
      position,
    };

    let result = await post_request("new_review", review);
    if (!result || (result && !result._id)) return;

    review._id = result._id;
    review.image = result.image;
    review.created = result.created;

    emitter.emit("new_alumni_review", review);
    this.props.toggle();
  };

  render() {
    let { toggle } = this.props;
    let { name, email, text, image, organisation, position, posting } =
      this.state;

    return (
      <div className="row justify-content-center">
        <div class="edu_wraper">
          <h4 class="edu_title">Submit Reviews</h4>

          <div class="review-form-box form-submit">
            <form>
              <div class="row">
                <div class="d-flex align-items-center justify-content-center">
                  {image ? (
                    <img
                      onClick={this.toggle_image_selector}
                      className="py-3"
                      style={{
                        maxHeight: 200,
                        cursor: "pointer",
                        maxWidth: 200,
                        resize: "both",
                      }}
                      src={this.state.image}
                    />
                  ) : null}
                  <input
                    type="file"
                    className="custom-file-input"
                    id="alumni_image_selector"
                    accept="image/*"
                    hidden
                    onChange={this.handle_image}
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                  <div class="form-group">
                    <label>Name*</label>
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={this.set_name}
                    />
                  </div>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-12">
                  <div class="form-group">
                    <label>Email*</label>
                    <input
                      class="form-control"
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={this.set_email}
                    />
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                  <div class="form-group">
                    <label>Organisation*</label>
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Where you work"
                      value={organisation}
                      onChange={this.set_organisation}
                    />
                  </div>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-12">
                  <div class="form-group">
                    <label>Position*</label>
                    <input
                      class="form-control"
                      type="text"
                      placeholder="What you do"
                      value={position}
                      onChange={this.set_position}
                    />
                  </div>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12">
                  <div class="form-group">
                    <label>Review*</label>
                    <textarea
                      class="form-control ht-140"
                      placeholder="Review"
                      value={text}
                      onChange={this.set_text}
                    ></textarea>
                  </div>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12">
                  <div class="form-group">
                    {posting ? (
                      <Loadindicator />
                    ) : (
                      <a
                        href="#"
                        style={{ color: "#fff" }}
                        onClick={
                          name &&
                          text &&
                          organisation &&
                          position &&
                          email &&
                          this.on_post_review
                        }
                        class="btn theme-bg btn-md"
                      >
                        Submit Review
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Add_student_review;