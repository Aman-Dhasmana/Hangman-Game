import { useState } from 'react';
import axios from 'axios';
import GameBoard from './GameBoard';
import LoadingPage from './LoadingPage';

function StartScreen() {
  const [gameStarted, setGameStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gameData, setGameData] = useState(null);

  const handleStartClick = async () => {
    setLoading(true); // Show loading page

    try {
      const response = await axios.post('http://localhost:8080/api/game/start');
      setGameData(response.data);

      // Simulate a slight delay for smoother UX (optional)
      setTimeout(() => {
        setLoading(false);
        setGameStarted(true);
      }, 1500);
    } catch (error) {
      console.error("Error starting game:", error);
      setLoading(false);
    }
  };

  // Show loading screen between start and game
  if (loading) {
    return <LoadingPage />;
  }

  // Show game if started
  if (gameStarted && gameData) {
    return (
      <GameBoard
        maskedWord={gameData.maskedWord}
        chancesLeft={gameData.chancesLeft}
      />
    );
  }

  // Default start screen
  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/hangman-bg.png')" }}
    >
      <div className="w-full max-w-3xl bg-[#0a1e35]/90 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-10 shadow-2xl text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-wide">
          Hangman
        </h1>
        <p className="text-sm sm:text-base text-blue-100 leading-relaxed max-w-xl mx-auto">
          Guess the secret word by typing letters. Each wrong guess brings you closer to the rope!
        </p>

        {!gameStarted && (
          <button
            onClick={handleStartClick}
            className="bg-gradient-to-r from-blue-900 to-blue-100 hover:from-white hover:to-blue-900 text-black font-semibold py-3 px-6 rounded-xl transition duration-300 shadow-md"
          >
            🚀 Start Game
          </button>
        )}
      </div>
    </div>
  );
}

export default StartScreen;
