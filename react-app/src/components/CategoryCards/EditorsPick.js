import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as productActions from "../../store/products";
import "./CategoryCardsStyle1.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import * as favoriteActions from "../../store/favorites"
import "../Categories/Categories.css"
import "../FavoritesPage/FavoritesPage.css"
import FavoriteButton from "../FavoritesPage/FavoritesButton";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";



function EditorsPickCard() {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const history = useHistory()
  const [ isHidden, setHidden ] = useState(true)
  const [ isHidden2, setHidden2 ] = useState(true)
  const [ isHidden3, setHidden3 ] = useState(true)
  const [ isHidden4, setHidden4 ] = useState(true)
  const [ isHidden5, setHidden5 ] = useState(true)
  const [ isHidden6, setHidden6 ] = useState(true)
  const [itemState, setItemState ] = useState(false)



  // useEffect(() => {
  //  // window.location.reload()
  // }, []);

const handleFavoriteClick = (productId) => {
    dispatch(favoriteActions.thunkPostFavoriteProduct(productId));
};

const handleUnfavoriteClick = (productId) => {
    dispatch(favoriteActions.thunkDeleteFavorite(productId));
};

  let eachProduct = Object.values(products);

  if (!eachProduct) return <h1>Loading</h1>;

  eachProduct = eachProduct.filter((p) => p.category === "Computer");

  // console.log(eachProduct)

  return (
    <div className="ep">
      <div className="sections">
        <div className="sec1">
          <div className="epTitle">
            <h3>Editors' Picks</h3>
            <h1>Best For Gaming Setup</h1>
            <Link to="/categories/computer">
              See more<i onClick={((e) => history.push(`/categories/computer`))} class="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <div
           onMouseLeave={((e) => setHidden(true))}
           onMouseEnter={((e) => setHidden(false))}
          className="imgOne">
          <div id={isHidden ? "hidden" : "container-container"}>
            <FavoriteButton
                productId={eachProduct[0]?.id}
                handleUnfavoriteClick={handleUnfavoriteClick}
                handleFavoriteClick={handleFavoriteClick}
                initialState={itemState}
            />
            </div>
            <img
              onClick={((e) => history.push(`/products/${eachProduct[0]?.id}#TopOfPage`))}
              src={eachProduct[0]?.preview_imageURL}
              alt="meaningful text"
            ></img>
          </div>
          <div
           onMouseLeave={((e) => setHidden2(true))}
           onMouseEnter={((e) => setHidden2(false))}
          className="imgOne">
          <div id={isHidden2 ? "hidden" : "container-container"}>
            <FavoriteButton
                productId={eachProduct[1]?.id}
                handleUnfavoriteClick={handleUnfavoriteClick}
                handleFavoriteClick={handleFavoriteClick}
                initialState={itemState}
            />
            </div>
            <img
            onClick={((e) => {
              e.preventDefault()
              history.push(`/products/${eachProduct[1]?.id}`)})}
            src={eachProduct[1]?.preview_imageURL}
              alt="meaningful text"
            ></img>
          </div>
        </div>
        <div className="sec2">
          <div
           onMouseLeave={((e) => setHidden3(true))}
           onMouseEnter={((e) => setHidden3(false))}
          className="imgOne">
          <div id={isHidden3 ? "hidden" : "container-container"}>
            <FavoriteButton
                productId={eachProduct[7]?.id}
                handleUnfavoriteClick={handleUnfavoriteClick}
                handleFavoriteClick={handleFavoriteClick}
                initialState={itemState}
            />
            </div>
            <img
            onClick={((e) => history.push(`/products/${eachProduct[8]?.id}`))}
            src={eachProduct[7]?.preview_imageURL}
              alt="meaningfult text"
            ></img>
          </div>
          <div
           onMouseLeave={((e) => setHidden4(true))}
           onMouseEnter={((e) => setHidden4(false))}
          className="imgOne">
          <div id={isHidden4 ? "hidden" : "container-container"}>
            <FavoriteButton
                productId={eachProduct[6]?.id}
                handleUnfavoriteClick={handleUnfavoriteClick}
                handleFavoriteClick={handleFavoriteClick}
                initialState={itemState}
            />
            </div>
            <img
            onClick={((e) => history.push(`/products/${eachProduct[6]?.id}`))}
            src={eachProduct[6]?.preview_imageURL}
              alt="meaningfult text"
            ></img>
          </div>
          <div
           onMouseLeave={((e) => setHidden5(true))}
           onMouseEnter={((e) => setHidden5(false))}
          className="imgOne">
          <div id={isHidden5 ? "hidden" : "container-container"}>
            <FavoriteButton
                productId={eachProduct[4]?.id}
                handleUnfavoriteClick={handleUnfavoriteClick}
                handleFavoriteClick={handleFavoriteClick}
                initialState={itemState}
            />
            </div>
            <img
            onClick={((e) => history.push(`/products/${eachProduct[4]?.id}`))}
            src={eachProduct[4]?.preview_imageURL}
              alt="meaningfult text"
            ></img>
          </div>
          <div
           onMouseLeave={((e) => setHidden6(true))}
           onMouseEnter={((e) => setHidden6(false))}
          className="imgOne">
          <div id={isHidden6 ? "hidden" : "container-container"}>
            <FavoriteButton
                productId={eachProduct[5]?.id}
                handleUnfavoriteClick={handleUnfavoriteClick}
                handleFavoriteClick={handleFavoriteClick}
                initialState={itemState}
            />
            </div>
            <img
              onClick={((e) => history.push(`/products/${eachProduct[5]?.id}`))}
              src={eachProduct[5]?.preview_imageURL}
              alt="meaningfult text"
            ></img>
          </div>
        </div>
      </div>
      <div className="home"></div>
    </div>
  );
}

export default EditorsPickCard;
