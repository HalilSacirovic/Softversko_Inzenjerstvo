import React, { useState } from "react";
import "../pages/Login/Login.css";
import "../components/Input.css";

const Input = (props) => {
  return (
    <div className="input-div">
      <label>{props.name}</label>
      <input
        type={props.type}
        name={props.name}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.values.email}
        // value=""
        // onChange={(e) => setUsername(e.target.value)}
      />
    </div>
  );
};

export default Input;
