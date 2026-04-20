'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User, Mail, Lock, Phone, Eye, EyeOff } from 'lucide-react';
// Importamos el componente de teléfono y sus estilos
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export default function Register() {
  const [value, setValue] = useState<string | undefined>();
  const [showPassword, setShowPassword] = useState(false);

  const inputContainerStyle = "relative flex items-center w-full bg-white border border-purple-100 focus-within:border-[#6A5FFF] focus-within:ring-4 focus-within:ring-[#6A5FFF]/10 transition-all shadow-sm mb-4 rounded-[1.2rem]";
  const iconStyle = "absolute left-5 text-gray-400 w-5 h-5 z-10";
  const fieldStyle = "w-full p-5 pl-14 bg-transparent outline-none text-gray-700 font-medium placeholder:text-gray-400";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50/30 p-6 py-12 font-sans">
      
      <div className="mb-10 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
        <Image src="/globosblanco.png" alt="Globos Logo" width={200} height={200} className="object-contain" priority />
      </div>

      <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-[0_20px_70px_-10px_rgba(106,95,255,0.15)] border border-purple-100">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-extrabold text-[#1E1B4B] tracking-tight">Crea tu Globo 🎈</h2>
          <p className="text-gray-500 mt-2 font-medium">Monetiza tu comunidad</p>
        </div>
        
        <form className="space-y-1">
          <div className={inputContainerStyle}>
            <User className={iconStyle} />
            <input type="text" placeholder="Nombre completo" className={fieldStyle} required />
          </div>

          <div className={inputContainerStyle}>
            <Mail className={iconStyle} />
            <input type="email" placeholder="Correo electrónico" className={fieldStyle} required />
          </div>

          {/* Campo de Teléfono con Banderas */}
          <div className={inputContainerStyle}>
            <Phone className={iconStyle} />
            <PhoneInput
              international
              defaultCountry="MX" // Puedes cambiarlo a tu país por defecto
              value={value}
              onChange={setValue}
              placeholder="Teléfono"
              className="phone-input-custom w-full p-5 pl-14 bg-transparent outline-none text-gray-700 font-medium"
            />
          </div>
          
          <div className={inputContainerStyle}>
            <Lock className={iconStyle} />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Contraseña" 
              className={fieldStyle} 
              required 
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 text-gray-400 hover:text-[#6A5FFF] transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <button type="submit" className="w-full bg-[#462ff8] text-white py-5 mt-6 rounded-[1.2rem] font-bold text-xl hover:bg-[#000000] active:scale-[0.98] transition-all shadow-xl shadow-[#6A5FFF]/30">
            Registrarme
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 font-medium">
            ¿Ya tienes cuenta? <Link href="/login" className="text-[#462ff8] font-bold hover:underline">Inicia sesión</Link>
          </p>
        </div>
      </div>

      <style jsx global>{`
        .phone-input-custom .PhoneInputInput {
          outline: none;
          background: transparent;
          font-family: inherit;
          font-size: inherit;
          font-weight: 500;
          color: #374151;
        }
        .phone-input-custom .PhoneInputCountry {
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
}