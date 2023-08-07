// SignupFormModal/index.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    // error handlers onSubmit
    // backend already returns custom ones for email/username
    const errObj = {};
    // cannot be empty - 'required' attribute handles these, so you need to handle edge cases like password length of 1
    // if (first_name === "") errObj.first_name = "First name is required.";
    // if (last_name === "") errObj.last_name = "Last name is required.";
    // if (password === "" || confirmPassword === "")
    //   errObj.password = "Password is required.";
    // if (username === "") errObj.username = "Username is required.";
    // if (email === "") errObj.email = "Email is required.";

    // Edge Case Error handlers
    // if (first_name === "") errObj.first_name = "First name is required.";
    // if (last_name === "") errObj.last_name = "Last name is required.";
    if (password !== confirmPassword)
      errObj.password =
        "Confirm Password field must be the same as the Password field";
    if (password.length < 6 || confirmPassword.length < 6)
      errObj.password = "Password requires a minimum of 6 characters.";
    if (username.length < 6)
      errObj.username = "Username requires a minimum of 6 characters.";
    if (email.length < 6)
      errObj.email = "Email requires a minimum of 6 characters.";
    if (email.length > 32)
      errObj.email = "Email requires a minimum of 6 characters.";
    if (!email.includes("@")) errObj.email = "Invalid email.";
    if (username.includes(" "))
      errObj.username = "Username cannot have a space.";
    if (password.includes(" ") || confirmPassword.includes(" "))
      errObj.password = "Password can contain unique characters but no space.";
    if (username.length > 32)
      errObj.username = "Username must be between 6 and 32 characters";
    if (first_name.length > 32)
      errObj.first_name = "First name can be up to 32 characters";
    if (last_name.length > 32)
      errObj.last_name = "Last name can be up to 32 characters";
    if (first_name.includes(" "))
      errObj.first_name = "First name cannot include spaces";
    if (last_name.includes(" "))
      errObj.last_name = "Last name cannot include spaces";

    // setErrors if there are any
    if (Object.values(errObj).length > 0) {
      //   setSubmitted(false);
      return setErrors(errObj);
    }

    if (password === confirmPassword) {
      const data = await dispatch(
        signUp(username, email, password, first_name, last_name)
      );
      if (data) {
        setErrors(data);
      } else {
        closeModal();
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };
  return (
    <>
      <h1 id="signup-text">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {/* <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul> */}
        <div className="input-group">
          <input
            className="signup-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="user-label">
            Email
            {submitted && errors.email && (
              <div className="errors">{errors.email}</div>
            )}
          </label>
        </div>

        <div className="input-group">
          <input
            className="signup-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label className="user-label">
            Username
            {submitted && errors.username && (
              <div className="errors">{errors.username}</div>
            )}
          </label>
        </div>

        <div className="input-group">
          <input
            className="signup-input"
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label className="user-label">
            First Name
            {submitted && errors.first_name && (
              <div className="errors">{errors.first_name}</div>
            )}
          </label>
        </div>

        <div className="input-group">
          <input
            className="signup-input"
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <label className="user-label">
            Last Name
            {submitted && errors.last_name && (
              <div className="errors">{errors.last_name}</div>
            )}
          </label>
        </div>

        <div className="input-group">
          <input
            className="signup-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="user-label">
            Password
            {submitted && errors.password && (
              <div className="errors">{errors.password}</div>
            )}
          </label>
        </div>

        <div className="input-group">
          <input
            className="signup-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label className="user-label">
            Confirm Password
            {submitted && errors.confirmPassword && (
              <div className="errors">{errors.confirmPassword}</div>
            )}
          </label>
        </div>
        <div>
          <button
            type="submit"
            id="signup-modal-button"
            className="PID-cartButt"
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
}
export default SignupFormModal;
