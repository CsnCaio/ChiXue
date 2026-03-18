import { Professional, Appointment } from "../../types";
import "./AppointmentsScreen.css";

interface AppointmentsScreenProps {
  appointments: Appointment[];
  professionals: Professional[];
}

const AppointmentsScreen = ({
  appointments,
  professionals,
}: AppointmentsScreenProps) => (
  <div className="flex-1 overflow-y-auto pb-24 bg-gray-50 [&::-webkit-scrollbar]:hidden">
    <div className="bg-white px-6 pt-6 pb-4 sticky top-0 z-10 shadow-sm">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Meus Agendamentos
      </h1>
      <div className="flex space-x-4">
        <button className="pb-2 border-b-2 border-teal-600 text-teal-600 font-medium text-sm px-2">
          Próximos
        </button>
        <button className="pb-2 border-b-2 border-transparent text-gray-400 font-medium text-sm px-2">
          Anteriores
        </button>
      </div>
    </div>

    <div className="px-6 py-6 space-y-4">
      {appointments
        .filter((a) => a.status === "upcoming")
        .map((apt) => {
          const pro = professionals.find((p) => p.id === apt.proId);
          return (
            <div
              key={apt.id}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-teal-500" />
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase mb-1">
                    {apt.date}
                  </p>
                  <p className="text-lg font-bold text-gray-900">{apt.time}</p>
                </div>
                <span className="bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full">
                  Próximo
                </span>
              </div>
              <div className="flex items-center pt-4 border-t border-gray-50">
                <img
                  src={pro.image}
                  alt={pro.name}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {pro.name}
                  </p>
                  <p className="text-xs text-gray-500">{pro.role}</p>
                </div>
              </div>
            </div>
          );
        })}

      {appointments.filter((a) => a.status === "past").length > 0 && (
        <>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mt-8 mb-4">
            Agendamentos Anteriores
          </h2>
          {appointments
            .filter((a) => a.status === "past")
            .map((apt) => {
              const pro = professionals.find((p) => p.id === apt.proId);
              return (
                <div
                  key={apt.id}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase mb-1">
                        {apt.date}
                      </p>
                      <p className="text-lg font-bold text-gray-500">
                        {apt.time}
                      </p>
                    </div>
                    <span className="bg-gray-100 text-gray-500 text-xs font-semibold px-3 py-1 rounded-full">
                      Concluído
                    </span>
                  </div>
                  <div className="flex items-center pt-4 border-t border-gray-50 opacity-70">
                    <img
                      src={pro.image}
                      alt={pro.name}
                      className="w-10 h-10 rounded-full object-cover mr-3 grayscale"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {pro.name}
                      </p>
                      <p className="text-xs text-gray-500">{pro.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </>
      )}
    </div>
  </div>
);

export default AppointmentsScreen;
