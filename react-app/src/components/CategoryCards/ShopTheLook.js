import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as productActions from "../../store/products"
import './CategoryCardsStyle2.css'

function ShopLookCard(){
    const { products } = useSelector((state) => state.products)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(productActions.thunkGetAllProducts())
    // }, [dispatch])

       let eachProduct = Object.values(products)

        if (!eachProduct) return <h1>Loading</h1>

        eachProduct = eachProduct.filter((p) => p.category === "Clothing")


    return (
    <div className="look">
        <h1>Shop the Look</h1>
        <div className="shopImg">
        <div>
        <img src="https://m.media-amazon.com/images/I/91Cq8423E5L._AC_UF894,1000_QL80_.jpg" alt="meaningfult text"></img>
        <p>Demon Slayer photographs</p>
        </div>
        <div>
        <img src="https://blog.displate.com/wp-content/uploads/2021/09/img_6141ab4ca7e04.jpg" alt="meaningfult text"></img>
        <p>Cute desk setup</p>
        </div>
        <div>
        <img src="https://m.media-amazon.com/images/I/81i0oL1CGJL.jpg" alt="meaningfult text"></img>
        <p>Anime posters for anime wall decore</p>
        </div>
        </div>
    </div>
    )
}

export default ShopLookCard
