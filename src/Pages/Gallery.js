import React from "react";
import { post_request } from "../Assets/js/utils/services";
import Listempty from "../Components/list_empty";
import Loadindicator from "../Components/loadindicator";
import Media from "../Components/media";
import Breadcrumb from "../Sections/breadcrumb";
import Contact_us_today from "../Sections/contact_us_today";
import Footer from "../Sections/footer";
import Header from "../Sections/header";
import Nav from "../Sections/nav";
import Student_reviews from "../Sections/student_reviews";

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page_size: 12,
      page: 0,
    };
  }

  fetch_gallery = async (page = this.state.page) => {
    let { page_size } = this.state;

    let { gallery, total_media } = await post_request("fetch_media", {
      skip: page_size * page,
      limit: page_size,
      total_media: true,
    });

    this.setState({ gallery, total_media });
  };

  componentDidMount = async () => {
    this.setState({ hide_nav: true }, () => this.setState({ hide_nav: false }));
    await this.fetch_gallery();
  };

  render() {
    let { gallery, hide_nav } = this.state;

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
        </section>
        <Student_reviews />
        <Contact_us_today />
        <Footer />
      </div>
    );
  }
}

export default Gallery;
