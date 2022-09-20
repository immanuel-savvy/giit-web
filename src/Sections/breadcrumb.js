import React from "react";
import { Link } from "react-router-dom";

class Breadcrumb extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { page_text, page_title } = this.props;

    return (
      <section className="page-title gray">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="breadcrumbs-wrap">
                <h1 className="breadcrumb-title">{page_title}</h1>
                <nav className="transparent">
                  <ol className="breadcrumb p-0">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
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
          </div>
        </div>
      </section>
    );
  }
}

export default Breadcrumb;
