import React, { useState } from "react";
import "./Css/Loginsignup.css";
const LoginSignup = () => {
  const [state, setState] = useState(true);
  return (
    <div className="loginsignup">
      <div
        className={`loginsignup-container ${state ? "login-container" : ""}`}
      >
        <h1>{state ? "Login In" : "Sign Up"}</h1>
        <div className="loginsignup-feilds">
          {!state && <input type="text" placeholder="Your Name" />}
          <input type="text" placeholder="Email Address" />
          <input type="text" placeholder="Password" />
        </div>
        <button>Continue</button>
        <p className="loginsignup-login">
          {state ? "Dont't" : "Already"} have account?
          <span onClick={() => setState(!state)}>
            {state ? "Sign Up" : "Login Here"}
          </span>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use and private policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
