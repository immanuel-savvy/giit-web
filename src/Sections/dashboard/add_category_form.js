import React from "react";
import { to_title } from "../../Assets/js/utils/functions";
import { post_request } from "../../Assets/js/utils/services";
import { emitter } from "../../Giit";

class Add_category_form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    let { category } = this.props;
    category && this.setState({ ...category });

    this.category_to_update = (category) => this.setState({ ...category });

    emitter.listen("category_to_update", this.category_to_update);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("category_to_update", this.category_to_update);
  };

  set_title = ({ target }) => this.setState({ title: target.value });

  set_text = ({ target }) => this.setState({ text: target.value });

  set_tags = ({ target }) => this.setState({ tags: target.value });

  handle_image = ({ target }) => {
    let file = target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = (e) => this.setState({ file, image: reader.result });
  };

  sumbit = async () => {
    let { title, text, _id, courses, image, tags, created } = this.state;

    let new_category = { title, tags, image, text, courses: 0 };

    if (!_id) {
      let response = await post_request("new_category", new_category);
      new_category._id = response._id;
      new_category.created = response.created;

      emitter.emit("new_category", new_category);
    } else {
      new_category._id = _id;
      new_category.courses = courses;
      new_category.created = created;

      await post_request("update_category", new_category);
      emitter.emit("category_updated", new_category);
    }

    this.props.toggle();
  };

  render() {
    let { toggle } = this.props;
    let { title, text, image, _id, tags } = this.state;

    return (
      <div>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Category Form</h5>
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
                  <div className="form-group smalls">
                    <label>Category Image</label>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="customFile"
                        accept="image/*"
                        onChange={this.handle_image}
                      />
                      <label className="custom-file-label" for="customFile">
                        Choose file
                      </label>
                    </div>
                    <div class="d-flex align-items-center justify-content-center">
                      {image ? (
                        <img
                          className="py-3 rounded-circle"
                          style={{
                            maxHeight: 200,
                            maxWidth: 200,
                            resize: "both",
                          }}
                          src={this.state.image}
                        />
                      ) : null}
                    </div>
                  </div>

                  <label>Category Title*</label>
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

                <div className="form-group">
                  <label>Category Text*</label>
                  <textarea
                    onChange={this.set_text}
                    value={text}
                    className="form-control"
                  ></textarea>
                </div>

                <div className="form-group smalls">
                  <button
                    onClick={title && tags && text && this.sumbit}
                    type="button"
                    className={`btn full-width ${
                      title && text && tags ? "theme-bg" : "grey"
                    } text-white`}
                  >
                    {_id ? "Update Category" : "Add Category"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Add_category_form;
