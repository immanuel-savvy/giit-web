import React from "react";
import { domain } from "../Constants/constants";

const Work_benefit = ({ benefit, remove }) => {
  let { _id, image, title, text } = benefit;

  return (
    <div key={_id} className="col-xl-3 col-lg-4 col-md-4 col-sm-6">
      <div
        className="crs_cate_wrap style_2"
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#fff";
        }}
      >
        <span
          className="crs_cate_box"
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#fff";
          }}
        >
          <span className="center">
            <div className="crs_cate_icon">
              <img src={`${domain}/Images/${image}`} className="img-fluid" />
              {remove || true ? (
                <a
                  onClick={() => window.confirm("Remove benefit?") && remove()}
                  className="btn btn-action"
                >
                  <i className={`fas fa-window-close`}></i>
                </a>
              ) : null}
            </div>
            <div className="crs_cate_caption">
              <span>{title}</span>
            </div>
            <div className="crs_cate_count center">
              <span style={{ color: "#6e7c90" }}>{text}</span>
            </div>
          </span>
        </span>
      </div>
    </div>
  );
};

export default Work_benefit;
