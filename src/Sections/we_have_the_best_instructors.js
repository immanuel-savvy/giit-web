import React from "react";

class We_have_the_best_instructors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      perks: new Array(
        "Full lifetime access",
        "Downloadable resources",
        "Certificate of completion",
        "Free Trial 7 Days"
      ),
    };
  }

  render() {
    let { perks } = this.state;

    return (
      <section>
        <div className="container">
          <div className="row align-items-center justify-content-between mb-5">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
              <div className="lmp_caption">
                <h2 className="mb-3">
                  We Have The Best Instructors Available in The City
                </h2>
                <p>
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque corrupti quos
                  dolores et quas molestias excepturi sint occaecati cupiditate
                  non provident, similique
                </p>
                {perks.map((perk, index) => (
                  <div key={index} className="mb-3 mr-4 ml-lg-0 mr-lg-4">
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle bg-light-success theme-cl p-2 small d-flex align-items-center justify-content-center">
                        <i className="fas fa-check"></i>
                      </div>
                      <h6 className="mb-0 ml-3">{perk}</h6>
                    </div>
                  </div>
                ))}
                <div className="text-left mt-4">
                  <a href="#" className="btn btn-md text-light theme-bg">
                    Enrolled Today
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default We_have_the_best_instructors;
