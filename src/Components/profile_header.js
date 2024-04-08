import React from "react";
import { Link } from "react-router-dom";
import Preview_image from "./preview_image";
import { Loggeduser } from "../Contexts";
import { post_request } from "../Assets/js/utils/services";
import { to_title } from "../Assets/js/utils/functions";
import { save_to_session } from "../Sections/footer";

class Profile_header extends React.Component {
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

    let { loggeduser } = this.props;

    if (!loggeduser) return;

    let {
      firstname,
      lastname,
      image,
      image_hash,
      lectures,
      certificates,
      courses,
    } = loggeduser;

    return (
      <div
        class="ed_detail_head"
        style={{ paddingTop: 150, paddingBottom: 20 }}
      >
        <div class="container">
          <div class="row align-items-center mb-5">
            <div class="col-lg-3 col-md-12 col-sm-12">
              <div class="authi_125">
                <div class="authi_125_thumb">
                  <Preview_image
                    image={
                      image ||
                      require("../Assets/img/user_image_placeholder.png")
                    }
                    image_hash={image_hash}
                  />
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
                      {to_title(`${firstname} ${lastname}`)}{" "}
                      <Link to={`/edit_instructor`}>
                        <i class="ti-pencil"></i>
                      </Link>
                    </h2>
                    <ul>
                      <li>
                        <i class="ti-control-forward"></i>
                        {lectures || 0} Lectures
                      </li>

                      <li>
                        <i class="fa fa-video"></i>
                        {courses || 0} Courses
                      </li>

                      <li>
                        <i class="ti-user"></i>
                        {certificates || 0} Certificates
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="dlkio_last">
                  <div class="ed_view_link">
                    {/* <Link to="/new_course" class="btn theme-bg enroll-btn">
                      Courses<i class="ti-angle-right"></i>
                    </Link> */}

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
  }
}

export default Profile_header;
