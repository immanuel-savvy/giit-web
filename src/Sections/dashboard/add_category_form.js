import React from "react";
import { to_title } from "../../Assets/js/utils/functions";
import { post_request } from "../../Assets/js/utils/services";
import Loadindicator from "../../Components/loadindicator";
import { emitter } from "../../Giit";

class Add_category_form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  set_tags = ({ target }) => this.setState({ tags: target.value });

  sumbit = async () => {
    let { tags, title, articles, _id, loading } = this.state;
    if (loading) return;
    this.setState({ loading: true });

    let category = {
      tags,
      title,
    };

    let response;
    if (_id) {
      category._id = _id;
      response = await post_request("update_article_category", category);
      category.articles = articles;
    } else {
      response = await post_request("new_article_category", category);
      category._id = response._id;
      category.created = response.created;
    }

    response && response._id && emitter.emit("add_article_category", category);
    this.props.toggle();
  };

  render() {
    let { toggle } = this.props;
    let { title, tags, _id, loading } = this.state;

    return (
      <div>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Article Category</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={toggle}
              >
                <span aria-hidden="true">
                  <i className="fas fa-times-circle"></i>
                </span>
              </button>
            </div>
            <div className="modal-body">
              <form className="forms_block">
                <div className="form-group smalls">
                  <label>Title*</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.set_title}
                    value={title}
                  />
                </div>

                <div className="form-group smalls">
                  <label>Tags*</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.set_tags}
                    value={tags}
                  />

                  {tags ? (
                    <div className="mt-2">
                      {tags.split(",").map((tag) => (
                        <div key={tag} class="crs_cates cl_1">
                          <span>{to_title(tag.trim())}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="form-group smalls">
          <button
            onClick={title && tags && this.sumbit}
            type="button"
            className={`btn full-width ${
              title && tags ? "theme-bg" : "grey"
            } short_description-white`}
          >
            {loading ? <Loadindicator /> : null}
            {_id ? "Update Category" : "Add Category"}
          </button>
        </div>
      </div>
    );
  }
}

export default Add_category_form;
