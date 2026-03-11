import React, { useState } from "react";
import {
  Home,
  Search,
  Calendar as CalendarIcon,
  User,
  MapPin,
  Star,
  ChevronLeft,
  Clock,
  CheckCircle2,
  Wind,
  Ear,
  Activity,
  Flame,
  ChevronRight,
  Battery,
  Wifi,
  SignalHigh,
  Sparkles,
  Loader2,
  Bot,
  Settings,
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
  Filter,
} from "lucide-react";

// --- MOCK DATA ---

const THERAPIES = [
  { id: "acupuncture", name: "Acupuntura", icon: Activity },
  { id: "cupping", name: "Ventosaterapia", icon: Wind },
  { id: "auriculotherapy", name: "Auriculoterapia", icon: Ear },
  { id: "moxibustion", name: "Moxabustão", icon: Flame },
];

const PROFESSIONALS = [
  {
    id: 1,
    name: "Dr. Mei Lin",
    role: "Acupunturista Sênior",
    rating: 4.9,
    reviews: 128,
    distance: "1.2 km",
    image:
      "https://images.unsplash.com/photo-1594824432258-f215c2d33458?auto=format&fit=crop&q=80&w=200&h=200",
    therapies: ["acupuncture", "cupping"],
    about:
      "A Dra. Mei Lin tem mais de 15 anos de experiência em Medicina Tradicional Chinesa, especializando-se no controle da dor e alívio do estresse através da acupuntura e ventosaterapia.",
    price: "R$ 180/sessão",
  },
  {
    id: 2,
    name: "Dr. Kenji Sato",
    role: "Especialista em MTC",
    rating: 4.8,
    reviews: 94,
    distance: "2.5 km",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200&h=200",
    therapies: ["acupuncture", "auriculotherapy", "moxibustion"],
    about:
      "Com foco na cura holística, o Dr. Sato combina auriculoterapia com acupuntura tradicional para tratar ansiedade, insônia e enxaquecas crônicas.",
    price: "R$ 200/sessão",
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    role: "Terapeuta Holística",
    rating: 4.7,
    reviews: 56,
    distance: "3.8 km",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200",
    therapies: ["cupping", "moxibustion"],
    about:
      "Sarah é uma terapeuta licenciada que foca na recuperação atlética usando técnicas avançadas de ventosaterapia e moxabustão para melhorar o fluxo sanguíneo.",
    price: "R$ 150/sessão",
  },
];

const DATES = [
  { day: "Seg", date: "12", active: false },
  { day: "Ter", date: "13", active: true },
  { day: "Qua", date: "14", active: false },
  { day: "Qui", date: "15", active: false },
  { day: "Sex", date: "16", active: false },
];

const TIMES = ["09:00", "10:00", "11:30", "14:00", "15:30", "17:00"];

const MOCK_APPOINTMENTS = [
  {
    id: 1,
    proId: 1,
    date: "13 de Out de 2026",
    time: "10:00",
    status: "upcoming",
  },
  { id: 2, proId: 3, date: "28 de Set de 2026", time: "14:00", status: "past" },
  { id: 3, proId: 2, date: "15 de Ago de 2026", time: "09:00", status: "past" },
];

const fetchWithRetry = async (url, options, retries = 5) => {
  const delays = [1000, 2000, 4000, 8000, 16000];
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((res) => setTimeout(res, delays[i]));
    }
  }
};

// --- COMPONENTS ---

const AndroidStatusBar = () => (
  <div className="w-full h-7 bg-white flex justify-between items-center px-4 text-gray-800 text-[11px] font-medium z-50 sticky top-0">
    <span>10:00</span>
    <div className="flex items-center space-x-1.5">
      <Wifi size={12} strokeWidth={2.5} />
      <SignalHigh size={12} strokeWidth={2.5} />
      <Battery size={14} strokeWidth={2.5} />
    </div>
  </div>
);

export default function App() {
  const [view, setView] = useState("home");
  const [selectedPro, setSelectedPro] = useState(null);
  const [selectedTherapy, setSelectedTherapy] = useState(null);

  // Booking state
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState("13");

  // AI Matchmaker state
  const [aiQuery, setAiQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [aiError, setAiError] = useState(null);

  const analyzeSymptoms = async () => {
    if (!aiQuery.trim()) return;
    setIsAnalyzing(true);
    setAiError(null);
    setAiResult(null);

    const apiKey = "";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const prompt = `Você é um assistente de Inteligência Artificial especialista em Medicina Tradicional Chinesa (MTC) para o aplicativo ChiXue.
    O usuário descreve os seguintes sintomas: "${aiQuery}".
    
    Terapias disponíveis: 'acupuncture', 'cupping', 'auriculotherapy', 'moxibustion'.
    Profissionais disponíveis:
    - ID 1: Dra. Mei Lin (acupuncture, cupping)
    - ID 2: Dr. Kenji Sato (acupuncture, auriculotherapy, moxibustion)
    - ID 3: Sarah Jenkins (cupping, moxibustion)
    
    Analise os sintomas e retorne um objeto JSON com:
    1. "therapyId": o ID da terapia que melhor se adapta aos sintomas.
    2. "professionalId": o ID do profissional (1, 2 ou 3) que oferece essa terapia.
    3. "explanation": Uma explicação calorosa e encorajadora de 2 frases curtas, em Português do Brasil, sobre o porquê essa terapia e profissional são ideais para o caso.`;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            therapyId: { type: "STRING" },
            professionalId: { type: "INTEGER" },
            explanation: { type: "STRING" },
          },
        },
      },
    };

    try {
      const data = await fetchWithRetry(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (resultText) {
        setAiResult(JSON.parse(resultText));
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setAiError(
        "Desculpe, nossa IA está meditando no momento. Tente novamente mais tarde.",
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const navigateTo = (newView, data = null) => {
    if (data && newView === "profile") setSelectedPro(data);
    setView(newView);
    window.scrollTo(0, 0);
  };

  const renderHome = () => (
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
          onClick={() => navigateTo("ai-match")}
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
          {THERAPIES.map((therapy) => (
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
          {PROFESSIONALS.filter(
            (p) => !selectedTherapy || p.therapies.includes(selectedTherapy),
          ).map((pro) => (
            <div
              key={pro.id}
              onClick={() => navigateTo("profile", pro)}
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

  const renderProfile = () => (
    <div className="flex-1 bg-white overflow-y-auto pb-24 relative [&::-webkit-scrollbar]:hidden">
      <div className="relative h-72">
        <img
          src={selectedPro.image}
          alt={selectedPro.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 to-transparent" />
        <button
          onClick={() => navigateTo("home")}
          className="absolute top-6 left-6 w-10 h-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="bg-white rounded-t-3xl -mt-8 relative px-6 pt-8 pb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {selectedPro.name}
            </h1>
            <p className="text-teal-600 font-medium mt-1">{selectedPro.role}</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-gray-900">
              {selectedPro.price}
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
              {selectedPro.rating}
            </span>
            <span className="text-sm">({selectedPro.reviews} avaliações)</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin size={18} className="text-teal-500 mr-2" />
            <span className="text-sm">{selectedPro.distance}</span>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-gray-900 mb-2">Sobre</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {selectedPro.about}
          </p>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-gray-900 mb-3">
            Terapias Oferecidas
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedPro.therapies.map((tId) => {
              const therapy = THERAPIES.find((t) => t.id === tId);
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
          onClick={() => navigateTo("book")}
          className="w-full bg-teal-600 text-white font-semibold rounded-2xl py-4 shadow-lg shadow-teal-600/20 active:bg-teal-700 transition-colors"
        >
          Agendar Sessão
        </button>
      </div>
    </div>
  );

  const renderBooking = () => (
    <div className="flex-1 bg-gray-50 overflow-y-auto pb-24 [&::-webkit-scrollbar]:hidden">
      <div className="bg-white px-6 py-4 flex items-center shadow-sm sticky top-0 z-10">
        <button
          onClick={() => navigateTo("profile", selectedPro)}
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
          {DATES.map((d, i) => (
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
          {TIMES.map((time, i) => (
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
                  Sessão com {selectedPro.name}
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
          onClick={() => navigateTo("success")}
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

  const renderSuccess = () => (
    <div className="flex-1 bg-teal-600 flex flex-col items-center justify-center px-6 text-center">
      <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 size={48} className="text-white" />
      </div>
      <h1 className="text-3xl font-bold text-white mb-2">
        Agendamento Confirmado!
      </h1>
      <p className="text-teal-100 mb-10">
        Sua sessão com {selectedPro.name} foi agendada com sucesso.
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
        onClick={() => {
          setView("home");
          setSelectedTime(null);
        }}
        className="mt-10 bg-white text-teal-700 font-bold py-4 px-8 rounded-full w-full max-w-sm active:bg-gray-100 transition-colors"
      >
        Voltar ao Início
      </button>
    </div>
  );

  const renderDiscover = () => (
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
          {PROFESSIONALS.map((pro) => (
            <div
              key={pro.id}
              onClick={() => navigateTo("profile", pro)}
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

  const renderAppointments = () => (
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
        {MOCK_APPOINTMENTS.filter((a) => a.status === "upcoming").map((apt) => {
          const pro = PROFESSIONALS.find((p) => p.id === apt.proId);
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

        {MOCK_APPOINTMENTS.filter((a) => a.status === "past").length > 0 && (
          <>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mt-8 mb-4">
              Agendamentos Anteriores
            </h2>
            {MOCK_APPOINTMENTS.filter((a) => a.status === "past").map((apt) => {
              const pro = PROFESSIONALS.find((p) => p.id === apt.proId);
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

  const renderUserProfile = () => (
    <div className="flex-1 overflow-y-auto pb-24 bg-gray-50 [&::-webkit-scrollbar]:hidden">
      <div className="bg-white px-6 pt-10 pb-8 rounded-b-3xl shadow-sm text-center">
        <div className="w-24 h-24 rounded-full bg-teal-100 text-teal-700 font-bold text-3xl flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-md">
          JD
        </div>
        <h1 className="text-xl font-bold text-gray-900">John Doe</h1>
        <p className="text-gray-500 text-sm mt-1">johndoe@example.com</p>
      </div>

      <div className="px-6 py-8 space-y-6">
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Conta
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button className="w-full flex items-center px-4 py-4 border-b border-gray-50 active:bg-gray-50 transition-colors">
              <User size={20} className="text-gray-400 mr-4" />
              <span className="flex-1 text-left text-gray-700 font-medium text-sm">
                Informações Pessoais
              </span>
              <ChevronRight size={18} className="text-gray-300" />
            </button>
            <button className="w-full flex items-center px-4 py-4 border-b border-gray-50 active:bg-gray-50 transition-colors">
              <CreditCard size={20} className="text-gray-400 mr-4" />
              <span className="flex-1 text-left text-gray-700 font-medium text-sm">
                Métodos de Pagamento
              </span>
              <ChevronRight size={18} className="text-gray-300" />
            </button>
            <button className="w-full flex items-center px-4 py-4 active:bg-gray-50 transition-colors">
              <Settings size={20} className="text-gray-400 mr-4" />
              <span className="flex-1 text-left text-gray-700 font-medium text-sm">
                Preferências
              </span>
              <ChevronRight size={18} className="text-gray-300" />
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Suporte
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button className="w-full flex items-center px-4 py-4 border-b border-gray-50 active:bg-gray-50 transition-colors">
              <Bell size={20} className="text-gray-400 mr-4" />
              <span className="flex-1 text-left text-gray-700 font-medium text-sm">
                Notificações
              </span>
              <ChevronRight size={18} className="text-gray-300" />
            </button>
            <button className="w-full flex items-center px-4 py-4 active:bg-gray-50 transition-colors">
              <HelpCircle size={20} className="text-gray-400 mr-4" />
              <span className="flex-1 text-left text-gray-700 font-medium text-sm">
                Ajuda & FAQ
              </span>
              <ChevronRight size={18} className="text-gray-300" />
            </button>
          </div>
        </div>

        <button className="w-full flex items-center justify-center px-4 py-4 bg-red-50 text-red-600 rounded-2xl font-medium active:bg-red-100 transition-colors mt-8">
          <LogOut size={20} className="mr-2" />
          Sair
        </button>
      </div>
    </div>
  );

  const renderAiMatch = () => (
    <div className="flex-1 bg-gray-50 overflow-y-auto pb-24 [&::-webkit-scrollbar]:hidden flex flex-col">
      <div className="bg-white px-6 py-4 flex items-center shadow-sm sticky top-0 z-10">
        <button
          onClick={() => navigateTo("home")}
          className="mr-4 text-gray-600"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Match com IA ✨</h1>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="bg-teal-50 rounded-2xl p-5 mb-6 border border-teal-100">
          <div className="flex items-center mb-3 text-teal-800">
            <Bot size={24} className="mr-2" />
            <h2 className="font-semibold">Como você está se sentindo hoje?</h2>
          </div>
          <p className="text-sm text-teal-700">
            Descreva seus sintomas, pontos de dor ou metas de bem-estar. Eu vou
            recomendar a melhor terapia e profissional para você.
          </p>
        </div>

        <textarea
          value={aiQuery}
          onChange={(e) => setAiQuery(e.target.value)}
          placeholder="Ex: Tenho tido enxaquecas frequentes e tensão no pescoço..."
          className="w-full h-32 bg-white rounded-2xl p-4 border border-gray-200 text-gray-700 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 resize-none shadow-sm mb-4"
        />

        <button
          onClick={analyzeSymptoms}
          disabled={!aiQuery.trim() || isAnalyzing}
          className={`w-full flex items-center justify-center font-semibold rounded-2xl py-4 transition-all mb-8 ${
            !aiQuery.trim() || isAnalyzing
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-teal-600 text-white shadow-lg shadow-teal-600/20 active:bg-teal-700"
          }`}
        >
          {isAnalyzing ? (
            <>
              <Loader2 size={18} className="animate-spin mr-2" /> Analisando...
            </>
          ) : (
            <>
              <Sparkles size={18} className="mr-2" /> Encontrar Meu Match ✨
            </>
          )}
        </button>

        {aiError && (
          <div className="text-red-500 text-sm text-center mb-4">{aiError}</div>
        )}

        {aiResult && !isAnalyzing && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <Sparkles size={18} className="text-amber-500 mr-2" />
              Recomendado para você
            </h3>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                {aiResult.explanation}
              </p>

              {(() => {
                const matchedPro = PROFESSIONALS.find(
                  (p) => p.id === aiResult.professionalId,
                );
                const matchedTherapy = THERAPIES.find(
                  (t) => t.id === aiResult.therapyId,
                );
                if (!matchedPro) return null;

                return (
                  <div
                    onClick={() => navigateTo("profile", matchedPro)}
                    className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center space-x-4 active:scale-[0.98] transition-transform cursor-pointer"
                  >
                    <img
                      src={matchedPro.image}
                      alt={matchedPro.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {matchedPro.name}
                      </h4>
                      <div className="flex items-center mt-1">
                        {matchedTherapy && (
                          <matchedTherapy.icon
                            size={12}
                            className="text-teal-600 mr-1"
                          />
                        )}
                        <span className="text-xs font-medium text-teal-600">
                          Melhor match para{" "}
                          {matchedTherapy?.name || "esta terapia"}
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center sm:p-4">
      <div className="w-full h-[100dvh] sm:h-[850px] sm:w-[390px] bg-white sm:rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative sm:border-[8px] border-gray-800">
        <AndroidStatusBar />

        {view === "home" && renderHome()}
        {view === "discover" && renderDiscover()}
        {view === "appointments" && renderAppointments()}
        {view === "user-profile" && renderUserProfile()}
        {view === "ai-match" && renderAiMatch()}
        {view === "profile" && renderProfile()}
        {view === "book" && renderBooking()}
        {view === "success" && renderSuccess()}

        {["home", "discover", "appointments", "user-profile"].includes(
          view,
        ) && (
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
        )}
      </div>
    </div>
  );
}
