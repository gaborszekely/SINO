import React, { Component } from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { Input, Button, Message } from "semantic-ui-react";
import { validateEmail } from "../../../actions/regActions";

class SimpleForm extends Component {
  state = {};

  // Touched means you've typed into the form and submitted it before
  // Error tells you if you have any errors
  // Show a message
  locationInput({ input, meta: { touched, error }, ...custom }) {
    const hasError = touched && error !== undefined;

    return (
      <div>
        {hasError && <Message error header="Error" content={error} />}
        <Input
          error={hasError}
          fluid
          placeholder="Location..."
          {...input}
          {...custom}
        />
      </div>
    );
  }

  onSubmit(values, dispatch) {
    const { location } = values;
    return new Promise((resolve, reject) => {
      dispatch({
        type: "FETCH_WEATHER",
        location,
        resolve,
        reject
      });
    }).catch(error => {
      throw new SubmissionError(error);
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <h2>Redux Form</h2>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field name="location" component={this.locationInput} />
          <br />
          <Button fluid type="submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};
  const { location } = values;
  if (!location || location.trim() === "") {
    errors.location = "Location required!";
  }
  return errors;
};

export default reduxForm({
  form: "simple", // Nickname for the form
  validate
})(SimpleForm);
