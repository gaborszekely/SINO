import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form } from "react-final-form";

class Wizard extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };
  static Page = ({ children }) => children;

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: props.initialValues || {}
    };
  }
  next = values =>
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values
    }));

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0)
    }));

  /**
   * NOTE: Both validate and handleSubmit switching are implemented
   * here because 🏁 Redux Final Form does not accept changes to those
   * functions once the form has been defined.
   */

  validate = values => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ];
    return activePage.props.validate ? activePage.props.validate(values) : {};
  };

  handleSubmit = values => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values);
    } else {
      this.next(values);
    }
  };

  render() {
    const { children } = this.props;
    const { page, values } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;
    return (
      <Form
        initialValues={values}
        validate={this.validate}
        onSubmit={this.handleSubmit}
      >
        {({ handleSubmit, submitting, values }) => (
          <form onSubmit={handleSubmit} values={values}>
            {activePage}
            {isLastPage && <h3>Personal</h3>}
            {isLastPage &&
              Object.entries(values)
                .filter(
                  item =>
                    item[0] === "firstName" ||
                    item[0] === "lastName" ||
                    item[0] === "email" ||
                    item[0] === "gender" ||
                    item[0] === "dob" ||
                    item[0] === "phone"
                )
                .map(value => (
                  <p key={value}>
                    <b>
                      {value[0] === "firstName" && "First Name"}
                      {value[0] === "lastName" && "Last Name"}
                      {value[0] === "email" && "Email"}
                      {value[0] === "gender" && "Notes"}
                      {value[0] === "dob" && "Date of Birth"}
                      {value[0] === "phone" && "Phone"}
                    </b>
                    : {value[1]}
                  </p>
                ))}
            <div className="buttons">
              {page > 0 && (
                <button type="button" onClick={this.previous}>
                  « Previous
                </button>
              )}
              {!isLastPage && <button type="submit">Next »</button>}
              {isLastPage && (
                <button type="submit" disabled={submitting}>
                  Submit
                </button>
              )}
            </div>

            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      </Form>
    );
  }
}

export default Wizard;
