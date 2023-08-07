import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkSearchAllProducts } from "../../store/products";
import CategoryItem from "../Categories/CategoryItem";

function SimilarFavoritesCard({ favs }) {
  const { search } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [num, setNum] = useState(0);

  let similar = favs[num]?.item_name.split(" ");
  similar = similar.join(", ");
  // console.log(similar)

  useEffect(() => {
    dispatch(thunkSearchAllProducts(similar));
  }, [dispatch]);

  let searches = Object.values(search);

  let s = [];
  for (let item of favs) {
    for (let name of searches) {
      if (name.item_name !== item.item_name) {
        s.push(name);
      }
    }
  }

  if (s.length === 1 && s[0]?.item_name == favs[num]?.item_name)
    setNum(num + 1);

  let eachProduct = s.slice(0, 6);

  return (
    <div className="pop2">
      <h1>Similar products</h1>
      <div className="data">
        {eachProduct?.map((p) => (
          <CategoryItem p={p} page="recent" />
        ))}
      </div>
    </div>
  );
}

export default SimilarFavoritesCard;
