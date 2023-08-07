import { useModal } from '../../../context/Modal';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as productActions from '../../../store/products'
import "./AllProductsPage.css"


function DeleteProductModal({ productId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory()

    const handleClick = () => {
        dispatch(productActions.thunkDeleteProduct(productId))
        closeModal()
        history.push(`/your_products`)
    }

    return (
        <div className="deleteProduct2">
            <h1 className='deleteTitle'>Confirm Delete</h1>
            <p className='deleteText'>Are you sure you want to remove this item?</p>
            <div className='deleteProductButton'>
            <button className='yesButton' onClick={handleClick}>YES (Delete Product)</button>
            <button className='noButton' onClick={(() => closeModal())}>NO (Keep Product)</button>
            </div>
        </div>
    )
}

export default DeleteProductModal
