import React from "react";

const Footer = props => {
  return (
    <div className="footer">
      <div className="footer-parent">
        <div className="footer-children">
          <p>Copyright © 2018 Sino Medical - All Rights Reserved.</p>
        </div>
        <div className="footer-children">
          <p>
            Powered by{" "}
            <a href="http://www.google.com" className="link smallLink">
              Reactive Web Design
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
