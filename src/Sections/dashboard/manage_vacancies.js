import React from "react";
import { get_request, post_request } from "../../Assets/js/utils/services";
import Listempty from "../../Components/list_empty";
import Loadindicator from "../../Components/loadindicator";
import Vacancy from "../../Components/vacancy";
import { emitter } from "../../Giit";
import Add_vacancy from "./add_vacancy";
import Dashboard_breadcrumb from "./dashboard_breadcrumb";

class Manage_vacancies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  add_btn = () =>
    this.state.show_form ? null : (
      <div>
        <div class="elkios" onClick={this.toggle_form}>
          <a
            href="#"
            class="add_new_btn"
            data-toggle="modal"
            data-target="#catModal"
          >
            <i class="fas fa-plus-circle mr-1"></i>Add Vacancy
          </a>
        </div>
      </div>
    );

  toggle_form = () => this.setState({ show_form: !this.state.show_form });

  componentDidMount = async () => {
    let vacancies = await get_request("vacancies");

    this.setState({ vacancies });

    this.vacancy_created = (vacancy) => {
      let { vacancies } = this.state;

      vacancies = new Array(vacancy, ...vacancies);
      this.setState({ vacancies });
    };

    this.vacancy_updated = (vacancy) => {
      let { vacancies } = this.state;

      vacancies = vacancies.map((vacancy_) => {
        if (vacancy_._id === vacancy._id) return vacancy;

        return vacancy_;
      });

      this.setState({ vacancies });
    };

    emitter.listen("vacancy_created", this.vacancy_created);
    emitter.listen("vacancy_updated", this.vacancy_updated);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("vacancy_updated", this.vacancy_updated);
    emitter.remove_listener("vacancy_created", this.vacancy_created);
  };

  remove_vacancy = async (vacancy_id) => {
    let { vacancies } = this.state;

    vacancies = vacancies.filter((vacancy) => vacancy._id !== vacancy_id);
    this.setState({ vacancies });

    await post_request(`remove_vacancy/${vacancy_id}`);
  };

  edit_vacancy = (vacancy) =>
    this.setState({ show_form: true }, () =>
      emitter.emit("vacancy_in_edit", vacancy)
    );

  render() {
    let { vacancies, show_form } = this.state;

    return (
      <div className="col-lg-9 col-md-9 col-sm-12">
        <Dashboard_breadcrumb
          crumb="Vacancies"
          on_click={this.toggle_form}
          hide={show_form || !vacancies || (vacancies && !vacancies.length)}
          title="add vacancy"
        />

        <div class="row">
          {show_form ? <Add_vacancy toggle={this.toggle_form} /> : null}

          {vacancies ? (
            vacancies.length ? (
              <table className="table dash_list">
                <thead>
                  <tr>
                    <th scope="col">Flier</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Nature</th>
                    <th scope="col">Application</th>
                  </tr>
                </thead>

                {vacancies.map((vacancy) => (
                  <Vacancy
                    vacancy={vacancy}
                    key={vacancy._id}
                    edit={() => this.edit_vacancy(vacancy)}
                    remove={() => this.remove_vacancy(vacancy._id)}
                  />
                ))}
              </table>
            ) : (
              <div>
                <Listempty />
                <div className="d-flex align-items-center justify-content-center">
                  {this.add_btn()}
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

export default Manage_vacancies;
