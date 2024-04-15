import React from "react";
import Loadindicator from "../Components/loadindicator";
import Padder from "../Components/padder";
import Seminar_header from "../Components/seminar_header";
import Seminar_overview from "../Components/seminar_overview";
import Seminar_sidebar from "../Components/seminar_sidebar";
import { Logged_user } from "../Contexts";
import Footer, { get_session } from "../Sections/footer";
import Custom_nav from "../Sections/nav";
import { get_request } from "../Assets/js/utils/services";
import Header from "../Sections/header";

class Seminar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let seminar = get_session("seminar");

    if (!seminar) {
      let seminar_id = window.location.search.slice(1);
      if (!seminar_id) return window.history.go(-1);

      seminar = await get_request(`seminar/${seminar_id}`);
      if (!seminar) return window.history.go(-1);
    }

    this.setState({ seminar });
  };

  render() {
    let { seminar } = this.state;
    if (!seminar) return <Loadindicator />;

    return (
      <Logged_user.Consumer>
        {({ loggeduser }) => {
          return (
            <div>
              <Header page="seminar" />
              <Padder />

              <Seminar_header seminar={seminar} />

              <section class="gray pt-5">
                <div class="container">
                  <div class="row">
                    <Seminar_overview seminar={seminar} />

                    <Seminar_sidebar
                      seminar={seminar}
                      loggeduser={loggeduser}
                    />
                  </div>
                </div>
              </section>

              <Footer />
            </div>
          );
        }}
      </Logged_user.Consumer>
    );
  }
}

export default Seminar;
