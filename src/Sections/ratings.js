import React from "react";

class Ratings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ratings: new Array(
        { image: 0 },
        { image: 0 },
        { image: 0 },
        { image: 0 }
      ),
    };
  }

  componentDidMount = async () => {};

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
                      <div className="crt_overt">
                        <h4>4.7</h4>
                      </div>
                      <div className="crt_stion">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <div className="crt_io90">
                        <h6>3,272 Rating</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-10 col-lg-9 col-md-8 col-sm-12">
                    <div className="part_rcp">
                      <ul>
                        {ratings.map((rating, index) => (
                          <li key={index}>
                            <div className="crp_img">
                              <img
                                src={
                                  rating.image ||
                                  "https://via.placeholder.com/400x110"
                                }
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
