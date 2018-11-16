import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addUser } from "../../actions/authActions";

class RegisterUser extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    street: "",
    unit: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
    school: "",
    edu_status: "",
    month: "",
    year: "",
    errors: {},
    isLoading: false
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { addUser } = this.props;
    const user = {
      name: {
        firstName: this.state.firstName,
        lastName: this.state.lastName
      },
      email: this.state.email,
      password: this.state.password,
      address: {
        street: this.state.street,
        unit: this.state.unit,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip,
        country: this.state.country
      },
      phone: this.state.phone,
      school: this.state.school,
      edu_status: this.state.edu_status,
      graduation: {
        month: this.state.month,
        year: this.state.year
      }
    };
    addUser(user);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const currentYr = new Date().getFullYear();
    return (
      <div style={{ margin: "2em", marginTop: "7rem" }}>
        <h2>Register User</h2>
        <form onSubmit={this.handleSubmit}>
          {/* <h3>Personal</h3> */}
          <fieldset>
            <legend>
              <h3>Personal Information</h3>
            </legend>
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
              {/* <select 
                name="state"
                value={this.state.state}
                onChange={this.handleChange}
              >
                <option value="" disabled>Choose your state</option>
                <option value="NON">Non-US</option>
                <option value="AL">Alabama</option>
                <option value="AS">Alasksa</option>
                <option value="AZ">Arizona</option>
                <option value="AL">Arkansas</option>
                <option value="AL">Colorado</option>
                <option value="AL">Conneticut</option>
                <option value="AL">Alabama</option>
  >            </select> */}
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
          </fieldset>
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
            {/* <input
              name="edu_status"
              value={this.state.edu_status}
              onChange={this.handleChange}
              placeholder="Enter your educational status..."
            /> */}
            <select
              name="edu_status"
              value={this.state.edu_status}
              onChange={this.handleChange}
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="Graduate">Graduate</option>
              <option value="MD">M.D. Student</option>
              <option value="PA">Physician's Assistant</option>
              <option value="NP">Nurse Practitioner</option>
            </select>
          </div>
          <br />
          <div>
            <label>Graduation Month:</label>
            {/* <input
              name="month"
              value={this.state.month}
              onChange={this.handleChange}
              placeholder="Enter your graduation month..."
            /> */}
            <select
              name="edu_status"
              value={this.state.month}
              onChange={this.handleChange}
            >
              <option value="" disabled>
                Select month
              </option>
              <option value="Jan">Jan</option>
              <option value="Feb">Feb</option>
              <option value="Mar">Mar</option>
              <option value="Apr">Apr</option>
              <option value="May">May</option>
              <option value="Jun">Jun</option>
              <option value="Jul">Jul</option>
              <option value="Aug">Aug</option>
              <option value="Sep">Sep</option>
              <option value="Oct">Oct</option>
              <option value="Nov">Nov</option>
              <option value="Dec">Dec</option>
            </select>
          </div>
          <br />
          <div>
            <label>Graduation Year:</label>
            {/* <input
              name="year"
              value={this.state.year}
              onChange={this.handleChange}
              placeholder="Enter your graduation year..."
            /> */}
            <select
              name="edu_status"
              value={this.state.month}
              onChange={this.handleChange}
            >
              <option value="" disabled>
                Select year
              </option>
              <option value={currentYr}>{currentYr}</option>
              <option value={currentYr + 1}>{currentYr + 1}</option>
              <option value={currentYr + 2}>{currentYr + 2}</option>
              <option value={currentYr + 3}>{currentYr + 3}</option>
              <option value={currentYr + 4}>{currentYr + 4}</option>
              <option value={currentYr + 5}>{currentYr + 5}</option>
              <option value={currentYr + 6}>{currentYr + 6}</option>
            </select>
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

RegisterUser.propTypes = {
  addUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { addUser }
)(RegisterUser);
