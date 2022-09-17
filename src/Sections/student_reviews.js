import React from "react";
import Review from "./review";

class Student_reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    // fetch reviews
    let reviews = new Array({
      student: {
        image: "http://localhost:3000/Assets/img/learning_procedure.jpg",
        name: "lola grey",
        job: { organisation: "UNIZIK", position: "Student" },
      },
      rating: 4.7,
      text: "Deserunt irure et duis qui voluptate duis proident. Amet culpa eiusmod dolor ipsum proident in ullamco mollit.",
    }); // await fetch('')

    this.setState({ reviews });
  };

  render() {
    let { reviews } = this.state;
    return (
      <section className="gray">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <h2>
                  Our Students <span className="theme-cl">Reviews</span>
                </h2>
                <p>Here's is what some of our happy clients has to say</p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-12 col-lg-12 col-sm-12">
              <div className="reviews-slide space">
                {reviews && reviews.length
                  ? new Array(1, 2, 3, 4, 5, 6, 7).map((review, index) => (
                      <Review review={reviews[0]} key={index} />
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Student_reviews;
