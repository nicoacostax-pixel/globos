'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User, Lock, Eye, EyeOff } from 'lucide-react'; // Importamos los iconos

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para el ojo

  // Estilo base para los contenedores de los inputs
  const inputContainerStyle = "relative flex items-center w-full bg-white border border-gray-200 rounded-[1.2rem] focus-within:border-[#6A5FFF] focus-within:ring-4 focus-within:ring-[#6A5FFF]/10 transition-all shadow-sm mb-4";
  const iconStyle = "absolute left-5 text-gray-400 w-5 h-5";
  const fieldStyle = "w-full p-5 pl-14 bg-transparent outline-none text-gray-700 font-medium placeholder:text-gray-400";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50/30 p-6 py-12 font-sans">
      
      {/* Logo */}
      <div className="mb-5 transform hover:scale-110 transition-transform duration-300">
        <Image src="/globosblanco.png" alt="Globos Logo" width={200} height={200} className="object-contain" priority />
      </div>

      <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-[0_20px_70px_-10px_rgba(0,0,0,0)] border border-gray-200">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-extrabold text-[#1E1B4B] tracking-tight">Accede a tu Globo 🎈</h2>
        </div>
        
        <form className="space-y-2">
          {/* Campo Usuario/Email */}
          <div className={inputContainerStyle}>
            <User className={iconStyle} />
            <input 
              type="email" 
              placeholder="Email o Usuario" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldStyle} 
              required 
            />
          </div>
          
          {/* Campo Contraseña */}
          <div className={inputContainerStyle}>
            <Lock className={iconStyle} />
            <input 
              type={showPassword ? "text" : "Contraseña"} 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={fieldStyle} 
              required 
            />
            {/* Botón del Ojo */}
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 text-gray-400 hover:text-[#6A5FFF] transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-[#462ff7] text-white py-5 mt-4 rounded-[1.2rem] font-bold text-xl hover:bg-[#000000] active:scale-[0.98] transition-all shadow-xl shadow-[#6A5FFF]/30"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center space-y-6">
          <Link href="/forgot" className="text-[#462ff7] font-bold text-sm hover:underline block">
            ¿Contraseña olvidada?
          </Link>
          <p className="text-gray-500 font-medium">
            ¿No tienes cuenta? <Link href="/register" className="text-[#462ff8] font-bold hover:underline">Registrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
}