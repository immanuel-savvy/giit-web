import React from "react";
import { post_request } from "../../Assets/js/utils/services";
import Listempty from "../../Components/list_empty";
import Loadindicator from "../../Components/loadindicator";
import Media from "../../Components/media";
import { emitter } from "../../Giit";
import Add_media from "./add_media";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page_size: 15,
      page: 0,
    };
  }

  componentDidMount = async () => {
    let { page_size, page } = this.state;
    let { gallery, total_media } = await post_request("fetch_media", {
      limit: page_size,
      skip: page_size * page,
      total_media: true,
    });

    this.setState({ gallery, total_media });

    this.new_media = (media) => {
      let { gallery } = this.state;

      gallery = new Array(media, ...gallery);
      this.setState({ gallery });
    };

    this.media_updated = (media) => {
      let { gallery } = this.state;

      gallery = gallery.map((medium) => {
        if (medium._id === media._id) return media;
        return medium;
      });

      this.setState({ gallery });
    };

    emitter.listen("new_media", this.new_media);
    emitter.listen("media_updated", this.media_updated);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("media_updated", this.media_updated);
    emitter.remove_listener("new_media", this.new_media);
  };

  add_new_btn = () =>
    this.state.show_form ? null : (
      <div>
        <div class="elkios" onClick={this.toggle_form}>
          <a
            href="#"
            class="add_new_btn"
            data-toggle="modal"
            data-target="#catModal"
          >
            <i class="fas fa-plus-circle mr-1"></i>Add Media
          </a>
        </div>
      </div>
    );

  toggle_form = () => this.setState({ show_form: !this.state.show_form });

  remove_media = async (media) => {
    let { gallery } = this.state;

    if (!window.confirm("Are you sure to remove media?")) return;

    await post_request(`remove_media/${media}`);
    gallery = gallery.filter((medium) => medium._id !== media);
    this.setState({ gallery });
  };

  edit_media = (media) =>
    this.setState({ media_in_edit: media, show_form: true });

  render() {
    let { gallery, show_form, media_in_edit } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb
          crumb="manage gallery"
          on_click={this.toggle_form}
          hide={show_form || !gallery || (gallery && !gallery.length)}
          title="add media"
        />
        <div class="row">
          {show_form ? (
            <div>
              <Add_media media={media_in_edit} toggle={this.toggle_form} />
              <hr />
            </div>
          ) : null}

          {gallery ? (
            gallery.length ? (
              gallery.map((media) => (
                <Media
                  media={media}
                  edit={() => this.edit_media(media)}
                  remove={() => this.remove_media(media._id)}
                />
              ))
            ) : (
              <div className="my-5">
                <Listempty text="No media in gallery yet" />
                <div className="d-flex align-items-center justify-content-center">
                  {this.add_new_btn()}
                </div>
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

export default Manage_gallery;
