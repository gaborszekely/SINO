import React from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";

// const renderField = ({
//   input,
//   label,
//   type,
//   meta: { asyncValidating, touched, error }
// }) => (
//     <div>
//       <label>{label}</label>
//       <div className={asyncValidating ? "async-validating" : ""}>
//         <input {...input} type={type} placeholder={label} />
//         {touched && error && <span>{error}</span>}
//       </div>
//     </div>
//   );

const regForm = props => {
  return (
    <div style={{ margin: "2em" }}>
      <h2>Register User</h2>
      <form onSubmit={this.handleSubmit}>
        <h3>Personal</h3>
        <div>
          <label>First Name:</label>
          <input
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
            placeholder="Enter your first name..."
          />
        </div>
        <br />
        <div>
          <label>Last Name:</label>
          <input
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
            placeholder="Enter your last name..."
          />
        </div>
        <br />
        <div>
          <label>Email:</label>
          <input
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="Enter your email..."
          />
        </div>
        <br />
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="Enter your password..."
          />
        </div>
        <br />
        <h3>Address:</h3>
        <div>
          <label>Street:</label>
          <input
            name="street"
            value={this.state.street}
            onChange={this.handleChange}
            placeholder="Enter your street name..."
          />
        </div>
        <br />
        <div>
          <label>Unit:</label>
          <input
            name="unit"
            value={this.state.unit}
            onChange={this.handleChange}
            placeholder="Enter your unit..."
          />
        </div>
        <br />
        <div>
          <label>City:</label>
          <input
            name="city"
            value={this.state.city}
            onChange={this.handleChange}
            placeholder="Enter your city..."
          />
        </div>
        <br />
        <div>
          <label>State:</label>
          <input
            name="state"
            value={this.state.state}
            onChange={this.handleChange}
            placeholder="Enter your state..."
          />
        </div>
        <br />
        <div>
          <label>Zip:</label>
          <input
            name="zip"
            value={this.state.zip}
            onChange={this.handleChange}
            placeholder="Enter your zipcode..."
          />
        </div>
        <br />
        <div>
          <label>Country:</label>
          <input
            name="country"
            value={this.state.country}
            onChange={this.handleChange}
            placeholder="Enter your country..."
          />
        </div>
        <br />
        <div>
          <label>Phone:</label>
          <input
            name="phone"
            value={this.state.phone}
            onChange={this.handleChange}
            placeholder="Enter your phone number..."
          />
        </div>
        <br />
        <h3>Education</h3>
        <div>
          <label>School Name:</label>
          <input
            name="school"
            value={this.state.school}
            onChange={this.handleChange}
            placeholder="Enter your school..."
          />
        </div>
        <br />
        <div>
          <label>Educational Status:</label>
          <input
            name="edu_status"
            value={this.state.edu_status}
            onChange={this.handleChange}
            placeholder="Enter your educational status..."
          />
        </div>
        <br />
        <div>
          <label>Graduation Month:</label>
          <input
            name="month"
            value={this.state.month}
            onChange={this.handleChange}
            placeholder="Enter your graduation month..."
          />
        </div>
        <br />
        <div>
          <label>Graduation Year:</label>
          <input
            name="year"
            value={this.state.year}
            onChange={this.handleChange}
            placeholder="Enter your graduation year..."
          />
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const validate = values => {
  const errors = {};
  const {
    name_first,
    name_last,
    email,
    phone,
    address_street,
    address_unit,
    address_city,
    address_state,
    address_zip,
    address_country,
    school,
    edu_status,
    grad_month,
    grad_year
  } = values;

  if (!name_first || name_first.trim() === "") {
    errors.name_first = "Plese enter your first name!";
  }
  if (!name_last || name_last.trim() === "") {
    errors.name_last = "Please enter your last name!";
  }
  if (!email || email.trim() === "") {
    errors.email = "Please enter an email address!";
  }
  if (!phone || phone.trim() === "") {
    errors.phone = "Please enter a phone number!";
  }
  if (!address_street || address_street.trim() === "") {
    errors.address_street = "Please enter a street name!";
  }
  if (!address_city || address_city.trim() === "") {
    errors.address_city = "Please enter a city!";
  }
  if (!address_state || address_state.trim() === "") {
    errors.address_state = "Please enter a state!";
  }
  if (!address_zip || address_zip.trim() === "") {
    errors.address_zip = "Please enter a zip code!";
  }
  if (!address_country || address_country.trim() === "") {
    errors.address_country = "Please enter a country!";
  }
  if (!school || school.trim() === "") {
    errors.school = "Please enter a school!";
  }
  if (edu_status.trim() === "") {
    errors.edu_status = "Please enter your educational status!";
  }
  if (grad_month.trim() === "") {
    errors.grad_month = "Please enter a graduation month!";
  }
  if (grad_month.trim() === "") {
    errors.grad_year = "Please enter a graduation year!";
  }
  return errors;
};

export default reduxForm({
  form: "sinoRegForm",
  validate,
  asyncValidate
})(regForm);
