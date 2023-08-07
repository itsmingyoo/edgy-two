import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";
// import { clearCartAction } from "../../store/shoppingCart"

import './Navigation.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    // dispatch(clearCartAction());
    closeMenu();
    history.push('/')
  };

  const ulClassName = (showMenu ? "profile-dropdown" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
    {user ?
    <>
      <i onClick={openMenu} class="fa-solid fa-user"></i>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <div onClick={(e) => history.push('/your_reviews')} className="yR">
              <p className="yourReviews">Your Reviews</p>
            </div>
            <div onClick={(e) => history.push('/your_products')} className="yP">
              <p className="yourProducts">Your Products</p>
            </div>
            <p id="logout">
              <p onClick={handleLogout}>Log Out</p>
            </p>
          </>
        ) : ( null )}
      </div>
    </>
      :
      <OpenModalButton
          buttonText="Sign In"
          modalComponent={<LoginFormModal />}
      />}
    </>
  );
}

export default ProfileButton;
