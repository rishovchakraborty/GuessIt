import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInputFormContainer from "../../components/Textinputform/Textinputformcontainer";

function StartGame() {
  const [hint, setHint] = useState("");
  const navigate = useNavigate();

  function handleSubmit(word) {
    navigate("/play", { state: { wordSelected: word, hint: hint } });
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6">Start Game</h1>

      <TextInputFormContainer onSubmit={handleSubmit} />

      <div className="mt-4 w-full max-w-md">
        <label className="block mb-1 font-medium text-gray-700">Enter a Hint:</label>
        <input
          type="text"
          value={hint}
          onChange={(e) => setHint(e.target.value)}
          placeholder="e.g. It's an animal"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  );
}

export default StartGame;
