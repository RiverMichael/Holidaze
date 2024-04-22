import { useEffect, useState } from "react";
import { IoStarOutline, IoStar, IoStarHalf } from "react-icons/io5";

export default function StarRating({ rating }) {
  const [ratingValue, setRatingValue] = useState(0);

  useEffect(() => {
    setRatingValue(rating);
  }, [rating]);

  return (
    <div className="flex gap-1 items-center text-primary">
      {[...Array(5)].map((_, index) => {
        const currentRate = index + 1;
        return currentRate <= Math.floor(ratingValue) ? (
          <IoStar size={14} key={index} />
        ) : currentRate === Math.ceil(ratingValue) && ratingValue % 1 !== 0 ? (
          <IoStarHalf size={14} key={index} />
        ) : (
          <IoStarOutline size={14} key={index} />
        );
      })}
      <span className="text-text">{rating.toFixed(1)}</span>
    </div>
  );
}
