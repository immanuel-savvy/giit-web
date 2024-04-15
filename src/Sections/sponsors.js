import React from "react";
import Loadindicator from "../Components/loadindicator";
import Section_header from "../Components/section_headers";
import Sponsor from "../Components/sponsor";
import { get_request } from "../Assets/js/utils/services";

class Sponsors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { event } = this.props;

    let sponsors;
    if (!event) {
      sponsors = await get_request("sponsors");
    } else {
      sponsors = await get_request(`event_sponsors/${event._id}`);
    }

    if (!Array.isArray(sponsors)) sponsors = new Array();

    this.setState({ sponsors });
  };

  render() {
    let { sponsors } = this.state;

    if (sponsors && !sponsors.length) return;

    return (
      <section className="ed_view_box">
        <div className="container">
          <Section_header
            title="sponsors"
            description="We are incredibly grateful for the support and contribution of our valued sponsors."
          />

          <div className="row align-items-center justify-content-center">
            {sponsors ? (
              sponsors.map((sponsor) => (
                <Sponsor sponsor={sponsor} key={sponsor._id} />
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

export default Sponsors;
