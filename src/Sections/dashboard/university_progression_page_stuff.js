import React from "react";
import { get_request, post_request } from "../../Assets/js/utils/services";
import Handle_image_upload from "../../Components/handle_image_upload";
import Loadindicator from "../../Components/loadindicator";
import Preview_image from "../../Components/preview_image";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class University_progression_page_stuff extends Handle_image_upload {
  constructor(props) {
    super(props);

    this.state = {
      steps: new Array(),
      step_index: null,
      step_in_edit: new Object(),
    };
  }

  componentDidMount = async () => {
    let stuff = await get_request("university_progression_stuff");

    this.setState({ stuff, ...stuff });
  };

  add_step = (e) => {
    e.preventDefault();
    let { step_in_edit, step_index, steps } = this.state;

    if (step_index !== null) {
      steps[step_index] = step_in_edit;
      step_index = null;
    } else steps = new Array(...steps, step_in_edit);

    this.setState({ steps, step_index, step_in_edit: new Object() });
  };

  edit_step = (index) => {
    let step_in_edit = this.state.steps[index];
    this.setState({ step_in_edit, step_index: index });
  };

  filter_step_index = (index) => {
    let { steps } = this.state;
    steps.splice(index, 1);
    this.setState({ steps });
  };

  save = async () => {
    let { image, image_hash, title, text, steps } = this.state;
    this.setState({ updating: true });

    let stuff = { image, title, image_hash, text, steps };

    await post_request("update_universities_stuff", stuff);

    this.setState({ updating: false });
  };

  render() {
    let {
      stuff,
      image,
      image_hash,
      updating,
      text,
      steps,
      step_in_edit,
      step_index,
      image_loading,
      title,
    } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="page stuff" />
        <div class="row">
          <div className="justify-content-center">
            {image ? (
              <Preview_image
                style={{ marginBottom: 20 }}
                image_hash={image_hash}
                image={image}
              />
            ) : null}
          </div>

          <form>
            <div class="row">
              <div className="form-group smalls">
                <label>Image (1920 x 1200)</label>
                {image_loading ? (
                  <Loadindicator />
                ) : (
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
                )}
              </div>

              <div className="form-group smalls">
                <label>Banner Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title..."
                  value={title}
                  onChange={({ target }) =>
                    this.setState({
                      title: target.value,
                    })
                  }
                />
              </div>

              <div className="form-group smalls">
                <label>Banner Text</label>
                <textarea
                  onChange={({ target }) =>
                    this.setState({ text: target.value })
                  }
                  value={text}
                  className="form-control"
                ></textarea>
              </div>

              <div className="form-group smalls">
                <label>Steps</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title..."
                  value={step_in_edit.title}
                  onChange={({ target }) =>
                    this.setState({
                      step_in_edit: {
                        ...this.state.step_in_edit,
                        title: target.value,
                      },
                    })
                  }
                />
                <br />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Text..."
                  value={step_in_edit.text}
                  onChange={({ target }) =>
                    this.setState({
                      step_in_edit: {
                        ...this.state.step_in_edit,
                        text: target.value,
                      },
                    })
                  }
                />

                {step_in_edit.title ? (
                  <a
                    onClick={this.add_step}
                    href="#"
                    class="btn theme-bg text-light mt-2"
                  >
                    {step_index === null ? "Add" : "Update"}
                  </a>
                ) : null}
              </div>
              {steps.length ? (
                <ul class="simple-list p-0">
                  {steps.map((step, i) => (
                    <li key={i}>
                      <h5>{step.title}</h5>
                      <p>{step.text}</p>
                      <span
                        className="px-2"
                        onClick={() => this.filter_step_index(i)}
                      >
                        <i className={`fa fa-trash`}></i>
                      </span>
                      <span className="px-2" onClick={() => this.edit_step(i)}>
                        <i className={`fa fa-edit`}></i>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}

              <div class="form-group mt-3">
                {updating ? (
                  <Loadindicator />
                ) : (
                  <div className="form-group smalls">
                    <button
                      onClick={
                        (text || title || image || steps.length) && this.save
                      }
                      type="button"
                      className={`btn full-width ${
                        text || title || image || steps.length
                          ? "theme-bg"
                          : "grey"
                      } text-white`}
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default University_progression_page_stuff;
