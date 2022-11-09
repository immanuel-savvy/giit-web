import React from "react";
import { get_request, post_request } from "../../Assets/js/utils/services";
import Listempty from "../../Components/list_empty";
import Loadindicator from "../../Components/loadindicator";
import University_progress from "../../Components/university_progress";
import { emitter } from "../../Giit";
import Add_country from "./add_country";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_universities extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let countries = await get_request("countries");

    this.setState({ countries });

    this.new_country = (country) => {
      let { countries } = this.state;
      countries = new Array(country, ...countries);
      this.setState({ countries });
    };

    this.country_updated = (country) => {
      let { countries } = this.state;

      countries = countries.map((country_) => {
        if (country_._id === country._id) return country;
        return country_;
      });
      this.setState({ countries });
    };

    emitter.listen("new_country", this.new_country);
    emitter.listen("country_updated", this.country_updated);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("country_updated", this.country_updated);
    emitter.remove_listener("new_country", this.new_country);
  };

  edit = (country) =>
    this.setState({ country_in_edit: country, show_form: true });

  remove = async (country_id) => {
    if (!window.confirm("Are you sure to remove country?")) return;

    let { countries } = this.state;
    countries = countries.filter((country) => country._id !== country_id);
    this.setState({ countries });

    await post_request(`remove_country/${country_id}`);
  };

  toggle_form = () => this.setState({ show_form: !this.state.show_form });

  render() {
    let { countries, show_form, country_in_edit } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb
          crumb="manage universities"
          on_click={this.toggle_form}
          hide={show_form}
          title="add new country"
        />
        <div class="row">
          {show_form ? (
            <Add_country country={country_in_edit} toggle={this.toggle_form} />
          ) : null}

          {countries ? (
            countries.length ? (
              countries.map((country) => (
                <University_progress
                  university_progress={country}
                  key={country._id}
                  edit={() => this.edit(country)}
                  remove={() => this.remove(country._id)}
                />
              ))
            ) : (
              <Listempty />
            )
          ) : (
            <Loadindicator contained />
          )}
        </div>
      </div>
    );
  }
}

export default Manage_universities;
