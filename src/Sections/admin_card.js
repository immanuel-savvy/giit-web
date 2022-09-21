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
          src="https://via.placeholder.com/500x500"
          class="img-fluid avater"
          alt=""
        />
        <h4>Adam Harshvardhan</h4>
        <span>Senior Designer</span>
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
                <i class="ti-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="ti-linkedin"></i>
              </a>
            </li>
          </ul>
        </div>
        <div class="elso_syu77">
          <div class="one_third">
            <div class="one_45ic text-warning bg-light-warning">
              <i class="fas fa-star"></i>
            </div>
            <span>Ratings</span>
          </div>
          <div class="one_third">
            <div class="one_45ic text-success bg-light-success">
              <i class="fas fa-file-invoice"></i>
            </div>
            <span>Courses</span>
          </div>
          <div class="one_third">
            <div class="one_45ic text-purple bg-light-purple">
              <i class="fas fa-user"></i>
            </div>
            <span>Enrolled User</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin_card;
