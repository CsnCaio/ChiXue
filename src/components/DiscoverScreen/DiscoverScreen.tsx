import { Search, MapPin, Star, Filter } from "lucide-react";
import { Professional } from "../../types";
import "./DiscoverScreen.css";

interface DiscoverScreenProps {
  professionals: Professional[];
  onNavigate: (view: string, data?: Professional) => void;
}

const DiscoverScreen = ({
  professionals,
  onNavigate,
}: DiscoverScreenProps) => (
  <div className="flex-1 overflow-y-auto pb-24 bg-gray-50 [&::-webkit-scrollbar]:hidden">
    <div className="bg-white px-6 pt-6 pb-4 sticky top-0 z-10 shadow-sm">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Descobrir</h1>
      <div className="flex items-center space-x-3">
        <div className="flex-1 flex items-center bg-gray-100 rounded-2xl px-4 py-3">
          <Search className="text-gray-400 mr-3" size={20} />
          <input
            type="text"
            placeholder="Terapias, profissionais..."
            className="bg-transparent border-none outline-none w-full text-gray-700 placeholder-gray-400 text-sm"
          />
        </div>
        <button className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-600 active:bg-gray-200 transition-colors">
          <Filter size={20} />
        </button>
      </div>
    </div>

    <div className="px-6 py-6">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
        Todos os Profissionais
      </h2>
      <div className="space-y-4">
        {professionals.map((pro) => (
          <div
            key={pro.id}
            onClick={() => onNavigate("profile", pro)}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4 active:scale-[0.98] transition-transform cursor-pointer"
          >
            <img
              src={pro.image}
              alt={pro.name}
              className="w-20 h-20 rounded-xl object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-900">{pro.name}</h3>
                <div className="flex items-center text-amber-500">
                  <Star size={14} fill="currentColor" />
                  <span className="text-xs font-medium ml-1 text-gray-700">
                    {pro.rating}
                  </span>
                </div>
              </div>
              <p className="text-sm text-teal-600 font-medium">{pro.role}</p>
              <div className="flex items-center text-gray-500 text-xs mt-2">
                <MapPin size={12} className="mr-1" />
                <span>{pro.distance} de distância</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default DiscoverScreen;
