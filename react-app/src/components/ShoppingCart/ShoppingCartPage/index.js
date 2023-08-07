import { useParams } from "react-router-dom";
import { useEffect } from "react";
import * as CartActions from "../../../store/shoppingCart"; //this will be grabbing all of our thunks/reducer from the store file
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import DeleteCartIem from "../DeleteCartItem";
import ProceedToCheckout from "../ProceedToCheckout";
import Footer2 from "../../Footer/index2";
import "./ShoppingCart.css";

function ShoppingCartPage() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const userCart = useSelector((state) =>
    Object.values(state.shoppingCart.userCart)
  );
  // console.log(userCart);
  const paymentMethods = [
    "https://icons.veryicon.com/png/o/business/third-party-sharing-payment/apple-pay.png",
    "https://icon-library.com/images/visa-master-icon/visa-master-icon-6.jpg",
    "https://www.freeiconspng.com/uploads/paypal-icon-8.png",
  ];
  // console.log("THIS IS USERCART", userCart);
  //had to insert Object.values to const userCart because item was not rendering properly, bc of that no need to Object.values in the return at the bottom/html section for userCart
  //wasn't working with Object.values and chaining it with .map

  const sum = userCart
    .reduce((total, c) => total + Number(c.Product.price), 0)
    .toFixed(2);

  const itemLength = userCart.length;
  // console.log("length of cart here", itemLength);

  useEffect(() => {
    //if user is logged in, dispatch thunk
    dispatch(CartActions.thunkGetShoppingCart());
    // dispatch(CartActions.thunkDeleteCartItem(productId));
  }, [dispatch]);

  if (!sessionUser) return null;
  // if (userCart.length === 0 || !userCart) return null

  // const handleRemoveItem = (productId) => {
  //     // Call the thunkDeleteCartItem action creator to remove the item from the cart.
  //     dispatch(CartActions.thunkDeleteCartItem(productId));
  // };

  // console.log("THIS IS ID", item);

  return (
    // <>
    //   <div className="primary-cart-container">
    //     <h1>{itemLength} items in your cart</h1>
    //     <div className="products-and-checkout-container">

    //       <div className="products-only-container">
    //         {userCart?.map((item) => (
    //           <>
    //             {/* {console.log(item)} */}
    //             <div className="each-cart-item-container">
    //               <div>
    //                 <div className="sellerId-container">
    //                   Purchasing from Seller {item.Product.sellerId}
    //                 </div>
    //               </div>
    //               <div>
    //                 <div className="image-title-price-container">
    //                   <NavLink
    //                     to={`/products/${item.Product.id}`}
    //                     className="preview-image"
    //                   >
    //                     <img
    //                       className="cart-product-image"
    //                       src={item.Product.preview_imageURL}
    //                       alt={item.Product.item_name}
    //                     />
    //                   </NavLink>

    //                   <div className="name-blurb-cost-quantity">
    //                     <div className="name-description">
    //                       <NavLink
    //                         to={`/products/${item.Product.id}`}
    //                         className="items-link"
    //                       >
    //                         <div>{item.Product.item_name}</div>
    //                       </NavLink>
    //                       <div className="item-description">
    //                         {item.Product.description}
    //                       </div>
    //                     </div>
    //                     <div className="price-how-many-is-left">
    //                       <div>${item.Product.price} Each</div>
    //                       <div>Quantity:</div>
    //                       <input type="number" className="quantity-input" name="quantity" min="1" defaultValue="1"/>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>

    //               <div className="remove-save">
    //                 <DeleteCartIem
    //                   cartItemId={item.Product.id}
    //                 />
    //                 <div id="remove-save-button" className='PID-favFullButt PID-P-button PID-Transp-butt'>Save for Later</div>
    //               </div>

    //               <div className="note-and-delivery">
    //                 <div className="add-note">+ Add a note to Seller</div>
    //                 <div className="delivery-container">
    //                   <select name="delivery-drop-down">
    //                     <option value="Shipping Method">Shipping Method</option>
    //                     <option value="Free Shipping">FREE SHIPPING</option>
    //                     <option value="Next Day">Next Day</option>
    //                     <option value="2-3 Day">2-3 Day</option>
    //                   </select>
    //                   <div className="est-delivery">Estimated Delivery</div>
    //                 </div>
    //               </div>

    //               <div className="gift-coupon">
    //                 <div>
    //                   <div className="gift-toggle">
    //                     <input type="checkbox" class="toggle-input" />
    //                     <div>This order is a gift</div>
    //                   </div>
    //                   <div className="gift-order-blurb">
    //                     Prices will not be shown on the packing slip
    //                   </div>
    //                 </div>
    //                 <div className="coupon">Apply shop coupon codes</div>
    //               </div>
    //             </div>
    //           </>
    //         ))}
    //       </div>

    //       <div className="checkout-button-container">
    //         <div>
    //           <ProceedToCheckout />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <Footer2/>
    // </>

    <>
      <div className="primary-cart-container">
        {userCart?.length === 0 || !userCart ? (
          <h1 className="empty-cart-message">
            Your cart is empty! Time to go shopping!
          </h1>
        ) : (
          <>
            <h1>{itemLength} items in your cart</h1>
            <div className="products-and-checkout-container">
              <div className="products-only-container">
                {userCart?.map((item) => (
                  <>
                    {/* {console.log(item)} */}
                    <div className="each-cart-item-container">
                      <div>
                        <div className="sellerId-container">
                          Purchasing from Seller {item.Product.sellerId}
                        </div>
                      </div>
                      <div>
                        <div className="image-title-price-container">
                          <NavLink
                            to={`/products/${item.Product.id}`}
                            className="preview-image"
                          >
                            <img
                              className="cart-product-image"
                              src={item.Product.preview_imageURL}
                              alt={item.Product.item_name}
                            />
                            <div className="remove-save">
                              <DeleteCartIem cartItemId={item.Product.id} />
                              <div id="remove-save-button">Save for Later</div>
                            </div>
                          </NavLink>

                          <div className="name-blurb-cost-quantity">
                            <div className="name-description">
                              <div className="item-description">
                                {item.Product.description}
                                <div className="quantity">Quantity:</div>
                                <input
                                  id="quantity-input"
                                  type="number"
                                  className="quantity-input"
                                  name="quantity"
                                  min="1"
                                  defaultValue="1"
                                />
                              </div>
                            </div>
                            <div className="price-how-many-is-left">
                              <div>${item.Product.price}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="note-and-delivery">
                        <div className="add-note">
                          + Add a note to Seller
                          <div className="gift-toggle">
                            <div id="gift">
                              <input type="checkbox" class="toggle-input" />
                              <div>This order is a gift</div>
                            </div>
                            <div className="gift-order-blurb">
                              Prices will not be shown on the packing slip
                            </div>
                          </div>
                        </div>
                        <div className="est-delivery">Estimated Delivery</div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <div className="checkout-button-container">
                <h2>How you'll pay</h2>
                <div id="payMe">
                  {paymentMethods.map((image, index) => (
                    <div id="payment-method">
                      <input type="checkbox" />
                      <img
                        id={`imgCard${index}`}
                        src={image}
                        alt={`Image ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
                <div id="ship">
                  Total: <span>${sum}</span>
                </div>
                <div id="ship" className="delivery-container">
                  <p>Shipping:</p>
                  <select name="delivery-drop-down">
                    <option value="Shipping Method">Shipping Method</option>
                    <option value="Free Shipping">FREE SHIPPING</option>
                    <option value="Next Day">Next Day</option>
                    <option value="2-3 Day">2-3 Day</option>
                  </select>
                </div>
                <div className="but">
                  <ProceedToCheckout />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <p id="footT">Edgy offsets carbon emissions from every delivery</p>
      <div className="border"></div>
      <div id="cartF">
        <div className="footer1">
          <div className="foot1">
            <img
              src="https://m.media-amazon.com/images/I/51froJYdRmL.__AC_SX300_SY300_QL70_FMwebp_.jpg"
              alt="meaningful text"
            ></img>
            <p>United States</p>
            <p>|</p>
            <p>English (US)</p>
            <p>|</p>
            <p>$ (USD)</p>
          </div>
          <div className="foot2">
            <p>© 2023 Edgy, Inc.</p>
            <p className="line">Terms of use</p>
            <p className="line">Privacy</p>
            <p className="line">Interest-based ads</p>
            <p className="line">Local Shops</p>
            <p className="line">Regions</p>
          </div>
        </div>
        <p id="foot2">
          Merchant is Edgy, Inc. (USA), Edgy Ireland UC (Ireland), or Edgy UK
          Limited (United Kingdom) depending on the currency and location of the
          payment instrument issuance. See Edgy Payments Policy.
        </p>
      </div>
    </>
  );
}

export default ShoppingCartPage;
