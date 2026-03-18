import { Home, Search, Calendar as CalendarIcon, User } from "lucide-react";
import { ViewType } from "../../types";

interface BottomNavigationProps {
  view: ViewType;
  setView: (view: ViewType) => void;
}

const BottomNavigation = ({ view, setView }: BottomNavigationProps) => (
  <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-100 px-6 py-4 pb-8 sm:pb-6 flex justify-between items-center z-20">
    <button
      onClick={() => setView("home")}
      className={`flex flex-col items-center ${view === "home" ? "text-teal-600" : "text-gray-400 hover:text-gray-600"}`}
    >
      <Home size={24} className="mb-1" />
      <span className="text-[10px] font-medium">Início</span>
    </button>
    <button
      onClick={() => setView("discover")}
      className={`flex flex-col items-center ${view === "discover" ? "text-teal-600" : "text-gray-400 hover:text-gray-600"}`}
    >
      <Search size={24} className="mb-1" />
      <span className="text-[10px] font-medium">Descobrir</span>
    </button>
    <button
      onClick={() => setView("appointments")}
      className={`flex flex-col items-center ${view === "appointments" ? "text-teal-600" : "text-gray-400 hover:text-gray-600"}`}
    >
      <CalendarIcon size={24} className="mb-1" />
      <span className="text-[10px] font-medium">Consultas</span>
    </button>
    <button
      onClick={() => setView("user-profile")}
      className={`flex flex-col items-center ${view === "user-profile" ? "text-teal-600" : "text-gray-400 hover:text-gray-600"}`}
    >
      <User size={24} className="mb-1" />
      <span className="text-[10px] font-medium">Perfil</span>
    </button>
  </div>
);

export default BottomNavigation;
