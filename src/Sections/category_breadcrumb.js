import React from "react";
import { Link } from "react-router-dom";
import { Nav_context } from "../Contexts";
import Loadindicator from "../Components/loadindicator";
import { emitter } from "../Giit";

let cat_sorter = {
  "master_courses~6wXim2mkUjwYxm1Nu8kW0QjcPdK~1665148065847": [
    "Data_Analysis",
    "Big Data",
    "Data Engineer",
    "Adv Excel",
    "SQL",
    "Power Bi",
    "Tableau",
    "R Programming",
    "Python",
    "Azure Database",
    "Virtualization",
    "Ai",
    "Machine Learning",
  ],
  "master_courses~7HcGIXv5T4mpRAf~1665157965415": [
    "Cloud_Master",
    "Microsoft Azure",
    "Amazon AWS",
    "Google Cloud",
    "DevOps",
    "Cloud Security",
    "CCSP",
    "Virtualization",
    "Cloud Administrator",
    "Cloud Network",
    "Cloud Engineer",
    "Cloud Architect",
  ],
  "master_courses~HT9Byl9tZuaGa~1665157758615": [
    "Fullstack_Software_Development",
    "HTML",
    "CSS",
    "JavaScript",
    "Python",
    "Node.Js",
    "Next.Js",
    "React",
    "SQL",
    "Ajax",
    "Mongo DB",
    "Bootstrap",
    "Github",
    "Express",
    "Mobile APP",
  ],
  "master_courses~el2exWPJr95LCJ~1665148337121": [
    "Cyber Security",
    "Cybersecurity Fundamental",
    "CompTIA Network+",
    "CompTIA Security +",
    "Cloud Security",
    "Ethical Hacking",
    "CISSP",
    "Certified in Cybersecurity",
    "CCSP",
    "Firewall Security",
    "Forentic",
    "Pen Testing",
    "Risk Management",
    "Network Security",
  ],
  "master_courses~h5L8JhKtrHyYm2~1665157172144": ["Full_Stack_Web_Development"],
  "master_courses~SvytSMRD7AePxHArz~1665159678119": ["Graphics_Master"],
  "master_courses~84ZazeCaLJo2foz~1665148539425": ["Digital Marketing"],
  "master_courses~TgG4DOtwCfMcnRattfRMg~1665158664612": ["I.T_Support"],
};

class Category_breadcrumb extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handle_course = (course) => {
    window.sessionStorage.setItem("course", JSON.stringify(course));
    emitter.emit("push_course", course);
  };

  render() {
    return (
      <Nav_context.Consumer>
        {({ master_courses, submenus, load_subnavs }) => {
          return (
            <section>
              <div className="container">
                <div className="row">
                  {master_courses?.map
                    ? master_courses.map((c) => {
                        if (!submenus[c._id])
                          load_subnavs({
                            ...c,
                            _id: c._id,
                            submenu: c.courses,
                          });

                        if (Array.isArray(submenus[c._id]))
                          submenus[c._id] = submenus[c._id].sort((m1, m2) => {
                            let m1_index = cat_sorter[c._id]
                                .slice(1)
                                .findIndex((m) => {
                                  m = m.toLowerCase();
                                  let t = m1.title
                                    .toLowerCase()
                                    .replace(/_/g, " ");
                                  return t.includes(m) || m.includes(t);
                                }),
                              m2_index = cat_sorter[c._id]
                                .slice(1)
                                .findIndex((m) => {
                                  m = m.toLowerCase();
                                  let t = m2.title
                                    .toLowerCase()
                                    .replace(/_/g, " ");

                                  return t.includes(m) || m.includes(t);
                                });
                            if (m1_index === -1) return 200;
                            if (m2_index === -1) return -1;

                            return m1_index - m2_index;
                          });

                        return c?.title ? (
                          <div className="col-md-4 col-lg-3 col-sm-12">
                            <h5
                              onClick={() => this.handle_course(c)}
                              className="theme-cl"
                            >
                              <Link to="/course" className="theme-cl">
                                {c.title?.replace(/_/g, " ")}
                              </Link>
                            </h5>

                            {!submenus[c._id] ? (
                              <Loadindicator small />
                            ) : (
                              <div class="edu_wraper">
                                <ul class="lists-3 row">
                                  {submenus[c._id]
                                    ?.slice(0, 6)
                                    ?.map((learn, i) =>
                                      learn.title ? (
                                        <li
                                          key={i}
                                          onClick={() =>
                                            this.handle_course(learn)
                                          }
                                          class="col-12 m-0"
                                          style={{
                                            fontSize: 18,
                                            lineHeight: 3,
                                          }}
                                        >
                                          <Link
                                            to="/course"
                                            className=""
                                            style={{
                                              color: "#333",
                                              textDecorationLine: "none",
                                            }}
                                          >
                                            {learn.title?.replace(/_/g, " ")}
                                          </Link>
                                        </li>
                                      ) : null
                                    )}
                                </ul>
                              </div>
                            )}
                          </div>
                        ) : null;
                      })
                    : null}
                </div>
              </div>
            </section>
          );
        }}
      </Nav_context.Consumer>
    );
  }
}

export default Category_breadcrumb;
