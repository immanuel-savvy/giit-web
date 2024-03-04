import React from "react";
import { Carousel } from "react-bootstrap";
import Hero_banner from "./hero_banner";

class E_banner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      heros: new Array(
        {
          main_text: "E-learning",
          sub_text: "The best online courses you'll find",
          bg: require("../Assets/img/elearning1.webp"),
        },
        {
          main_text: "Every day a little closer",
          sub_text:
            "Learning helps you reach your goals. Keep learning and reap the rewards.",
          bg: require("../Assets/img/elearning2.webp"),
          overlay: 7,
        },
        {
          main_text: "Did you make a wish?",
          sub_text:
            "Time to make it come true. Get the courses on your wishlist and take the first step toward your goals",
          bg: require("../Assets/img/elearning3.jpg"),
          overlay: 7,
        }
      ),
    };
  }
  render() {
    let { heros } = this.state;

    return (
      <div
        style={{
          height: "75vh",
          backgroundImage: `url(${require("../Assets/img/hero1.png")})`,
        }}
      >
        <Carousel fade nextLabel="" prevLabel="" indicators={false}>
          {heros.map((hero, index) => (
            <Carousel.Item>
              <Hero_banner hero={hero} key={index} />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  }
}

export default E_banner;
