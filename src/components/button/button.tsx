import imgGearGold from "./../../assets/icons/gearOrange.svg";
import imgGearPurple from "./../../assets/icons/gearPurple.svg";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export default function Button({
  text,
  onClick,
  type,
  color,
  img,
}: {
  text: string;
  onClick?: (e?: any) => void;
  type?: "submit" | "reset" | "button";
  color: string;
  img?: boolean | string;
}) {
  const [isLoading, setIsLoading] = useState(false); // Add a new state for loading

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    if (onClick) {
      await onClick(e);
    }
    setIsLoading(false);
  };

  return (
    <>
      <button
        className={`flex items-center justify-evenly w-full h-10 transition-all duration-300 ease-in-out 
        ${
          color === "purple"
            ? "bg-purple text-goldDark border-goldDark"
            : color === "gold"
            ? "bg-goldDark text-purple border-goldDark"
            : "bg-transparent text-purple border-transparent"
        } rounded-3xl border-2 `}
        type={type ? type : "button"}
        onClick={handleClick} // Use the new handleClick function
        disabled={isLoading}
      >
        {isLoading ? (
          <ClipLoader
            color={color === "purple" ? "#FF8500" : "#5A189A"}
            loading={isLoading}
          />
        ) : (
          text
        )}{" "}
        {img && (
          <img
            src={
              typeof img === "string"
                ? img
                : color === "purple"
                ? imgGearGold
                : color === "gold"
                ? imgGearPurple
                : imgGearPurple
            }
            alt="icon setting"
          />
        )}
      </button>
    </>
  );
}
