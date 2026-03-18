import { ChevronLeft, MapPin, Star } from "lucide-react";
import { Professional, Therapy } from "../../types";

interface ProfessionalProfileScreenProps {
  professional: Professional;
  therapies: Therapy[];
  onBack: () => void;
  onBook: () => void;
}

const ProfessionalProfileScreen = ({
  professional,
  therapies,
  onBack,
  onBook,
}: ProfessionalProfileScreenProps) => (
  <div className="flex-1 bg-white overflow-y-auto pb-24 relative [&::-webkit-scrollbar]:hidden">
    <div className="relative h-72">
      <img
        src={professional.image}
        alt={professional.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 to-transparent" />
      <button
        onClick={onBack}
        className="absolute top-6 left-6 w-10 h-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white"
      >
        <ChevronLeft size={24} />
      </button>
    </div>

    <div className="bg-white rounded-t-3xl -mt-8 relative px-6 pt-8 pb-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {professional.name}
          </h1>
          <p className="text-teal-600 font-medium mt-1">{professional.role}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-gray-900">
            {professional.price}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-6 mt-4 pb-6 border-b border-gray-100">
        <div className="flex items-center text-gray-600">
          <Star
            size={18}
            className="text-amber-500 mr-2"
            fill="currentColor"
          />
          <span className="font-semibold text-gray-900 mr-1">
            {professional.rating}
          </span>
          <span className="text-sm">({professional.reviews} avaliações)</span>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin size={18} className="text-teal-500 mr-2" />
          <span className="text-sm">{professional.distance}</span>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-gray-900 mb-2">Sobre</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {professional.about}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-gray-900 mb-3">
          Terapias Oferecidas
        </h3>
        <div className="flex flex-wrap gap-2">
          {professional.therapies.map((tId) => {
            const therapy = therapies.find((t) => t.id === tId);
            return (
              <div
                key={tId}
                className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5"
              >
                {therapy && (
                  <therapy.icon size={14} className="text-teal-600 mr-2" />
                )}
                <span className="text-sm text-gray-700 capitalize">
                  {therapy?.name || tId}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>

    <div className="fixed bottom-0 left-0 w-full max-w-md mx-auto bg-white border-t border-gray-100 p-4 pb-8">
      <button
        onClick={onBook}
        className="w-full bg-teal-600 text-white font-semibold rounded-2xl py-4 shadow-lg shadow-teal-600/20 active:bg-teal-700 transition-colors"
      >
        Agendar Sessão
      </button>
    </div>
  </div>
);

export default ProfessionalProfileScreen;
