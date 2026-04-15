import { useEffect } from "react";
import { Leaf } from "lucide-react";

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex-1 bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-600 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-[-80px] left-[-80px] w-64 h-64 bg-white/5 rounded-full" />
      <div className="absolute bottom-[-60px] right-[-60px] w-48 h-48 bg-white/5 rounded-full" />
      <div className="absolute top-1/4 right-[-40px] w-32 h-32 bg-white/5 rounded-full" />

      {/* Logo */}
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-20 h-20 bg-white/15 rounded-3xl flex items-center justify-center mb-6 backdrop-blur-sm shadow-lg">
          <Leaf size={40} className="text-white" strokeWidth={1.5} />
        </div>
        <h1 className="text-4xl font-bold text-white tracking-wider">
          ChiXue
        </h1>
        <p className="text-teal-100 text-sm mt-2 font-light tracking-wide">
          Medicina Tradicional Chinesa
        </p>
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-20 flex space-x-2">
        <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:0ms]" />
        <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:150ms]" />
        <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
};

export default SplashScreen;
