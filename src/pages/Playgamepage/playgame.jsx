import { Link, useLocation } from "react-router-dom";
import MaskedText from "../../components/Maskedtext/Maskedtext";
import LetterButtons from "../../components/LetterButtons/Letterbuttons";
import Timer from "../../components/Timer/Timer";
import { useEffect, useState } from "react";

function Playgame() {
  const [usedLetters, setUsedLetters] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [gameEndedDueToTime, setGameEndedDueToTime] = useState(false);

  const location = useLocation();
  const wordSelected = location.state?.wordSelected || "";
  const hint = location.state?.hint || "";
  const maxIncorrectGuesses = location.state?.maxWrongGuesses || 5; // ✅ Get from state

  const handleTimeUp = () => {
    setIsComplete(true);
    setGameEndedDueToTime(true);
  };

  const handleLetterClick = (letter) => {
    if (usedLetters.includes(letter) || isComplete) return;

    setUsedLetters((prev) => [...prev, letter]);

    if (!wordSelected.toUpperCase().includes(letter)) {
      setIncorrectGuesses((prev) => prev + 1); // ✅ Track wrong guesses
    }
  };

  useEffect(() => {
    const wordLetters = new Set(wordSelected.toUpperCase());
    const guessedLetters = new Set(usedLetters.map((l) => l.toUpperCase()));
    const allGuessed = [...wordLetters].every((letter) => guessedLetters.has(letter));

    if (allGuessed || incorrectGuesses >= maxIncorrectGuesses) {
      setIsComplete(true);
    }
  }, [usedLetters, incorrectGuesses, wordSelected, maxIncorrectGuesses]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-6">
      <h1 className="text-4xl font-bold mb-2 text-gray-800">Guess the Word</h1>
      {hint && <p className="text-sm text-gray-500 mb-2">💡 Hint: {hint}</p>}
      <p className="text-sm text-gray-600 mb-4">
        ❌ Wrong Attempts: {incorrectGuesses} / {maxIncorrectGuesses}
      </p>

      {!isComplete && (
        <Timer initialTime={60} onTimeUp={handleTimeUp} isRunning={!isComplete} />
      )}

      <MaskedText text={wordSelected} usedLetters={usedLetters} />

      {isComplete && !gameEndedDueToTime && incorrectGuesses < maxIncorrectGuesses && (
        <div className="mt-4 text-green-600 text-lg font-semibold">
          🎉 You guessed it right: <strong>{wordSelected.toUpperCase()}</strong>
        </div>
      )}

      {isComplete && (gameEndedDueToTime || incorrectGuesses >= maxIncorrectGuesses) && (
        <div className="mt-4 text-red-600 text-lg font-semibold">
          💥 Game Over! The word was: <strong>{wordSelected.toUpperCase()}</strong>
        </div>
      )}

      <div className="mt-6">
        <LetterButtons
          text={wordSelected}
          usedLetters={usedLetters}
          onLetterClick={handleLetterClick}
        />
      </div>

      <Link to="/start" className="mt-8 text-blue-600 underline hover:text-blue-700">
        Play Again
      </Link>
    </div>
  );
}

export default Playgame;
