import React from "react";
import { get_request, post_request } from "../Assets/js/utils/services";
import Loadindicator from "../Components/loadindicator";
import { emitter } from "../Giit";
import Article_comments from "../Sections/article_comments";
import Article_sidebar from "../Sections/article_sidebar";
import Breadcrumb from "../Sections/breadcrumb";
import Contact_us_today from "../Sections/contact_us_today";
import Footer from "../Sections/footer";
import Header from "../Sections/header";
import { scroll_to_top } from "./Adminstrator";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Preview_image from "../Components/preview_image";
import Latest_news_and_articles from "../Sections/latest_news_and_articles";
import { organisation_name } from "../Constants/constants";

const Img_tag = ({ src }) => {
  return (
    <img
      src={src}
      className="img-fluid rounded"
      style={{
        width: "100%",
      }}
    />
  );
};

class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let article = window.sessionStorage.getItem("article");
    if (article) {
      article = JSON.parse(article);
      document.title = `${article.title} | ${organisation_name}`;

      this.setState({ article });

      scroll_to_top();
    } else {
      let article_filter = new Object();
      let query = window.location.search;
      let params = query.slice(1).split("&");
      params.map((param) => {
        param = param.split("=");
        article_filter[param[0]] = param[1];
      });
      if (article_filter._id) this.setState({ fetching_article: true });
      article = await get_request(`article/${article_filter._id}`);

      if (!article) return window.location.assign("/");

      document.title = `${article.title} | ${organisation_name}`;

      this.setState({ article, fetching_article: false });
    }
    await post_request(`article_viewed/${article._id}`);

    this.push_article = async (article) => {
      if (article._id === this.state.article._id) return;
      this.setState({ article });
      scroll_to_top();
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
    let { article, fetching_article } = this.state;
    if (!article && !fetching_article) return null;

    let { title, image, image_hash, comments, sections } =
      article || new Object();

    return (
      <div className="blog-page">
        <div id="main-wrapper">
          <Header page="article" />
          <div className="clearfix"></div>
          <Breadcrumb page_text="Article" page_title={title} no_gray />

          {fetching_article ? (
            <Loadindicator contained />
          ) : (
            <section className="gray">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 col-md-12 col-sm-12 col-12">
                    <div className="article_detail_wrapss single_article_wrap format-standard">
                      <div className="article_body_wrap">
                        <div className="article_featured_image">
                          <Preview_image
                            image={image}
                            class_name="img-fluid rounded"
                            image_hash={image_hash}
                          />
                        </div>
                        <div className="article_top_info">
                          <ul className="article_middle_info">
                            <li>
                              <a href="#article_comments">
                                <span className="icons">
                                  <i className="ti-comment-alt"></i>
                                </span>
                                {`${comments || 0} Comments`}
                              </a>
                            </li>
                          </ul>
                        </div>
                        <h2 className="post-title">{`${title}.`}</h2>
                        {sections.map((section, index) =>
                          section.type === "paragraph" ? (
                            <ReactMarkdown
                              children={section.text}
                              components={{
                                img: Img_tag,
                              }}
                            />
                          ) : (
                            <blockquote key={index}>
                              <span className="icon">
                                <i className="fas fa-quote-left"></i>
                              </span>
                              <ReactMarkdown
                                children={section.text}
                                components={{
                                  img: Img_tag,
                                }}
                              />

                              <h5 className="name">{`- ${
                                section.speaker || ""
                              }`}</h5>
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
          )}

          <Latest_news_and_articles />
          <Contact_us_today />
          <Footer />
        </div>
      </div>
    );
  }
}

export default Article;
export { Img_tag };
