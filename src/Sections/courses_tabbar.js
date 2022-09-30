import React from "react";
import { Link } from "react-router-dom";

class Courses_tabbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { list_view, toggle_list_view } = this.props;

    return (
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="short_wraping">
            <div className="row m-0 align-items-center justify-content-between">
              <div className="col-lg-4 col-md-5 col-sm-12  col-sm-6">
                <div className="shorting_pagination_laft">
                  <h6 className="m-0">Showing 1-25 of 72</h6>
                </div>
              </div>

              <div className="col-lg-8 col-md-7 col-sm-12 col-sm-6">
                <div className="dlks_152">
                  <div className="lmk_485">
                    <ul className="shorting_grid">
                      <li className="list-inline-item">
                        <Link
                          onClick={toggle_list_view}
                          className={!list_view ? "active" : ""}
                        >
                          <span className="ti-layout-grid2"></span>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link
                          onClick={toggle_list_view}
                          className={list_view ? "active" : ""}
                        >
                          <span className="ti-view-list"></span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Courses_tabbar;
