import React from "react";
import { domain, post_request } from "../../Assets/js/utils/services";
import { emitter } from "../../Giit";

class Add_service_form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    let { service } = this.props;
    service && this.setState({ ...service });

    this.service_to_update = (service) => this.setState({ ...service });

    emitter.listen("service_to_update", this.service_to_update);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("service_to_update", this.service_to_update);
  };

  set_title = ({ target }) => this.setState({ title: target.value });

  set_description = ({ target }) =>
    this.setState({ description: target.value });

  handle_image = ({ target }) => {
    let file = target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = (e) => this.setState({ file, image: reader.result });
  };

  sumbit = async () => {
    let { title, description, image, _id, created } = this.state;

    let new_service = { title, image, description };

    if (!_id) {
      let response = await post_request("new_service", new_service);
      new_service._id = response._id;
      new_service.image = response.image;
      new_service.created = response.created;

      emitter.emit("new_service", new_service);
    } else {
      new_service._id = _id;
      new_service.created = created;

      await post_request("update_service", new_service);
      emitter.emit("service_updated", new_service);
    }

    this.props.toggle();
  };

  render() {
    let { toggle } = this.props;
    let { title, description, image, _id } = this.state;

    return (
      <div>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Service Form</h5>
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
                  <label>Image*</label>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFile"
                      accept="image/*"
                      onChange={this.handle_image}
                    />
                    <label className="custom-file-label" for="customFile">
                      Choose image
                    </label>
                  </div>
                  <div class="d-flex align-items-center justify-content-center">
                    {image ? (
                      <img
                        className="py-3"
                        style={{
                          maxHeight: 200,
                          maxWidth: 200,
                          resize: "both",
                        }}
                        src={
                          image.startsWith("data")
                            ? this.state.image
                            : `${domain}/Images/${image}`
                        }
                      />
                    ) : null}
                  </div>
                </div>
                <div className="form-group smalls">
                  <label>Service Title*</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.set_title}
                    value={title}
                  />
                </div>

                <div className="form-group">
                  <label>Description*</label>
                  <textarea
                    onChange={this.set_description}
                    value={description}
                    className="form-control"
                  ></textarea>
                </div>

                <div className="form-group smalls">
                  <button
                    onClick={title && image && description && this.sumbit}
                    type="button"
                    className={`btn full-width ${
                      title && image && description ? "theme-bg" : "grey"
                    } text-white`}
                  >
                    {_id ? "Update Service" : "Add Service"}
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

export default Add_service_form;
