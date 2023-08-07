import "./Search.css"





function SearchMusic() {
    return (
        <div onClick={((e) => window.alert("Feature coming soon"))} className="searching">
            <div className="searching1">
                <img src="https://i.pinimg.com/736x/c9/07/45/c90745ae7dbe1c4d66f104661d9b33b8--fairy-tail-lucy-anime-fairy-tail.jpg" alt="meaningful text"></img>
                <p>Theme Songs</p>
            </div>
            <div className="searching1">
                <img src="https://www.indieground.it/sito/wp-content/uploads/2013/05/bp_best80s-9.jpg" alt="meaningful text"></img>
                <p>Albums</p>
            </div>
            <div className="searching1">
            <img src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/203041482/original/99fb57ed64466b37896efac5529e892a9a81d129/design-catchy-80s-retro-synthwave-album-cover-art.jpg" alt="meaningful text"></img>
                <p>Singles</p>
            </div>
        </div>
    )
}

export default SearchMusic
