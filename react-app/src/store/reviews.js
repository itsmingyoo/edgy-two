//*  =====================  thunks ===========================//
export const thunkGetReviewsById = () => async (dispatch) => {
  const response = await fetch("api/reviews/current", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  // console.log(response)

  if (response.ok) {
    const userReviewsData = await response.json();
    // console.log("DATA BEFORE PASSING TO ACTION", userReviewsData)
    if (userReviewsData.errors) {
      return;
    }

    dispatch(setUserReviews(userReviewsData));
  }
};

export const thunkGetReviewsByProductId = (productId) => async (dispatch) => {
  // console.log(productId, "PRODUCT ID")
  const response = await fetch(`/api/products/${productId}/reviews`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  // console.log(response)

  if (response.ok) {
    const productReviewsData = await response.json();

    if (productReviewsData.errors) {
      return;
    }
    // productIdReviewsData.Products =
    let passingObj = {};
    passingObj.Reviews = productReviewsData.Reviews;
    // console.log("before passing in", passingObj)
    // console.log(productReviewsData)
    dispatch(setProductReviews(productReviewsData));
  }
};

// post a review
export const thunkSubmitReview = (stars, review, id) => async (dispatch) => {
  const response = await fetch(`/api/products/${id}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      stars,
      review,
    }),
  });
  // console.log("hi")
  if (response.ok) {
    const data = await response.json();

    dispatch(postReview(data));
    // return null so front side will know there is not an error
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};
export const thunkSubmitReviewEdit =
  (stars, review, id) => async (dispatch) => {
    // console.log("info being passed to fethc:", "stars", stars, "review", review, "id", id)
    const response = await fetch(`/api/reviews/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stars,
        review,
      }),
    });
    // console.log("hi")
    if (response.ok) {
      const data = await response.json();
      // console.log("new object in reducer store", data)
      dispatch(editReview(data));
      // return null so front side will know there is not an error
      // was origin return null but want the new obj
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  };

export const thunkDeleteReview = (reviewId) => async (dispatch) => {
  let response = await fetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  response = await response.json();
  // console.log(response)
  dispatch(deleteReview(reviewId));
  return response;
  // await dispatch(deleteReview())
};

//*  ======================= end of thunks ===================//

//? =====================  types ===========================//
const GET_USER_REVIEWS = "REVIEWS/GetUserReviews";
const GET_PRODUCT_REVIEWS = "REVIEWS/GetProductReviews";
const POST_REVIEW = "REVIEWS/PostReview";
const DELETE_REVIEW = "REVIEWS/delete";
const EDIT_REVIEW = "REVIEWS/Edit";
//?  ===================end of types ===================//

//* =====================  actions ===========================//
const setUserReviews = (userReviewsData) => {
  return {
    type: GET_USER_REVIEWS,
    userReviewsData,
  };
};
const setProductReviews = (productReviewsData) => {
  return {
    type: GET_PRODUCT_REVIEWS,
    productReviewsData,
  };
};
const postReview = (newReview) => {
  return {
    type: POST_REVIEW,
    newReview,
  };
};
const editReview = (reviewEdit) => {
  return {
    type: EDIT_REVIEW,
    reviewEdit,
  };
};
const deleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId,
  };
};
//*  ======================= end of actions ===================//

//? ================== reducer================================//
let initialState = {
  userReviews: { Reviews: {}, User: {} },
  productReviews: { Reviews: {} },
};
export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_USER_REVIEWS:
      newState = { ...state };
      newState.userReviews = { ...newState.userReviews };
      newState.userReviews.Reviews = { ...newState.userReviews.Reviews };
      newState.userReviews.User = { ...newState.userReviews.User };

      let user = action.userReviewsData.User;
      newState.userReviews.User = user;
      action.userReviewsData.Reviews.forEach(
        (review) => (newState.userReviews.Reviews[review.id] = review)
      );
      return newState;

    case GET_PRODUCT_REVIEWS:
      newState = { ...state };
      // console.log("state store!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", newState)
      action.productReviewsData.Reviews.forEach(
        (review) => (newState.productReviews.Reviews[review.id] = review)
      );
      return newState;
    case POST_REVIEW:
      newState = { ...state };
      newState.productReviews = { ...newState.productReviews };
      newState.productReviews.Reviews = { ...newState.productReviews.Reviews };

      newState.productReviews.Reviews[action.newReview.id] = action.newReview;

      return newState;

    case EDIT_REVIEW:
      newState = { ...state };
      newState.userReviews = { ...newState.userReviews };
      newState.userReviews.Reviews = { ...newState.userReviews.Reviews };
      newState.userReviews.User = { ...newState.userReviews.User };
      newState.productReviews.Reviews = { ...newState.productReviews };
      newState.productReviews.Reviews = { ...newState.productReviews.Reviews };

      newState.productReviews.Reviews[action.reviewEdit.id] = action.reviewEdit;

      return newState;

    case DELETE_REVIEW:
      newState = { ...state };
      newState.userReviews.Reviews = { ...newState.userReviews.Reviews };
      delete newState.userReviews[action.reviewId];
      return newState;
    default:
      return state;
  }
}
