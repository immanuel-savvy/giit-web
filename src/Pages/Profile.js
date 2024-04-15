import React from "react";
import Footer from "../Sections/footer";
import Profile_header from "../Components/profile_header";
import { Logged_user } from "../Contexts";
import Header from "../Sections/header";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Logged_user.Consumer>
        {({ loggeduser }) => {
          return (
            <div>
              <Header />
              <div className="clearfix"></div>

              <Profile_header loggeduser={loggeduser} />

              <Footer />
            </div>
          );
        }}
      </Logged_user.Consumer>
    );
  }
}

export default Profile;
