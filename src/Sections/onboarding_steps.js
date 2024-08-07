import React from "react";
import Preview_image from "../Components/preview_image";
import { client_domain, domain } from "../Constants/constants";
import Small_btn from "../Components/small_btn";

class Onboarding_steps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onboarding_steps = new Array(
    {
      title: "Create account",
      text: "Labore adipisicing reprehenderit voluptate commodo cupidatat adipisicing.",
    },
    {
      title: "Enroll",
      text: "Labore adipisicing reprehenderit voluptate commodo cupidatat adipisicing.",
    },
    {
      title: "Start Learning",
      text: "Labore adipisicing reprehenderit voluptate commodo cupidatat adipisicing.",
    },
    {
      title: "Get Certificate",
      text: "Labore adipisicing reprehenderit voluptate commodo cupidatat adipisicing.",
    }
  );

  render() {
    let { onboarding_stuffs } = this.props;

    if (!onboarding_stuffs) return null;

    let { image, image_hash, steps } = onboarding_stuffs;

    return (
      <section class="imageblock pt-m-0">
        <div class="imageblock__content left">
          <div
            class="background-image-holder"
            style={{ background: `url(${domain}/Images/${image}` }}
          >
            {/* <Preview_image
              image={image}
              image_hash={image_hash}
              height={1200}
              width={1920}
            /> */}
          </div>
        </div>
        <div class="container">
          <div class="row align-items-center justify-content-end">
            <div class="col-xl-5 col-lg-5 col-md-6 col-sm-12">
              <div class="lmp_caption">
                <ol class="list-unstyled p-0">
                  {steps.map(({ title, text }, index) => (
                    <li
                      key={index}
                      class="d-flex align-items-start my-3 my-md-4"
                    >
                      <div class="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg">
                        <div class="position-absolute text-white h5 mb-0">
                          {index + 1}
                        </div>
                      </div>
                      <div class="ml-3 ml-md-4">
                        <h4>{title}</h4>
                        <p>{text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <Small_btn
                title="Find Courses"
                action={() =>
                  window.location.assign(`${client_domain}/courses`)
                }
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Onboarding_steps;
