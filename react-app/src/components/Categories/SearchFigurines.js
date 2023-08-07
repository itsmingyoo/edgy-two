import "./Search.css"





function SearchFigurines() {
    return (
        <div onClick={((e) => window.alert("Feature coming soon"))} className="searching">
            <div className="searching1">
                <img src="https://m.media-amazon.com/images/I/614b4yZV7+L.jpg" alt="meaningful text"></img>
                <p>Figurines</p>
            </div>
            <div className="searching1">
                <img src="https://i.etsystatic.com/23591998/r/il/9856d6/3963639062/il_fullxfull.3963639062_3tht.jpg" alt="meaningful text"></img>
                <p>Paintings</p>
            </div>
            <div className="searching1">
                <img src="https://blackworknowart.files.wordpress.com/2020/01/alan-gehri-art-21.jpg?w=1568" alt="meaningful text"></img>
                <p>Drawings & Illustraion</p>
            </div>
            <div className="searching1">
                <img src="https://i.etsystatic.com/18987395/r/il/fa134f/2405238702/il_fullxfull.2405238702_2b3x.jpg" alt="meaningful text"></img>
                <p>Prints</p>
            </div>
        </div>
    )
}

export default SearchFigurines
