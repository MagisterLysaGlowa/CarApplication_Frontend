import React from "react";
type Props = {
  rating: number;
};
import FullStar from "../../public/images/icons/star_icon.svg";
import HalfStar from "../../public/images/icons/star_half.svg";
import StrokeStar from "../../public/images/icons/star_stroke.svg";

const RatingBar = (props: Props) => {
  const { rating } = props;
  const ratingStr: string[] = rating.toString().split(".");

  return (
    <div className="flex">
      {[...Array(Number(ratingStr[0]))].map((item, index) => (
        <FullStar width={20} height={20} key={index} fill="#FF7124" />
      ))}

      {ratingStr[1] === "5" ? (
        <HalfStar width={20} height={20} fill="#FF7124" />
      ) : ratingStr[0] === "5" ? (
        ""
      ) : (
        <StrokeStar width={20} height={20} fill="#FF7124" />
      )}
      {ratingStr[0] === "5"
        ? ""
        : [...Array(4 - Number(ratingStr[0]))].map((item, index) => (
            <StrokeStar width={20} height={20} key={index} fill="#FF7124" />
          ))}
    </div>
  );
};

export default RatingBar;
