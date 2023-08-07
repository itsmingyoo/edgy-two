import "./Search.css"





function SearchManga() {
    return (
        <div onClick={((e) => window.alert("Feature coming soon"))} className="searching">
            <div className="searching1">
                <img src="https://dw9to29mmj727.cloudfront.net/products/1974718131.jpg" alt="meaningful text"></img>
                <p>One Piece</p>
            </div>
            <div className="searching1">
                <img src="https://m.media-amazon.com/images/I/61yopdZewhL._AC_UF1000,1000_QL80_.jpg" alt="meaningful text"></img>
                <p>Bleach</p>
            </div>
            <div className="searching1">
                <img src="https://dw9to29mmj727.cloudfront.net/products/1591163595.jpg" alt="meaningful text"></img>
                <p>Naruto</p>
            </div>
            <div className="searching1">
                <img src="https://prodimage.images-bn.com/pimages/9781421520643_p0_v2_s1200x630.jpg" alt="meaningful text"></img>
                <p>Dragon Ball</p>
            </div>
        </div>
    )
}

export default SearchManga
