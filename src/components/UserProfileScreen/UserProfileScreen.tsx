import {
  User,
  ChevronRight,
  Settings,
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
} from "lucide-react";

interface UserProfileScreenProps {
  onNavigate: (view: string) => void;
}

const UserProfileScreen = ({ onNavigate }: UserProfileScreenProps) => (
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
          <button onClick={() => onNavigate("personal-info")} className="w-full flex items-center px-4 py-4 border-b border-gray-50 active:bg-gray-50 transition-colors">
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

export default UserProfileScreen;
