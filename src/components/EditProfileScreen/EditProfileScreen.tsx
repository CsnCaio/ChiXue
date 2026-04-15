import { useState } from "react";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Camera,
  Check,
} from "lucide-react";

interface EditProfileScreenProps {
  onBack: () => void;
  onSave: () => void;
}

const EditProfileScreen = ({ onBack, onSave }: EditProfileScreenProps) => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [phone, setPhone] = useState("+55 (11) 99999-9999");
  const [birthDate, setBirthDate] = useState("01/01/1990");
  const [address, setAddress] = useState("São Paulo, SP");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 [&::-webkit-scrollbar]:hidden">
      {/* Header */}
      <div className="bg-white px-6 pt-4 pb-6 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:scale-[0.98] transition-transform"
          >
            <ArrowLeft size={18} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">
            Editar Informações
          </h1>
          <div className="w-9" />
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-teal-100 text-teal-700 font-bold text-3xl flex items-center justify-center border-4 border-white shadow-md">
              JD
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center shadow-md active:scale-[0.98] transition-transform">
              <Camera size={14} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
        {/* Name */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
            Nome Completo
          </label>
          <div className="flex items-center bg-white rounded-2xl px-4 py-3.5 border border-gray-200 focus-within:border-teal-500 transition-colors">
            <User size={18} className="text-gray-400 mr-3" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-gray-800 text-sm font-medium"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
            E-mail
          </label>
          <div className="flex items-center bg-white rounded-2xl px-4 py-3.5 border border-gray-200 focus-within:border-teal-500 transition-colors">
            <Mail size={18} className="text-gray-400 mr-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-gray-800 text-sm font-medium"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
            Telefone
          </label>
          <div className="flex items-center bg-white rounded-2xl px-4 py-3.5 border border-gray-200 focus-within:border-teal-500 transition-colors">
            <Phone size={18} className="text-gray-400 mr-3" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-gray-800 text-sm font-medium"
            />
          </div>
        </div>

        {/* Birth Date */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
            Data de Nascimento
          </label>
          <div className="flex items-center bg-white rounded-2xl px-4 py-3.5 border border-gray-200 focus-within:border-teal-500 transition-colors">
            <Calendar size={18} className="text-gray-400 mr-3" />
            <input
              type="text"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-gray-800 text-sm font-medium"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
            Endereço
          </label>
          <div className="flex items-center bg-white rounded-2xl px-4 py-3.5 border border-gray-200 focus-within:border-teal-500 transition-colors">
            <MapPin size={18} className="text-gray-400 mr-3" />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-gray-800 text-sm font-medium"
            />
          </div>
        </div>

        {/* Save button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-teal-600 to-emerald-500 text-white py-4 rounded-2xl font-semibold text-sm shadow-lg shadow-teal-200 active:scale-[0.98] transition-transform flex items-center justify-center mt-2"
        >
          <Check size={18} className="mr-2" />
          Salvar Alterações
        </button>
      </form>
    </div>
  );
};

export default EditProfileScreen;
