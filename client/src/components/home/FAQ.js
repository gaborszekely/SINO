import React from "react";

const FAQ = props => {
  return (
    <div className="topMargin">
      <center>
        <h2>Frequently Asked Questions</h2>
      </center>
      <div className="faqContainer">
        <div className="faqImgContainer">
          <img
            src="https://img1.wsimg.com/isteam/stock/10792/:/rs=w:400,cg:true,m"
            alt="FAQ"
            className="faqImg"
          />
        </div>

        <div className="faq">
          <h3>What is included in your rotational packages?</h3>
          <p>
            Each package comes with a full rotational schedule along with Visa
            paperwork, placements set up in advance and evaluations. We also
            offer an optional USMLE test prep package for students needing help
            preparing for their licensing exams.
          </p>
          <br />

          <h3>What types of rotations do you offer?</h3>
          <p>
            We currently offer rotations for all core categories as well as a
            number of sub-specialties including psychiatry, geriatrics and
            cardiology.
          </p>
          <br />

          <h3>Do you offer rotations for core categories?</h3>
          <p>
            Yes, we currently offer rotations for all core categories including
            family medicine, emergency medicine, internal medicine, psychiatry,
            and OB/GYN.
          </p>
          <br />

          <h3>What about for electives?</h3>
          <p>
            As for electives, we currently offer rotations in sub-specialties
            including cardiology, pain management, geriatrics, addiction
            medicine, among others.
          </p>
          <br />

          <h3>Do you offer help with Visa placement?</h3>
          <p>
            Yes, we are partnered with immigration attorneys that will take care
            of your Visa application for you and make sure your travel plans are
            secure.
          </p>
          <br />

          <h3>What is your return policy?</h3>
          <p>
            Unlike our competitors, we are willing to offer a refund for any
            individual unused rotational packages.
          </p>
          <br />
        </div>
      </div>
    </div>
  );
};

export default FAQ;
