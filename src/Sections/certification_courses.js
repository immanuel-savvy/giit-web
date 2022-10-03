import React from "react";
import { get_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import Certification_course from "./certification_course";

class Certification_courses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let certifications = await get_request("certifications");

    this.setState({ certifications });
  };

  render() {
    let { title, gray, subtitle } = this.props;
    let { certifications } = this.state;

    if (certifications && !certifications.length) return null;

    return (
      <section
        className={gray ? `gray` : ""}
        style={{
          background: "linear-gradient(#33bef0, #0a85d9)",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <h2 className="text-light">Certification Courses</h2>
                {subtitle ? <p>{subtitle}</p> : null}
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-12 col-lg-12 col-sm-12">
              {certifications ? (
                <div className="certification-slide space">
                  {certifications.map((certification) => (
                    <Certification_course
                      key={certification._id}
                      certification={certification}
                    />
                  ))}
                </div>
              ) : (
                <Loadindicator contained />
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Certification_courses;
