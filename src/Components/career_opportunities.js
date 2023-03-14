import React from "react";
import { to_title } from "../Assets/js/utils/functions";

class Career_opportunities extends React.Component {
  constructor(props) {
    super(props);

    this.state = { active_tab: this.tabs[0], current_tab: this.tabs[0] };
  }

  tabs = new Array(
    "data analyst",
    "data scientist",
    "data engineer",
    "data storyteller"
  );

  render_tab_pill = () => {
    let { current_tab } = this.state;

    return this.tabs.map((tab) => (
      <li
        class="nav-item"
        key={tab}
        onClick={() => this.setState({ active_tab: tab })}
      >
        <a
          class={`nav-link ${current_tab === tab ? "active" : ""}`}
          id={`${tab}-tab`}
          data-toggle="pill"
          href={`#${tab}`}
          role="tab"
          aria-controls={tab}
          aria-selected="true"
        >
          {to_title(tab)}
        </a>
      </li>
    ));
  };

  render() {
    let { active_tab } = this.state;

    return (
      <div className="row justify-content-center mt-5">
        <div className="col-md-8 col-lg-8 col-sm-12 rounded p-2 bg-white">
          <h2 style={{ textAlign: "center", margin: "10px auto 50px" }}>
            Career opportunities for our Data Science Graduates
          </h2>

          <div class="tab_box_info mt-4">
            <ul class="nav nav-pills mb-3 light" id="pills-tab" role="tablist">
              {this.render_tab_pill()}
            </ul>
            <div class="tab-content" id="pills-tabContent">
              {this.tabs.map((tab) => (
                <div
                  class={`tab-pane fade ${
                    active_tab === tab ? " show active" : ""
                  }`}
                  id="overview"
                  role="tabpanel"
                  aria-labelledby="overview-tab"
                >
                  <section class="imageblock">
                    <div class="imageblock__content left">
                      <div
                        class="background-image-holder"
                        style={{
                          background: `url(${require("./../Assets/img/banner_course_inner.jpg")}`,
                        }}
                      ></div>
                    </div>
                    <div class="container">
                      <div class="row align-items-center justify-content-end">
                        <div class="col-xl-5 col-lg-6 pl-5 ml-5 col-md-6 col-sm-12">
                          <div class="lmp_caption">
                            <br />
                            <h2 class="mb-3">{to_title(tab)}</h2>
                            <p style={{ fontSize: 20 }}>
                              Deserunt dolore dolore labore proident ipsum est.
                              Dolore fugiat non deserunt culpa est irure nulla
                              in sunt sint reprehenderit. Aliquip adipisicing
                              adipisicing consectetur qui mollit cupidatat ea
                              proident amet irure nulla quis. Est adipisicing
                              cillum est est. Id ullamco exercitation ut non
                              non. Est sit proident irure magna. Est occaecat
                              aliquip ipsum pariatur et culpa magna.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Career_opportunities;
