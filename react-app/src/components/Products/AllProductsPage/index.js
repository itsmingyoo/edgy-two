import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as productActions from '../../../store/products'
import "./AllProductsPage.css"
import FooterTwo from "../../Footer/index2";
import DeleteProductModal from "./DeleteProduct";
import { useModal } from '../../../context/Modal'
import { useHistory } from "react-router-dom";


function AllProductsPage() {
    const { userProducts } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const [ sorting, setSorting ] = useState(null)
    const [ searching, setSearching ] = useState(null)
    const { setModalContent } = useModal();
    const history = useHistory();

    let products
    if (userProducts) products = Object.values(userProducts)

    if (sorting && sorting === "Alphabetical") products.sort((a, b) => a.item_name.localeCompare(b.item_name));
    if (sorting && sorting === "Oldest") products.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    if (sorting && sorting === "Newest") products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (searching) products = products.filter((p) => p.item_name.toLowerCase().includes(searching.toLowerCase()))

    useEffect(() => {
    dispatch(productActions.thunkGetUserProducts());
    }, [dispatch]);

    return (
        <>
        <div className="allProductsPage">
            <h1>Products</h1>
            <div className="allProdT">
            <p>{searching ? `"${searching}"` : null}</p>
            <input onKeyDown={(e) => {
            if (e.key === "Enter") {
            setSearching(e.target.value);
             }
            }}
            placeholder="Search by title"></input>
            <button onClick={(e) => history.push('/products/new')}> + Add a product</button>
            </div>
        </div>
        <div className="border"> </div>
        <div className="pageColor">

        <div className="productPage">

        <div className="userProducts">

            {products?.map((p) => (
                <div className="userProduct">
                    <img onClick={((e) => history.push(`products/${p.id}`))} src={p.preview_imageURL} alt="meaningful text"></img>
                    <h4 onClick={((e) => history.push(`products/${p.id}`))}>{p.item_name}</h4>
                    <p onClick={((e) => history.push(`products/${p.id}`))}>{p.description}</p>
                    <div onClick={((e) => history.push(`products/${p.id}`))}className="product-p">
                    <p>{p.quantity} In Stock</p>
                    <p>|</p>
                    <p>{p.price}</p>
                    </div>
                    <p>Created At:
                    {` ${new Date(p.createdAt).toLocaleString('default', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}`}
                    </p>
                    <div className="deleteProduct">
                        <button className="delProduct"onClick={(() => setModalContent(<DeleteProductModal productId={p.id} />))}>Delete</button>
                    </div>
                </div>
            ))}
            {searching && !products.length ? <p>None</p> : null}
            {!searching && !products.length ? <h2>No listings available</h2> : null}
        </div>
        <div className="sortingProducts">
        <button onClick={((e) => window.alert('Feature coming soon'))} className="qEdit">Quick edit</button>
        <p>Sort</p>
        <select onChange={((e) => setSorting(e.target.value))} id="productSort">
        <option value="Id">Id</option>
        <option value="Newest">Newest - Oldest</option>
        <option value="Oldest">Oldest - Newest</option>
        <option value="Alphabetical">A - Z</option>
        </select>
        </div>
        </div>
        <div className="footerThree-1">
        <div className="foot1">
        <img src="https://m.media-amazon.com/images/I/51froJYdRmL.__AC_SX300_SY300_QL70_FMwebp_.jpg" alt="meaningful text"></img>
        <p>United States</p>
        <p>|</p>
        <p>English (US)</p>
        <p>|</p>
        <p>$ (USD)</p>
        </div>
        <div className="foot2">
        <p >© 2023 Edgy, Inc.</p>
        <p className="line">Terms of use</p>
        <p className="line">Privacy</p>
        <p className="line">Interest-based ads</p>
        <p className="line">Local Shops</p>
        <p className="line">Regions</p>
        </div>
        </div>

        </div>
        </>

    )
}

export default AllProductsPage
