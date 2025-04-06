import Rating from "@mui/material/Rating";
import VerifiedIcon from "@mui/icons-material/Verified";

export default function CustomerRevivew({
  ratingValue,
  name,
  customerOpinion,
}) {
  return (
    <div className="customer-revivew flex-shrink-0 snap-start w-[320px] text-left py-[32px] px-[28px] rounded-[20px] border border-[rgba(0,0,0,0.1)]">
      <div className="rating">
        <Rating
          name="half-rating-read"
          defaultValue={ratingValue}
          precision={0.5}
          readOnly
          className="mr-4"
        />
      </div>
      <div className="customer-name flex items-center">
        {name}
        <span className="authorized ml-[10px]">
          <VerifiedIcon sx={{ color: "green" }} />
        </span>
      </div>
      <div className="customer-revivew mt-2">{customerOpinion}</div>
    </div>
  );
}
