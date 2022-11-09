import React from "react";
import { Link } from "react-router-dom";
import { to_title } from "../../Assets/js/utils/functions";
import { post_request } from "../../Assets/js/utils/services";
import { emitter } from "../../Giit";

class Add_university extends React.Component {
  constructor(props) {
    super(props);

    let { country } = this.props;
    this.state = {
      universities: country.universities || new Array(),
    };
  }

  submit = async () => {
    let { country } = this.props;
    let { name, url, universities } = this.state;

    let uni = { name, url };
    await post_request(`add_university/${country._id}`, uni);

    universities = new Array(uni, ...universities);
    emitter.emit("new_uni", { country: country._id, uni });

    this.setState({ universities, name: "", url: "" });
  };

  remove_uni = async (uni) => {
    let { country } = this.props;
    let { universities } = this.state;
    universities = universities.filter((uni_) => uni_.name !== uni);
    this.setState({ universities });

    await post_request(`update_country`, {
      name: country.name,
      image: country.image,
      image_hash: country.image_hash,
      universities,
      _id: country._id,
      created: country.created,
    });

    emitter.emit("university_removed", { country: country._id, uni });
  };

  render() {
    let { admin } = this.props;
    let { name, url, universities } = this.state;

    return (
      <div>
        {admin ? (
          <form className="forms_block">
            <div className="form-group smalls">
              <label>Name*</label>
              <input
                type="text"
                className="form-control"
                onChange={({ target }) => this.setState({ name: target.value })}
                value={name}
              />
            </div>

            <div className="form-group smalls">
              <label>Url*</label>
              <input
                type="url"
                className="form-control"
                onChange={({ target }) => this.setState({ url: target.value })}
                value={url}
              />
            </div>

            <div className="form-group smalls">
              <button
                onClick={name && url && this.submit}
                type="button"
                className={`btn full-width ${
                  name && url ? "theme-bg" : "grey"
                } text-white`}
              >
                {"Add"}
              </button>
            </div>

            <hr />
          </form>
        ) : null}

        {universities.map((university, index) => (
          <a href={university.url} target="_blank">
            <div key={index} className="crs_cates cl_1">
              <span>{to_title(university.name)} </span>

              {admin ? (
                <a
                  onClick={() =>
                    window.confirm(`Remove university ${university.name}?`) &&
                    this.remove_uni(university.name)
                  }
                  className="btn btn-action"
                >
                  <i className={`fas fa-window-close`}></i>
                </a>
              ) : null}
            </div>
          </a>
        ))}
      </div>
    );
  }
}

export default Add_university;
