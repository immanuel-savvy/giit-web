import React from "react";
import Comment from "./comment";
import Loadindicator from "./loadindicator";
import Submit_review from "./submit_review";
import { get_request } from "../Assets/js/utils/services";
import Listempty from "./list_empty";

class Seminar_reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 10,
      page: 1,
    };
  }

  componentDidMount = async () => {
    let { seminar } = this.props;
    let { limit, page } = this.state;

    let comments = await get_request(
      `comments/${seminar._id}/${limit * (page - 1)}`
    );
    if (!Array.isArray(comments)) comments = new Array();

    this.setState({ comments });
  };

  append_comment = (comment) => {
    let { comments } = this.state;
    if (!Array.isArray(comments)) comments = new Array();

    comments = new Array(...comments, comment);

    this.setState({ comments });
  };

  render() {
    let { seminar } = this.props;
    let { comments } = this.state;

    return (
      <>
        {/* <Ratings /> */}

        <div class="list-single-main-item fl-wrap">
          <div class="list-single-main-item-title fl-wrap">
            {comments && comments.length ? (
              <h3>
                Reviews - <span> {comments.length} </span>
              </h3>
            ) : null}
          </div>
          <div class="reviews-comments-wrap">
            {comments ? (
              comments.length ? (
                comments.map((comment) => (
                  <Comment comment={comment} key={comment._id} />
                ))
              ) : (
                <Listempty text="Be the first to review this event" />
              )
            ) : (
              <Loadindicator />
            )}
          </div>
        </div>

        <Submit_review item={seminar} on_comment={this.append_comment} />
      </>
    );
  }
}

export default Seminar_reviews;
