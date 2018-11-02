import React from "react";
import loaderSrc from "../assets/images/loader_blue3.gif";

const Loader = () => {
  return (
    <div>
      <img src={loaderSrc} className="loader" alt="Loader icon" />
    </div>
  );
};

export default Loader;
