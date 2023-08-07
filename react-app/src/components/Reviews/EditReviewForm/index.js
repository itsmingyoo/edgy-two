import React, { useEffect, useState } from "react";

import "./ReviewForm.css";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as reviewsActions from "../../../store/reviews";
import * as productsActions from "../../../store/products";
import StarRating from "./StarRating";
import cookieParser from "cookie-parser";

function EditReviewForm({ from, starsEdit, reviewEdit, reviewObj }) {
  const dispatch = useDispatch();

  // const sessionUser = useSelector((state) => state.session.user);
  // const [stars, setStars] = useState(1);
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [submittedSuc, setSubmittedSuc] = useState(false);
  const [rating, setRating] = useState("reviewObj.rating");
  const [vaErrors, setVaErrors] = useState({});



  // edit state
  // console.log("review form review obj passed from review curr", reviewObj)
  const [reviewEditState, setReviewEditState] = useState(reviewEdit || "");
  const [ratingEdit, setRatingEdit] = useState(starsEdit || 1);
  // console.log(reviewEditState)


  const { id } = useParams();

  const resetState = () => {
    if (from === "post") {
      setReview("");
      setRating(1);
    } else {

    }

  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("start of handle submit ")
    setSubmitted(true);
    if (from === "post") {


      // if (Object.keys(vaErrors).length) {
      //   return;
      // }
      // console.log("RATING BY STARS =", rating)
      const data = await dispatch(
        reviewsActions.thunkSubmitReview(rating, review, id)
      );
      // if error exit out of handle submit
      if (data) {
        setErrors(data);
      }

      if (errors.length === 0) {
        resetState();
      }

      setSubmittedSuc(true);

      await dispatch(reviewsActions.thunkGetReviewsByProductId(id));
      await dispatch(productsActions.thunkGetSingleProduct(id));




    } else if (from === "edit") {
      // console.log("hi")
      // console.log(Object.keys(vaErrors))
      // if (Object.keys(vaErrors).length) {
      //   return;
      // }
      // console.log("review before passing on", ratingEdit, reviewEditState)
      // console.log("just reviewEdit", e)
      const data = await dispatch(
        // ! need to change this to edit thunk
        // id is wrong, your_reviews are not on  react link with id param
        // need (stars, review , id

        reviewsActions.thunkSubmitReviewEdit(ratingEdit, reviewEditState, reviewEdit.id)
      );
      if (data) {
        // console.log("ERROR ERROR ERROR", data)
        setErrors(data);
      }

      // not sure i need this for
      if (errors.length === 0) {
        resetState();
      }

    }


  };

  const handleRatingChange = (number) => {
    // console.log("in handleRatingChange")
    if (from === "post") {

      setRating(parseInt(number));
    } else if (from === "edit") {
      // console.log("hi")
      setRatingEdit(parseInt(number))
    }
  };

  // useEffect(() => {
  //   const err = {};


  //   // if (from === "post") {
  //   if (review.length < 10) err["Review"] = "Review needs 10 or more characters";
  //   if (review.length > 225) err["Review"] = "Review needs to be less than 225 or more characters";
  //   // } else if (from === "edit") {
  //   // if (reviewEditState.length < 10)
  //   //   err["Review"] = "Review needs 10 or more characters";
  //   // if (reviewEditState.length > 225)
  //   //   err["Review"] = "Review needs to be less than 225 or more characters";
  //   // }
  //   // console.log("err", err)
  //   console.log(err)
  //   setVaErrors(err);
  // }, [review]);

  const test = 3
  if (from === "post") {
    return (
      <>
        {!submittedSuc && (
          <div className="">
            <h3>Submit a review for this product:</h3>
            <form onSubmit={handleSubmit} className="RF-Form">
              {/* {submitted &&  <displayError>} */}
              <label htmlFor="stars"></label>
              <StarRating
                disabled={false}
                onChange={handleRatingChange}
                rating={rating}
              />

              <label htmlFor="review"></label>

              <textarea
                className="RF-form-item RF-textarea"
                id="review"
                onChange={(e) => {
                  setReview(e.target.value);
                }}
                placeholder="Please write a review"
                value={review}
              />
              {vaErrors.Review && submitted && (
                <p className="error-text">*{vaErrors.Review}</p>
              )}

              <button
                className={
                  submitted && (vaErrors.Review || errors.length)
                    ? "RF-form-item PID-submit-review RF-subButt"
                    : " RF-form-item PID-cartButt RF-subButt"
                }
                type="submit"
                submitted
              >
                Submit Review
              </button>
            </form>
          </div>
        )}
        <hr className="Rc-hr"></hr>
      </>
    );
  } else if (from === "edit") {
    return (
      <>
        {!submittedSuc && (
          <div className="">
            <h3>Edit your review</h3>
            <form onSubmit={handleSubmit} className="RF-Form">
              {/* {submitted &&  <displayError>} */}
              <label htmlFor="stars"></label>
              <StarRating
                disabled={false}
                onChange={handleRatingChange}
                rating={ratingEdit}
              />

              <label htmlFor="review"></label>

              <textarea
                className="RF-form-item RF-textarea"
                id="review"
                onChange={(e) => {
                  setReviewEditState(e.target.value);
                }}
                placeholder="Please write a review"
                value={reviewEditState}
              />
              {vaErrors.Review && submitted && (
                <p className="error-text">*{vaErrors.Review}</p>
              )}

              <button
                className={
                  submitted && (vaErrors.Review || errors.length)
                    ? "RF-form-item PID-submit-review RF-subButt"
                    : " RF-form-item PID-cartButt RF-subButt"
                }
                type="submit"
                submitted
              >
                Edit Review
              </button>
            </form>
          </div>
        )}
        <hr className="Rc-hr"></hr>
      </>
    );




  }
}

export default ReviewForm;
