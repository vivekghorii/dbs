import { useEffect, useState } from "react";

interface CountdownTimerProps {
  endTime: string;
  startTime?: string;
  onExpired?: () => void;
}

const CountdownTimer = ({ endTime, startTime, onExpired }: CountdownTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    total: number;
  } | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const start = startTime ? new Date(startTime).getTime() : null;

      // Check if bid has started
      if (start && now < start) {
        const timeUntilStart = start - now;
        const days = Math.floor(timeUntilStart / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeUntilStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeUntilStart % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeUntilStart % (1000 * 60)) / 1000);

        setTimeRemaining({
          days,
          hours,
          minutes,
          seconds,
          total: timeUntilStart,
        });
        setHasStarted(false);
        setHasEnded(false);
        return;
      } else if (start) {
        setHasStarted(true);
      } else {
        setHasStarted(true);
      }

      // Check if bid has ended
      if (now >= end) {
        setHasEnded(true);
        setTimeRemaining(null);
        if (onExpired) {
          onExpired();
        }
        return;
      }

      // Calculate time remaining
      const timeLeft = end - now;
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setTimeRemaining({
        days,
        hours,
        minutes,
        seconds,
        total: timeLeft,
      });
      setHasEnded(false);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [endTime, startTime, onExpired]);

  if (hasEnded) {
    return (
      <div className="bg-red-100 border border-red-300 rounded p-3">
        <p className="text-red-800 font-semibold">⏰ Bidding Ended</p>
      </div>
    );
  }

  if (!hasStarted && timeRemaining) {
    return (
      <div className="bg-yellow-100 border border-yellow-300 rounded p-3">
        <p className="text-yellow-800 font-semibold mb-1">⏳ Bidding Starts In:</p>
        <div className="flex gap-2 text-yellow-900">
          {timeRemaining.days > 0 && (
            <span className="font-bold">{timeRemaining.days}d</span>
          )}
          <span className="font-bold">{timeRemaining.hours}h</span>
          <span className="font-bold">{timeRemaining.minutes}m</span>
          <span className="font-bold">{timeRemaining.seconds}s</span>
        </div>
      </div>
    );
  }

  if (!timeRemaining) {
    return (
      <div className="bg-gray-100 border border-gray-300 rounded p-3">
        <p className="text-gray-600">Calculating time...</p>
      </div>
    );
  }

  const isUrgent = timeRemaining.total < 3600000; // Less than 1 hour

  return (
    <div
      className={`border rounded p-3 ${
        isUrgent
          ? "bg-red-50 border-red-300"
          : "bg-blue-50 border-blue-300"
      }`}
    >
      <p
        className={`font-semibold mb-1 ${
          isUrgent ? "text-red-800" : "text-blue-800"
        }`}
      >
        {isUrgent ? "⏰ Time Remaining:" : "⏱️ Time Remaining:"}
      </p>
      <div
        className={`flex gap-2 ${
          isUrgent ? "text-red-900" : "text-blue-900"
        }`}
      >
        {timeRemaining.days > 0 && (
          <span className="font-bold text-lg">
            {timeRemaining.days}d
          </span>
        )}
        <span className="font-bold text-lg">{timeRemaining.hours}h</span>
        <span className="font-bold text-lg">{timeRemaining.minutes}m</span>
        <span className="font-bold text-lg">{timeRemaining.seconds}s</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
