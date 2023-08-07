import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { thunkGetUserFavorites } from "../../store/favorites";
import { useState } from "react";
import FavoriteButton from "./FavoritesButton";
import * as favoriteActions from "../../store/favorites";
import "../Navigation/Navigation.css";
import "./FavoritesPage.css";
import FooterTwo from "../Footer/index2";
import SimilarFavoritesCard from "./SimilarFavorites";

function FavoritesPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [ searching, setSearching ] = useState(null)
  let userFavorites = useSelector((state) =>
    Object.values(state.favorites.userFavorites)
  );
  const history = useHistory()

  const handleFavoriteClick = (productId) => {
    dispatch(favoriteActions.thunkPostFavoriteProduct(productId));
  };

  const handleUnfavoriteClick = (productId) => {
    dispatch(favoriteActions.thunkDeleteFavorite(productId));
  };

  useEffect(() => {
    dispatch(thunkGetUserFavorites(user.id));
  }, [user.id, dispatch]);

  if (searching) userFavorites = userFavorites.filter((p) => p.item_name.toLowerCase().includes(searching.toLowerCase()))

  // console.log(userFavorites)

  return (
    <div className='favsPage'>
    <div id="favorites__main-container">
      {/* Can be one component for user-options-sales */}
      <div id="user-details__container">
        {/* image is a span so it can be on the left of the div containing the user options and user sales */}
        <div id="user-options">
          <div id="user-options-pfp">
            <img
              src="https://images.all-free-download.com/images/graphiclarge/testing_with_magnifier_185604.jpg"
              alt="user pfp or they can have the option to choose a pfp by clicking this"
              id="test-img"
            ></img>
          </div>
          {/* Name should be a modal button to open up popup that allows the user to click on an edit public profile button to redirect them to their edit profile page */}
          <div id="user-options__name-profile">
            <div className="profileName">{user.first_name}</div>
            <div className="editProfile">
              <NavLink to="">Edit public profile</NavLink>
              <NavLink to="">About</NavLink>
            </div>
          </div>
        </div>

        {/* <div id="user-sales">
          {/* Links to the user's listed items page */}
          {/* <NavLink to="">t3mr4pewz0u1pcee</NavLink> */}
          {/* Links to # of user sales page */}
          {/* <NavLink to="">0 Sales</NavLink> */}
        {/* </div> */}
      </div>

      {/* Can be one component for user-search-bar */}

      {userFavorites.length || !userFavorites.length && searching ? <div id="user-search-favorites__container">

        <div id="user-favorites__count">
          Favorite items <span id="numberFavs">{userFavorites.length} items</span>
        </div>
        <div id="user-favorites__search">
          {searching && <p>"{searching}"</p>}
          <input
           onKeyDown={(e) => {
            if (e.key === "Enter") {
            setSearching(e.target.value);
             }
            }}
            type="type"
            placeholder="Search Your Favorites"
            id="search-favorites"
          ></input>
          <button id="search-button">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div> : <div></div>}

      <div id="user-favorites__container">
        {userFavorites?.map((fav) => (
          <>
            <div key={fav?.item_name} id={`favorite-product`}>
              <div id="container-container">
                <FavoriteButton
                  onClick={() => handleUnfavoriteClick(fav.id)}
                  productId={fav.id}
                  handleUnfavoriteClick={handleUnfavoriteClick}
                  handleFavoriteClick={handleFavoriteClick}
                  initialState={true}
                />
              </div>
              <div id="fav-img__container">
                <img
                  onClick={((e) =>history.push(`/products/${fav.id}`))}
                  src={fav.preview_imageURL}
                  alt={`productId-${fav.productId}`}
                  id="product-img"
                />
              </div>

              <h3 onClick={((e) =>history.push(`/products/${fav.id}`))} id="fav-item__name">{fav.item_name}</h3>
              <div onClick={((e) =>history.push(`/products/${fav.id}`))} id="fav-item__username">{fav.Seller.first_name} {fav.Seller.last_name}</div>
              <p onClick={((e) =>history.push(`/products/${fav.id}`))} id="fav-item__price">
                <span id="fav-item__currency-symbol">$</span>
                <span id="fav-item__currency-value">{fav.price}</span>
              </p>
            </div>
          </>
        ))}
      </div>
        {!userFavorites.length && !searching?
        <>
        <div className="nothingToSee">
        <div className="clipFavs">
        <i class="fa-solid fa-clipboard"></i>
        </div>
          <h2>Nothing to see here yet</h2>
          <p>Start favoriting items to compare, shop, and keep track of things you love.</p>
        </div>
        </>
        : null}
            {!userFavorites.length && searching?
        <>
          <h2>None</h2>
        </>
        : null}
    </div>
    <div className="border"></div>
    {userFavorites.length ? <SimilarFavoritesCard favs={userFavorites} /> : null }
    <FooterTwo />
    </div>
  );
}

export default FavoritesPage;
