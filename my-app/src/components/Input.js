import React, { useState } from "react";
import "../pages/Login/Login.css";
import "../components/Input.css";

const Input = (props) => {
  return (
    <div className="input-div">
      <label>{props.name}</label>
      <input
        type={props.type}
        // value=""
        // onChange={(e) => setUsername(e.target.value)}
        required
      />
    </div>
  );
};

export default Input;
