import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInputFormContainer from "../../components/Textinputform/Textinputformcontainer";

function StartGame() {
  const [hint, setHint] = useState("");
  const [maxWrongGuesses, setMaxWrongGuesses] = useState("5");
  const navigate = useNavigate();

  function vibrate(duration = 100) {
    if (navigator.vibrate) {
      navigator.vibrate(duration);
    }
  }

  function handleSubmit(word) {
    const cleanedWord = word.trim();

    // Validate input (letters only)
    if (!/^[a-zA-Z]+$/.test(cleanedWord)) {
      alert("❗ Please enter a valid word using only letters (A-Z).");
      return;
    }

    vibrate();

    const maxGuesses = parseInt(maxWrongGuesses);
    navigate("/play", {
      state: {
        wordSelected: cleanedWord,
        hint: hint.trim(),
        maxWrongGuesses: isNaN(maxGuesses) ? 5 : maxGuesses,
      },
    });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-xl">
        {/* Game Branding */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-700 mb-2">
          🎮 Guess<span className="text-red-500">IT</span>
        </h1>
        <p className="text-center text-sm text-gray-500 mb-4">
          Challenge your friends with words & hints!
        </p>

        {/* Instructions */}
        <p className="text-sm text-gray-600 mb-6 text-center">
          📌 Enter a word your friend will guess. Add a hint and max number of wrong guesses.
        </p>

        {/* Word Input */}
        <TextInputFormContainer onSubmit={handleSubmit} />

        {/* Hint input */}
        <div className="mt-6">
          <label className="block text-gray-700 font-semibold mb-1">
            💡 Enter a Hint:
          </label>
          <input
            type="text"
            value={hint}
            onChange={(e) => setHint(e.target.value)}
            placeholder="Hint related to your word..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Max wrong guesses */}
        <div className="mt-4">
          <label className="block text-gray-700 font-semibold mb-1">
            ❌ Max Wrong Guesses:
          </label>
          <input
            type="number"
            min={1}
            max={26}
            value={maxWrongGuesses}
            onChange={(e) => setMaxWrongGuesses(e.target.value)}
            placeholder="e.g. 5"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
      </div>
    </div>
  );
}

export default StartGame;
