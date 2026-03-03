import React from "react";
import StarIcon from "../../public/images/icons/star.svg";

type Props = {
  text: string;
};

const Pill = (props: Props) => {
  const { text } = props;
  const max_width = text.length < 30 ? "180px" : "205px";
  return (
    <div
      className={`grid items-center lg:place-items-center max-w-[${max_width}]`}
      style={{ gridTemplateColumns: "auto 1fr" }}
    >
      <StarIcon width={16} height={16} fill="#FF7124" />
      <p className="ml-2 mobile-normal lg:desktop-normal">{text}</p>
    </div>
  );
};

export default Pill;
