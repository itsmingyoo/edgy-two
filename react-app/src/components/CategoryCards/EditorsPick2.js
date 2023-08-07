import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as productActions from "../../store/products";
import "./CategoryCardsStyle3.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import FavoriteButton from "../FavoritesPage/FavoritesButton";
import "../Categories/Categories.css"
import "../FavoritesPage/FavoritesPage.css"
import * as favoriteActions from "../../store/favorites"




function EditorsPickTwoCard() {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const history = useHistory()
  const [itemState, setItemState ] = useState(false)
  const [ isHidden, setHidden ] = useState(true)
  const [ isHidden2, setHidden2 ] = useState(true)
  const [ isHidden3, setHidden3 ] = useState(true)
  const [ isHidden4, setHidden4 ] = useState(true)
  const [ isHidden5, setHidden5 ] = useState(true)
  const [ isHidden6, setHidden6 ] = useState(true)


  // useEffect(() => {
  //   dispatch(productActions.thunkGetAllProducts());
  // }, [dispatch]);

  const handleFavoriteClick = (productId) => {
    dispatch(favoriteActions.thunkPostFavoriteProduct(productId));
};

const handleUnfavoriteClick = (productId) => {
    dispatch(favoriteActions.thunkDeleteFavorite(productId));
};

  let eachProduct = Object.values(products);

  if (!eachProduct) return <h1>Loading</h1>;

  eachProduct = eachProduct.filter((p) => p.category === "Books");


  return (
    <div className="epTwo">
      <div className="sec3">
        <div className="epTwoTitle">
          <h3>Editors' Picks</h3>
          <h1>Personalized Gifts</h1>
          <Link to="/categories/computer">
            Shop these unique finds <i class="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
        <div
        onMouseLeave={((e) => setHidden(true))}
        onMouseEnter={((e) => setHidden(false))}
        className="imgTwo1">
            <div id={isHidden ? "hidden" : "container-container"}>
            <FavoriteButton
                productId={eachProduct[0]?.id}
                handleUnfavoriteClick={handleUnfavoriteClick}
                handleFavoriteClick={handleFavoriteClick}
                initialState={itemState}
            />
            </div>
          <img
            onClick={((e) => history.push(`/products/${eachProduct[0]?.id}`))}
            src={eachProduct[0]?.preview_imageURL}
            alt="meaningfult text"
          ></img>
        </div>
        <div
        onMouseLeave={((e) => setHidden2(true))}
        onMouseEnter={((e) => setHidden2(false))}
        className="imgTwo2">
        <div id={isHidden2 ? "hidden" : "container-container"}>
            <FavoriteButton
                productId={eachProduct[1]?.id}
                handleUnfavoriteClick={handleUnfavoriteClick}
                handleFavoriteClick={handleFavoriteClick}
                initialState={itemState}
            />
            </div>
          <img
            onClick={((e) => history.push(`/products/${eachProduct[1]?.id}`))}
            src={eachProduct[1]?.preview_imageURL}
            alt="meaningfult text"
          ></img>
        </div>
        <div
        onMouseLeave={((e) => setHidden3(true))}
        onMouseEnter={((e) => setHidden3(false))}
        className="imgTwo3">
        <div id={isHidden3 ? "hidden" : "container-container"}>
            <FavoriteButton
                productId={eachProduct[3]?.id}
                handleUnfavoriteClick={handleUnfavoriteClick}
                handleFavoriteClick={handleFavoriteClick}
                initialState={itemState}
            />
            </div>
          <img
            onClick={((e) => history.push(`/products/${eachProduct[3]?.id}`))}
            src={eachProduct[3]?.preview_imageURL}
            alt="meaningfult text"
          ></img>
        </div>
      </div>
      <div className="sec4">
        <div
        onMouseLeave={((e) => setHidden4(true))}
        onMouseEnter={((e) => setHidden4(false))}
        className="imgTwo4">
        <div id={isHidden4 ? "hidden" : "container-container"}>
            <FavoriteButton
                productId={eachProduct[9]?.id}
                handleUnfavoriteClick={handleUnfavoriteClick}
                handleFavoriteClick={handleFavoriteClick}
                initialState={itemState}
            />
            </div>
          <img
            onClick={((e) => history.push(`/products/${eachProduct[9]?.id}`))}
            src={eachProduct[9]?.preview_imageURL}
            alt="meaningfult text"
          ></img>
        </div>
        <div
        onMouseLeave={((e) => setHidden5(true))}
        onMouseEnter={((e) => setHidden5(false))}
        className="imgTwo5">
        <div id={isHidden5 ? "hidden" : "container-container"}>
            <FavoriteButton
                productId={eachProduct[8]?.id}
                handleUnfavoriteClick={handleUnfavoriteClick}
                handleFavoriteClick={handleFavoriteClick}
                initialState={itemState}
            />
            </div>
          <img
            onClick={((e) => history.push(`/products/${eachProduct[8]?.id}`))}
            src={eachProduct[8]?.preview_imageURL}
            alt="meaningfult text"
          ></img>
        </div>
        <div
        onMouseLeave={((e) => setHidden6(true))}
        onMouseEnter={((e) => setHidden6(false))}
        className="imgTwo6">
        <div id={isHidden6 ? "hidden" : "container-container"}>
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
        <div className="epDescription">
          <h3>Thoughtful gifts galore at affordable prices you’ll adore</h3>
        </div>
      </div>
    </div>
  );
}

export default EditorsPickTwoCard;
