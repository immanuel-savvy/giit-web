import React from "react";
import { Link } from "react-router-dom";
import { to_title } from "../Assets/js/utils/functions";
import { domain } from "../Constants/constants";

class Service extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { service, remove } = this.props;
    let { title, image, _id } = service;

    return (
      <div
        className={`${
          remove
            ? "col-xl-2 col-lg-4 col-md-4 col-sm-3"
            : "col-xl-2 col-lg-3 col-md-3 col-sm-2"
        } m-3 rounded`}
        style={{
          borderRadius: "40px",
          flexDirection: remove ? "row" : null,
          display: remove ? "flex" : null,
        }}
        ref={(el) => {
          if (el) {
            el.style.setProperty("border-radius", "25% 10%", "important");
          }
        }}
      >
        <Link
          to={`/contact_us?service=${_id}`}
          className="text-center text-light h4"
          style={{ textDecorationLine: "none", textAlign: "center" }}
        >
          <div
            className="d-flex align-items-center justify-content-center p-3"
            style={{
              height: "150px",
              borderRadius: "40px",
              backgroundImage: `url(${domain}/Images/${image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              boxShadow: "1px 1px 15px #333",
            }}
            data-overlay="9"
            ref={(el) => {
              if (el) {
                el.style.setProperty("border-radius", "25% 10%", "important");
              }
            }}
          >
            <span>{to_title(title)}</span>
          </div>
        </Link>
        {remove ? (
          <a
            onClick={() => window.confirm("Remove service?") && remove()}
            className="btn btn-action"
          >
            <i className={`fas fa-window-close`}></i>
          </a>
        ) : null}
      </div>
    );
  }
}

export default Service;
