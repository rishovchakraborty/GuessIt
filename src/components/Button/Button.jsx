import { useState } from "react";

function Button({ text, buttonType = "button", onClickHandler }) {
  const [isAnimated, setIsAnimated] = useState(false);

  const handleClick = (event) => {
    setIsAnimated(true);
    if (onClickHandler) onClickHandler(event);

    // Reset animation after 1s (duration of animation)
    setTimeout(() => setIsAnimated(false), 1000);
  };

  return (
    <button
      type={buttonType}
      onClick={handleClick}
      className={`bg-black text-white font-semibold py-2 px-6 rounded-2xl shadow-md border transition-all duration-300 
        hover:bg-white hover:text-black hover:border-black 
        border-white 
        ${isAnimated ? "animate-bounce" : ""}
      `}
    >
      {text}
    </button>
  );
}

export default Button;
