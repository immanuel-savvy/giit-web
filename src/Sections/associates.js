import React from "react";
import { domain } from "../Constants/constants";

class Ratings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ratings: new Array(
        { image: "aws_giit_africa.png" },
        { image: "cisco_with_giit_africa.png" },
        { image: "google_with_giit_africa.png" },
        { image: "microsoft_with_giit_africa.png" }
      ),
    };
  }

  render() {
    let { ratings } = this.state;

    return (
      <section className="p-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="crp_box sm ovr_top">
                <div className="row align-items-center m-0">
                  <div className="col-xl-2 col-lg-3 col-md-4 col-sm-12">
                    <div className="crt_169">
                      <img
                        src={`${domain}/Images/ncc_with_giit_africa.png`}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-xl-10 col-lg-9 col-md-8 col-sm-12">
                    <div className="part_rcp">
                      <ul>
                        {ratings.map((rating, index) => (
                          <li key={index}>
                            <div className="crp_img">
                              <img
                                src={`${domain}/Images/${rating.image}`}
                                className="img-fluid"
                                alt=""
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Ratings;
