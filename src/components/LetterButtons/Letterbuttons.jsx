const ALPHABETS = new Array(26).fill('').map((_, index) => String.fromCharCode(65 + index));

function LetterButtons({ text = "", usedLetters = [], onLetterClick }) {
  const originalCharacters = new Set(text.toUpperCase().split(""));
  const selectedLetters = new Set(usedLetters.map(letter => letter.toUpperCase()));

  const getButtonStyle = (letter) => {
    if (selectedLetters.has(letter)) {
      return originalCharacters.has(letter)
        ? "bg-green-500 text-white border-green-600"
        : "bg-red-500 text-white border-red-600";
    } else {
      return "bg-gray-200 text-black hover:bg-gray-300";
    }
  };

  const handleClick = (event) => {
    const letter = event.target.value;
    onLetterClick?.(letter);
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
      {ALPHABETS.map((letter) => (
        <button
          key={`button-${letter}`}
          value={letter}
          disabled={selectedLetters.has(letter)}
          onClick={handleClick}
          className={`w-10 h-10 md:w-12 md:h-12 rounded-md border font-semibold transition-all duration-200 ${getButtonStyle(letter)}`}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}

export default LetterButtons;
