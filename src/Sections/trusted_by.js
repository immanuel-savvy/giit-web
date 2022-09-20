import React from "react";
import Loadindicator from "../Components/loadindicator";
import Student_reviews from "./student_reviews";

class Trusted_by extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let trustees = 250;
    trustees = {
      trustees: new Array(
        {
          logo: "http://localhost:3000/Assets/img/Simplilearn_Logo.jpg",
        },
        {
          logo: "http://localhost:3000/Assets/img/Simplilearn_Logo.jpg",
        },
        {
          logo: "http://localhost:3000/Assets/img/Simplilearn_Logo.jpg",
        },
        {
          logo: "http://localhost:3000/Assets/img/Simplilearn_Logo.jpg",
        },
        {
          logo: "http://localhost:3000/Assets/img/Simplilearn_Logo.jpg",
        },
        {
          logo: "http://localhost:3000/Assets/img/Simplilearn_Logo.jpg",
        }
      ),
      total_length: trustees,
    };

    this.setState({ trustees });
  };

  render() {
    let { trustees } = this.state;

    return trustees && trustees.total_length ? (
      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <h2>
                  Trusted By{" "}
                  <span className="theme-cl">
                    {trustees.total_length || ""}
                  </span>
                </h2>
                <p>
                  Cupidatat proident Lorem dolor fugiat est sit ullamco veniam
                  laboris.
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {trustees ? (
              trustees?.trustees.map((trustee, index) => (
                <div
                  key={index}
                  className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6"
                >
                  <div className="crs_partn">
                    <div className="p-3">
                      <img src={trustee.logo} className="img-fluid" alt="" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <Loadindicator />
            )}
          </div>
        </div>
      </section>
    ) : null;
  }
}

export default Trusted_by;
