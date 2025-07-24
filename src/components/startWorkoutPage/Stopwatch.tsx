import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { TimerReset } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 5);
    }

    return () => {
      if (intervalIdRef.current !== null) clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function pause() {
    setIsRunning(false);
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }

  function formatTime() {
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const seconds = Math.floor((elapsedTime / 1000) % 60);

    const hoursStr = String(hours).padStart(2, "0");
    const minutesStr = String(minutes).padStart(2, "0");
    const secondsStr = String(seconds).padStart(2, "0");

    return `${hoursStr}:${minutesStr}:${secondsStr}`;
  }

  return (
    <div className="flex items-stretch gap-3">
      {/*Controls and Display*/}
      <div className="flex items-center gap-3">
        <Button
          onClick={start}
          className="bg-green-700 hover:bg-green-600 px-6 py-2 rounded-lg font-semibold text-white"
        >
          START
        </Button>
        <Button
          onClick={pause}
          className="bg-red-700 hover:bg-red-600 px-6 py-2 rounded-lg font-semibold text-white"
        >
          PAUSE
        </Button>
        {/*Display*/}
        <div className="flex items-center px-3 h-full font-bold text-2xl">
          {formatTime()}
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={reset}
              className="bg-slate-700 hover:bg-slate-600 px-6 py-2 rounded-lg font-semibold text-white"
            >
              <TimerReset />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Restart</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}

export default Stopwatch;
