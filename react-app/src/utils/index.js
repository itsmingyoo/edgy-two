

const makeStars = (reviewsArray) => {

    let sum = 0
    // let count = product.Reviews.length
    let count = reviewsArray.length

    for (const review of reviewsArray) {

        sum += review.stars
    }

    let starAvg = Math.round(sum / count)

    let stars = []
    for (let i = 0; i < starAvg; i++) {
        stars.push("hi")
    }
    if (stars.length === 0) {
        stars.push("filler")
    }

    return {
        "stars": stars,
        "count": count
    }
}

export default makeStars
