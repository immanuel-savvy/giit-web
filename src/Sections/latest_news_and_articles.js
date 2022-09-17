import React from "react";
import Article from "./article";

class Latest_news_and_articles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let lastest_articles = new Array(
      {
        title: "How To Register & Enrolled on SkillUp Step by Step?",
        description:
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum",
        tags: new Array("Marketing"),
        views_string: "15.3K",
        date_string: "10 July 2021",
        _id: 1,
        instructor: { _id: 1 },
      },
      {
        title: "How To Register & Enrolled on SkillUp Step by Step?",
        description:
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum",
        tags: new Array("Marketing"),
        views_string: "15.3K",
        date_string: "10 July 2021",
        _id: 1,
        instructor: { _id: 1 },
      },
      {
        title: "How To Register & Enrolled on SkillUp Step by Step?",
        description:
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum",
        tags: new Array("Marketing"),
        views_string: "15.3K",
        date_string: "10 July 2021",
        _id: 1,
        instructor: { _id: 1 },
      }
    ); // limit 3
    this.setState({ lastest_articles });
  };

  render() {
    let { lastest_articles } = this.state;

    if (lastest_articles && !lastest_articles.length) return null;

    return (
      <section className="min">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="sec-heading center">
                <h2>
                  Latest News & <span className="theme-cl">Articles</span>
                </h2>
                <p>
                  We tell you about the lastest updates in the society of
                  technology to foster awareness all-round
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {lastest_articles
              ? lastest_articles.map((article, index) => (
                  <Article key={index} article={article} />
                ))
              : null}
          </div>
        </div>
      </section>
    );
  }
}

export default Latest_news_and_articles;
