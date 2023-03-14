import React from "react";
import { Link } from "react-router-dom";
import { post_request } from "../Assets/js/utils/services";
import Career_opportunities from "../Components/career_opportunities";
import Loadindicator from "../Components/loadindicator";
import Preview_image from "../Components/preview_image";
import Video from "../Components/video";
import { emitter } from "../Giit";
import Certification_courses from "../Sections/certification_courses";
import Contact_us_today from "../Sections/contact_us_today";
import Featured_course from "../Sections/course";
import Course_banner from "../Sections/course_banner";
import Course_curriculum from "../Sections/course_curriculum";
import Course_details from "../Sections/course_details";
import Course_sidebar from "../Sections/course_sidebar";
import Footer from "../Sections/footer";
import Header from "../Sections/header";
import Student_reviews from "../Sections/student_reviews";
import { scroll_to_top } from "./Adminstrator";

class Course_template extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  fetch_course_children = async (course) => {
    let cummulative_price = 0;

    let courses = await post_request("get_courses", {
      courses: course.courses,
    });
    courses.map((c) => (cummulative_price += c.price));

    this.setState({
      courses,
      cummulative_price,
    });
  };

  componentDidMount = async () => {
    scroll_to_top();

    let course = {
      short_description:
        "Id occaecat ut id cillum do consequat qui esse. Consectetur cupidatat sunt ullamco ullamco. Cillum laboris ipsum aliquip exercitation voluptate deserunt fugiat cupidatat deserunt elit nostrud aute. Id ipsum aliqua amet laboris dolore culpa aliqua sunt tempor commodo. Excepteur ipsum sint amet exercitation laboris ullamco nisi tempor amet anim et commodo ex ad. ",
      sections: [],
      master_courses: [
        "master_courses~0FPk89WQLGXsszW~1665147677458",
        "master_courses~6wXim2mkUjwYxm1Nu8kW0QjcPdK~1665148065847",
      ],
      who_is_this_course_for:
        "Aliqua esse fugiat aliquip enim nisi aute dolor enim excepteur nisi mollit labore officia. Dolor esse pariatur magna qui cupidatat Lorem mollit reprehenderit voluptate est Lorem ut sit. Minim in Lorem excepteur in ipsum et est id aute reprehenderit. Qui ea eiusmod nostrud esse in exercitation dolor esse mollit. Consequat fugiat qui sint eu reprehenderit incididunt esse. Magna minim duis id adipisicing dolor fugiat ad ipsum veniam ullamco eiusmod Lorem ex velit. Duis sit qui ut veniam laborum.",
      title: "Python for Data Science",
      description: `Sunt aliqua ullamco excepteur cupidatat ea fugiat elit adipisicing nisi anim. Et commodo ea mollit sit cillum tempor ut ea. Proident sit cillum cupidatat duis sint ullamco ut reprehenderit eiusmod officia ad.
      Qui enim sit ut et veniam proident labore culpa eiusmod sunt id elit Lorem qui. Est elit adipisicing cupidatat elit nulla aliquip magna proident irure tempor qui. Culpa dolor nisi sit in cillum adipisicing aliquip veniam.
      Voluptate do duis ex tempor do nisi ea amet cupidatat. Nisi amet laboris non reprehenderit ex ipsum voluptate consequat non. Magna commodo voluptate culpa Lorem. Id ex in nisi dolore non ut Lorem ad consectetur. Cupidatat do minim exercitation fugiat ex magna reprehenderit.`,
      price: 120000,
      image: "1665502104143qwpbdj.jpg",
      what_you_will_learn: [
        "Python - Home ",
        "Python - Overview ",
        "Python - Environment Setup ",
        "Python - Basic Syntax ",
        "Python - Variable Types ",
        "Python - Basic Operators",
        "Python - Decision Making",
        "Python - Loops",
        "Python - Numbers",
        "Python - Strings",
        "Python - Lists",
        "Python - Tuples",
        "Python - Dictionary",
        "Python - Date -Amp; Time",
        "Python - Functions",
        "Python - Modules",
        "Python - Files I/O",
        "Python - Exceptions",
      ],
      _id: "courses~tebkEjxO7HVx~1665502104149",
      created: 1665502104149,
      updated: 1668518027121,
      image_hash: "UCAT{3cI00s:9#g5xujE00jY?ZRj_3f5M{kD",
      lectures: 2,
    };
    this.setState({ course });

    course.courses && (await this.fetch_course_children(course));

    this.push_course = (course) => {
      if (course._id === this.state.course._id) return;
      scroll_to_top();

      this.setState(
        { course },
        async () => await this.fetch_course_children(course)
      );
    };

    emitter.listen("push_course", this.push_course);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("push_course", this.push_course);
  };

  cummulate_certifications = (courses) => {
    if (!this.state.cummulative_price) return;

    let certifications = new Array();

    courses.map(
      (course) =>
        course.certifications && certifications.push(...course.certifications)
    );
    return certifications;
  };

  render() {
    let { navs } = this.props;
    let { course, courses, cummulative_price } = this.state;

    let { image, image_hash } = course || new Object();
    let certifications = this.cummulate_certifications(courses);

    return (
      <div id="main-wrapper">
        <Header page="course" navs={navs} />
        <div class="clearfix"></div>

        {!course ? (
          <Loadindicator contained />
        ) : (
          <Course_banner course={course} />
        )}

        {!course ? null : (
          <>
            <div
              className="justify-content-center m-0"
              style={{ margin: 0, padding: 0, paddingRight: 0, paddingLeft: 0 }}
            >
              <Preview_image
                image={require("../Assets/img/banner_course_inner.jpg")}
                image_hash={image_hash}
                class_name="img img-fluid"
                style={{
                  width: "100%",
                  objectFit: "cover",
                  resizeMode: "cover",
                  height: 550,
                  margin: 0,
                  padding: 0,
                }}
              />
            </div>
            <section class="gray pt-3">
              <div
                className="container-fluid m-0"
                style={{ margin: 0, padding: 0 }}
              ></div>

              <div class="container">
                <div class="row justify-content-between">
                  {course.courses ? (
                    <div class="col-lg-8 col-md-12 order-lg-first">
                      <div class="row justify-content-center">
                        {courses ? (
                          courses.map((course_) => (
                            <Featured_course
                              in_courses
                              course={course_}
                              key={course_._id}
                            />
                          ))
                        ) : (
                          <Loadindicator contained />
                        )}
                      </div>

                      {certifications ? (
                        <>
                          <h4 class="edu_title">Certifications</h4>
                          <Certification_courses
                            certifications={this.cummulate_certifications}
                          />
                        </>
                      ) : null}
                    </div>
                  ) : (
                    <Course_details course={course} />
                  )}

                  <div className="col-lg-4 col-md-12 order-lg-first mt-3">
                    <div class="edu_wraper">
                      <h2
                        class=""
                        style={{ fontSize: 22, textTransform: "none" }}
                      >
                        Who is this course for?
                      </h2>

                      <p style={{ fontSize: 18, lineHeight: 2 }}>
                        Reprehenderit enim quis nisi in enim pariatur in duis
                        aliqua anim aliquip excepteur. Reprehenderit amet nulla
                        est Lorem quis aute sit. Do exercitation proident et
                        sint elit culpa eiusmod do et.
                      </p>

                      <ul class="simple-list p-0">
                        <li>Sunt irure consectetur nulla anim.</li>
                        <li>Anim tempor magna cillum et et mollit ex culpa.</li>
                        <li>Sunt irure consectetur nulla anim.</li>
                        <li>Anim tempor magna cillum et et mollit ex culpa.</li>
                        <li>Sunt irure consectetur nulla anim.</li>
                        <li>Anim tempor magna cillum et et mollit ex culpa.</li>
                      </ul>
                    </div>
                    <Course_sidebar
                      course={course}
                      class_name="col-12"
                      cummulative_price={cummulative_price}
                    />
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <div
                  style={{ marginBottom: 30 }}
                  className="row justify-content-center p-5 theme-bg"
                >
                  <div className="col-12 mx-5">
                    <blockquote
                      style={{
                        fontSize: 32,
                        color: "#fff",
                        textAlign: "center",
                      }}
                    >
                      Sunt officia enim ex <b>aliqua ipsum sint</b> ex magna
                      veniam eiusmod est cillum amet. Nulla sint quis quis velit
                      et officia culpa cupidatat cillum aliqua. Id enim sint
                      fugiat amet officia sint consectetur esse.
                    </blockquote>
                  </div>
                </div>
                <section class="imageblock">
                  <div class="imageblock__content left">
                    <div
                      class="background-image-holder"
                      style={{
                        background: `url(${require("./../Assets/img/news.png")}`,
                      }}
                    ></div>
                  </div>
                  <div class="container">
                    <div class="row align-items-center justify-content-end">
                      <div class="col-xl-5 col-lg-6 pl-5 ml-5 col-md-6 col-sm-12">
                        <div class="lmp_caption">
                          <br />
                          <h2 class="mb-3">Course Prerequisite</h2>
                          <p style={{ fontSize: 20 }}>
                            {
                              "Ut ipsum enim deserunt minim Lorem et ipsum. Nostrud tempor anim pariatur cupidatat duis eu labore esse fugiat."
                            }
                          </p>
                          <p style={{ fontSize: 20 }}>
                            Deserunt dolore dolore labore proident ipsum est.
                            Dolore fugiat non deserunt culpa est irure nulla in
                            sunt sint reprehenderit. Aliquip adipisicing
                            adipisicing consectetur qui mollit cupidatat ea
                            proident amet irure nulla quis. Est adipisicing
                            cillum est est. Id ullamco exercitation ut non non.
                            Est sit proident irure magna. Est occaecat aliquip
                            ipsum pariatur et culpa magna.
                          </p>

                          <div class="text-left mt-4">
                            <ul
                              class="simple-list p-0"
                              style={{ fontSize: 18 }}
                            >
                              <li>Sunt irure consectetur nulla anim.</li>
                              <li>
                                Anim tempor magna cillum et et mollit ex culpa.
                              </li>
                              <li>Sunt irure consectetur nulla anim.</li>
                              <li>
                                Anim tempor magna cillum et et mollit ex culpa.
                              </li>
                              <li>Sunt irure consectetur nulla anim.</li>
                              <li>
                                Anim tempor magna cillum et et mollit ex culpa.
                              </li>
                            </ul>
                          </div>

                          <Link
                            to="/enroll"
                            className="mt-5 btn btn-md text-light theme-bg"
                          >
                            Download Brochure
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-8 col-md-8 col-sm-12">
                    <Course_curriculum course={course} in_all />
                  </div>
                </div>
              </div>

              <Video
                thumbnail={require("../Assets/img/thumbnail.jpg")}
                url={require("../Assets/video/tiny_video.mp4")}
                loop
                style={{ maxHeight: 700, width: "100%", objectFit: "cover" }}
              />

              <Career_opportunities />
            </section>
          </>
        )}

        <Student_reviews no_gray />
        <Contact_us_today />
        <Footer />
      </div>
    );
  }
}

export default Course_template;
