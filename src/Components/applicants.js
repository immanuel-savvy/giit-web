import React from "react";
import { post_request } from "../Assets/js/utils/services";
import Applicant from "./applicant";
import Listempty from "./list_empty";
import Loadindicator from "./loadindicator";

class Applicants extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page_size: 25,
      page: 0,
    };
  }

  componentDidMount = async () => {
    let { vacancy } = this.props;
    let { page_size, page } = this.state;

    let applicants = vacancy.applicants
      ? await post_request("applications", {
          vacancy: vacancy._id,
          limit: page_size,
          skip: page_size * page,
        })
      : new Array();

    this.setState({ applicants });
  };

  render() {
    let { applicants } = this.state;

    return (
      <div>
        {applicants ? (
          applicants.length ? (
            <table className="table dash_list">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">CV</th>
                </tr>
              </thead>
              {applicants.map((applicant) => (
                <Applicant applicant={applicant} key={applicant._id} />
              ))}
            </table>
          ) : (
            <Listempty text="No applications yet." />
          )
        ) : (
          <Loadindicator contained />
        )}
      </div>
    );
  }
}

export default Applicants;
