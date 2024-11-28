import React, { useState } from "react";
import "./Login.css";
import Input from "../../components/Input";

const Login = () => {
  return (
    <div className="div">
      <div className="box">
        <div className="logo">
          <h1>Logo</h1>
        </div>

        <div className="header">
          <h1>Welcome Back!</h1>
          <p>Please enter your details</p>
        </div>

        <div className="inputs">
          <Input name="Username" type="text" />

          <Input name="Password" type="password" />
        </div>
        <div className="btn">
          <button>Log In</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
