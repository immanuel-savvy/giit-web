import React from "react";
import { Nav_context } from "../Contexts";
import { client_domain } from "../Constants/constants";

class Sub_header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Nav_context.Consumer>
        {({ vendors }) => {
          return (
            <div
              id="top_info"
              className="top-bar-area address-two-lines text-light"
              style={{ backgroundColor: "#fff" }}
            >
              {vendors ? (
                <div className="container pt-2">
                  <div className="row">
                    <div className="col-md-12 col-sm-12 address-info">
                      <ul
                        style={{
                          display: "flex",
                          gap: "20px",
                          justifyContent: "space-between",
                          fontWeight: "bold",
                        }}
                      >
                        {vendors?.map((vendor) => (
                          <li key={vendor._id}>
                            <a
                              href="#"
                              onClick={() =>
                                window.location.assign(
                                  `${client_domain}/vendor/${vendor.uri}`
                                )
                              }
                              style={{ color: "#000b47" }}
                            >
                              {vendor.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          );
        }}
      </Nav_context.Consumer>
    );
  }
}

export default Sub_header;
