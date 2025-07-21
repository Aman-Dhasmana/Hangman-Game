// src/components/HangmanDoll.jsx
export default function HangmanDoll({ wrongGuesses }) {
  return (
    <svg
      width="150"
      height="220"
      viewBox="0 0 150 220"
      className="text-white"
    >
      {/* Gallows */}
      <line x1="10" y1="210" x2="140" y2="210" stroke="white" strokeWidth="4" />
      <line x1="40" y1="210" x2="40" y2="20" stroke="white" strokeWidth="4" />
      <line x1="40" y1="20" x2="100" y2="20" stroke="white" strokeWidth="4" />
      <line x1="100" y1="20" x2="100" y2="40" stroke="white" strokeWidth="4" />

      {/* Hangman parts appear based on wrongGuesses */}
      {wrongGuesses > 0 && (
        <circle
          cx="100"
          cy="60"
          r="15"
          stroke="white"
          strokeWidth="3"
          fill="none"
        />
      )}
      {wrongGuesses > 1 && (
        <line x1="100" y1="75" x2="100" y2="130" stroke="white" strokeWidth="3" />
      )}
      {wrongGuesses > 2 && (
        <line x1="100" y1="85" x2="80" y2="110" stroke="white" strokeWidth="3" />
      )}
      {wrongGuesses > 3 && (
        <line x1="100" y1="85" x2="120" y2="110" stroke="white" strokeWidth="3" />
      )}
      {wrongGuesses > 4 && (
        <line x1="100" y1="130" x2="85" y2="170" stroke="white" strokeWidth="3" />
      )}
      {wrongGuesses > 5 && (
        <line x1="100" y1="130" x2="115" y2="170" stroke="white" strokeWidth="3" />
      )}
    </svg>
  );
}
