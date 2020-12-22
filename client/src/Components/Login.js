/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../assets/images/my_unsplash_logo.svg";

function Login() {
  const history = useHistory();
  const [confirmed, setConfirmed] = useState(null);
  const [field, setField] = useState("");

  const user = {
    username: field,
  };

  useEffect(() => {
    if (confirmed) {
      history.push("images");
      localStorage.setItem("name_unsplash", field);
    } else if (localStorage.getItem("name_unsplash")) {
      history.push("images");
    }
  }, [confirmed]);

  // verify if the user.username exist in mongodb
  function checkIfAlreadyExist() {
    // endpoint to get a user by username in mongodb
    fetch("http://localhost:3000/api/get", {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify(user),
    })
      .then((res) => res.text())
      .then((data) => {
        createUser(data);
      });
  }

  // if name not exist in mongodb, create a user
  function createUser(data) {
    if (!data) {
      // endpoint to add a user by username in mongodb
      fetch("http://localhost:3000/api/add/user", {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify(user),
      }).then((res) => {
        res.ok ? setConfirmed(true) : setConfirmed(false);
      });
    } else {
      return;
    }
  }

  function getInputValue(event) {
    const inputValue = event.target.value;
    setField(inputValue);
  }

  return (
    <section>
      <div className="login-container">
        <div className="login-content">
          <img className="logo-name" alt="logo my-unsplash" src={Logo}></img>
          <div className="inputs-login">
            <label htmlFor="label-field">Name :</label>
            <input
              id="label-field"
              type="text"
              placeholder="Name your unsplash..."
              onInput={getInputValue}
              name="label"
              maxLength="20"
              autoComplete="off"
            ></input>
          </div>
          <div className="confirm-buttons">
            <button onClick={checkIfAlreadyExist} className="confirm-button">
              Register
            </button>
          </div>
          <span>* Please dont use any personal data here</span>
        </div>
      </div>
    </section>
  );
}

export default Login;
