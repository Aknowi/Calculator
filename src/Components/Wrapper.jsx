import "../index.css";
import React, { Components, PropTypes } from "react";

function Wrapper({ children }) {
  return <div className="wrapper">{children}</div>;
}

export default Wrapper;
