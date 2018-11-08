import React, { Component } from "react";
import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required!")
  }),
  mapPropsToValues: props => ({ email: props.user.email }),
  mapValuesToPayload: x => x,
  handleSubmit: (payload, bag) => {
    setTimeout(function() {
      alert(JSON.stringify(payload, null, 2));
      bag.setSubmitting(false);
      bag.props.updateUser(payload);
    }, 1000);
  },
  displayName: "MyForm"
});

class RegForm extends Component {
  state = {};

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.email !== this.props.user.email) {
      this.props.resetForm(nextProps);
    }
  }

  render() {
    // notice how touched will reset when the user changes
    console.log(this.props.touched);
    return (
      <form onSubmit={this.props.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={this.props.values.email}
          onChange={this.props.handleChange}
          onBlur={this.props.handleBlur}
        />

        <button
          type="button"
          className="outline"
          onClick={this.props.handleReset}
          disabled={!this.props.dirty || this.props.isSubmitting}
        >
          Reset
        </button>
        <button type="submit" disabled={this.props.isSubmitting}>
          Submit
        </button>
        <DisplayFormikState {...this.props} />
      </form>
    );
  }
}

const MyEnhancedForm = formikEnhancer(MyForm);
