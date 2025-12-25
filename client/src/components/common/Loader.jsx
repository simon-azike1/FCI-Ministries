import { motion } from 'framer-motion';

function Loader({ fullScreen = false }) {
  const containerClass = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50"
    : "flex items-center justify-center py-20";

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center space-y-4">
        {/* Spinning Loader */}
        <motion.div
          className="relative w-16 h-16"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full"></div>
        </motion.div>

        {/* Loading Text */}
        <motion.p
          className="text-gray-600 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
}

export default Loader;
