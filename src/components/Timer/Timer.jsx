import { useEffect, useState } from "react";

function Timer({ initialTime = 60, onTimeUp, isRunning = true }) {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        if (!isRunning || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [isRunning]);

    // Handle when time runs out (outside render)
    useEffect(() => {
        if (timeLeft <= 0 && isRunning) {
            onTimeUp?.();
        }
    }, [timeLeft, isRunning, onTimeUp]);

    return (
        <div className="text-red-600 font-semibold text-lg">
            ⏱️ Time Left: {timeLeft} sec
        </div>
    );
}

export default Timer;
