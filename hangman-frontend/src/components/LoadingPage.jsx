import { useEffect, useState } from "react";

const tips = [
  "Tip: Start guessing vowels like A, E, I.",
  "Tip: Watch common letters like R, S, T.",
  "Tip: Avoid random guessing, look for patterns.",
  "Tip: Check word length for possible matches.",
  "Tip: Keep track of letters already tried."
];

export default function LoadingPage() {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 2000); // Change tip every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mb-4"></div>
      <p className="text-lg font-semibold">{tips[tipIndex]}</p>
      <p className="mt-2 text-sm text-gray-400">Loading game, please wait...</p>
    </div>
  );
}
