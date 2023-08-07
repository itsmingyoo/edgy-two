import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import * as sessionActions from "../../store/session";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  const handleDemoSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  return (
    <>
      {/* <div className="loginStyle"> */}
      <div className="login-signup__buttons">
        <h1>Log In</h1>
        <OpenModalButton
          buttonText="Register"
          modalComponent={<SignupFormModal />}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="input-group">
          <input
            className="signup-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="user-label">Email</label>
        </div>

        <div className="input-group">
          <input
            className="signup-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="user-label">Password</label>
        </div>
        <button id="SignInButton" type="submit">
          Sign In
        </button>
      </form>
      <form onSubmit={handleDemoSubmit}>
        <button id="Demo-user" type="submit">
          DemoUser
        </button>
      </form>
      {/* </div> */}
    </>
  );
}

export default LoginFormModal;
