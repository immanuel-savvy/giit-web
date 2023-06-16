import React from "react";
import { post_request } from "../Assets/js/utils/services";
import Listempty from "../Components/list_empty";
import Loadindicator from "../Components/loadindicator";
import Media from "../Components/media";
import Breadcrumb from "../Sections/breadcrumb";
import Contact_us_today from "../Sections/contact_us_today";
import Footer, { scroll_to_top } from "../Sections/footer";
import Header from "../Sections/header";
import Student_reviews from "../Sections/student_reviews";
import Explore_more_btn from "../Sections/explore_more_btn";

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page_size: 12,
      page: 0,
    };
  }

  fetch_gallery = async (page = this.state.page) => {
    let { page_size, loading_more, gallery } = this.state;
    if (loading_more) return;

    gallery && this.setState({ loading_more: true });
    let { gallery: gallery_, total_media } = await post_request("fetch_media", {
      skip: page_size * page,
      limit: page_size,
      total_media: true,
    });

    if (!gallery) gallery = new Array();
    gallery = new Array(...gallery, ...gallery_);

    this.setState({
      gallery,
      total_media,
      no_more: gallery_?.length < page_size,
      loading_more: false,
      page,
    });
  };

  componentDidMount = async () => {
    scroll_to_top();

    this.setState({ hide_nav: true }, () => this.setState({ hide_nav: false }));
    await this.fetch_gallery();
  };

  load_more = async () => {
    let { page } = this.state;

    await this.fetch_gallery(page + 1);
  };

  render() {
    let { gallery, hide_nav, no_more, loading_more } = this.state;

    return (
      <div id="main-wrapper">
        {hide_nav ? null : <Header page="gallery" />}

        <Breadcrumb page_title="Gallery" page_text="Gallery" />
        <section class="min">
          <div class="container">
            <div class="row justify-content-center">
              {gallery ? (
                gallery.length ? (
                  gallery.map((media) => (
                    <Media media={media} key={media._id} />
                  ))
                ) : (
                  <Listempty text="No media in gallery yet" />
                )
              ) : (
                <Loadindicator contained />
              )}
            </div>
          </div>

          {loading_more ? (
            <Loadindicator contained />
          ) : !gallery || no_more ? null : (
            <Explore_more_btn action={this.load_more} text="Load more" />
          )}
        </section>
        <Student_reviews />
        <Contact_us_today />
        <Footer />
      </div>
    );
  }
}

export default Gallery;
