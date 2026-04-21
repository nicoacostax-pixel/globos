'use client'

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Eye, EyeOff, AtSign, ArrowRight, Phone } from 'lucide-react';

export default function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+52'); // Código inicial
  
  const [userExists, setUserExists] = useState(false); 
  const [usernameTooShort, setUsernameTooShort] = useState(false);
  const isPasswordSecure = password.length >= 8 || password === '';

  const handleUsernameChange = (val: string) => {
    const cleanVal = val.toLowerCase().replace(/\s+/g, '');
    setUsername(cleanVal);
    setUsernameTooShort(cleanVal.length > 0 && cleanVal.length < 5);
    setUserExists(cleanVal === 'nico');
  };

  const colors = {
    forest: "#1A2E1A",
    emerald: "#2ECC71",
    error: "#FF4D4D",
    errorBg: "#FFF5F5",
    emeraldShadow: "rgba(46, 204, 113, 0.12)"
  };

  const inputBase = "w-full p-5 pl-14 bg-white/60 border rounded-[1.2rem] outline-none font-medium transition-all shadow-sm flex items-center";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 font-sans text-[#1A2E1A] bg-[#F9FBF9]">
      
      {/* Saludo Dinámico */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
          Hey @<span style={{ color: (userExists || usernameTooShort) ? colors.error : colors.emerald }}>{username || 'usuario'}</span> 👋
        </h1>
        <p className="text-gray-400 font-medium text-lg italic max-w-sm mx-auto">
          ¡Moneticemos tu comunidad!
        </p>
      </div>

      <div 
        className="w-full max-w-md bg-white p-10 rounded-[2.8rem] border transition-shadow duration-500"
        style={{ borderColor: "#F3F4F6", boxShadow: `0 20px 50px -12px ${colors.emeraldShadow}` }}
      >
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); router.push('/suscriber/plan'); }}>
          
          {/* Username */}
          <div className="relative pb-6">
            <AtSign className={`absolute left-5 top-[28px] -translate-y-1/2 w-5 h-5 z-10 transition-colors ${(userExists || usernameTooShort) ? 'text-red-400' : 'text-gray-300'}`} />
            <div className={inputBase} style={{ borderColor: (userExists || usernameTooShort) ? colors.error : "#E5E7EB", backgroundColor: (userExists || usernameTooShort) ? colors.errorBg : "white" }}>
              <div className="flex items-center w-full pl-2">
                <span className="text-[#1A2E1A] font-bold text-[16px] select-none shrink-0">globos.me/</span>
                <input type="text" placeholder="usuario" className="bg-transparent outline-none font-medium text-[#1A2E1A] text-[16px] ml-[1px] w-full placeholder:text-gray-300" value={username} onChange={(e) => handleUsernameChange(e.target.value)} required />
              </div>
            </div>
            <div className="absolute left-4 bottom-0 h-5"> 
              {(userExists || usernameTooShort) && <p className="text-[10px] text-red-500 font-bold">{userExists ? "Este usuario ya existe" : "El usuario debe de ser de al menos 5 caracteres"}</p>}
            </div>
          </div>

          {/* Nombre y Email */}
          <div className="relative">
            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5 z-10" />
            <input type="text" placeholder="Nombre" className={`${inputBase} border-[#E5E7EB] focus:border-[#2ECC71]`} required />
          </div>

          <div className="relative">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5 z-10" />
            <input type="email" placeholder="Email" className={`${inputBase} border-[#E5E7EB] focus:border-[#2ECC71]`} required />
          </div>

          {/* NUEVO CAMPO DE TELÉFONO */}
          <div className="flex gap-3 h-[66px]">
            {/* Selector de código de país */}
            
            <div className="relative w-[110px] shrink-0">
              <select 
                className="w-full h-full p-4 pl-4 bg-white border border-[#E5E7EB] rounded-[1.2rem] outline-none font-bold text-[#1A2E1A] appearance-none cursor-pointer focus:border-[#2ECC71] shadow-sm"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
               <option value="+52">🇲🇽 +52</option>
  <option value="+1">🇺🇸 +1</option>
  <option value="+34">🇪🇸 +34</option>
  <option value="+54">🇦🇷 +54</option>
  <option value="+57">🇨🇴 +5 Colombia</option>
  <option value="+56">🇨🇱 +56 Chile</option>
  <option value="+51">🇵🇪 +51 Perú</option>
  <option value="+58">🇻🇪 +58 Ven.</option>
  <option value="+593">🇪🇨 +593 Ecu.</option>
  <option value="+506">🇨🇷 +506 C.Rica</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300">
                <ArrowRight size={14} className="rotate-90" />
              </div>
            </div>
            
            {/* Input de número de teléfono */}
            <div className="relative flex-1">
              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5 z-10" />
              <input 
                type="tel" 
                placeholder="Número de teléfono" 
                className={`${inputBase} border-[#E5E7EB] focus:border-[#2ECC71]`} 
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                required 
              />
            </div>
          </div>

          {/* Contraseña */}
          <div className="relative pb-6">
            <Lock className={`absolute left-5 top-[28px] -translate-y-1/2 w-5 h-5 z-10 ${!isPasswordSecure ? 'text-red-400' : 'text-gray-300'}`} />
            <input type={showPassword ? "text" : "password"} placeholder="Contraseña" className={inputBase} style={{ borderColor: !isPasswordSecure ? colors.error : "#E5E7EB", backgroundColor: !isPasswordSecure ? colors.errorBg : "white" }} onChange={(e) => setPassword(e.target.value)} required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-[28px] -translate-y-1/2 text-gray-300">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            <div className="absolute left-4 bottom-0 h-5">
              {!isPasswordSecure && <p className="text-[10px] text-red-500 font-bold">Mínimo 8 caracteres</p>}
            </div>
          </div>

          {/* Botón Siguiente */}
          <div className="pt-2">
            <button 
              type="submit" 
              className="group w-full py-5 rounded-[1.2rem] font-bold text-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 hover:bg-black hover:text-white"
              disabled={userExists || usernameTooShort || !isPasswordSecure || username === ''}
              style={{ backgroundColor: colors.emerald, color: colors.forest, boxShadow: `0 10px 25px -5px ${colors.emeraldShadow}` }}
            >
              Siguiente
              <ArrowRight className="group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center pt-6 border-t border-gray-50 text-gray-400 font-medium text-sm">
          ¿Ya tienes una cuenta? <br />
          <Link href="/login" className="font-bold hover:underline inline-block mt-2 text-[#2ECC71]">
            Inicia tu Globo aquí
          </Link>
        </div>
      </div>
    </div>
  );
}