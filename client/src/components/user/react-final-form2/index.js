import React, { Component } from "react";
import { Field } from "react-final-form";
import formatString from "format-string-by-pattern";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addUser } from "../../../actions/authActions";
import Styles from "./Styles";
import Wizard from "./Wizard";

class ReactFinalForm2 extends Component {
  state = {};
  render() {
    console.log("Rendering...");

    // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    const onSubmit = async values => {
      // await sleep(300);
      // // let dob_array = values.dob.trim().split("/");
      // // let month_dob = dob_array[0].trim();
      // // let day_dob = dob_array[1].trim();
      // // let year_dob = dob_array[2].trim();
      // window.alert(JSON.stringify(values, 0, 2));
      // e.preventDefault();
      const { addUser } = this.props;
      let grad_ary = values.graduation.trim().split("/");
      const user = {
        personal: {
          name: {
            firstName: values.firstName,
            lastName: values.lastName
          },
          email: values.email,
          password: values.password,
          gender: values.gender,
          dob: values.dob,
          phone: values.phone,
          address: {
            street: values.street,
            city: values.city,
            state: values.state,
            zip: values.zip,
            country: values.country
          }
        },
        education: {
          school: values.school,
          school_country: values.school_country,
          edu_status: values.edu_status,
          edu_type: values.edu_type,
          graduation: {
            month: grad_ary[0].trim(),
            year: grad_ary[1].trim()
          }
        }
      };
      addUser(user);
    };

    const Error = ({ name }) => (
      <Field
        name={name}
        subscribe={{ touched: true, error: true }}
        render={({ meta: { touched, error } }) =>
          touched && error ? <span>{error}</span> : null
        }
      />
    );

    // const required = value => (value ? undefined : "Required");

    const validateEmail = async email => {
      let data = await (await fetch("/api/users/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email })
      })).json();
      console.log(data.users);

      if (!email) {
        return "Required";
      } else if (email.length < 5) {
        return "Too short";
      } else if (data.users > 0) {
        return "Taken";
      } else {
        return undefined;
      }
    };

    return (
      <Styles>
        <h2>Registration</h2>
        {/* <h2>Wizard Form</h2>
        <a href="https://github.com/erikras/react-final-form#-react-final-form">
          Read Docs
        </a> */}
        <p>
          Please fill out this form including all the required fields. If you
          have any issues, please see the{" "}
          <a href="http://www.google.com">Help Section</a>.
        </p>
        <Wizard initialValues={{}} onSubmit={onSubmit}>
          <Wizard.Page
            validate={values => {
              const errors = {};
              if (!values.firstName || values.firstName.length <= 1) {
                errors.firstName = "Required";
              }
              if (!values.lastName || values.lastName.length <= 1) {
                errors.lastName = "Required";
              }
              if (!values.password) {
                errors.password = "Required";
              } else if (values.password.length < 8) {
                errors.password = "Must be 8+ characters";
              }
              if (!values.confirm) {
                errors.confirm = "Required";
              } else if (values.confirm !== values.password) {
                errors.confirm = "Passwords do not match";
              }
              return errors;
            }}
          >
            <h3>User Information:</h3>
            <div>
              <label>First Name</label>
              <Field
                name="firstName"
                component="input"
                type="text"
                placeholder="First Name"
              />
              <Error name="firstName" />
            </div>
            <div>
              <label>Last Name</label>
              <Field
                name="lastName"
                component="input"
                type="text"
                placeholder="Last Name"
              />
              <Error name="lastName" />
            </div>
            <div>
              <label>Email</label>
              <Field
                name="email"
                component="input"
                type="email"
                placeholder="Email Address"
                validate={validateEmail}
              />
              <Error name="email" />
            </div>
            <div>
              <label>Password</label>
              <Field
                name="password"
                component="input"
                type="password"
                placeholder="Password"
              />
              <Error name="password" />
            </div>
            <div>
              <label>Confirm</label>
              <Field
                name="confirm"
                component="input"
                type="password"
                placeholder="Confirm Password"
              />
              <Error name="confirm" />
            </div>
          </Wizard.Page>
          <Wizard.Page
            validate={values => {
              const errors = {};
              if (!values.gender) errors.gender = "Required";
              if (!values.dob) errors.dob = "Required";
              if (!values.phone) errors.phone = "Required";
              if (!values.street) errors.street = "Required";
              if (!values.city) errors.city = "Required";
              if (!values.state) errors.state = "Required";
              if (!values.zip) errors.zip = "Required";
              if (!values.country) errors.country = "Required";
              return errors;
            }}
          >
            <h3>Personal Information:</h3>
            {/* <div>
              <label>Gender:</label>
              <label>
                <Field
                  name="gender"
                  component="input"
                  type="radio"
                  value="male"
                />
                Male
              </label>
              <label>
                <Field
                  name="gender"
                  component="input"
                  type="radio"
                  value="female"
                />
                Female
              </label>
              <Error name="gender" />
            </div> */}
            <div>
              <label>Gender:</label>
              <label>
                <Field
                  name="gender"
                  component="input"
                  type="radio"
                  value="male"
                />{" "}
                Male
              </label>
              <label>
                <Field
                  name="gender"
                  component="input"
                  type="radio"
                  value="female"
                />{" "}
                Female
              </label>
              <label>
                <Field
                  name="gender"
                  component="input"
                  type="radio"
                  value="other"
                />{" "}
                Other
              </label>
            </div>
            <div>
              <label>DOB:</label>
              <Field
                name="dob"
                component="input"
                type="text"
                placeholder="mm / dd / yyyy"
                parse={formatString("mm / dd / yyyy")}
              />
              <Error name="dob" />
            </div>
            <div>
              <label>Phone:</label>
              <Field
                name="phone"
                component="input"
                type="text"
                placeholder="Phone"
              />
              <Error name="phone" />
            </div>
            <div>
              <fieldset>
                <legend>Address:</legend>
                <div>
                  <label>Street:</label>
                  <Field
                    name="street"
                    component="input"
                    type="text"
                    placeholder="Street"
                  />
                  <Error name="street" />
                </div>
                <div>
                  <label>City:</label>
                  <Field
                    name="city"
                    component="input"
                    type="text"
                    placeholder="City"
                  />
                  <Error name="city" />
                </div>
                <div>
                  <label>State:</label>
                  <Field
                    name="state"
                    component="input"
                    type="text"
                    placeholder="State"
                  />
                  <Error name="state" />
                </div>
                <div>
                  <label>Zip Code:</label>
                  <Field
                    name="zip"
                    component="input"
                    type="text"
                    placeholder="Zip Code"
                  />
                  <Error name="zip" />
                </div>
                <div>
                  <label>Country:</label>
                  <Field
                    name="country"
                    component="input"
                    type="text"
                    placeholder="Country"
                  />
                  <Error name="country" />
                </div>
              </fieldset>
            </div>
          </Wizard.Page>
          <Wizard.Page
            validate={values => {
              const errors = {};
              if (!values.school) errors.school = "Required";
              if (!values.school_country) errors.school_country = "Required";
              if (!values.edu_status) errors.edu_status = "Required";
              if (!values.edu_type) errors.edu_type = "Required";
              if (!values.graduation) errors.graduation = "Required";
              return errors;
            }}
          >
            <div>
              <label>Employed?</label>
              <Field name="employed" component="input" type="checkbox" />
            </div>
            <div>
              <label>School:</label>
              <Field
                name="school"
                component="input"
                type="text"
                placeholder="School Name"
              />
              <Error name="school" />
            </div>
            <div>
              <label>Country:</label>
              <Field
                name="school_country"
                component="input"
                type="text"
                placeholder="School Country"
              />
              <Error name="school_country" />
            </div>
            <div>
              <label>Educational Status:</label>
              <Field name="edu_status" component="select">
                <option />
                <option value="student">Student</option>
                <option value="graduate">Graduate</option>
              </Field>
              <Error name="edu_status" />
            </div>
            <div>
              <label>Educational Field:</label>
              <Field name="edu_type" component="select">
                <option />
                <option value="MD">Medical (M.D.)</option>
                <option value="PA">Physician's Assistant</option>
                <option value="PA">Nurse Practitioner</option>
                <option value="dentist">Dentistry</option>
                <option value="other">Other</option>
              </Field>
              <Error name="edu_type" />
            </div>
            <div>
              <label>Graduation Date:</label>
              <Field
                name="graduation"
                component="input"
                type="text"
                placeholder="mm / yyyy"
                parse={formatString("mm / yyyy")}
              />
              <Error name="graduation" />
            </div>
          </Wizard.Page>
          <Wizard.Page
            validate={values => {
              const errors = {};
              if (!values.notes) {
                errors.notes = "Required";
              }
              return errors;
            }}
          >
            <div>
              <label>Best Stooge?</label>
              <div>
                <label>
                  <Field
                    name="stooge"
                    component="input"
                    type="radio"
                    value="larry"
                  />{" "}
                  Larry
                </label>
                <label>
                  <Field
                    name="stooge"
                    component="input"
                    type="radio"
                    value="moe"
                  />{" "}
                  Moe
                </label>
                <label>
                  <Field
                    name="stooge"
                    component="input"
                    type="radio"
                    value="curly"
                  />{" "}
                  Curly
                </label>
              </div>
            </div>
            <div>
              <label>Notes</label>
              <Field name="notes" component="textarea" placeholder="Notes" />
              <Error name="notes" />
            </div>
          </Wizard.Page>
        </Wizard>
        <br />
        <br />
        <br />
        <br />
      </Styles>
    );
  }
}

ReactFinalForm2.propTypes = {
  addUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { addUser }
)(ReactFinalForm2);
