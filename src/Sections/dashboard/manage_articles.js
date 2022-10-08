import React from "react";
import { get_request } from "../../Assets/js/utils/services";
import Loadindicator from "../../Components/loadindicator";
import Article from "../article";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_articles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let articles = await get_request("articles");

    this.setState({ articles });
  };

  render() {
    let { articles } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb crumb="manage articles" />
        <div class="row">
          {articles ? (
            articles.length ? (
              articles.map((article) => <Article article={article} />)
            ) : (
              <div className="mt-5 d-flex justify-content-center">
                <p className="h4">No articles yet.</p>
              </div>
            )
          ) : (
            <Loadindicator contained />
          )}
        </div>
      </div>
    );
  }
}

export default Manage_articles;
