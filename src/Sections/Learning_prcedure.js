import React from "react";

class Learning_procedure extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      procedures: new Array(
        {
          title: "Find a course",
          explain:
            "Oluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.",
        },
        {
          title: "Enroll",
          explain:
            "Error sit voluptatem actium doloremque laudantium, totam rem aperiam, eaque ipsa.",
        },
        {
          title: "Start Learning",
          explain:
            "Error sit voluptatem actium doloremque laudantium, totam rem aperiam, eaque ipsa.",
        },
        {
          title: "Get Certificate",
          explain:
            "Unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.",
        }
      ),
    };
  }

  render() {
    let { procedures } = this.state;

    return (
      <section className="pt-0 gray">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
              <div className="lmp_thumb">
                <img
                  src="../Assets/img/learning_procedure.jpg"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
              <div className="lmp_caption">
                <ol className="list-unstyled p-0">
                  {procedures.map((procedure, index) => (
                    <li
                      key={procedure.title}
                      className="d-flex align-items-start my-3 my-md-4"
                    >
                      <div className="rounded-circle p-3 p-sm-4 d-flex align-items-center justify-content-center theme-bg">
                        <div className="position-absolute text-white h5 mb-0">
                          {index + 1}
                        </div>
                      </div>
                      <div className="ml-3 ml-md-4">
                        <h4>{procedure.title}</h4>
                        <p>{procedure.explain}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Learning_procedure;
