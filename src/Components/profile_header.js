import React from "react";
import { Link } from "react-router-dom";
import Preview_image from "./preview_image";
import { post_request } from "../Assets/js/utils/services";
import { to_title } from "../Assets/js/utils/functions";

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

    let { loggeduser, enrollments } = this.props;

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
        className="page-title"
        style={{ paddingTop: 200, paddingBottom: 20 }}
      >
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-lg-3 col-md-12 col-sm-12">
              <div className="authi_125">
                <div className="authi_125_thumb">
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

            <div className="col-lg-9 col-md-12 col-sm-12">
              <div className="dlkio_452">
                <div className="ed_detail_wrap">
                  {categories && categories.length
                    ? categories.map((cat) => (
                        <div key={cat._id} className="crs_cates cl_3">
                          <span>{cat.title}</span>
                        </div>
                      ))
                    : null}

                  <div className="ed_header_caption">
                    <h2 className="ed_title">
                      {to_title(`${firstname} ${lastname}`)}{" "}
                      <Link to={`/edit_instructor`}>
                        <i className="ti-pencil"></i>
                      </Link>
                    </h2>
                    <ul>
                      <li>
                        <i className="ti-control-forward"></i>
                        {lectures || 0} Lectures
                      </li>

                      <li>
                        <i className="fa fa-video"></i>
                        {enrollments || 0} Courses
                      </li>

                      <li>
                        <i className="ti-user"></i>
                        {certificates || 0} Certificates
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="dlkio_last">
                  <div className="ed_view_link">
                    {/* <Link to="/new_course" className="btn theme-bg enroll-btn">
                      Courses<i className="ti-angle-right"></i>
                    </Link> */}

                    <a href="#" className="btn theme-border enroll-btn">
                      Share<i className="fas fa-share"></i>
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
