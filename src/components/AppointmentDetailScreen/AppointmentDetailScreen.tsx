import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Star,
  CheckCircle2,
  MessageCircle,
  Phone,
  AlertTriangle,
  X,
} from "lucide-react";
import { Professional, Appointment } from "../../types";

interface AppointmentDetailScreenProps {
  appointment: Appointment;
  professional: Professional;
  onBack: () => void;
  onCancelDone: () => void;
}

const AppointmentDetailScreen = ({
  appointment,
  professional,
  onBack,
  onCancelDone,
}: AppointmentDetailScreenProps) => {
  const isUpcoming = appointment.status === "upcoming";
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 [&::-webkit-scrollbar]:hidden">
      {/* Header */}
      <div
        className={`px-6 pt-4 pb-8 rounded-b-[32px] relative overflow-hidden ${
          isUpcoming
            ? "bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-600"
            : "bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800"
        }`}
      >
        <div className="absolute top-[-40px] right-[-40px] w-32 h-32 bg-white/5 rounded-full" />
        <div className="absolute bottom-[-20px] left-[-20px] w-24 h-24 bg-white/5 rounded-full" />

        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center mb-6 active:scale-[0.98] transition-transform backdrop-blur-sm"
        >
          <ArrowLeft size={18} className="text-white" />
        </button>

        <div className="flex items-center space-x-4 relative z-10">
          <img
            src={professional.image}
            alt={professional.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20"
          />
          <div>
            <h1 className="text-xl font-bold text-white">
              {professional.name}
            </h1>
            <p className="text-white/70 text-sm">{professional.role}</p>
            <div className="flex items-center mt-1">
              <Star
                size={12}
                fill="currentColor"
                className="text-amber-400"
              />
              <span className="text-white/80 text-xs ml-1">
                {professional.rating} ({professional.reviews} avaliações)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Status badge */}
      <div className="px-6 -mt-4 relative z-20">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center">
            {isUpcoming ? (
              <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center mr-3">
                <Calendar size={20} className="text-teal-600" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center mr-3">
                <CheckCircle2 size={20} className="text-emerald-600" />
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {isUpcoming ? "Agendamento confirmado" : "Consulta concluída"}
              </p>
              <p className="text-xs text-gray-500">
                {isUpcoming
                  ? "Sua sessão está confirmada"
                  : "Esta sessão já foi realizada"}
              </p>
            </div>
          </div>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              isUpcoming
                ? "bg-teal-50 text-teal-700"
                : "bg-emerald-50 text-emerald-600"
            }`}
          >
            {isUpcoming ? "Próximo" : "Concluído"}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="px-6 mt-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Detalhes da consulta
        </h2>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-50">
          {/* Date */}
          <div className="flex items-center p-4">
            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center mr-4">
              <Calendar size={18} className="text-teal-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Data</p>
              <p className="text-sm font-semibold text-gray-900">
                {appointment.date}
              </p>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-center p-4">
            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center mr-4">
              <Clock size={18} className="text-teal-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Horário</p>
              <p className="text-sm font-semibold text-gray-900">
                {appointment.time}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center p-4">
            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center mr-4">
              <MapPin size={18} className="text-teal-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Distância</p>
              <p className="text-sm font-semibold text-gray-900">
                {professional.distance}
              </p>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center p-4">
            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center mr-4">
              <span className="text-teal-600 font-bold text-sm">R$</span>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Valor</p>
              <p className="text-sm font-semibold text-gray-900">
                {professional.price}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About professional */}
      <div className="px-6 mt-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Sobre o profissional
        </h2>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600 leading-relaxed">
            {professional.about}
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-6 mt-6 pb-8 space-y-3">
        {isUpcoming ? (
          <>
            <div className="flex space-x-3">
              <button className="flex-1 flex items-center justify-center py-3.5 bg-white border border-gray-200 rounded-2xl active:scale-[0.98] transition-transform">
                <Phone size={16} className="text-teal-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Ligar
                </span>
              </button>
              <button className="flex-1 flex items-center justify-center py-3.5 bg-white border border-gray-200 rounded-2xl active:scale-[0.98] transition-transform">
                <MessageCircle size={16} className="text-teal-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Mensagem
                </span>
              </button>
            </div>
            <button
              onClick={() => setShowCancelDialog(true)}
              className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-semibold text-sm active:scale-[0.98] transition-transform"
            >
              Cancelar agendamento
            </button>
          </>
        ) : (
          <button className="w-full py-4 bg-gradient-to-r from-teal-600 to-emerald-500 text-white rounded-2xl font-semibold text-sm shadow-lg shadow-teal-200 active:scale-[0.98] transition-transform">
            Agendar novamente
          </button>
        )}
      </div>

      {/* Cancel confirmation dialog */}
      {showCancelDialog && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full rounded-t-3xl p-6 pb-8 animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                Cancelar agendamento
              </h3>
              <button
                onClick={() => setShowCancelDialog(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-[0.98] transition-transform"
              >
                <X size={16} className="text-gray-500" />
              </button>
            </div>

            <div className="flex items-start space-x-3 bg-amber-50 rounded-2xl p-4 mb-6">
              <AlertTriangle size={20} className="text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Tem certeza que deseja cancelar?
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Sua sessão com {professional.name} em {appointment.date} às{" "}
                  {appointment.time} será cancelada.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={onCancelDone}
                className="w-full py-4 bg-red-600 text-white rounded-2xl font-semibold text-sm active:scale-[0.98] transition-transform"
              >
                Sim, cancelar agendamento
              </button>
              <button
                onClick={() => setShowCancelDialog(false)}
                className="w-full py-4 bg-gray-100 text-gray-700 rounded-2xl font-semibold text-sm active:scale-[0.98] transition-transform"
              >
                Não, manter agendamento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentDetailScreen;
