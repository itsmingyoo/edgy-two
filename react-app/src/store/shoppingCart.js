//? =====================  types ===========================//

const GET_SHOPPING_CART = "shoppingCart/GET_SHOPPING_CART";
const DELETE_CART_ITEM = "shoppingCart/DELETE_CART_ITEM";
const POST_ITEM_IN_CART = "shoppingCart/POST_ITEM_IN_CART";
// const CLEAR_USER_CART = "shoppingCart/CLEAR_USER_CART";

//?  ===================end of types ===================//

//* =====================  actions ===========================//

const getShoppingCartAction = (cart) => {
  return {
    type: GET_SHOPPING_CART,
    cart,
  };
};

const deleteShoppingCartAction = (productId) => {
  return {
    type: DELETE_CART_ITEM,
    productId,
  };
};

const postItemInCartAction = (res) => {
  return {
    type: POST_ITEM_IN_CART,
    res,
  };
};

// export const clearCartAction = () => {
//   return {
//     type: CLEAR_USER_CART,
//   };
// };
//*  ======================= end of actions ===================//

//*  =====================  thunks ===========================//
//fetch route needs to match route from route file

export const thunkGetShoppingCart = () => async (dispatch) => {
  let current_cart = await fetch(`/api/carts/shopping_cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  current_cart = await current_cart.json();
  //console.log("THIS IS CURRENT CART THUNK", current_cart)
  dispatch(getShoppingCartAction(current_cart));
  return current_cart;
};

export const thunkDeleteCartItem = (productId) => async (dispatch) => {
  // console.log(productId);
  let product = await fetch(`/api/carts/shopping_cart/${productId}`, {
    method: "DELETE",
  });
  product = await product.json();
  // console.log("THIS IS DELETE THUNK", product, productId);
  await dispatch(deleteShoppingCartAction(productId));
  return product;
};

//ORIGINAL BELOW
// export const thunkPostItemInCart = (productId, userId) => async (dispatch) => {
//   console.log("WHAT IS THIS IN thunkPOSTCartItem", productId)
//   let product = await fetch(`/api/products/${productId}/add_to_cart`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       productId,
//       userId,
//     }),
//     // console.log('THIS IS PRODUCT', product)
//   });
//   product = await product.json();
//   console.log('WHAT IS PRODUCT THAT WE ARE RETURNING FROM THUNK', product)
//   await dispatch(postItemInCartAction(product));
//   // await dispatch(thunkGetShoppingCart());
//   return product;
// };

//TRY 2 BELOW
export const thunkPostItemInCart = (productId, userId) => async (dispatch) => {
  //console.log("WHAT IS THIS IN thunkPOSTCartItem", productId)
  let res = await fetch(`/api/products/${productId}/add_to_cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId,
      userId,
    }),
    // console.log('THIS IS PRODUCT', product)
  });
  res = await res.json();
  //console.log('WHAT IS PRODUCT THAT WE ARE RETURNING FROM THUNK', res)
  dispatch(postItemInCartAction(res));
  // await dispatch(thunkGetShoppingCart());
  return res;
};

//*  ======================= end of thunks ===================//

//? ================== reducer================================//

let initialState = { userCart: {} };

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_SHOPPING_CART: {
      newState = { ...state };
      newState.userCart = {};
      // console.log("REDUCER ACTION.CART", action.cart);

      action.cart.Shopping_Cart.forEach(
        (product) => (newState.userCart[product.productId] = { ...product })
      );
      return newState;
    }
    // THIS IS THE ORIGINAL BELOW:
    // case POST_ITEM_IN_CART: {
    //   newState = { ...state };

    //   // console.log("this is payload", action.product); // Payload

    //   const productPayload = action.product;

    //   // newState.userCart[product.id] = Product: {product}, id, productId, userId}
    //   newState.userCart[productPayload.CartItem.productId] = {
    //     Product: productPayload.Product,
    //     ...productPayload.CartItem,
    //   }; // payload: cartId, productId, userId

    //   return newState;
    // }

    //BELOW IS THE SECOND TRY
    case POST_ITEM_IN_CART: {
      newState = { ...state };
      // console.log('REDUCER NEWSTATE', newState)
      const productPayLoad = action.res;
      // console.log("PRODUCTPAYLOAD = action.res IN REDUCER", productPayLoad);
      newState.userCart[productPayLoad.Product.id] = {
        Product: productPayLoad.Product,
        ...productPayLoad.CartItem,
      };
      return newState;
    }
    case DELETE_CART_ITEM: {
      newState = { ...state };
      newState.userCart = { ...newState.userCart };
      // console.log("WHAT IS THIS", newState.userCart[action.productId]);
      delete newState.userCart[action.productId]; // refactor the get route to normalize by product id
      return newState;
    }
    // case CLEAR_USER_CART: {
    //   newState = {}
    //   return newState
    // }
    default:
      return state;
  }
}
