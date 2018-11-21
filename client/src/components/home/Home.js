import React, { Component } from "react";
import { NavLink } from "react-router-dom";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
import medical_img1 from "../../assets/images/medical/medical_img1.jpg";
import medical_img2 from "../../assets/images/medical/medical_img2.jpg";
import medical_img3 from "../../assets/images/medical/medical_img3.jpg";

class Home extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.imgRef = React.createRef();
    this.innerRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("scroll", this.parralax);
    window.addEventListener("scroll", this.textParralax);
    window.addEventListener("scroll", this.textFade);
    // console.log(document.getElementById("header-row").offsetHeight);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.parralax);
    window.removeEventListener("scroll", this.textParralax);
    window.removeEventListener("scroll", this.textFade);
  }

  parralax = () => {
    const scrollTop = window.scrollY * 0.33;
    this.imgRef.current.style.backgroundPositionY = `${scrollTop}px`;
  };

  textParralax = () => {
    const scrollTop = window.scrollY * 0.5;
    this.innerRef.current.style.top = `${scrollTop}px`;
  };

  textFade = () => {
    const scrollTop = window.scrollY;
    const opacity = 1 - scrollTop / 700;
    this.innerRef.current.style.opacity = opacity;
  };

  render() {
    return (
      <div>
        {/* MAIN HEADER */}
        <header className="parralax-bg" id="header-row" ref={this.imgRef}>
          <div id="inner-box" ref={this.innerRef}>
            <h1>
              Providing Quality U.S.
              <br />
              Medical Rotations
            </h1>
            <NavLink to="/register" className="button">
              Enroll Now
            </NavLink>
          </div>
        </header>
        {/* ABOUT US */}
        <section className="mainsection">
          <h2>About Us</h2>
          <div className="abContainer">
            <div className="abColumn">
              <img className="abImage1" alt="Medical 1" src={medical_img1} />
              {/* <div class="abImg abImg1"></div> */}
              <h3>Who Are We?</h3>
              <p>
                We are a medical services company that specializes in preparing
                M.D. and nursing students for graduation and licensing in the
                U.S. For more info, please see our "About Us" section.
              </p>
              <a className="blueButton" href="www.google.com">
                About Us
              </a>
            </div>
            <div className="abColumn">
              <img className="abImage2" alt="Medical 2" src={medical_img2} />
              {/* <div class="abImg abImg2"></div>*/}
              <h3>What Do We Offer?</h3>
              <p>
                Here at Sino, we offer a wide range of services including
                connections to high-quality doctors for medical rotations as
                well as test preparation for students taking the USMLE licensing
                exam.
              </p>
              <a className="blueButton" href="www.google.com">
                Our Services
              </a>
            </div>
            <div className="abColumn">
              <img className="abImage3" alt="Medical 3" src={medical_img3} />
              {/* <div class="abImg abImg3"></div>*/}
              <h3>Why Us?</h3>
              <p>
                Our exclusive connections to medical practitioners and
                state-of-the-art medical facilities will offer you a once in a
                lifetime opportunity to develop your medical skills and learn
                from the best.
              </p>
              <a className="blueButton" href="www.google.com">
                Learn More
              </a>
            </div>
          </div>
        </section>
        <section className="mainsection">
          <h2>Contact Us</h2>
        </section>
        <section>Subscribe</section>
        <section>Social</section>
      </div>
    );
  }
}

export default Home;
