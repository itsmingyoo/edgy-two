import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import * as reviewsActions from "../../../store/reviews";
import * as productsActions from "../../../store/products";
import * as favoriteActions from "../../../store/favorites"
import { useSelector, useDispatch } from "react-redux";
import ReviewForm from "../../Reviews/ReviewForm";
import ReviewCard from "../../Reviews/ReviewCard";
import "./ProductIdPage.css";
import FooterTwo from "../../Footer/index2";
import '../../FavoritesPage/FavoritesPage.css'
import PutCartItemToCart from "./PutItemToCart";
import FavoriteButton from "../../FavoritesPage/FavoritesButton";

function ProductIdPage() {
    const { id } = useParams();
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const product = useSelector(state => state.products.singleProduct)
    const [mainImage, setMainImage] = useState()
    const [itemState, setItemState ] = useState(false)

    const history = useHistory()
    let userFavorites = useSelector((state) =>
    Object.values(state.favorites.userFavorites)
    );
    useEffect(() => {
            window.scrollTo(0, 0); // Scrolls to the top instantly when the page loads
    }, []);

    if (userFavorites.filter(favs => favs.id === id).length) setItemState(true)

    // console.log(userFavorites)
    // if deletedReview is changed to true, cause form to be rendered

    const handleFavoriteClick = (productId) => {
        dispatch(favoriteActions.thunkPostFavoriteProduct(productId));
    };

    const handleUnfavoriteClick = (productId) => {
        dispatch(favoriteActions.thunkDeleteFavorite(productId));
    };


    const changeMainImage = (e) => {
        setMainImage(e.target.src)
    }

    const comingSoonFeature = (e) => {
        e.preventDefault();
        alert("Feature coming soon!");
    }

    const addToFav = (e) => { }

    useEffect(() => {

        // if call comes back with "this product does not exist"
        async function productExistCheck() {

            let check = await dispatch(productsActions.thunkGetSingleProduct(id))

            if (check === "Product Id does not exist") {
                // console.log("in use effect check")
                // redirect to somewhere
                history.push(`/categories`)
                //setProductExist(true)
            }

        }

        productExistCheck()


    }, [dispatch, id])




    // if (productExist) {
    //     console.log("in the product no exist")
    //     return ( <>no exist</>)
    // }


    if (Object.values(product) === 0 || !product) return <h1>...loading</h1>



    // create average stars
    let sum = 0
    let count = Object.values(product.Reviews).length
    let reviews = Object.values(product.Reviews)
    // console.log(reviews)
    // console.log("reviews:", product.Reviews)
    for (const review of reviews) {
        sum += review.stars
    }
    let starAvg = Math.round(sum / count)
    let stars = []
    for (let i = 0; i < starAvg; i++) {
        stars.push("hi")
    }
    let images = Object.values(product.ProductImages);



    let noUserReviewExist = true;
    let notSeller = true;



    // user and seller checks

    if (user?.id) {
        if (Object.values(user).length > 0) {
            noUserReviewExist = reviews.every(review => review.userId !== user.id)
            notSeller = user.id !== product.Seller.id
        }
    }

    // console.log('WHAT IS THIS IN ', product, product.id)

    //* if product does't exist return jsx of  " no product :("

    // ! NEED STYLING HERE and maybe links to catagories

    return (
        <>
            <div id="TopOfPage" className="column-holder">
                <div className="column">
                    <div className='PID-product'>
                        <div className='PID-all-Images'>
                            <div className='PID-images-div'>
                                <img className='PID-small-img' alt="product first loaded" onClick={changeMainImage} src={product.preview_imageURL} ></img>
                                {images.map((image, idx) => (

                                    <img key={idx} className='PID-small-img' onClick={changeMainImage} src={image.product_imageURL} alt="filler 2"></img>


                                ))}

                            </div>
                            <div className='PID-main-image-div'>

                                <img className='PID-main-image' onClick={changeMainImage} src={mainImage || product.preview_imageURL} alt="loading"></img>
                                <div className="containerFavs">

                                    <FavoriteButton
                                        productId={id}
                                        handleUnfavoriteClick={handleUnfavoriteClick}
                                        handleFavoriteClick={handleFavoriteClick}
                                        initialState={itemState}
                                    />
                                </div>
                            </div>
                        </div>


                        {/* <div>
                            <i onClick={addToFav} className="fas fa-heart" />
                        </div> */}

                        <div className='PID-about-buttons-div'>


                            <div className='PID-about-product-div'>
                                <p className="PID-price">${product.price}</p>
                                <p> {product.item_name}</p>

                                <div className='PID-seller-avg-stars'>
                                    <p className='PID-seller'>Seller: {product.Seller.username}   </p>


                                </div>
                            </div>
                            {user?.id ? (
                                <div className='PID-buttons'>
                                    <button className='PID-buyNowButt PID-P-button PID-Transp-butt' onClick={comingSoonFeature}> <i class="fa-brands fas fa-cc-visa"></i> Buy it now</button>
                                    {/* <button className='PID-cartButt PID-P-button'>Add to cart</button> */}
                                    <PutCartItemToCart productId={product.id} className='PID-cartButt PID-P-button' />
                                    {/* <button onClick={addToFav} className='PID-favFullButt PID-P-button PID-Transp-butt'> <i onClick={addToFav} className="fas fa-heart PID-heart" /> Add to Favorites</button> */}
                                </div>

                            ) : (
                                // <button className='PID-cartButt PID-P-button'>Sign up to purchase!</button>
                                <div lassName='PID-about-product-div'>Please log in or sign up to view or purchase the items!</div>



                            )}
                            <div>
                                <p>Description</p>
                                <p className="productDescription"> {product.description}</p>
                            </div>



                        </div>


                    </div>
                    <div className="productReview">


                        <p className='Pid-ave-stars'>
                            <span className='PID-count'>{count}
                                {count === 1 ? " review" : " reviews"}

                            </span>
                            {stars.map((star, idx) =>

                                <i key={idx} className="fas fa-star PID-count pStars" />

                            )}
                        </p>



                        {user && noUserReviewExist && notSeller &&
                            <ReviewForm from="post"></ReviewForm>}



                        {reviews?.map((review) => (
                            <>

                                <ReviewCard key={review.id}  userFirstName="hi" review={review} from="productPage" user={user}></ReviewCard>
                            </>
                        ))}



                    </div>






                </div>
            </div >
            <FooterTwo />
        </>


    );
}



export default ProductIdPage;
