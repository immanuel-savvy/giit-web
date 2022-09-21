import React from "react";
import Loadindicator from "../Components/loadindicator";
import Service from "./service";

class Services extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let services = new Array(
      {
        title: "web development",
        icon: "fa-code",
      },
      {
        title: "cloud computing",
        icon: "fa-code",
      },
      {
        title: "mobile app",
        icon: "fa-code",
      },
      {
        title: "software development",
        icon: "fa-code",
      },
      {
        title: "domain & hosting",
        icon: "fa-code",
      },
      {
        title: "social media",
        icon: "fa-code",
      },
      {
        title: "SEO",
        icon: "fa-code",
      },
      {
        title: "CCTV Installation",
        icon: "fa-code",
      },
      {
        title: "car tracking",
        icon: "fa-code",
      }
    );
    this.setState({ services });
  };

  render() {
    let { services } = this.state;

    return (
      <section className="gray">
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
            {services ? (
              services.map((service, index) => (
                <Service service={service} key={index} />
              ))
            ) : (
              <Loadindicator />
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Services;
