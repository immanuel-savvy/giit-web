import React from "react";
import { post_request } from "../../Assets/js/utils/services";
import { emitter } from "../../Giit";

class Add_faq extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.faq,
    };
  }

  submit = async () => {
    let { question, answer, _id } = this.state;

    let faq = { question, answer, _id };

    let response = await post_request(_id ? "update_faq" : "new_faq", faq);
    faq._id = response._id;
    faq.created = response.created;

    emitter.emit(_id ? "faq_updated" : "new_faq", faq);
    this.props.toggle();
  };

  render() {
    let { toggle } = this.props;
    let { answer, question, _id } = this.state;

    return (
      <div>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add FAQ Form</h5>
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
                  <label>Question*</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={({ target }) =>
                      this.setState({ question: target.value })
                    }
                    value={question}
                  />
                </div>

                <div className="form-group">
                  <label>Answer*</label>
                  <textarea
                    onChange={({ target }) =>
                      this.setState({ answer: target.value })
                    }
                    value={answer}
                    className="form-control"
                  ></textarea>
                </div>
                <br />
                <div className="form-group smalls">
                  <button
                    onClick={question && answer && this.submit}
                    type="button"
                    className={`btn full-width ${
                      question && answer ? "theme-bg" : "grey"
                    } text-white`}
                  >
                    {_id ? "Update Faq" : "Submit Faq"}
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

export default Add_faq;
