import React from "react";
import { Link } from "react-router-dom";

class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { article } = this.props;
    if (!article) return null;

    let {
      image,
      title,
      tags,
      instructor,
      description,
      _id,
      views_string,
      date_string,
    } = article;

    return (
      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
        <div className="blg_grid_box">
          <div className="blg_grid_thumb">
            <Link to={`/blog_detail?blog=${_id}`}>
              <img
                src={image || "https://via.placeholder.com/1200x800"}
                className="img-fluid"
                alt=""
              />
            </Link>
          </div>
          <div className="blg_grid_caption">
            <div className="blg_tag">
              <span>{tags[0]}</span>
            </div>
            <div className="blg_title">
              <h4>
                <Link to={`/blog_detail?blog=${_id}`}>{title}</Link>
              </h4>
            </div>
            <div className="blg_desc">
              <p>{description}</p>
            </div>
          </div>
          <div className="crs_grid_foot">
            <div className="crs_flex">
              <div className="crs_fl_first">
                <div className="crs_tutor">
                  <div className="crs_tutor_thumb">
                    <Link
                      to={`/instructor_detail?instructor=${instructor._id}`}
                    >
                      <img
                        src={
                          instructor.image ||
                          "https://via.placeholder.com/500x500"
                        }
                        className="img-fluid circle"
                        alt=""
                      />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="crs_fl_last">
                <div className="foot_list_info">
                  <ul>
                    <li>
                      <div className="elsio_ic">
                        <i className="fa fa-eye text-success"></i>
                      </div>
                      <div className="elsio_tx">{views_string} Views</div>
                    </li>
                    <li>
                      <div className="elsio_ic">
                        <i className="fa fa-clock text-warning"></i>
                      </div>
                      <div className="elsio_tx">{date_string}</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Article;
