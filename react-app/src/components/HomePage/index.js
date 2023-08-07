import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as productActions from "../../store/products";
import "./HomePage.css";
import { Link } from "react-router-dom";
import EditorsPickCard from "../CategoryCards/EditorsPick";
import ShopLookCard from "../CategoryCards/ShopTheLook";
import EditorsPickTwoCard from "../CategoryCards/EditorsPick2";
import RecentlyReviewedCard from "../CategoryCards/RecentlyViewed";
import ShopSelectionCard from "../CategoryCards/ShopSelection";
import FreshArticlesCard from "../CategoryCards/FreshArticles";
import Footer from "../Footer";
import ImageCarousel from "./Carousel";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function HomePage(){
    const { products } = useSelector((state) => state.products)
    const dispatch = useDispatch()
    const history = useHistory()

    // useEffect(() => {
    //     dispatch(productActions.thunkGetAllProducts())
    // }, [dispatch])

       let eachProduct = Object.values(products)

        if (!eachProduct) return <h1>Loading</h1>

        return (
             <>
             <ImageCarousel />
             <h1 className="cap">Discrover fresh summer finds from creative sellers!</h1>
             <div className="searchResults">
                <div className="result" onClick={((e) => history.push('/categories/search/gift'))}>
                    <img src="https://www.brides.com/thmb/w00iMSdT5TI9CAijgKl_sqAvGJs=/fit-in/1500x640/filters:no_upscale():max_bytes(150000):strip_icc()/daily-calendar-slide-1-db9bf2bfd4d041a9828d6c563adce0eb.jpg" alt="meaningfult text"></img>
                    <Link to="/">Gift Ideas</Link>
                </div>
                <div className="result" onClick={((e) => history.push('/categories/search/one piece'))}>
                    <img src="https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781421510439/bleach-vol-19-9781421510439_hr.jpg" alt="meaningfult text"></img>
                    <Link to="/">Manga</Link>
                </div>
                <div className="result" onClick={((e) => history.push('/categories/search/pillow'))}>
                    <img src="https://i.ebayimg.com/images/g/ceMAAOSwaORjHTzN/s-l1200.webp" alt="meaningfult text"></img>
                    <Link to="/">Best Sellers</Link>
                </div>
                <div className="result" onClick={((e) => history.push('/categories/search/necklace'))}>
                    <img src="https://i.pinimg.com/736x/8a/c3/39/8ac339ab767beebe3f7cbdf24dbfbff2.jpg" alt="meaningfult text"></img>
                    <Link to="/">Jewlery</Link>
                </div>
                <div className="result" onClick={((e) => history.push('/categories/search/cool'))}>
                    <img src="https://i.etsystatic.com/27059730/r/il/fb26c8/4369458852/il_1588xN.4369458852_i76t.jpg" alt="meaningfult text"></img>
                    <Link to="/">Cool Finds</Link>
                </div>
                <div className="result" onClick={((e) => history.push('/categories/search/cheap'))}>
                    <img src="https://i.pinimg.com/736x/22/27/4e/22274eeb53129ecae0584e511e1964d9.jpg" alt="meaningfult text"></img>
                    <Link to="/">Inexpensive</Link>
                </div>

             </div>
             <RecentlyReviewedCard />
            <EditorsPickTwoCard />
            <ShopLookCard />
            <EditorsPickCard/>
            <ShopSelectionCard />
            <FreshArticlesCard />
            <Footer />
            </>
            )


}

export default HomePage;
