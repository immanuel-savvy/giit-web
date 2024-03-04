import React from "react";

class Banner_keypoints extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <section class="p-0" style={{ zIndex: 999 }}>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <div class="crp_box ovr_top">
                <div class="row align-items-center m-0">
                  <div class="col-12">
                    <div class="part_rcp">
                      <ul>
                        <li>
                          <div class="dro_140">
                            <div class="dro_141">
                              <i class="fa fa-layer-group"></i>
                            </div>
                            <div class="dro_142">
                              <h6>
                                Best Online
                                <br />
                                Tutoring
                              </h6>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div class="dro_140">
                            <div class="dro_141 st-1">
                              <i class="fa fa-business-time"></i>
                            </div>
                            <div class="dro_142">
                              <h6>
                                Fully Lifetime
                                <br />
                                Access
                              </h6>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div class="dro_140">
                            <div class="dro_141 st-2">
                              <i class="fa fa-user-shield"></i>
                            </div>
                            <div class="dro_142">
                              <h6>
                                800k+ Enrolled
                                <br />
                                Students
                              </h6>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div class="dro_140">
                            <div class="dro_141 st-3">
                              <i class="fa fa-journal-whills"></i>
                            </div>
                            <div class="dro_142">
                              <h6>
                                200+ Courses
                                <br />
                                Available
                              </h6>
                            </div>
                          </div>
                        </li>
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

export default Banner_keypoints;
