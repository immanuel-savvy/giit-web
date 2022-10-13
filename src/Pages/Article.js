import React from "react";
import { post_request } from "../Assets/js/utils/services";
import { domain } from "../Constants/constants";
import { emitter } from "../Giit";
import Article_comments from "../Sections/article_comments";
import Article_sidebar from "../Sections/article_sidebar";
import Breadcrumb from "../Sections/breadcrumb";
import Contact_us_today from "../Sections/contact_us_today";
import Footer from "../Sections/footer";
import Header from "../Sections/header";

class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let article = window.sessionStorage.getItem("article");
    if (article) {
      this.setState({ article: JSON.parse(article) });
      await post_request(`article_viewed/${article._id}`);
    }

    this.push_article = async (article) => {
      if (article._id === this.state.article._id) return;
      this.setState({ article });
      await post_request(`article_viewed/${article._id}`);
    };

    this.new_comment = (comment) => {
      if (comment.article !== this.state.article._id) return;
      let { article: article_ } = this.state;
      article_.comments++;
      this.setState({ article: article_ });
    };

    this.new_reply = (reply) => {
      if (reply.article !== this.state.article._id) return;
      let { article: article_ } = this.state;
      article_.comments++;
      this.setState({ article: article_ });
    };

    emitter.listen("new_comment", this.new_comment);
    emitter.listen("new_reply", this.new_reply);
    emitter.listen("push_article", this.push_article);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("push_article", this.push_article);
    emitter.remove_listener("new_reply", this.new_reply);
    emitter.remove_listener("new_comment", this.new_comment);
  };

  render() {
    let { navs } = this.props;
    let { article } = this.state;
    if (!article) return null;

    let { title, image, comments, sections } = article;

    return (
      <div className="blog-page">
        <div id="main-wrapper">
          <Header page="course" navs={navs} />
          <div class="clearfix"></div>
          <Breadcrumb page_text="Article" page_title={title} no_gray />

          <section class="gray">
            <div class="container">
              <div class="row">
                <div class="col-lg-8 col-md-12 col-sm-12 col-12">
                  <div class="article_detail_wrapss single_article_wrap format-standard">
                    <div class="article_body_wrap">
                      <div class="article_featured_image">
                        <img
                          class="img-fluid"
                          src={`${domain}/Images/${image}`}
                          alt=""
                        />
                      </div>
                      <div class="article_top_info">
                        <ul class="article_middle_info">
                          <li>
                            <a href="#article_comments">
                              <span class="icons">
                                <i class="ti-comment-alt"></i>
                              </span>
                              {`${comments || 0} Comments`}
                            </a>
                          </li>
                        </ul>
                      </div>
                      <h2 class="post-title">{`${title}.`}</h2>
                      {sections.map((section, index) =>
                        section.type === "paragraph" ? (
                          <p key={index}>{section.text}</p>
                        ) : (
                          <blockquote key={index}>
                            <span class="icon">
                              <i class="fas fa-quote-left"></i>
                            </span>
                            <p class="text">{section.text}</p>

                            <h5 class="name">{`- ${section.speaker || ""}`}</h5>
                          </blockquote>
                        )
                      )}
                    </div>
                    <Article_comments article={article} />
                  </div>
                </div>
                <Article_sidebar article={article} />
              </div>
            </div>
          </section>

          <Contact_us_today />
          <Footer />
        </div>
      </div>
    );
  }
}

export default Article;
