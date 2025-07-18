export default function GameEndScreen({ win, score, highestScore, originalWord, onRestart }) {
  return (
    <div className="w-full h-screen bg-[#0a1e35] flex flex-col items-center justify-center text-white p-4">
      <div className="bg-gray-900/80 p-8 rounded-2xl text-center shadow-lg max-w-lg">
        <h1 className="text-4xl font-bold mb-4">
          {win ? "🎉 You Won!" : "💀 Game Over"}
        </h1>
        <p className="text-lg mb-2">
          <span className="font-semibold">Your Score:</span> {score}
        </p>
        <p className="text-lg mb-2">
          <span className="font-semibold">Highest Score:</span> {highestScore}
        </p>
        <p className="text-lg mb-4 text-yellow-300">
          <span className="font-semibold">The Word Was:</span> {originalWord}
        </p>
        <button
          onClick={onRestart}
          className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-6 rounded-lg font-bold mt-4"
        >
          🔄 Play Again
        </button>
      </div>
    </div>
  );
}
