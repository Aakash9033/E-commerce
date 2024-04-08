import React, { useState } from "react";
import "./Css/Loginsignup.css";
const LoginSignup = () => {
  const [state, setState] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const login = async () => {
    console.log("login executed", formData);
    let responsedata;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => (responsedata = data));
    if (responsedata.Success) {
      localStorage.setItem("auth-token", responsedata.token);
      window.location.replace("/");
    } else {
      alert(responsedata.errors);
    }
  };
  const signup = async () => {
    console.log("signup executed", formData);
    let responsedata;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => (responsedata = data));
    if (responsedata.Success) {
      localStorage.setItem("auth-token", responsedata.token);
      window.location.replace("/");
    } else {
      alert(responsedata.errors);
    }
  };
  return (
    <div className="loginsignup">
      <div
        className={`loginsignup-container ${state ? "login-container" : ""}`}
      >
        <h1>{state ? "Login In" : "Sign Up"}</h1>
        <div className="loginsignup-feilds">
          {!state && (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={changeHandler}
              placeholder="Your Name"
              required
            />
          )}
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Email Address"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            placeholder="Password"
            required
          />
        </div>
        <button
          onClick={() => {
            state ? login() : signup();
          }}
        >
          Continue
        </button>
        <p className="loginsignup-login">
          {state ? "Dont't" : "Already"} have account?
          <span onClick={() => setState(!state)}>
            {state ? "Sign Up" : "Login Here"}
          </span>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" required />
          <p>By continuing, i agree to the terms of use and private policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
