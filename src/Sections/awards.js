import React from "react";

class Awards extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      awards: new Array({ img: 0 }, { img: 0 }, { img: 0 }, { img: 0 }),
    };
  }

  render() {
    let { awards } = this.state;

    return (
      <section className="p-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="crp_box ovr_top">
                <div className="row align-items-center m-0">
                  <div className="col-xl-2 col-lg-3 col-md-4 col-sm-12">
                    <div className="crp_tags">
                      <h6>Over 700+ Cources in one place</h6>
                    </div>
                  </div>
                  <div className="col-xl-10 col-lg-9 col-md-8 col-sm-12">
                    <div className="part_rcp">
                      <ul>
                        {awards && awards.length
                          ? awards.map((award, index) => {
                              return (
                                <li key={index}>
                                  <div className="crp_img">
                                    <img
                                      src={
                                        award.image ||
                                        "https://via.placeholder.com/400x110"
                                      }
                                      className="img-fluid"
                                      alt=""
                                    />
                                  </div>
                                </li>
                              );
                            })
                          : null}
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

export default Awards;
