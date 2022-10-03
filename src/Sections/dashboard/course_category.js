import React from "react";
import { to_title } from "../../Assets/js/utils/functions";
import {
  domain,
  get_request,
  post_request,
} from "../../Assets/js/utils/services";
import Loadindicator from "../../Components/loadindicator";
import { emitter } from "../../Giit";
import Add_category_form from "./add_category_form";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Course_category extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let categories = await get_request("categories");
    this.setState({ categories });

    this.new_category = (category) => {
      let { categories } = this.state;
      categories = new Array(category, ...categories);
      this.setState({ categories });
    };
    this.category_updated = (category) => {
      let { categories } = this.state;
      categories = categories.map((category_) => {
        if (category_._id === category._id) return category;
        return category_;
      });
    };

    emitter.listen("new_category", this.new_category);
    emitter.listen("category_updated", this.category_updated);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("new_category", this.new_category);
    emitter.remove_listener("category_updated", this.category_updated);
  };

  toggle_category_form = () =>
    this.setState({
      show_form: !this.state.show_form,
      category_to_update: null,
    });

  add_new_category_btn = () =>
    this.state.show_form ? null : (
      <div>
        <div class="elkios" onClick={this.toggle_category_form}>
          <a
            href="#"
            class="add_new_btn"
            data-toggle="modal"
            data-target="#catModal"
          >
            <i class="fas fa-plus-circle mr-1"></i>Add New Category
          </a>
        </div>
      </div>
    );

  remove_category = async (category_id) => {
    let { categories } = this.state;
    categories = categories.filter((category) => category._id !== category_id);
    this.setState({ categories });

    await post_request(`remove_category/${category_id}`);
    emitter.emit("category_removed", category_id);
  };

  edit_category = (category) =>
    this.state.show_form
      ? emitter.emit("category_to_update", category)
      : this.setState({ category_to_update: category, show_form: true });

  toggle_full_text = (_id) =>
    this.setState({ fulltext: this.state.fulltext === _id ? null : _id });

  category = (category) => {
    let { title, text, _id, courses, image } = category;

    return (
      <div key={_id} class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
        <div class="dash_crs_cat">
          <a
            onClick={() =>
              window.confirm("Are you sure to remove category? ") &&
              this.remove_category(_id)
            }
            href="#"
            class="remove_tools"
          >
            <i class="fas fa-trash-alt"></i>
          </a>
          {image ? (
            <div class="dash_crs_cat_thumb">
              <img
                src={`${domain}/Images/${image}`}
                style={{ maxHeight: 200, width: "100%" }}
                alt=""
                class="img-fluid"
              />
            </div>
          ) : null}
          <div class="dash_crs_cat_caption">
            <div class="dash_crs_cat_head">
              <h4>{to_title(title)}</h4>
              <span>{`Courses: ${courses}`}</span>
            </div>
            <div
              onClick={() => this.toggle_full_text(_id)}
              class="dash_crs_cat_body"
            >
              <p className="mx-3">
                {this.state.fulltext === _id
                  ? text
                  : `${text.slice(0, 200)}...`}
              </p>
            </div>
            <div class="dash_crs_cat_bottom">
              <a
                href="#"
                onClick={() => this.edit_category(category)}
                class="btn full-width theme-bg-light theme-cl"
              >
                Edit Category
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    let { categories, show_form, category_to_update } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb
          crumb="course categories"
          on_click={this.toggle_category_form}
          hide={show_form || !categories || (categories && !categories.length)}
          title="add new category"
        />

        <div class="row">
          {show_form ? (
            <div>
              <Add_category_form
                category={category_to_update}
                toggle={this.toggle_category_form}
              />
              <hr />
            </div>
          ) : null}

          {categories ? (
            categories.length && categories.map ? (
              categories.map((category) => this.category(category))
            ) : (
              <div className="d-flex align-items-center justify-content-center my-5">
                {this.add_new_category_btn()}
              </div>
            )
          ) : (
            <Loadindicator contained />
          )}
        </div>
      </div>
    );
  }
}

export default Course_category;
