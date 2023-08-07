import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as favoriteActions from '../../store/favorites'

function FavoriteButton({ productId, handleUnfavoriteClick, handleFavoriteClick, initialState}) {
  const [solid, setSolid] = useState(initialState);
  const dispatch = useDispatch
  const currentUser = useSelector(state => state.session.user)
  let userFavorites = useSelector((state) =>
    Object.values(state.favorites.userFavorites)
  );
  const { userProducts } = useSelector((state) => state.products);

  let seller = Object.values(userProducts)

  const handleFavorite = (productId) => {

    for (let favs of userFavorites) {
      if (favs.id === productId) setSolid(true)
    }

    if (!currentUser) {
      alert("Need to be logged in to favorite!")
      return;
    }

    for (let s of seller) {
      if (s.id == productId) {
        alert("Cannot like your own product!")
        return;
      }

    }

    if (solid === false) {
      setSolid(!solid);
      handleFavoriteClick(productId);
    } else {
      setSolid(!solid);
      handleUnfavoriteClick(productId);
    }
  };


  return (
    <div onClick={() => handleFavorite(productId)}
    id="favorite-icon__container">
      <i
        className={solid || userFavorites.filter(favs => favs.id === productId).length ? `fa-solid fa-heart` : `fa-regular fa-heart`}
      ></i>
    </div>

  );
}
export default FavoriteButton;
