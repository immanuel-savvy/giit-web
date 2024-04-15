import React from "react";
import Conferences_header from "../Components/conferences_header";
import Conferences_sidebar from "../Components/conferences_sidebar";
import Loadindicator from "../Components/loadindicator";
import Padder from "../Components/padder";
import Seminar from "../Components/seminar";
import Footer from "../Sections/footer";
import Listempty from "../Components/list_empty";
import { post_request } from "../Assets/js/utils/services";
import Breadcrumb from "../Sections/breadcrumb";
import Header from "../Sections/header";

class Seminars extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 15,
      page: 1,
    };
  }

  componentDidMount = async () => {
    let { limit, page } = this.state;
    let href = window.location.href;
    href = href.split("?").slice(-1)[0];

    let { seminars, total } = await post_request(`seminars`, {
      query: {
        date: { [href && href === "past" ? "$lte" : "$gt"]: Date.now() },
      },
      show_total: true,
      limit,
      skip: (page - 1) * limit,
    });

    this.setState({ seminars, total });
  };

  render() {
    let { seminars, total, page, limit } = this.state;

    return (
      <div>
        <Header page="seminars" />

        <Breadcrumb page_title="seminars" />

        <section className="gray">
          <div className="container">
            <div className="row">
              <Conferences_sidebar />

              <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                <Conferences_header
                  length={seminars && seminars.length}
                  total={total}
                  page={page}
                  limit={limit}
                />

                <div class="row justify-content-center">
                  {seminars ? (
                    seminars.length ? (
                      seminars.map((seminar, index) => (
                        <Seminar seminar={seminar} in_seminars key={index} />
                      ))
                    ) : (
                      <Listempty />
                    )
                  ) : (
                    <Loadindicator />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Seminars;
