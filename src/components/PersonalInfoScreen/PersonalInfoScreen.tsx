import { ChevronLeft, User, Mail, Phone, MapPin, Calendar } from "lucide-react";

interface PersonalInfoScreenProps {
  onBack: () => void;
}

const PersonalInfoScreen = ({ onBack }: PersonalInfoScreenProps) => (
  <div className="flex-1 overflow-y-auto pb-24 bg-gray-50 [&::-webkit-scrollbar]:hidden">
    <div className="bg-white px-6 pt-6 pb-6 rounded-b-3xl shadow-sm">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 active:scale-[0.98] transition-transform"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-xl font-bold text-gray-900 ml-4">
          Informações Pessoais
        </h1>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-teal-100 text-teal-700 font-bold text-3xl flex items-center justify-center mb-3 border-4 border-white shadow-md">
          JD
        </div>
        <button className="text-teal-600 text-sm font-medium active:text-teal-700 transition-colors">
          Alterar Foto
        </button>
      </div>
    </div>

    <div className="px-6 py-6 space-y-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-4">
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
            Nome Completo
          </label>
          <div className="flex items-center">
            <User size={18} className="text-gray-400 mr-3" />
            <span className="text-gray-800 text-sm font-medium">John Doe</span>
          </div>
        </div>

        <div className="border-t border-gray-100" />

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
            E-mail
          </label>
          <div className="flex items-center">
            <Mail size={18} className="text-gray-400 mr-3" />
            <span className="text-gray-800 text-sm font-medium">
              johndoe@example.com
            </span>
          </div>
        </div>

        <div className="border-t border-gray-100" />

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
            Telefone
          </label>
          <div className="flex items-center">
            <Phone size={18} className="text-gray-400 mr-3" />
            <span className="text-gray-800 text-sm font-medium">
              +55 (11) 99999-9999
            </span>
          </div>
        </div>

        <div className="border-t border-gray-100" />

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
            Data de Nascimento
          </label>
          <div className="flex items-center">
            <Calendar size={18} className="text-gray-400 mr-3" />
            <span className="text-gray-800 text-sm font-medium">
              01/01/1990
            </span>
          </div>
        </div>

        <div className="border-t border-gray-100" />

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
            Endereço
          </label>
          <div className="flex items-center">
            <MapPin size={18} className="text-gray-400 mr-3" />
            <span className="text-gray-800 text-sm font-medium">
              São Paulo, SP
            </span>
          </div>
        </div>
      </div>

      <button className="w-full bg-teal-600 text-white font-semibold rounded-2xl py-4 shadow-lg shadow-teal-600/20 active:bg-teal-700 transition-colors mt-4">
        Editar Informações
      </button>
    </div>
  </div>
);

export default PersonalInfoScreen;
