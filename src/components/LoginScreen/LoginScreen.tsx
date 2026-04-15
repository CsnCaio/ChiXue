import { useState } from "react";
import { Leaf, Mail, Lock, Eye, EyeOff, ChevronRight } from "lucide-react";

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="flex-1 bg-white flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-600 px-6 pt-12 pb-16 rounded-b-[40px] relative overflow-hidden">
        <div className="absolute top-[-40px] right-[-40px] w-32 h-32 bg-white/5 rounded-full" />
        <div className="absolute bottom-[-20px] left-[-20px] w-24 h-24 bg-white/5 rounded-full" />

        <div className="flex flex-col items-center relative z-10">
          <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
            <Leaf size={28} className="text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-white">Bem-vindo de volta</h1>
          <p className="text-teal-100 text-sm mt-1">
            Entre na sua conta ChiXue
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-6 pt-8 pb-6 flex-1 flex flex-col">
        <div className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              E-mail
            </label>
            <div className="flex items-center bg-gray-100 rounded-2xl px-4 py-3.5">
              <Mail size={18} className="text-gray-400 mr-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="bg-transparent border-none outline-none w-full text-gray-700 placeholder-gray-400 text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Senha
            </label>
            <div className="flex items-center bg-gray-100 rounded-2xl px-4 py-3.5">
              <Lock size={18} className="text-gray-400 mr-3" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-transparent border-none outline-none w-full text-gray-700 placeholder-gray-400 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 ml-2"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Forgot password */}
        <div className="flex justify-end mt-3">
          <button type="button" className="text-teal-600 text-sm font-medium">
            Esqueceu a senha?
          </button>
        </div>

        {/* Login button */}
        <button
          type="submit"
          className="mt-8 w-full bg-gradient-to-r from-teal-600 to-emerald-500 text-white py-4 rounded-2xl font-semibold text-sm shadow-lg shadow-teal-200 active:scale-[0.98] transition-transform flex items-center justify-center"
        >
          Entrar
          <ChevronRight size={18} className="ml-1" />
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-4 text-gray-400 text-xs">ou continue com</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Social buttons */}
        <div className="flex space-x-4">
          <button
            type="button"
            className="flex-1 flex items-center justify-center py-3.5 border border-gray-200 rounded-2xl active:scale-[0.98] transition-transform"
          >
            <span className="text-sm font-medium text-gray-700">Google</span>
          </button>
          <button
            type="button"
            className="flex-1 flex items-center justify-center py-3.5 border border-gray-200 rounded-2xl active:scale-[0.98] transition-transform"
          >
            <span className="text-sm font-medium text-gray-700">Facebook</span>
          </button>
        </div>

        {/* Sign up */}
        <div className="mt-auto pt-6 flex justify-center">
          <p className="text-gray-500 text-sm">
            Não tem uma conta?{" "}
            <button type="button" className="text-teal-600 font-semibold">
              Cadastre-se
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
