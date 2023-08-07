import React, { useState } from "react";
import { useDispatch } from "react-redux";
import clearCartAction from "../../store/shoppingCart";
import "../ShoppingCart/ShoppingCartPage/ShoppingCart.css";


function ProceedToCheckout() {
  const dispatch = useDispatch();
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const onClick = (e) => {
    e.preventDefault();

    // dispatch(clearCartAction());
    // setCheckoutMessage("Successfully Checked Out!");
    alert("Feature coming soon!");
  };

  return (
    <>
      <div className='PID-cartButt'onClick={onClick}>
        Proceed To Checkout
      </div>
      {checkoutMessage && <p>{checkoutMessage}</p>}
    </>
  );
}

export default ProceedToCheckout;
