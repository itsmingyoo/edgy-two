import { useEffect, useState } from "react";
import "./ReviewsCurr.css";

import * as reviewsActions from "../../../store/reviews";
import { useSelector, useDispatch } from "react-redux";
// import { Link } from 'react-router-dom'
import ReviewCard from "../ReviewCard";

function ReviewsCurr() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const userReviews = useSelector((state) => state.reviews.userReviews);
  const [ searching, setSearching ] = useState(null)


  const [reviews, setReviews] = useState([]);

  let filteredReviews = reviews

  useEffect(() => {

    dispatch(reviewsActions.thunkGetReviewsById(currentUser.id));
  }, [dispatch, currentUser.id]);


  useEffect(() => {
    setReviews(Object.values(userReviews.Reviews))
  }, [userReviews])


  if (!Object.keys(userReviews).length || !userReviews) return <h1>...loading</h1>;


  if (searching) filteredReviews = reviews.filter((r) => r.Product.item_name.toLowerCase().includes(searching.toLowerCase()))



  //   console.log("user review:", userReviews.Reviews)


  // console.log(reviews)
  // console.log(reviews)

  // console.log("you reviews rendering right before cares:", "first_name:", currentUser.username, "review array of objects:", reviews, "from: userReviews",)
  return (
    <>
    <div className="pageColor2">
      <div id="yourRevs">
        <h2>Reviews</h2>
      <p>{searching && `"${searching}"`}</p>
      </div>
      <div className="wholeRev">

      <div id="reviews">
      {filteredReviews.length ? filteredReviews.map((review) => (
        <>
        <div className="reviewHeader"><p> Created at: {new Date(review.createdAt).toLocaleString('default', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</p></div>
          <ReviewCard
            key={review.id}
            userFirstName={currentUser.username}
            review={review}
            from="userReviews"
            user={currentUser}

          ></ReviewCard>

        </>
      )) : "None" }
      </div>
      <div id="searchRevs">
        <input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
          setSearching(e.target.value);
           }
          }}
        type="text" placeholder="Search"></input>
        <i class="fa-solid fa-magnifying-glass"></i>
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
  );
}

export default ReviewsCurr;
