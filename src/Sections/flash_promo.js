import React from "react";
import { Link } from "react-router-dom";
import { to_title } from "../Assets/js/utils/functions";
import Countdown from "../Components/countdown";
import { domain } from "../Constants/constants";
import { Flash_promo as Flash_promo_provider } from "../Contexts";
import { scroll_to_top } from "../Pages/Adminstrator";

class Flash_promo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Flash_promo_provider.Consumer>
        {({ flash_promo }) => {
          if (!flash_promo) return;

          let {
            title,
            short_description,
            image,
            image_hash,
            percentage_off,
            duration_timestamp,
          } = flash_promo;

          return (
            <section class="imageblock">
              <div class="imageblock__content">
                <div
                  class="background-image-holder"
                  style={{ background: `url(${domain}/Images/${image})` }}
                >
                  {/* <Preview_image
                    image={image || require("./../Assets/img/01_preview.jpg")}
                    image_hash={image_hash}
                    style={{ maxHeight: 800, marginTop: 80 }}
                  /> */}
                </div>
              </div>
              <div class="container">
                <div class="row align-items-center justify-content-between">
                  <div class="col-xl-5 col-lg-6 col-md-6 col-sm-12">
                    <div class="lmp_caption">
                      <div className="elsio_tag" style={{ margin: 0 }}>
                        {`Flash Promo - ${percentage_off}% OFF!`}
                      </div>
                      <br />
                      <h2 class="mb-3">{to_title(title)}</h2>
                      <p>
                        {short_description ||
                          "Ut ipsum enim deserunt minim Lorem et ipsum. Nostrud tempor anim pariatur cupidatat duis eu labore esse fugiat."}
                      </p>

                      <h4 class="mb-0">{`${percentage_off}% OFF!`}</h4>

                      <div className="mt-2">
                        <Countdown timestamp={duration_timestamp} />
                      </div>

                      <div class="text-left mt-4">
                        <Link
                          to="/courses"
                          class="btn btn-md text-light theme-bg"
                          onClick={scroll_to_top}
                        >
                          <span>Apply Now</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        }}
      </Flash_promo_provider.Consumer>
    );
  }
}

export default Flash_promo;
