import { getPolishTokenWord } from "../../pakiety/components/TokenCounter";

const StarIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 18 18"
    >
      <g clipPath="url(#clip0_6402_2103)">
        <path
          fill="#06F"
          d="M8.984 0c.507-.017.777.279.97.705.697 1.534 1.39 3.072 2.117 4.588.127.26.39.517.655.644 1.483.71 2.988 1.387 4.486 2.07.433.193.78.45.788.974.007.552-.352.816-.802 1.02-1.515.687-3.034 1.373-4.536 2.087-.25.127-.453.33-.58.584-.71 1.492-1.385 2.995-2.068 4.497-.2.44-.429.824-.995.83-.59.008-.83-.383-1.037-.844-.682-1.502-1.357-3.008-2.071-4.497a1.33 1.33 0 0 0-.587-.577c-1.502-.714-3.02-1.4-4.536-2.087-.433-.193-.78-.45-.788-.974-.007-.55.352-.817.802-1.02 1.515-.687 3.034-1.373 4.536-2.088.25-.126.453-.33.58-.584.724-1.52 1.417-3.058 2.113-4.592.19-.419.443-.739.953-.735"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_6402_2103">
          <path fill="#fff" d="M0 0h18v18H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
};
interface TokenCounterProps {
  tokens: number;
}

const TokenCounter: React.FC<TokenCounterProps> = ({ tokens }) => {
  const tokenLabel = `${tokens} ${getPolishTokenWord(tokens)}`;
  return (
    <div className="flex items-center bg-white rounded-[20px] p-3 px-6 gap-2 mx-6 lg:mx-auto">
      <StarIcon />
      <p className="lg:text-[16px] text-[14px] text-nowrap font-[400]">
        Na Twoim koncie aktualnie znajduje się:{" "}
        <span className="text-[#0066FF]">{tokenLabel}</span>
      </p>
    </div>
  );
};

export default TokenCounter;
