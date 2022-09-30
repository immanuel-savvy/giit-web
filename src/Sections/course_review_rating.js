import React from "react";

class Course_review_rating extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {};

  calc_total_stars = (course) => {
    let { five_star, four_star, three_star, two_star, one_star } = course;

    let total_stars =
      five_star + four_star + three_star + two_star + one_star || 0;
    return {
      total_stars,
      stars_aggregate: (total_stars / 5).toFixed(1) || 0.0,
    };
  };

  star_percentage = (stars, total_stars) => {
    return Math.ceil((stars / total_stars) * 100) || 0;
  };

  render() {
    let { course } = this.props;
    let { five_star, four_star, three_star, one_star } = course;

    let { stars_aggregate, total_stars } = this.calc_total_stars(course);
    return (
      <div className="rating-overview">
        <div className="rating-overview-box">
          <span className="rating-overview-box-total">{stars_aggregate}</span>
          <span className="rating-overview-box-percent">out of 5.0</span>
          <div className="star-rating" data-rating="5">
            {new Array({ length: Math.floor(stars_aggregate) }).map((i) => (
              <i key={i} className="ti-star"></i>
            ))}
          </div>
        </div>

        <div className="rating-bars">
          <div className="rating-bars-item">
            <span className="rating-bars-name">5 Star</span>
            <span className="rating-bars-inner">
              <span className="rating-bars-rating high" data-rating="4.7">
                <span
                  className="rating-bars-rating-inner"
                  style={{
                    width: `${this.star_percentage(five_star, total_stars)}%`,
                  }}
                ></span>
              </span>
              <strong>{`${this.star_percentage(
                five_star,
                total_stars
              )}%`}</strong>
            </span>
          </div>
          <div className="rating-bars-item">
            <span className="rating-bars-name">4 Star</span>
            <span className="rating-bars-inner">
              <span className="rating-bars-rating good" data-rating="3.9">
                <span
                  className="rating-bars-rating-inner"
                  style={{
                    width: `${this.star_percentage(four_star, total_stars)}%`,
                  }}
                ></span>
              </span>
              <strong>{`${this.star_percentage(
                four_star,
                total_stars
              )}%`}</strong>
            </span>
          </div>
          <div className="rating-bars-item">
            <span className="rating-bars-name">3 Star</span>
            <span className="rating-bars-inner">
              <span className="rating-bars-rating mid" data-rating="3.2">
                <span
                  className="rating-bars-rating-inner"
                  style={{
                    width: `${this.star_percentage(three_star, total_stars)}%`,
                  }}
                ></span>
              </span>
              <strong>{`${this.star_percentage(
                three_star,
                total_stars
              )}%`}</strong>
            </span>
          </div>
          <div className="rating-bars-item">
            <span className="rating-bars-name">1 Star</span>
            <span className="rating-bars-inner">
              <span className="rating-bars-rating poor" data-rating="2.0">
                <span
                  className="rating-bars-rating-inner"
                  style={{
                    width: `${this.star_percentage(one_star, total_stars)}%`,
                  }}
                ></span>
              </span>
              <strong>{`${this.star_percentage(
                one_star,
                total_stars
              )}%`}</strong>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Course_review_rating;
