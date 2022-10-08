import React from "react";
import { get_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import Service from "./service";

class Services extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let services = await get_request("services");
    this.setState({ services });
  };

  render() {
    let { bg } = this.props;
    let { services } = this.state;
    if (services && !services.length) return null;

    return (
      <section className={bg === "light" ? "" : "gray"}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <h2>Our Services</h2>
                <p>
                  We offer a vast array of services to serve the need of
                  demanding market
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {services && services.map ? (
              services.map((service, index) => (
                <Service service={service} key={index} />
              ))
            ) : (
              <Loadindicator contained />
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Services;
