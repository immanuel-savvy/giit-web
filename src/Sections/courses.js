import React from "react";
import { shuffle_array } from "../Assets/js/utils/functions";
import { post_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import { emitter } from "../Giit";
import Featured_course from "./course";
import Explore_more_btn from "./explore_more_btn";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

class Courses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let { section, courses } = this.props;

    let arr;
    if (!courses) arr = shuffle_array(section?.courses?.filter((c) => c));
    courses = courses || arr?.slice(0, 6);

    courses = await post_request(`get_courses`, {
      courses,
    });

    courses.length < 6 && courses.push(...courses.slice(0, 6 - courses.length));

    this.setState({ courses });

    this.section_removed = (section_id) =>
      section_id === section._id && this.setState({ removed: true });

    emitter.emit("section_removed", this.section_removed);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("section_removed", this.section_removed);
  };

  render() {
    let { section, gray, title: title_ } = this.props;
    let { title, text, _id } = section;
    let { courses, removed } = this.state;
    if ((courses && !courses.length) || removed) return null;

    return (
      <section className={gray ? `gray` : ""}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <h2>{title_ || title}</h2>
                <p>{text}</p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {courses && courses.length ? (
              <Swiper
                modules={[Autoplay, Pagination]}
                pagination={{ clickable: true }}
                slidesPerView={window.innerWidth < 650 ? 1 : 3}
                autoplay={{
                  delay: 2000,
                  pauseOnMouseEnter: true,
                  disableOnInteraction: false,
                }}
                loop
              >
                {courses.map((course) => (
                  <SwiperSlide key={course._id}>
                    <Featured_course full course={course} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="d-flex align-items-center justify-content-center my-5">
                <Loadindicator />
              </div>
            )}
          </div>
          {title_ ? null : courses && courses.length ? (
            <Explore_more_btn title={title} to={`/courses?section=${_id}`} />
          ) : null}
        </div>
      </section>
    );
  }
}

export default Courses;
