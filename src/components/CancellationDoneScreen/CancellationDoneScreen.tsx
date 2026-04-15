import { XCircle, Clock, MapPin } from "lucide-react";
import { Professional, Appointment } from "../../types";

interface CancellationDoneScreenProps {
  professional: Professional;
  appointment: Appointment;
  onGoHome: () => void;
}

const CancellationDoneScreen = ({
  professional,
  appointment,
  onGoHome,
}: CancellationDoneScreenProps) => (
  <div className="flex-1 bg-red-500 flex flex-col items-center justify-center px-6 text-center">
    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6">
      <XCircle size={48} className="text-white" />
    </div>
    <h1 className="text-3xl font-bold text-white mb-2">
      Agendamento Cancelado
    </h1>
    <p className="text-red-100 mb-10">
      Sua sessão com {professional.name} foi cancelada com sucesso.
    </p>

    <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-xl text-left">
      <div className="flex items-center border-b border-gray-100 pb-4 mb-4">
        <Clock className="text-red-400 mr-3" size={20} />
        <div>
          <p className="text-xs text-gray-500 uppercase font-semibold">
            Data e Horário
          </p>
          <p className="text-gray-900 font-medium">
            {appointment.date} • {appointment.time}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <MapPin className="text-red-400 mr-3" size={20} />
        <div>
          <p className="text-xs text-gray-500 uppercase font-semibold">
            Profissional
          </p>
          <p className="text-gray-900 font-medium">{professional.name}</p>
        </div>
      </div>
    </div>

    <button
      onClick={onGoHome}
      className="mt-10 bg-white text-red-600 font-bold py-4 px-8 rounded-full w-full max-w-sm active:bg-gray-100 transition-colors"
    >
      Voltar ao Início
    </button>
  </div>
);

export default CancellationDoneScreen;
