import React from "react";

class Course_instructor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { course } = this.props;
    return (
      <div
        class="tab-pane fade"
        id="instructors"
        role="tabpanel"
        aria-labelledby="instructors-tab"
      >
        <div class="single_instructor">
          <div class="single_instructor_thumb">
            <a href="#">
              <img
                src="https://via.placeholder.com/500x500"
                class="img-fluid"
                alt=""
              />
            </a>
          </div>
          <div class="single_instructor_caption">
            <h4>
              <a href="#">Jonathan Campbell</a>
            </h4>
            <ul class="instructor_info">
              <li>
                <i class="ti-video-camera"></i>72 Videos
              </li>
              <li>
                <i class="ti-control-forward"></i>102 Lectures
              </li>
              <li>
                <i class="ti-user"></i>Exp. 4 Year
              </li>
            </ul>
            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi.
            </p>
            <ul class="social_info">
              <li>
                <a href="#">
                  <i class="ti-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="ti-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="ti-linkedin"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="ti-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Course_instructor;
