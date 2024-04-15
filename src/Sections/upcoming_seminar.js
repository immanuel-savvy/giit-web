import React from "react";
import { post_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import Seminar from "../Components/seminar";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Explore_more_btn from "./explore_more_btn";
import { client_domain, seminar_frontend } from "../Constants/constants";

class Upcoming_seminars extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let upcoming_seminars = await post_request("/seminars", {
      query: { date: { $gt: Date.now() } },
      limit: 10,
    });
    this.setState({ upcoming_seminars });
  };

  render() {
    let { loggeduser } = this.props;
    let { upcoming_seminars } = this.state;
    if (upcoming_seminars && !upcoming_seminars.length) return;

    return (
      <>
        <section>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7 col-md-8">
                <div className="sec-heading center">
                  <h2>
                    upcoming <span className="theme-cl">Seminars</span>
                  </h2>
                  <p>The best lectures' happening now</p>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <>
                {upcoming_seminars ? (
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
                    {upcoming_seminars.map((seminar) => (
                      <SwiperSlide key={seminar._id}>
                        <Seminar
                          loggeduser={loggeduser}
                          class_name="col-11"
                          seminar={seminar}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <div
                    style={{ width: "100%" }}
                    className="justify-content-center"
                  >
                    <Loadindicator />
                  </div>
                )}
              </>
            </div>
            {upcoming_seminars && upcoming_seminars.length ? (
              <Explore_more_btn
                title="seminars"
                action={() =>
                  window.location.assign(`${client_domain}/seminars?upcoming`)
                }
              />
            ) : null}
          </div>
        </section>
      </>
    );
  }
}

export default Upcoming_seminars;
