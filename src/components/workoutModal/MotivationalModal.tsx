import { motion } from "framer-motion";
import { Button } from "../ui/button";

function MotivationModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/70 backdrop-blur-sm">
      {/* Confetti emojis, animated */}
      <motion.div
        className="absolute inset-0 flex justify-center items-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        <div className="relative w-full h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-4xl select-none"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ y: -80 }}
              animate={{ y: 80 }}
              transition={{
                duration: 2.2 + Math.random(),
                repeat: Infinity,
                repeatType: "loop",
                delay: Math.random(),
              }}
            >
              {["🎉", "✨", "🎊", "💥", "💪"][Math.floor(Math.random() * 5)]}
            </motion.span>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="z-10 relative flex flex-col items-center bg-white shadow-2xl p-6 rounded-2xl min-w-[400px] max-w-sm"
      >
        <motion.div
          animate={{ rotate: [0, 30, -30, 10, -10, 0], scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2, repeatDelay: 1.2 }}
        >
          <span className="drop-shadow-lg text-5xl">🎉</span>
        </motion.div>
        <h2 className="drop-shadow mt-5 font-black text-cyan-700 text-2xl text-center">
          Workout Complete!
        </h2>
        <p className="mt-3 mb-5 text-gray-700 text-base text-center">
          <span className="font-semibold">Great work!</span>
          <br />
          You finished your workout.
          <br />
          <span className="font-bold text-cyan-600">Keep pushing forward!</span>
        </p>
        <Button
          className="bg-cyan-600 hover:bg-cyan-700 shadow-lg px-8 py-3 border-cyan-900 border-b-4 rounded-full font-bold text-white text-lg active:scale-95 transition-transform"
          onClick={onClose}
        >
          🚀 New Workout
        </Button>
      </motion.div>
    </div>
  );
}

export default MotivationModal;
