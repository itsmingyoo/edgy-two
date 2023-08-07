import React from "react";
import { useDispatch, useSelector } from "react-redux";
import postItemInCartAction, { thunkGetShoppingCart, thunkPostItemInCart }  from "../../../store/shoppingCart"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";

function PutCartItemToCart({productId}) {

    const dispatch = useDispatch()
    const history = useHistory();
    const currentUser = useSelector(state => state.session.user)
    const product = useSelector(state => state.products.singleProduct)
    const cartItems = useSelector(state => state.shoppingCart)
    //console.log('WHAT IS PUTITEMTOTHCART', cartItems)

    const productBelongsToUser = () => {
        return product.sellerId === currentUser.id;
    };

    let allItems = Object.values(cartItems.userCart)
    // console.log(allItems[3].productId, productId)

    const productAlreadyInCart = () => {

        for (const item of allItems) {
            if (item.productId === productId) {
                return true
            }

        }
        return false;
    }


    const onClick = (e) => {
        e.preventDefault();
        if (productBelongsToUser()) {
            alert("You cannot add your own product to the cart.");
            return;
        }
        if (productAlreadyInCart()) {
            alert("You already added the item to the cart.");
            return;
        }
        else {
            // console.log('THUNKPOSTITEMINCART', product.id, productId)
            dispatch(thunkPostItemInCart(product.id, currentUser.id))
            history.push("/shopping_cart")

        }
    }

    // const onClick = (e) => {
    //     e.preventDefault();
    //     if (productBelongsToUser()) {
    //         alert("You cannot add your own product to the cart.");
    //     } else {
    //         console.log('THUNKPOSTITEMINCART', product.id, productId)
    //         dispatch(thunkPostItemInCart(product.id)).then(()=>
    //             dispatch(thunkGetShoppingCart()))
    //         history.push("/shopping_cart")

    //     }
    // }


    // const onClick = async (e) => {
    //     e.preventDefault();
    //     if (productBelongsToUser()) {
    //         alert("You cannot add your own product to the cart.");
    //     } else {
    //         try {
    //             console.log("WHAT IS THIS PRODUCTIDxxxxxxxxxxx", productId, product.id);
    //             await dispatch(thunkPostItemInCart(product.id));
    //             await dispatch(dispatch(thunkGetShoppingCart()));
    //             history.push("/shopping_cart")
    //         } catch (error) {
    //             console.error("Error adding item to cart:", error.message)
    //         }

    //     }
    // }



    return(
        <>
        <button className='PID-cartButt PID-P-button' onClick={onClick}>Add to Cart</button>
        </>
    )
}

export default PutCartItemToCart;
