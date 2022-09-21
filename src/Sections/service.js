import React from "react";
import { Link } from "react-router-dom";
import { to_title } from "../Assets/js/utils/functions";

class Service extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { service } = this.props;
    let { title, icon } = service;

    return (
      <div
        className="col-xl-2 col-lg-3 col-md-3 col-sm-2 m-3 rounded"
        style={{ borderRadius: "40px" }}
        ref={(el) => {
          if (el) {
            el.style.setProperty("border-radius", "25% 10%", "important");
          }
        }}
      >
        <div
          className="d-flex align-items-center justify-content-center p-3"
          style={{
            height: 150,
            borderRadius: "40px",
            backgroundImage: "url(./../Assets/img/bannerbg.png)",
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
          <Link
            to={`/contact_us?service=${title}`}
            className="text-center text-light h4"
            style={{ textDecorationLine: "none", textAlign: "center" }}
          >
            {to_title(title)}
          </Link>
        </div>
      </div>
    );
  }
}

export default Service;
