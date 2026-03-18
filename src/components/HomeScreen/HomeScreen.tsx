import { Search, MapPin, Star, ChevronRight, Sparkles } from "lucide-react";
import { Professional, Therapy } from "../../types";
import "./HomeScreen.css";

interface HomeScreenProps {
  therapies: Therapy[];
  professionals: Professional[];
  selectedTherapy: string | null;
  setSelectedTherapy: (therapy: string | null) => void;
  onNavigate: (view: string, data?: Professional) => void;
}

const HomeScreen = ({
  therapies,
  professionals,
  selectedTherapy,
  setSelectedTherapy,
  onNavigate,
}: HomeScreenProps) => (
  <div className="flex-1 overflow-y-auto pb-24 bg-gray-50 [&::-webkit-scrollbar]:hidden">
    {/* Header */}
    <div className="bg-white px-6 pt-6 pb-6 rounded-b-3xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-gray-500 text-sm mb-1">Bom dia,</p>
          <h1 className="text-2xl font-semibold text-gray-900">
            Encontre seu equilíbrio
          </h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-semibold">
          JD
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 rounded-2xl px-4 py-3">
        <Search className="text-gray-400 mr-3" size={20} />
        <input
          type="text"
          placeholder="Buscar profissionais ou terapias..."
          className="bg-transparent border-none outline-none w-full text-gray-700 placeholder-gray-400 text-sm"
        />
      </div>

      {/* AI Banner */}
      <div
        onClick={() => onNavigate("ai-match")}
        className="mt-4 bg-gradient-to-r from-teal-600 to-emerald-500 rounded-2xl p-4 flex items-center justify-between cursor-pointer shadow-md active:scale-[0.98] transition-transform"
      >
        <div>
          <div className="flex items-center text-white mb-1">
            <Sparkles size={16} className="mr-2 text-amber-300" />
            <h3 className="font-semibold text-sm">Match com IA ✨</h3>
          </div>
          <p className="text-teal-50 text-xs">
            Descreva o que sente e receba uma indicação.
          </p>
        </div>
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
          <ChevronRight size={18} />
        </div>
      </div>
    </div>

    {/* Categories */}
    <div className="mt-8 px-6">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Terapias</h2>
      </div>
      <div className="flex space-x-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
        {therapies.map((therapy) => (
          <button
            key={therapy.id}
            onClick={() =>
              setSelectedTherapy(
                selectedTherapy === therapy.id ? null : therapy.id,
              )
            }
            className={`flex flex-col items-center min-w-[80px] p-3 rounded-2xl transition-colors ${
              selectedTherapy === therapy.id
                ? "bg-teal-600 text-white shadow-md"
                : "bg-white text-gray-600 shadow-sm border border-gray-100"
            }`}
          >
            <therapy.icon size={24} className="mb-2" strokeWidth={1.5} />
            <span className="text-xs font-medium">{therapy.name}</span>
          </button>
        ))}
      </div>
    </div>

    {/* Professionals List */}
    <div className="mt-8 px-6">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Recomendado para você
        </h2>
        <button className="text-teal-600 text-sm font-medium">
          Ver tudo
        </button>
      </div>

      <div className="space-y-4">
        {professionals
          .filter(
            (p) => !selectedTherapy || p.therapies.includes(selectedTherapy),
          )
          .map((pro) => (
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

export default HomeScreen;
