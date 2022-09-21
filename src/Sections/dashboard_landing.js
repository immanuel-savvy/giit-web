import React from "react";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";
import Dashboard_stats from "./dashboard_stats";

class Dashboard_landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div class="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb />

        <Dashboard_stats />
        <div class="row">
          <div class="col-lg-8 col-md-12 col-sm-12">
            <div class="row">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <h5>Featured Cources</h5>
              </div>
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div class="grousp_crs">
                  <div class="grousp_crs_left">
                    <div class="grousp_crs_thumb">
                      <img
                        src="https://via.placeholder.com/300x300"
                        class="img-fluid"
                        alt=""
                      />
                    </div>
                    <div class="grousp_crs_caption">
                      <h4>Adobe Photoshop cc 2021 - Free Assential Training</h4>
                    </div>
                  </div>
                  <div class="grousp_crs_right">
                    <div class="frt_125">
                      <i class="fas fa-fire text-warning mr-1"></i>8.7
                    </div>
                    <div class="frt_but">
                      <a href="#" class="btn text-white theme-bg">
                        View Course
                      </a>
                    </div>
                  </div>
                </div>
                <div class="grousp_crs">
                  <div class="grousp_crs_left">
                    <div class="grousp_crs_thumb">
                      <img
                        src="https://via.placeholder.com/300x300"
                        class="img-fluid"
                        alt=""
                      />
                    </div>
                    <div class="grousp_crs_caption">
                      <h4>Adobe Photoshop cc 2021 - Free Assential Training</h4>
                    </div>
                  </div>
                  <div class="grousp_crs_right">
                    <div class="frt_125">
                      <i class="fas fa-fire text-warning mr-1"></i>8.7
                    </div>
                    <div class="frt_but">
                      <a href="#" class="btn text-white theme-bg">
                        View Course
                      </a>
                    </div>
                  </div>
                </div>
                <div class="grousp_crs">
                  <div class="grousp_crs_left">
                    <div class="grousp_crs_thumb">
                      <img
                        src="https://via.placeholder.com/300x300"
                        class="img-fluid"
                        alt=""
                      />
                    </div>
                    <div class="grousp_crs_caption">
                      <h4>Adobe Photoshop cc 2021 - Free Assential Training</h4>
                    </div>
                  </div>
                  <div class="grousp_crs_right">
                    <div class="frt_125">
                      <i class="fas fa-fire text-warning mr-1"></i>8.7
                    </div>
                    <div class="frt_but">
                      <a href="#" class="btn text-white theme-bg">
                        View Course
                      </a>
                    </div>
                  </div>
                </div>
                <div class="grousp_crs">
                  <div class="grousp_crs_left">
                    <div class="grousp_crs_thumb">
                      <img
                        src="https://via.placeholder.com/300x300"
                        class="img-fluid"
                        alt=""
                      />
                    </div>
                    <div class="grousp_crs_caption">
                      <h4>Adobe Photoshop cc 2021 - Free Assential Training</h4>
                    </div>
                  </div>
                  <div class="grousp_crs_right">
                    <div class="frt_125">
                      <i class="fas fa-fire text-warning mr-1"></i>8.7
                    </div>
                    <div class="frt_but">
                      <a href="#" class="btn text-white theme-bg">
                        View Course
                      </a>
                    </div>
                  </div>
                </div>
                <div class="grousp_crs">
                  <div class="grousp_crs_left">
                    <div class="grousp_crs_thumb">
                      <img
                        src="https://via.placeholder.com/300x300"
                        class="img-fluid"
                        alt=""
                      />
                    </div>
                    <div class="grousp_crs_caption">
                      <h4>Adobe Photoshop cc 2021 - Free Assential Training</h4>
                    </div>
                  </div>
                  <div class="grousp_crs_right">
                    <div class="frt_125">
                      <i class="fas fa-fire text-warning mr-1"></i>8.7
                    </div>
                    <div class="frt_but">
                      <a href="#" class="btn text-white theme-bg">
                        View Course
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-12 col-sm-12">
            <div class="card">
              <div class="card-header">
                <h6>Notifications</h6>
              </div>
              <div class="ground-list ground-hover-list">
                <div class="ground ground-list-single">
                  <div class="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center bg-light-success">
                    <div class="position-absolute text-success h5 mb-0">
                      <i class="fas fa-user"></i>
                    </div>
                  </div>

                  <div class="ground-content">
                    <h6>
                      <a href="#">Maryam Amiri</a>
                    </h6>
                    <small class="text-fade">New User Enrolled in Python</small>
                    <span class="small">Just Now</span>
                  </div>
                </div>

                <div class="ground ground-list-single">
                  <div class="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center bg-light-danger">
                    <div class="position-absolute text-danger h5 mb-0">
                      <i class="fas fa-comments"></i>
                    </div>
                  </div>

                  <div class="ground-content">
                    <h6>
                      <a href="#">Shilpa Rana</a>
                    </h6>
                    <small class="text-fade">Shilpa Send a Message</small>
                    <span class="small">02 Min Ago</span>
                  </div>
                </div>

                <div class="ground ground-list-single">
                  <div class="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center bg-light-info">
                    <div class="position-absolute text-info h5 mb-0">
                      <i class="fas fa-grin-squint-tears"></i>
                    </div>
                  </div>

                  <div class="ground-content">
                    <h6>
                      <a href="#">Amar Muskali</a>
                    </h6>
                    <small class="text-fade">
                      Need Responsive Business Tem...
                    </small>
                    <span class="small">10 Min Ago</span>
                  </div>
                </div>

                <div class="ground ground-list-single">
                  <div class="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center bg-light-purple">
                    <div class="position-absolute text-purple h5 mb-0">
                      <i class="fas fa-briefcase"></i>
                    </div>
                  </div>

                  <div class="ground-content">
                    <h6>
                      <a href="#">Maryam Amiri</a>
                    </h6>
                    <small class="text-fade">Next Meeting on Tuesday..</small>
                    <span class="small">15 Min Ago</span>
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

export default Dashboard_landing;
