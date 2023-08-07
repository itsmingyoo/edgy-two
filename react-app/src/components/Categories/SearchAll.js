import "./Search.css"
import { useHistory } from "react-router-dom"




function SearchAll() {
    const history = useHistory()

    return (
        <div className="searching">
            <div onClick={((e) => history.push(`/categories/clothing`))} className="searching1">
                <img src="https://i.etsystatic.com/33631677/r/il/f31994/3722252879/il_fullxfull.3722252879_dko5.jpg" alt="meaningful text"></img>
                <p>Clothing & Shoes</p>
            </div>
            <div onClick={((e) => history.push(`/categories/home_decor`))} className="searching1">
                <img src="https://lalique.fra1.digitaloceanspaces.com/Products/pictures/10732800-mures-large-vase-20311.jpg?v=1691032973" alt="meaningful text"></img>
                <p>Home Decor</p>
            </div>
            <div onClick={((e) => history.push(`/categories/accessories`))} className="searching1">
                <img src="https://cdnimg.emmiol.com/E/202206/img_original-VCF0460AC-3006408112.jpg" alt="meaningful text"></img>
                <p>Jewlery & Accessories</p>
            </div>
            <div onClick={((e) => history.push(`/categories/computer`))} className="searching1">
                <img src="https://i.etsystatic.com/18014690/r/il/42e26c/3829899378/il_1588xN.3829899378_8fj4.jpg" alt="meaningful text"></img>
                <p>Computer & Tech</p>
            </div>
            <div onClick={((e) => history.push(`/categories/waifu_body_pillows`))} className="searching1">
                <img src="https://anime-body-pillow.com/cdn/shop/collections/Amiya-body-pillow_400x.jpg?v=1665147131" alt="meaningful text"></img>
                <p>Waifu Body Pillows</p>
            </div>
            <div onClick={((e) => history.push(`/categories/books`))} className="searching1">
                <img src="https://m.media-amazon.com/images/I/81MpWhRrfgL._AC_UF1000,1000_QL80_.jpg" alt="meaningful text"></img>
                <p>Manga</p>
            </div>
            <div onClick={((e) => history.push(`/categories/music`))} className="searching1">
                <img src="https://www.billboard.com/wp-content/uploads/media/Tame-Impala-Currents-2017-billboard-1240.jpg?w=600" alt="meaningful text"></img>
                <p>Music & Entertainment</p>
            </div>
            <div onClick={((e) => history.push(`/categories/figurines`))} className="searching1">
                <img src="https://beautifuldawndesigns.net/wp-content/uploads/2022/04/anime-girl-drawing4-1.jpeg" alt="meaningful text"></img>
                <p>Art & Figurines</p>
            </div>
        </div>
    )
}

export default SearchAll
