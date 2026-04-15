import { useState } from "react";
import { CalendarCheck, Star, Clock, CheckCircle2 } from "lucide-react";
import { Professional, Appointment } from "../../types";

interface AppointmentsScreenProps {
  appointments: Appointment[];
  professionals: Professional[];
  onViewAppointment: (appointment: Appointment) => void;
}

const AppointmentsScreen = ({
  appointments,
  professionals,
  onViewAppointment,
}: AppointmentsScreenProps) => {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  const upcoming = appointments.filter((a) => a.status === "upcoming");
  const past = appointments.filter((a) => a.status === "past");

  return (
    <div className="flex-1 overflow-y-auto pb-24 bg-gray-50 [&::-webkit-scrollbar]:hidden">
      <div className="bg-white px-6 pt-6 pb-4 sticky top-0 z-10 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Meus Agendamentos
        </h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setTab("upcoming")}
            className={`pb-2 border-b-2 font-medium text-sm px-2 transition-colors ${
              tab === "upcoming"
                ? "border-teal-600 text-teal-600"
                : "border-transparent text-gray-400"
            }`}
          >
            Próximos
          </button>
          <button
            onClick={() => setTab("past")}
            className={`pb-2 border-b-2 font-medium text-sm px-2 transition-colors ${
              tab === "past"
                ? "border-teal-600 text-teal-600"
                : "border-transparent text-gray-400"
            }`}
          >
            Anteriores
          </button>
        </div>
      </div>

      {/* Upcoming tab */}
      {tab === "upcoming" && (
        <div className="px-6 py-6 space-y-4">
          {upcoming.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <CalendarCheck size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">Nenhuma consulta agendada</p>
              <p className="text-gray-400 text-sm mt-1">
                Agende sua próxima sessão de terapia.
              </p>
            </div>
          ) : (
            upcoming.map((apt) => {
              const pro = professionals.find((p) => p.id === apt.proId);
              return (
                <div
                  key={apt.id}
                  onClick={() => onViewAppointment(apt)}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-teal-500" />
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase mb-1">
                        {apt.date}
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        {apt.time}
                      </p>
                    </div>
                    <span className="bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full">
                      Próximo
                    </span>
                  </div>
                  <div className="flex items-center pt-4 border-t border-gray-50">
                    <img
                      src={pro?.image}
                      alt={pro?.name}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {pro?.name}
                      </p>
                      <p className="text-xs text-gray-500">{pro?.role}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Past tab */}
      {tab === "past" && (
        <div className="px-6 py-6 space-y-4">
          {past.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Clock size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">Nenhum histórico ainda</p>
              <p className="text-gray-400 text-sm mt-1">
                Suas consultas concluídas aparecerão aqui.
              </p>
            </div>
          ) : (
            past.map((apt) => {
              const pro = professionals.find((p) => p.id === apt.proId);
              return (
                <div
                  key={apt.id}
                  onClick={() => onViewAppointment(apt)}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-gray-300" />
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase mb-1">
                        {apt.date}
                      </p>
                      <div className="flex items-center">
                        <p className="text-lg font-bold text-gray-600">
                          {apt.time}
                        </p>
                      </div>
                    </div>
                    <span className="bg-emerald-50 text-emerald-600 text-xs font-semibold px-3 py-1 rounded-full flex items-center">
                      <CheckCircle2 size={12} className="mr-1" />
                      Concluído
                    </span>
                  </div>

                  <div className="flex items-center pt-4 border-t border-gray-50">
                    <img
                      src={pro?.image}
                      alt={pro?.name}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm">
                        {pro?.name}
                      </p>
                      <p className="text-xs text-gray-500">{pro?.role}</p>
                    </div>
                    <div className="flex items-center text-amber-500">
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs font-medium ml-1 text-gray-600">
                        {pro?.rating}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentsScreen;
