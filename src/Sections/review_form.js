import React from "react";
import Loadindicator from "../Components/loadindicator";

class Review_form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  set_name = ({ target }) => this.setState({ name: target.value });

  set_email = ({ target }) => this.setState({ email: target.value });

  set_text = ({ target }) => this.setState({ text: target.value });

  on_post_review = async (e) => {
    e.preventDefault();
    if (this.state.posting) return;
    this.setState({ name: "", email: "", text: "", posting: true });

    let { name, email, text } = this.state;
    let review = {
      name,
      email,
      text,
    };

    await this.props.post_review(review);
    this.setState({ posting: false });
  };

  render() {
    let { name, email, text, posting } = this.state;

    return (
      <div class="edu_wraper">
        <h4 class="edu_title">Submit Reviews</h4>
        <div class="review-form-box form-submit">
          <form>
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-12">
                <div class="form-group">
                  <label>Name</label>
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
                  <label>Email</label>
                  <input
                    class="form-control"
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={this.set_email}
                  />
                </div>
              </div>

              <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="form-group">
                  <label>Review</label>
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
                      onClick={name && text && email && this.on_post_review}
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
    );
  }
}

export default Review_form;
