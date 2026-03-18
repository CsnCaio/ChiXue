import { CheckCircle2, Clock, MapPin } from "lucide-react";
import { Professional } from "../../types";
import "./SuccessScreen.css";

interface SuccessScreenProps {
  professional: Professional;
  selectedDate: string;
  selectedTime: string | null;
  onGoHome: () => void;
}

const SuccessScreen = ({
  professional,
  selectedDate,
  selectedTime,
  onGoHome,
}: SuccessScreenProps) => (
  <div className="flex-1 bg-teal-600 flex flex-col items-center justify-center px-6 text-center">
    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6">
      <CheckCircle2 size={48} className="text-white" />
    </div>
    <h1 className="text-3xl font-bold text-white mb-2">
      Agendamento Confirmado!
    </h1>
    <p className="text-teal-100 mb-10">
      Sua sessão com {professional.name} foi agendada com sucesso.
    </p>

    <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-xl text-left">
      <div className="flex items-center border-b border-gray-100 pb-4 mb-4">
        <Clock className="text-teal-500 mr-3" size={20} />
        <div>
          <p className="text-xs text-gray-500 uppercase font-semibold">
            Data e Horário
          </p>
          <p className="text-gray-900 font-medium">
            Ter, {selectedDate} de Out • {selectedTime}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <MapPin className="text-teal-500 mr-3" size={20} />
        <div>
          <p className="text-xs text-gray-500 uppercase font-semibold">
            Local
          </p>
          <p className="text-gray-900 font-medium">Clínica ChiXue Saúde</p>
        </div>
      </div>
    </div>

    <button
      onClick={onGoHome}
      className="mt-10 bg-white text-teal-700 font-bold py-4 px-8 rounded-full w-full max-w-sm active:bg-gray-100 transition-colors"
    >
      Voltar ao Início
    </button>
  </div>
);

export default SuccessScreen;
