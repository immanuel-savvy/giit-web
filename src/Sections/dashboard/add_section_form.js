import React from "react";
import { post_request } from "../../Assets/js/utils/services";
import { emitter } from "../../Giit";

class Add_section_form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  set_title = ({ target }) => this.setState({ title: target.value });

  set_text = ({ target }) => this.setState({ text: target.value });

  sumbit = async () => {
    let { title, text } = this.state;

    let new_section = { title, text, courses: 0 };

    let response = await post_request("new_section", new_section);
    new_section._id = response._id;
    new_section.created = response.created;

    emitter.emit("new_section", new_section);
    this.props.toggle();
  };

  render() {
    let { toggle } = this.props;
    let { title, text } = this.state;

    return (
      <div
      // className="modal"
      // id="catModal"
      // tabindex="-1"
      // role="dialog"
      // aria-labelledby="catModalLabel"
      // aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Section Form</h5>
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
                  <label>Section Title*</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.set_title}
                    value={title}
                  />
                </div>

                <div className="form-group">
                  <label>Section Text*</label>
                  <textarea
                    onChange={this.set_text}
                    value={text}
                    className="form-control"
                  ></textarea>
                </div>

                <div className="form-group smalls">
                  <button
                    onClick={this.sumbit}
                    type="button"
                    className="btn full-width theme-bg text-white"
                  >
                    Add Section
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

export default Add_section_form;
