import React from "react";
import Breadcrumb from "../Sections/breadcrumb";
import Contact_us_today from "../Sections/contact_us_today";
import Footer from "../Sections/footer";
import Header from "../Sections/header";
import { domain } from "../Constants/constants";
import Preview_image from "../Components/preview_image";
import { to_title } from "../Assets/js/utils/functions";
import Listempty from "../Components/list_empty";
import Loadindicator from "../Components/loadindicator";
import { get_request, post_request } from "../Assets/js/utils/services";
import Work_benefit from "../Components/work_benefit";
import Vacancy from "../Components/vacancy";
import Application_form from "../Components/application_form";

class Careers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    document.title = "Careers | Globalstar Innovative Information Technology";

    let { careers_stuff, benefits } = await post_request("careers_stuff", {
      benefits: true,
    });

    this.setState({ careers_stuff, benefits });

    let vacancies = await get_request("vacancies");
    this.setState({ vacancies });
  };

  apply = (vacancy) => {
    this.setState({ vacancy, show_application_form: true });
  };

  vacancy = (vacancy) => {
    let { title, salary, link, fulltime, _id } = vacancy;

    return (
      <tr key={_id}>
        <td>
          <h6>{to_title(title)}</h6>
        </td>
        <td>
          <div className="dhs_tags">{fulltime ? "fulltime" : "part-time"}</div>
        </td>
        <td>
          <div className="dhs_tags">&#8358; {salary}</div>
        </td>
        <td>
          <div className="dhs_tags">
            <a href={link} target="_blank" className="btn theme-bg text-light">
              Apply
            </a>
          </div>
        </td>
      </tr>
    );
  };

  render() {
    let { vacancies, show_application_form, vacancy, benefits, careers_stuff } =
      this.state;
    let {
      image,
      main_heading,
      sub_heading,
      team_image,
      block_quote,
      team_image_hash,
    } = careers_stuff || new Object();

    return (
      <div id="main-wrapper">
        <Header page="Careers" refs="header" />
        <div className="clearfix"></div>
        <Breadcrumb no_gray page_title="Work with us?" page_text="Careers" />

        <section className="imageblock gray">
          <div className="imageblock__content">
            <div
              className="background-image-holder"
              style={{
                backgroundImage: `url(${domain}/Images/${image})`,
              }}
            ></div>
          </div>
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-xl-5 col-lg-6 col-md-6 col-sm-12">
                <div className="lmp_caption">
                  <h2 className="mb-3">
                    {main_heading ||
                      "Let your ideas be heard, let us actuate Africa’s potential together"}
                  </h2>
                  <p>
                    {sub_heading ||
                      "Join a team that will unlock the well being of Africans, in our lifetime."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="justify-content-center align-items-center">
          <div className="container justify-content-center">
            <div
              className="blog-page single_article_wrap"
              style={{ border: "none" }}
            >
              <div className="article_detail_wrapss article_body_wrap">
                <blockquote>
                  <span className="icon">
                    <i className="fas fa-quote-left"></i>
                  </span>
                  <p
                    className="text text-center"
                    style={{ fontSize: 24, color: "#000b47" }}
                  >
                    {block_quote ||
                      "Together we will solve some of the biggest challenges in Information Technology."}
                  </p>
                </blockquote>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {team_image ? (
                <Preview_image
                  image={team_image}
                  width="100%"
                  maxHeight=""
                  image_hash={team_image_hash}
                />
              ) : null}
            </div>
          </div>
        </section>

        <section className="gray" style={{ backgroundColor: "#000b47" }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7 col-md-8">
                <div className="sec-heading center">
                  <h2 style={{ color: "#fff" }}>Benefits of working with us</h2>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              {benefits && benefits.length
                ? benefits.map((benefit) => (
                    <Work_benefit benefit={benefit} key={benefit._id} />
                  ))
                : null}
            </div>
          </div>
        </section>

        <section id="vacancies">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7 col-md-8">
                <div className="sec-heading center">
                  <h2>Available Vacancies</h2>
                </div>
              </div>
            </div>
            <div>
              {show_application_form ? (
                <div>
                  <table className="table dash_list">
                    <Vacancy in_application vacancy={vacancy} />
                  </table>

                  <Application_form vacancy={vacancy} />
                </div>
              ) : null}
              <div className="table-responsive-sm">
                <table className="table dash_list">
                  <thead>
                    <tr>
                      <th scope="col">Flier</th>
                      <th scope="col">Title</th>
                      <th scope="col">Description</th>
                      <th scope="col">Nature</th>
                      <th scope="col">Application</th>
                    </tr>
                  </thead>
                  {vacancies ? (
                    vacancies.length ? (
                      vacancies.map((vacancy) => (
                        <Vacancy
                          vacancy={vacancy}
                          apply={() => this.apply(vacancy)}
                          key={vacancy._id}
                        />
                      ))
                    ) : (
                      <Listempty text="No vacancies yet." />
                    )
                  ) : (
                    <Loadindicator contained />
                  )}
                </table>
              </div>
            </div>
          </div>
        </section>

        <Contact_us_today />
        <Footer />
      </div>
    );
  }
}

export default Careers;
