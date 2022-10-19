import React from "react";
import { post_request } from "../Assets/js/utils/services";
import Listempty from "../Components/list_empty";
import Loadindicator from "../Components/loadindicator";
import Article from "../Sections/article";
import Breadcrumb from "../Sections/breadcrumb";
import Contact_us_today from "../Sections/contact_us_today";
import Footer from "../Sections/footer";
import Header from "../Sections/header";

class Blog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page_size: 12,
      page: 0,
    };
  }

  fetch_articles = async (page = this.state.page) => {
    let { page_size } = this.state;

    let { articles, total_articles } = await post_request("articles", {
      skip: page_size * page,
      limit: page_size,
      total_articles: true,
    });

    this.setState({ articles, total_articles });
  };

  componentDidMount = async () => {
    await this.fetch_articles();
  };

  render() {
    let { articles } = this.state;

    return (
      <div id="main-wrapper">
        <Header page="blog" />
        <Breadcrumb page_title="Latest News" page_text="Blog" />
        <section class="min">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-7 col-md-8">
                <div class="sec-heading center">
                  <h2>
                    Latest News & <span class="theme-cl">Articles</span>
                  </h2>
                  <p>
                    Get lastest updates on whats happening in the world of tech.
                  </p>
                </div>
              </div>
            </div>

            <div class="row justify-content-center">
              {articles ? (
                articles.length ? (
                  articles.map((article) => (
                    <Article article={article} key={article._id} />
                  ))
                ) : (
                  <Listempty />
                )
              ) : (
                <Loadindicator contained />
              )}
            </div>
          </div>
        </section>

        <Contact_us_today />
        <Footer />
      </div>
    );
  }
}

export default Blog;
