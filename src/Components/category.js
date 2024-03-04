import React from "react";
import { Link } from "react-router-dom";
import Text_btn from "./text_btn";
import { to_title } from "../Assets/js/utils/functions";
import { emitter } from "../Giit";

class Category extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handle_course = () => {
    let { category } = this.props;
    console.log(category);
    window.sessionStorage.setItem("course", JSON.stringify(category));
    emitter.emit("push_course", category);
  };

  render() {
    let { category, edit, remove } = this.props;

    if (!category) return;

    let { title, courses, removed, uri } = category;

    return (
      <div class="col-xl-3 col-lg-4 col-md-4 col-sm-6">
        <div class="crs_cate_wrap style_2">
          <span class="crs_cate_box">
            <span onClick={this.handle_course}>
              <Link to={`/course`} style={{}}>
                <div class="crs_cate_icon">
                  <i class="fa fa-code"></i>
                </div>
                <div class="crs_cate_caption">
                  <span>{to_title(title?.replace(/_/g, " "))}</span>
                </div>
                <div class="crs_cate_count">
                  <span>{courses?.length || 1} Courses</span>
                </div>
              </Link>
            </span>
            {edit || remove ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  zIndex: 999,
                }}
              >
                <Text_btn
                  text="Edit"
                  icon="fa-edit"
                  action={() => edit(category)}
                />
                &nbsp; &nbsp; &nbsp;
                <Text_btn
                  text={removed ? "Unremove" : "Remove"}
                  icon={removed ? "" : "fa-trash"}
                  action={() => remove(category)}
                />
              </div>
            ) : null}
          </span>
        </div>
      </div>
    );
  }
}

export default Category;
