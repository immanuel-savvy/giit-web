import React from "react";
import { Link } from "react-router-dom";
import Preview_image from "./preview_image";
import { Logged_user } from "../Contexts";
import { save_to_session } from "../Sections/footer";
import { post_request } from "../Assets/js/utils/services";
import { gen_random_int, to_title } from "../Assets/js/utils/functions";

class Instructor_header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { instructor } = this.props;
    let { categories } = instructor;

    categories = await post_request("get_categories", { categories });

    this.setState({ categories });
  };

  toggle_bio = () => this.setState({ full: !this.state.full });

  bio_length = 75;

  render() {
    let { categories, full } = this.state;

    let { instructor, loggeduser } = this.props;
    let {
      name,
      image,
      image_hash,
      bio,
      ratings,
      reviews,
      lectures,
      enrollments,
      videos,
    } = instructor;
    if (!ratings) ratings = 0;

    console.log(instructor);
    return (
      <Logged_user.Consumer>
        {() => {
          return (
            <div class="ed_detail_head">
              <div class="container">
                <div class="row align-items-center mb-5">
                  <div class="col-lg-3 col-md-12 col-sm-12">
                    <div class="authi_125">
                      <div class="authi_125_thumb">
                        <Preview_image image={image} image_hash={image_hash} />
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-9 col-md-12 col-sm-12">
                    <div class="dlkio_452">
                      <div class="ed_detail_wrap">
                        {categories && categories.length
                          ? categories.map((cat) => (
                              <div key={cat._id} class="crs_cates cl_3">
                                <span>{cat.title}</span>
                              </div>
                            ))
                          : null}

                        <div class="ed_header_caption">
                          <h2 class="ed_title">
                            {to_title(name)}{" "}
                            {loggeduser &&
                            loggeduser._id === instructor.user ? (
                              <Link to={`/edit_instructor`}>
                                <i class="ti-pencil"></i>
                              </Link>
                            ) : null}
                          </h2>
                          <ul>
                            <li>
                              <i class="ti-control-forward"></i>
                              {lectures || 0} Lectures
                            </li>

                            <li>
                              <i class="fa fa-video"></i>
                              {videos || 0} Videos
                            </li>

                            <li>
                              <i class="ti-user"></i>
                              {enrollments || 0} Student Enrolled
                            </li>
                          </ul>
                        </div>
                        <div class="ed_header_short">
                          <p>
                            {full ? bio : bio?.slice(0, this.bio_length)}{" "}
                            {bio?.length > this.bio_length ? (
                              <a
                                href="#"
                                onClick={this.toggle_bio}
                                class="theme-cl"
                              >
                                {full ? "Show less.." : "Read More.."}
                              </a>
                            ) : null}
                            .
                          </p>
                        </div>

                        <div class="ed_rate_info">
                          <div class="star_info">
                            <i
                              class={`fas fa-star ${
                                ratings > 0 ? "filled" : ""
                              }`}
                            ></i>
                            <i
                              class={`fas fa-star ${
                                ratings > 1 ? "filled" : ""
                              }`}
                            ></i>
                            <i
                              class={`fas fa-star ${
                                ratings > 2 ? "filled" : ""
                              }`}
                            ></i>
                            <i
                              class={`fas fa-star ${
                                ratings > 3 ? "filled" : ""
                              }`}
                            ></i>
                            <i
                              class={`fas fa-star ${
                                ratings > 4 ? "filled" : ""
                              }`}
                            ></i>
                          </div>

                          <div class="review_counter">
                            {ratings ? (
                              <strong class="high">{ratings}</strong>
                            ) : null}{" "}
                            {reviews || gen_random_int(1000, 100)} Reviews
                          </div>
                        </div>
                      </div>
                      <div class="dlkio_last">
                        <div class="ed_view_link">
                          {/* {instructor.user === loggeduser?._id ? (
                            <Link
                              to="/new_course"
                              onClick={() =>
                                save_to_session("instructor", instructor)
                              }
                              class="btn theme-bg enroll-btn"
                            >
                              New Course<i class="ti-angle-right"></i>
                            </Link>
                          ) : (
                            <></> || (
                              <Link
                                to="/new_course"
                                class="btn theme-bg enroll-btn"
                              >
                                New Course<i class="ti-angle-right"></i>
                              </Link>
                            )
                          )} */}
                          <a href="#" class="btn theme-border enroll-btn">
                            Share<i class="fas fa-share"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Logged_user.Consumer>
    );
  }
}

export default Instructor_header;
