import { Wifi, SignalHigh, Battery } from "lucide-react";

const AndroidStatusBar = () => (
  <div className="w-full h-7 bg-white flex justify-between items-center px-4 text-gray-800 text-[11px] font-medium z-50 sticky top-0">
    <span>10:00</span>
    <div className="flex items-center space-x-1.5">
      <Wifi size={12} strokeWidth={2.5} />
      <SignalHigh size={12} strokeWidth={2.5} />
      <Battery size={14} strokeWidth={2.5} />
    </div>
  </div>
);

export default AndroidStatusBar;
