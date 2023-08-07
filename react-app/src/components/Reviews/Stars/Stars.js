import makeStars from "../../../utils";
import "./Stars.css";

function Stars({ reviews }) {
  let { stars, count } = makeStars(reviews);

  return (
    <>
    <div className="allStars">
      {stars.map((_, idx) => (
        <div className="S-stars-count-div">
          <i key={idx} className="fas fa-star pStars cat-Stars" />
        </div>
      ))}
      <p> ({count}) </p>
    </div>
    </>
  );
}

export default Stars;
