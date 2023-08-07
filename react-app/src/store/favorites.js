//* =====================  types ===========================//

const GET_USER_FAVORITES_ACTION = "favorites/GET_USER_FAVORITES_ACTION";
const POST_FAVORITE_PRODUCT_ACTION = "favorites/POST_FAVORITE_PRODUCT_ACTION";
const DELETE_FAVORITE_ACTION = "favorites/DELETE_FAVORITE_ACTION";

//*  ===================end of types ===================//

//? =====================  actions ===========================//

const getUserFavoritesAction = (favs) => {
  return {
    type: GET_USER_FAVORITES_ACTION,
    favs,
  };
};

const deleteFavoriteAction = (productId) => {
  return {
    type: DELETE_FAVORITE_ACTION,
    productId,
  };
};

const postFavoriteProductAction = (res) => {
  return {
    type: POST_FAVORITE_PRODUCT_ACTION,
    res,
  };
};

//?  ======================= end of actions ===================//

//*  =====================  thunks ===========================//

export const thunkGetUserFavorites = (userId) => async (dispatch) => {
  let favs = await fetch(`/api/favorites/current`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  favs = await favs.json();
  dispatch(getUserFavoritesAction(favs));
  return favs;
};

export const thunkPostFavoriteProduct =
  (productId, userId) => async (dispatch) => {
    let res = await fetch(`/api/products/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        productId,
      }),
    });
    res = await res.json();
    dispatch(postFavoriteProductAction(res));
    return res;
  };

export const thunkDeleteFavorite = (productId) => async (dispatch) => {
  let product = await fetch(`/api/favorites/${productId}`, {
    method: "DELETE",
  });
  product = await product.json();
  dispatch(deleteFavoriteAction(productId));
  return product;
};

//*  ======================= end of thunks ===================//

//? ================== reducer================================//

/** State:
 favorites: {
      user: {
        userData
      },
      userFavorites: {
        [productId]: {
            productData
            seller: { sellerInfo }
        }
      }
    }
 */

let initialState = { user: {}, userFavorites: {} };
export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_USER_FAVORITES_ACTION: {
      newState = { ...state };
      // console.log("this is the favs in the reducer =======>", action.favs);
      // action.favs.Favorites.Products.forEach(
      //   (product) => (newState.userFavorites[product.id] = { ...product })
      // );
      newState.userFavorites = { ...action.favs.Favorites };
      newState.user = { ...action.favs.User };
      return newState;
    }
    case POST_FAVORITE_PRODUCT_ACTION: {
      newState = { ...state };
      newState.user = action.res.User;
      // console.log(action.res)
      newState.userFavorites[action.res.Product.id] = { "Seller": action.res.Seller, ...action.res.Product };
      return newState;
    }
    case DELETE_FAVORITE_ACTION: {
      newState = { ...state };
      // below line is to get userFavorites to load correctly, odd bug fix
      newState.userFavorites = { ...newState.userFavorites };
      delete newState.userFavorites[action.productId];
      return newState;
    }
    default:
      return state;
  }
}
