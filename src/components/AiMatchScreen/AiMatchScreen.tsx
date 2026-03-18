import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Loader2,
  Bot,
} from "lucide-react";
import { Professional, Therapy } from "../../types";
import fetchWithRetry from "../../utils/fetchWithRetry";

interface AiMatchScreenProps {
  professionals: Professional[];
  therapies: Therapy[];
  onBack: () => void;
  onSelectPro: (view: string, pro: Professional) => void;
}

const AiMatchScreen = ({
  professionals,
  therapies,
  onBack,
  onSelectPro,
}: AiMatchScreenProps) => {
  const [aiQuery, setAiQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [aiError, setAiError] = useState(null);

  const analyzeSymptoms = async () => {
    if (!aiQuery.trim()) return;
    setIsAnalyzing(true);
    setAiError(null);
    setAiResult(null);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
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

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto pb-24 [&::-webkit-scrollbar]:hidden flex flex-col">
      <div className="bg-white px-6 py-4 flex items-center shadow-sm sticky top-0 z-10">
        <button
          onClick={onBack}
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
                const matchedPro = professionals.find(
                  (p) => p.id === aiResult.professionalId,
                );
                const matchedTherapy = therapies.find(
                  (t) => t.id === aiResult.therapyId,
                );
                if (!matchedPro) return null;

                return (
                  <div
                    onClick={() => onSelectPro("profile", matchedPro)}
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
};

export default AiMatchScreen;
