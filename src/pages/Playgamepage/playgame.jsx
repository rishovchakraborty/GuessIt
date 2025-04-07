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
  const maxIncorrectGuesses = location.state?.maxWrongGuesses || 5;

  const handleTimeUp = () => {
    setIsComplete(true);
    setGameEndedDueToTime(true);
    navigator.vibrate?.([300, 100, 300]); // Vibrate on timeout
  };

  const handleLetterClick = (letter) => {
    if (usedLetters.includes(letter) || isComplete) return;

    setUsedLetters((prev) => [...prev, letter]);

    if (!wordSelected.toUpperCase().includes(letter)) {
      // ❌ Incorrect guess
      navigator.vibrate?.(200);
      setIncorrectGuesses((prev) => prev + 1);
    } else {
      // ✅ Correct guess
      navigator.vibrate?.(100);
    }
  };

  useEffect(() => {
    const wordLetters = new Set(wordSelected.toUpperCase());
    const guessedLetters = new Set(usedLetters.map((l) => l.toUpperCase()));
    const allGuessed = [...wordLetters].every((letter) => guessedLetters.has(letter));

    if (allGuessed || incorrectGuesses >= maxIncorrectGuesses) {
      setIsComplete(true);

      if (allGuessed) {
        navigator.vibrate?.(100); // Light win vibration
      } else {
        navigator.vibrate?.([300, 100, 300]); // Loss pattern
      }
    }
  }, [usedLetters, incorrectGuesses, wordSelected, maxIncorrectGuesses]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 text-black p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-2xl text-center">

        {/* Game Branding */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-2">
          🎯 Guess<span className="text-red-500">IT</span>
        </h1>
        <p className="text-sm text-gray-500 mb-4">Time-based Word Guessing Challenge</p>

        {/* Hint */}
        {hint && (
          <p className="text-md text-gray-700 font-medium mb-2">
            💡 <span className="text-gray-600">Hint:</span> {hint}
          </p>
        )}

        {/* Score */}
        <p className="text-sm text-gray-600 mb-2">
          ❌ Wrong Attempts:{" "}
          <span className="text-red-500 font-bold">
            {incorrectGuesses} / {maxIncorrectGuesses}
          </span>
        </p>

        {/* Timer */}
        {!isComplete && (
          <div className="mb-4">
            <Timer initialTime={60} onTimeUp={handleTimeUp} isRunning={!isComplete} />
          </div>
        )}

        {/* Masked word */}
        <div className="mb-6">
          <MaskedText text={wordSelected} usedLetters={usedLetters} />
        </div>

        {/* Result messages */}
        {isComplete && !gameEndedDueToTime && incorrectGuesses < maxIncorrectGuesses && (
          <div className="mb-4 text-green-600 text-lg font-semibold">
            🎉 You guessed it right: <strong>{wordSelected.toUpperCase()}</strong>
          </div>
        )}

        {isComplete && (gameEndedDueToTime || incorrectGuesses >= maxIncorrectGuesses) && (
          <div className="mb-4 text-red-600 text-lg font-semibold">
            💥 Game Over! The word was: <strong>{wordSelected.toUpperCase()}</strong>
          </div>
        )}

        {/* Letters */}
        <div className="mb-6">
          <LetterButtons
            text={wordSelected}
            usedLetters={usedLetters}
            onLetterClick={handleLetterClick}
          />
        </div>

        {/* Restart */}
        <Link
          to="/start"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-full transition duration-300"
        >
          🔁 Play Again
        </Link>
      </div>
    </div>
  );
}

export default Playgame;
