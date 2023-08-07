import React, { useEffect, useState } from "react";

import "./ReviewForm.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as reviewsActions from "../../../store/reviews";
import * as productsActions from "../../../store/products";
import StarRating from "./StarRating";

function ReviewForm({
  from,
  starsEdit,
  reviewEdit,
  reviewObj,
  setFormTrigger,
  setReviewRender,
}) {
  const dispatch = useDispatch();

  // const uwu = useSelector(state => Object.values(state.reviews.userReviews.Reviews))
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [submittedSuc, setSubmittedSuc] = useState(false);
  const [rating, setRating] = useState(1);
  const [vaErrors, setVaErrors] = useState({});

  // edit state

  const [reviewEditState, setReviewEditState] = useState(reviewEdit || "");
  const [ratingEdit, setRatingEdit] = useState(starsEdit || 1);

  const { id } = useParams();

  const resetState = () => {
    if (from === "post") {
      setReview("");
      setRating(1);
    } else {
      setReviewEditState(reviewEdit);
      setRatingEdit(starsEdit);
    }
  };

  const handleSubmit = async (e) => {
    if (submittedSuc) return;

    e.preventDefault();
    setSubmitted(true);
    if (from === "post") {
      if (Object.keys(vaErrors).length) {
        return;
      }

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
      if (Object.keys(vaErrors).length) {
        return;
      }

      const data = await dispatch(
        reviewsActions.thunkSubmitReviewEdit(
          ratingEdit,
          reviewEditState,
          reviewObj.id
        )
      );

      // i dont think this should be there should see if there is an error prop or something
      // if (data) {

      //   setErrors(data);
      // }

      // not sure i need this for
      if (errors.length === 0) {
        resetState();
      }
      // pass setFormTrigger
      // grab setFrmTrigger to false
      setFormTrigger(false);
      // let newReviewObj = {...reviewObj}
      // newReviewObj.stars = ratingEdit
      //  newReviewObj

      // !!!

      setReviewRender(data);
      ///To do

      // reviewEdit
      // starsEdit
      // se
      // hit something here to make react rerender current page / product review page
    }
  };

  const handleRatingChange = (number) => {
    // console.log("in handleRatingChange")
    if (from === "post") {
      setRating(parseInt(number));
    } else if (from === "edit") {
      // console.log("hi")
      setRatingEdit(parseInt(number));
    }
  };

  useEffect(() => {
    const err = {};
    // console.log("should be an empty err:", err)

    if (from === "post") {
      if (review.length < 10)
        err["Review"] = "Review needs 10 or more characters";
      if (review.length > 225)
        err["Review"] = "Review needs to be less than 225 or more characters";
    } else if (from === "edit") {
      if (reviewEditState.length < 10) {
        err["Review"] = "Review needs 10 or more characters";
      }
      if (reviewEditState.length > 225) {
        err["Review"] = "Review needs to be less than 225 or more characters";
      }
    }

    // console.log(err)
    setVaErrors(err);
  }, [review, reviewEditState]);

  const test = 3;
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
