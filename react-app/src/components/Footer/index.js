import "./Footer.css"
import { Link } from "react-router-dom"



function Footer(){
    return (
    <div className="foots">
        <div className="background">
            <div className="footer3">
                <div className="edgyQ">
                <h1>What is Edgy?</h1>
                <Link to="/">Read our wonderfully wierd story</Link>
                </div>
                <div className="edgyColumns">
                <div className="eC">
                <h1>A community doing good</h1>
                <p>Edgy is a global online marketplace, where people come together to make, sell, buy, and collect unique items. We’re also a community pushing for positive change for small businesses, people, and the planet. Here are some of the ways we’re making a positive impact, together.</p>
                </div>
                <div className="eC">
                <h1>Support independent creators</h1>
                <p>There’s no Etsy warehouse – just millions of people selling the things they love. We make the whole process easy, helping you connect directly with makers to find something extraordinary.</p>
                </div>
                <div className="eC">
                <h1>Peace of mind</h1>
                <p>Your privacy is the highest priority of our dedicated team. And if you ever need assistance, we are always ready to step in for support.</p>
                </div>
                </div>
                <div className="endFoot3">
                <h3>Have a question? Well we've got some answers.</h3>
                <button>Go to Help Center</button>
                </div>
            <div className="footer4">
                <p>Yes! Send me exclusive offers, unique gift ideas, and personalized tips for shopping and selling on Edgy.</p>
                <div className="e">
                <input type="email" placeholder="Enter your email"></input>
                <span>Subscribe</span>
                </div>
            </div>
            </div>
            <div className="footer5">
            <i class="fa-solid fa-globe"></i>
            <p>Edgy is powered by 100% renewable electricity.</p>
            </div>
        </div>
    <div className="footer2">
        <div className="shopFoot">
            <h3>Shop</h3>
            <p>Gift cards</p>
            <p>Edgy Registry</p>
            <p>Sitemap</p>
            <p>Edgy blog</p>
            <p>Edgy United Kingdom</p>
            <p>Edgy Germany</p>
            <p>Edgy Canada</p>
        </div>
        <div className="sellFoot">
            <h3>Sell</h3>
            <p>Sell on Edgy</p>
            <p>Teams</p>
            <p>Forums</p>
            <p>Affiliates & Creators</p>
        </div>
        <div className="aboutFoot">
            <h3>About</h3>
            <p>Edgy, Inc.</p>
            <p>Policies</p>
            <p>Investors</p>
            <p>Careers</p>
            <p>Press</p>
            <p>Impact</p>
        </div>
        <div className="helpFoot">
            <h3>Help</h3>
            <p>Help Center</p>
            <p>Privacy settings</p>
            <div className="app"><i class="fa-solid fa-e"></i>Download the Edgy App</div>
            <div className="iconFoot">
            <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-facebook"></i>
            <i class="fa-brands fa-pinterest"></i>
            <i class="fa-brands fa-twitter"></i>
            <i class="fa-brands fa-youtube"></i>
            </div>
        </div>
    </div>
    <div className="footer1">
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
    )
}

export default Footer
