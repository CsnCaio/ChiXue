import { ChevronLeft, Calendar as CalendarIcon } from "lucide-react";
import { Professional, DateOption } from "../../types";
import "./BookingScreen.css";

interface BookingScreenProps {
  professional: Professional;
  dates: DateOption[];
  times: string[];
  selectedDate: string;
  selectedTime: string | null;
  setSelectedDate: (date: string) => void;
  setSelectedTime: (time: string) => void;
  onBack: () => void;
  onConfirm: () => void;
}

const BookingScreen = ({
  professional,
  dates,
  times,
  selectedDate,
  selectedTime,
  setSelectedDate,
  setSelectedTime,
  onBack,
  onConfirm,
}: BookingScreenProps) => (
  <div className="flex-1 bg-gray-50 overflow-y-auto pb-24 [&::-webkit-scrollbar]:hidden">
    <div className="bg-white px-6 py-4 flex items-center shadow-sm sticky top-0 z-10">
      <button
        onClick={onBack}
        className="mr-4 text-gray-600"
      >
        <ChevronLeft size={24} />
      </button>
      <h1 className="text-lg font-semibold text-gray-900">
        Selecione Data e Horário
      </h1>
    </div>

    <div className="p-6">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
        Outubro 2026
      </h2>

      <div className="flex justify-between mb-8">
        {dates.map((d, i) => (
          <button
            key={i}
            onClick={() => setSelectedDate(d.date)}
            className={`flex flex-col items-center w-[18%] py-3 rounded-2xl border transition-all ${
              selectedDate === d.date
                ? "bg-teal-600 border-teal-600 text-white shadow-md"
                : "bg-white border-gray-200 text-gray-500"
            }`}
          >
            <span className="text-xs mb-1">{d.day}</span>
            <span
              className={`text-lg font-semibold ${selectedDate === d.date ? "text-white" : "text-gray-900"}`}
            >
              {d.date}
            </span>
          </button>
        ))}
      </div>

      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
        Horários Disponíveis
      </h2>

      <div className="grid grid-cols-3 gap-3">
        {times.map((time, i) => (
          <button
            key={i}
            onClick={() => setSelectedTime(time)}
            className={`py-3 rounded-xl text-sm font-medium border transition-colors ${
              selectedTime === time
                ? "bg-teal-50 border-teal-600 text-teal-700"
                : "bg-white border-gray-200 text-gray-700 hover:border-teal-300"
            }`}
          >
            {time}
          </button>
        ))}
      </div>

      {selectedTime && (
        <div className="mt-8 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
              <CalendarIcon size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Sessão com {professional.name}
              </p>
              <p className="font-semibold text-gray-900">
                Terça, {selectedDate} de Out às {selectedTime}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>

    <div className="fixed bottom-0 left-0 w-full max-w-md mx-auto bg-white border-t border-gray-100 p-4 pb-8">
      <button
        onClick={onConfirm}
        disabled={!selectedTime}
        className={`w-full font-semibold rounded-2xl py-4 transition-all ${
          selectedTime
            ? "bg-teal-600 text-white shadow-lg shadow-teal-600/20 active:bg-teal-700"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        Confirmar Agendamento
      </button>
    </div>
  </div>
);

export default BookingScreen;
