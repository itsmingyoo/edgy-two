import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { ModalProvider, Modal } from "./context/Modal";
import configureStore from "./store";
import * as sessionActions from "./store/session";
import * as favoriteActions from "./store/favorites";
import * as productActions from './store/products'
import * as cartActions from './store/shoppingCart'
import App from "./App";

import "./index.css";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.sessionActions = sessionActions;
  window.favoriteActions = favoriteActions;
  window.productActions = productActions
  window.cartActions = cartActions
}

//example to use in console to test thunk
//window.store.dispatch(window.actionName.thunkName(arg))
//window.store.dispatch(window.productActions.thunkGetAllProducts())
//window.store.dispatch(window.productActions.thunkDeleteProduct(1))
//window.store.dispatch(window.cartActions.thunkGetShoppingCart(cart.id))

// Wrap the application with the Modal provider and render the Modal component
// after the App component so that all the Modal content will be layered as
// HTML elements on top of the all the other HTML elements:
function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <Modal />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
