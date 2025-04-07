import CustomerRevivew from "../Home-page/CustomerRevivew";
import { useDispatch, useSelector } from "react-redux";
export default function ProductRating() {
  const revivews = useSelector((state) => state.fetchSlice.productInfo.reviews);
  let idCounter = 1;
  const revivewsList = revivews.map((ele) => {
    idCounter++;
    const apiDate = ele.date;

    const date = new Date(apiDate);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return (
      <CustomerRevivew
        key={idCounter}
        ratingValue={ele.rating}
        name={ele.reviewerName}
        customerOpinion={ele.comment}
        width={"calc(50% - 10px)"}
        date={`Posted On ${formattedDate}`}
        smWidth={true}
      />
    );
  });
  return (
    <div className="flex gap-[20px] py-[100px] max-w-[100%] flex-col items-center sm:flex-row flex-wrap justify-center md:justify-start">
      {revivewsList}
    </div>
  );
}
