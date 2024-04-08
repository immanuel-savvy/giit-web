import React from "react";
import { Link } from "react-router-dom";
import Preview_image from "../Components/preview_image";

class Breadcrumb extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { page_text, page_title, no_gray, image, image_hash } = this.props;

    return (
      <section
        style={{
          ...(page_title === "courses"
            ? new Object({ paddingTop: 30, paddingBottom: 20 })
            : null),
          backgroundImage: `url(${require("../Assets/css/img/breadcrumb_bg.jpg")})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: "#ff9800",
        }}
        data-overlay="8"
        className={`page-title ${no_gray ? "" : "gray"}`}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-8">
              <div className="breadcrumbs-wrap">
                <h1 className="breadcrumb-title text-light">{page_title}</h1>
                <nav className="transparent">
                  <ol className="breadcrumb p-0">
                    <li className="breadcrumb-item">
                      <Link
                        to="/"
                        style={{
                          color: "#eee",
                        }}
                      >
                        Home
                      </Link>
                    </li>
                    <li
                      className="breadcrumb-item active theme-cl"
                      aria-current="page"
                    >
                      {page_text}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              {image ? (
                <Preview_image image={image} image_hash={image_hash} />
              ) : null}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Breadcrumb;
