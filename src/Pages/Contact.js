import React from "react";
import Breadcrumb from "../Sections/breadcrumb";
import Footer from "../Sections/footer";
import Header from "../Sections/header";

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { navs } = this.props;

    return (
      <div id="main-wrapper">
        <Header navs={navs} page="contact" />
        <div className="clearfix"></div>
        <Breadcrumb page_text="Contact Us" page_title="Get In Touch" />
        <section>
          <div className="container">
            <div className="row align-items-start">
              <div className="col-xl-7 col-lg-6 col-md-12 col-sm-12">
                <div className="form-group">
                  <h4>We'd love to here from you</h4>
                  <span>
                    Send a message and we'll responed as soos as possible{" "}
                  </span>
                </div>
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label>Company</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label>Phone</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <button
                        className="btn theme-bg text-white btn-md"
                        type="button"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
                <div className="lmp_caption pl-lg-5">
                  <ol className="list-unstyled p-0">
                    <li className="d-flex align-items-start my-3 my-md-4">
                      <div className="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg-light">
                        <div className="position-absolute theme-cl h5 mb-0">
                          <i className="fas fa-home"></i>
                        </div>
                      </div>
                      <div className="ml-3 ml-md-4">
                        <h4>Reach Us</h4>
                        <h6>Ikeja - Head Office</h6>
                        <p>
                          3, Obafemi Awolowo way,
                          <br />
                          Ikeja, Lagos State, Nigeria,
                          <br />
                        </p>
                        <h6>Lekki</h6>
                        <p>
                          Road 3, Suit H72/47, Ikota Shopping Complex,
                          <br />
                          VGC, Lekki
                        </p>
                        <h6>Ikorodu</h6>
                        <p>
                          54, Oba Sekumade Road, <br />
                          Ogolonto Road, Ikorodu, Lagos.
                        </p>
                        <h6>United Kingdom</h6>
                        <p>
                          International House, 221 Bow Road, Bow London E3 2SJ,
                          United Kingdom.
                        </p>
                      </div>
                    </li>
                    <li className="d-flex align-items-start my-3 my-md-4">
                      <div className="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg-light">
                        <div className="position-absolute theme-cl h5 mb-0">
                          <i className="fas fa-at"></i>
                        </div>
                      </div>
                      <div className="ml-3 ml-md-4">
                        <h4>Drop A Mail</h4>
                        <p>
                          giitnigeria@gmail.com
                          <br />
                          akpan@giitgroup.com
                        </p>
                      </div>
                    </li>
                    <li className="d-flex align-items-start my-3 my-md-4">
                      <div className="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg-light">
                        <div className="position-absolute theme-cl h5 mb-0">
                          <i className="fas fa-phone-alt"></i>
                        </div>
                      </div>
                      <div className="ml-3 ml-md-4">
                        <h4>Make a Call</h4>
                        <p>
                          +(234) 806 051 5686
                          <br />
                          +(234) 812 925 2489
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Contact;
