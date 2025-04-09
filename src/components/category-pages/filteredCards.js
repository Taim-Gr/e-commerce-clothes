import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../Home-page/ProductCard";
export default function FilteredCards() {
  const filteredResult = useSelector((state) => {
    return state.categorySlice.filteredResponse;
  });
  console.log("123", filteredResult);
  const cardsList = filteredResult.map((c) => {
    return (
      <ProductCard
        key={c.id}
        title={c.title}
        rating={c.rating}
        imageUrl={c.images[0]}
        price={`$ ${c.price}`}
        description={c.description}
        warranty={c.warrantyInformation}
        productId={c.id}
      />
    );
  });
  return (
    <div
      className="flex flex-wrap justify-center scrollbar-thin gap-[10px]"
      style={{ height: "calc(100vh - 70px)", overflowY: "scroll" }}
    >
      {cardsList}
    </div>
  );
}
