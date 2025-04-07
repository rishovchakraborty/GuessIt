import { useState } from "react";
import TextInputFormContainer from "../../components/Textinputform/Textinputformcontainer";

function StartGame() {
  const [hint, setHint] = useState("");
  const [maxWrongGuesses, setMaxWrongGuesses] = useState("5");
  const [shareLink, setShareLink] = useState("");

  function vibrate(duration = 100) {
    if (navigator.vibrate) {
      navigator.vibrate(duration);
    }
  }

  function handleSubmit(word) {
    const cleanedWord = word.trim();

    if (!/^[a-zA-Z]+$/.test(cleanedWord)) {
      alert("❗ Please enter a valid word using only letters (A-Z).");
      return;
    }

    const maxGuesses = parseInt(maxWrongGuesses) || 5;
    const query = new URLSearchParams({
      word: cleanedWord,
      hint: hint.trim(),
      maxWrongGuesses: maxGuesses.toString(),
    }).toString();

    const link = `${window.location.origin}/GuessIt/play?${query}`; // ✅ adjust base path if needed

    vibrate();
    setShareLink(link);

    navigator.clipboard.writeText(link).then(() => {
      const openWhatsApp = confirm("✅ Link copied to clipboard!\nDo you want to share it on WhatsApp?");
      if (openWhatsApp) {
        const message = `🎮 Play my word guessing game!\n👉 ${link}`;
        const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, "_blank");
      }
    });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-700 mb-2">
          🎮 Guess<span className="text-red-500">IT</span>
        </h1>
        <p className="text-center text-sm text-gray-500 mb-4">
          Challenge your friends with words & hints!
        </p>
        <p className="text-sm text-gray-600 mb-6 text-center">
          📌 Enter a word your friend will guess. Add a hint and max number of wrong guesses.
        </p>

        <TextInputFormContainer onSubmit={handleSubmit} />

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

        {shareLink && (
          <div className="mt-6 text-center">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`🎮 Play my word guessing game!\n👉 ${shareLink}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-md transition"
            >
              📲 Share on WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default StartGame;
