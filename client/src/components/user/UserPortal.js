import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { getUserInfo, updateUserInfo } from "../../actions/userActions";

class UserPortal extends PureComponent {
  state = {
    fetched: false,
    name_first: "",
    name_last: "",
    email: "",
    address_street: "",
    address_unit: "",
    address_city: "",
    address_state: "",
    address_zip: "",
    address_country: "",
    phone: "",
    school: "",
    edu_status: "",
    grad_month: "",
    grad_year: ""
  };

  // componentDidUpdate(/*prevProps, prevState*/) {
  //   if (!this.props.user.isLogged && !this.props.user.authenticating) {
  //     this.context.router.history.push('/')
  //   }
  // }

  componentDidMount() {
    if (!this.props.isAUthenticated) {
      this.context.router.history.push("/");
    }

    const { getUserInfo } = this.props;
    getUserInfo(this.props.userId);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user.user.email !== prevState.email) {
      return {
        name_first: nextProps.user.user.name_first,
        name_last: nextProps.user.user.name_last,
        email: nextProps.user.user.email,
        address_street: nextProps.user.user.address_street,
        address_unit: nextProps.user.user.address_unit,
        address_city: nextProps.user.user.address_city,
        address_state: nextProps.user.user.address_state,
        address_zip: nextProps.user.user.address_zip,
        address_country: nextProps.user.user.address_country,
        phone: nextProps.user.user.phone,
        school: nextProps.user.user.school,
        edu_status: nextProps.user.user.edu_status,
        grad_month: nextProps.user.user.grad_month,
        grad_year: nextProps.user.user.grad_year
      };
    } else return null;
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const userData = {
      name_first: this.state.name_first,
      name_last: this.state.name_last,
      email: this.state.email,
      address_street: this.state.address_street,
      address_unit: this.state.address_unit,
      address_city: this.state.address_city,
      address_state: this.state.address_state,
      address_zip: this.state.address_zip,
      address_country: this.state.address_country,
      phone: this.state.phone,
      school: this.state.school,
      edu_status: this.state.edu_status,
      grad_month: this.state.grad_month,
      grad_year: this.state.grad_year
    };
    // console.log(userData);
    this.props.updateUserInfo(this.props.userId, userData);
  };

  render() {
    if (!this.props.userId) this.props.history.push("/user/login");
    return (
      <div className="topMargin leftMargin">
        <h2>User Portal</h2>
        <p>You have reached the User Portal.</p>
        <NavLink to="/user/password">Change Password</NavLink>
        <br />
        <h3>View User Information:</h3>
        <br />
        <form onSubmit={this.handleSubmit}>
          <h4>Personal:</h4>
          <div className="userInfoRow">
            <div className="userInfoVar">
              <b>First Name:</b>
            </div>
            <div className="userInfoVal">
              <input
                type="text"
                name="name_first"
                onChange={this.handleChange}
                value={this.state.name_first}
              />
            </div>
          </div>
          <div className="userInfoRow">
            <div className="userInfoVar">
              <b>Last Name:</b>
            </div>
            <div className="userInfoVal">
              <input
                type="text"
                name="name_last"
                onChange={this.handleChange}
                value={this.state.name_last}
              />
            </div>
          </div>
          <div className="userInfoRow">
            <div className="userInfoVar">
              <b>Email:</b>
            </div>
            <div className="userInfoVal">
              <input
                type="text"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </div>
          </div>
          <div className="userInfoRow">
            <div className="userInfoVar">
              <b>Street:</b>
            </div>
            <div className="userInfoVal">
              <input
                type="text"
                name="address_street"
                onChange={this.handleChange}
                value={this.state.address_street}
              />
            </div>
          </div>
          <div className="userInfoRow">
            <div className="userInfoVar">
              <b>Unit:</b>
            </div>
            <div className="userInfoVal">
              <input
                type="text"
                name="address_unit"
                onChange={this.handleChange}
                value={this.state.address_unit}
              />
            </div>
          </div>
          <div className="userInfoRow">
            <div className="userInfoVar">
              <b>City:</b>
            </div>
            <div className="userInfoVal">
              <input
                type="text"
                name="address_city"
                onChange={this.handleChange}
                value={this.state.address_city}
              />
            </div>
          </div>
          <div className="userInfoRow">
            <div className="userInfoVar">
              <b>State:</b>
            </div>
            <div className="userInfoVal">
              <input
                type="text"
                name="address_state"
                onChange={this.handleChange}
                value={this.state.address_state}
              />
            </div>
          </div>
          <div className="userInfoRow">
            <div className="userInfoVar">
              <b>Zip:</b>
            </div>
            <div className="userInfoVal">
              <input
                type="text"
                name="address_zip"
                onChange={this.handleChange}
                value={this.state.address_zip}
              />
            </div>
          </div>
          <div className="userInfoRow">
            <div className="userInfoVar">
              <b>Country:</b>
            </div>
            <div className="userInfoVal">
              <input
                type="text"
                name="address_country"
                onChange={this.handleChange}
                value={this.state.address_country}
              />
            </div>
          </div>
          <div className="userInfoRow">
            <div className="userInfoVar">
              <b>Phone:</b>
            </div>
            <div className="userInfoVal">
              <input
                type="text"
                name="phone"
                onChange={this.handleChange}
                value={this.state.phone}
              />
            </div>
          </div>
          <br />
          <h4>Educational Info:</h4>
          <div className="userInfoRow">
            <div className="userInfoVar">
              <b>School:</b>
            </div>
            <div className="userInfoVal">
              <input
                type="text"
                name="school"
                onChange={this.handleChange}
                value={this.state.school}
              />
            </div>
          </div>
          <div className="userInfoRow">
            <div className="userInfoVar">
              <b>Educational Status:</b>
            </div>
            <div className="userInfoVal">
              <input
                type="text"
                name="edu_status"
                onChange={this.handleChange}
                value={this.state.edu_status}
              />
            </div>
          </div>
          <div className="userInfoRow">
            <div className="userInfoVar">
              <b>Graduation Month:</b>
            </div>
            <div className="userInfoVal">
              <input
                type="text"
                name="grad_month"
                onChange={this.handleChange}
                value={this.state.grad_month}
              />
            </div>
          </div>
          <div className="userInfoRow">
            <div className="userInfoVar">
              <b>Graduation Year:</b>
            </div>
            <div className="userInfoVal">
              <input
                type="text"
                name="grad_year"
                onChange={this.handleChange}
                value={this.state.grad_year}
              />
            </div>
          </div>
          <br />
          <button type="submit">Update Changes</button>
        </form>
      </div>
    );
  }
}

UserPortal.propTypes = {
  userId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  updateUserInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userId: state.auth.user.sub,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUserInfo, updateUserInfo }
)(UserPortal);
