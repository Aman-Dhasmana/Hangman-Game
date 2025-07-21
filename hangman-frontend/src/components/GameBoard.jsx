import { useEffect, useState } from "react";
import axios from "axios";
import GameEndScreen from "./GameEndScreen";
import HangmanDoll from "./HangmanDoll";

export default function GameBoard({ maskedWord, chancesLeft }) {
  const [word, setWord] = useState(maskedWord);
  const [leftGuesses, setLeftGuesses] = useState(chancesLeft);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [originalWord, setOriginalWord] = useState(""); // Original word from backend

  const userId = 1; // Replace with real user ID if available
  const username = "Player"; // Replace with logged-in username if available

  // Fetch highest score
  useEffect(() => {
    const fetchHighestScore = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/game/top-scores?userId=${userId}`
        );
        if (response.data && response.data.length > 0) {
          setHighestScore(response.data[0].score); // Highest score
        } else {
          setHighestScore(0);
        }
      } catch (error) {
        console.error("Error fetching highest score:", error);
        setHighestScore(0);
      }
    };
    fetchHighestScore();
  }, [userId]);

  // Timer logic
  useEffect(() => {
    if (gameOver) return;
    if (timeLeft <= 0) {
      setGameOver(true);
      setWin(false);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, gameOver]);

  // Handle letter guess
  const handleGuess = async (letter) => {
    if (guessedLetters.includes(letter) || leftGuesses <= 0 || gameOver) return;
    setGuessedLetters((prev) => [...prev, letter]);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/game/guess?letter=${letter}`
      );
      setWord(response.data.maskedWord);
      setLeftGuesses(response.data.chancesLeft);

      // If game over
      if (response.data.gameOver) {
        setOriginalWord(response.data.correctWord || "");
        setWin(response.data.wordGuessed || false);
        setScore(response.data.score || 0);
        setGameOver(true);

        // Save score to backend
        try {
          await axios.post("http://localhost:8080/api/game/save-score", null, {
            params: { userId, username, score: response.data.score || 0 },
          });
        } catch (error) {
          console.error("Error saving score:", error);
        }
      }
    } catch (error) {
      console.error("Error guessing letter:", error);
    }
  };

  // Restart game
  const restartGame = async () => {
  try {
    const response = await axios.post("http://localhost:8080/api/game/restart");
    
    setWord(response.data.maskedWord);
    setLeftGuesses(response.data.chancesLeft);
    setGuessedLetters([]);
    setTimeLeft(60);
    setGameOver(false);
    setWin(false);
    setScore(0);
    setOriginalWord("");
    
    // Fetch updated highest score
    const scoreResponse = await axios.get(
      `http://localhost:8080/api/game/top-scores?userId=${userId}`
    );
    if (scoreResponse.data && scoreResponse.data.length > 0) {
      setHighestScore(scoreResponse.data[0].score);
    } else {
      setHighestScore(0);
    }

  } catch (error) {
    console.error("Error restarting game:", error);
  }


  };

  if (gameOver) {
    return (
      <GameEndScreen
        win={win}
        score={score}
        highestScore={highestScore}
        originalWord={originalWord || word.replace(/_/g, "?")}
        onRestart={restartGame}
      />
    );
  }

  return (
    <div className="h-screen w-full bg-[#0a1e35] text-white flex flex-col">
      {/* Upper 70% */}
      <div className="flex flex-row h-[70%]">
        {/* Left 60% */}
        <div className="w-[60%] flex flex-col justify-center items-center border-r border-gray-600 p-4">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8 tracking-wide">
            {word.split("").join(" ")}
          </h2>
          <p className="text-xl font-semibold">
            Left Guesses:{" "}
            <span className="text-yellow-400">{leftGuesses}</span>
          </p>
        </div>

        {/* Right 40% */}
        <div className="w-[40%] flex flex-col items-center justify-between p-4">
  <p className="text-xl font-semibold text-red-400">
    Time Left: {timeLeft}s
  </p>
  <div className="flex-grow flex items-center justify-center">
    <HangmanDoll wrongGuesses={7 - leftGuesses} />
  </div>
</div>
      </div>

      {/* Lower 30% */}
      <div className="h-[30%] bg-gray-800 p-4 flex flex-col items-center justify-center gap-3">
        <div className="flex gap-2">
          {"ABCDEFGHIJ".split("").map((letter) => (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={guessedLetters.includes(letter)}
              className={`px-4 py-2 rounded-lg font-bold transition ${
                guessedLetters.includes(letter)
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {"KLMNOPQRST".split("").map((letter) => (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={guessedLetters.includes(letter)}
              className={`px-4 py-2 rounded-lg font-bold transition ${
                guessedLetters.includes(letter)
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {"UVWXYZ".split("").map((letter) => (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={guessedLetters.includes(letter)}
              className={`px-4 py-2 rounded-lg font-bold transition ${
                guessedLetters.includes(letter)
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
