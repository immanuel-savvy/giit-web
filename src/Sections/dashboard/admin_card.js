import React from "react";

class Admin_card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div class="d-user-avater">
        <img
          src="../../Assets/img/logo_single.png"
          class="img-fluid avater"
          alt=""
        />
        <h4>GIIT</h4>
        <span>Default Admin</span>
        <div class="elso_syu89">
          <ul>
            <li>
              <a href="#">
                <i class="ti-facebook"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="ti-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="ti-linkedin"></i>
              </a>
            </li>
          </ul>
        </div>
        {/* <div class="elso_syu77">
          <div class="one_third">
            <div class="one_45ic text-success bg-light-success">
              <i class="fas fa-file-invoice"></i>
            </div>
            <span>Courses</span>
          </div>
        </div> */}
      </div>
    );
  }
}

export default Admin_card;
