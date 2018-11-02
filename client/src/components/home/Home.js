import React, { Component } from "react";
import { NavLink } from "react-router-dom";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
import medical_img1 from "../../assets/images/medical/medical_img1.jpg";
import medical_img2 from "../../assets/images/medical/medical_img2.jpg";
import medical_img3 from "../../assets/images/medical/medical_img3.jpg";

class Home extends Component {
  state = {
    posY: 0
  };

  componentDidMount() {
    window.addEventListener("scroll", this.parralax);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.parralax);
  }

  parralax = () => {
    const scrollTop = window.scrollY;
    const speed = 0.33;
    const posY = scrollTop * speed;
    this.setState({posY: posY})
    // console.log(document.querySelector(".parralax-bg"));
    // document.querySelector(".parralax-bg").style.backgroundY = ;
  };

  // var wScroll = $(window).scrollTop();
  // var speed = 0.33;
  // var total = wScroll * speed;
  // $(".parralax-bg").css("background-position-y", "calc(14% + " + total + "px)");

  render() {
    return (
      <div>
        {/* MAIN HEADER */}
        <header>
          <div style={{backgroundPositionY: this.state.posY}} className="header-row parralax-bg" id="header-row">
            <div id="inner-box">
              <h1>
                Providing Quality U.S.
                <br />
                Medical Rotations
              </h1>
              <NavLink to="/register" className="button ac">
                Enroll Now
              </NavLink>
            </div>
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
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non
          cupiditate sequi aut explicabo aliquam, nam. Veniam placeat, est
          dolorem. Optio error, iste commodi dignissimos nostrum quos voluptatum
          culpa! Quasi hic doloremque, et ratione necessitatibus animi, libero
          fugiat nobis dolor cum nisi natus consequatur culpa soluta illum
          aliquid cupiditate, reprehenderit numquam quis voluptates distinctio
          voluptatum minima saepe quo. Excepturi laudantium totam, quibusdam
          sit, dolore vitae sapiente officia autem blanditiis officiis alias,
          doloribus quasi qui! Odio doloremque, quam cum, maxime harum dolor
          iure laudantium excepturi eum ab eius debitis quisquam, maiores, sint
          quo dolorem totam. Quam nostrum deleniti sequi ipsum recusandae, quasi
          enim quibusdam, hic tempore dolore id ratione soluta itaque laudantium
          accusamus perspiciatis, natus doloremque accusantium exercitationem
          quidem ipsam distinctio quas maiores consectetur! Numquam eveniet
          optio quo porro quibusdam, obcaecati asperiores dicta magnam adipisci
          dolorum molestiae, sunt eos ipsam doloremque tempora et blanditiis
          dolor voluptas sapiente provident quia a in expedita non culpa. Omnis
          consequatur dolore minima quis, deserunt adipisci, porro rerum ad iure
          ea unde nobis distinctio, velit cum quod enim ipsum, sint! Expedita
          aliquid, harum minus cum enim rerum dolorem quia obcaecati minima
          nihil at suscipit autem assumenda consectetur magnam doloremque veniam
          non cumque. Earum, eos. Velit culpa minima a cum delectus, ipsam
          similique perspiciatis hic maxime sit suscipit rem possimus ipsa
          recusandae dignissimos sequi voluptas autem perferendis, et quibusdam!
          Quos, asperiores impedit reprehenderit totam! Ipsa ullam earum,
          obcaecati omnis magni? Culpa cum, temporibus dignissimos ducimus ex
          eligendi quos. Non, illum, reiciendis explicabo, nesciunt debitis
          omnis voluptatum vel ipsa consequuntur, sit mollitia ut assumenda
          obcaecati quod illo! Laudantium ipsa ipsam, aliquid aliquam
          voluptatibus ratione ex, tempore vitae recusandae omnis expedita
          voluptas accusamus repellat autem possimus iusto, id harum sit
          inventore sed suscipit. Rerum odio ratione porro, saepe alias
          blanditiis, magnam corporis. Quos possimus quaerat minima maxime,
          itaque nemo modi nulla similique nisi, quibusdam dolor quae hic
          cupiditate dolorem, nobis quasi laudantium exercitationem dolorum
          omnis excepturi ex voluptate perspiciatis.
        </p>
      </div>
    );
  }
}

export default Home;
