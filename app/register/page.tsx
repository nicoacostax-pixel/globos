'use client'

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { User, Mail, Lock, Eye, EyeOff, AtSign, ArrowRight, Phone, Loader2 } from 'lucide-react';

export default function Register() {
  const router = useRouter();
  const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Estados del formulario
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+52');
  
  // Estados de validación visual
  const [usernameTooShort, setUsernameTooShort] = useState(false);
  
  const isPasswordSecure = password.length >= 8 || password === '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = email === '' || emailRegex.test(email);

  const handleUsernameChange = (val: string) => {
    const cleanVal = val.toLowerCase().replace(/\s+/g, '');
    setUsername(cleanVal);
    setUsernameTooShort(cleanVal.length > 0 && cleanVal.length < 5);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fullPhone = `${countryCode}${phone}`;
      
      // 1. Verificar duplicados en la tabla 'profiles'
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('username, phone')
        .or(`username.eq.${username},phone.eq.${fullPhone}`)
        .maybeSingle();

      if (existingProfile) {
        if (existingProfile.username === username) {
          alert("Este nombre de usuario ya está en uso 🎈");
          setLoading(false);
          return;
        }
        if (existingProfile.phone === fullPhone) {
          alert("Este número de teléfono ya está registrado.");
          setLoading(false);
          return;
        }
      }

      // 2. Registro en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (authError) {
        alert(authError.message.includes("already registered") 
          ? "Este correo ya tiene una cuenta activa." 
          : "Error: " + authError.message);
        setLoading(false);
        return;
      }

      // 3. Crear el perfil vinculado
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ 
            id: authData.user.id, 
            username: username,
            full_name: fullName,
            phone: fullPhone,
          }]);

        if (profileError) {
          alert("Error al guardar perfil: " + profileError.message);
        } else {
          router.push('/dashboard');
        }
      }
    } catch (err) {
      alert("Error inesperado. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
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
      
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
          Hey @<span style={{ color: usernameTooShort ? colors.error : colors.emerald }}>{username || 'usuario'}</span> 👋
        </h1>
        <p className="text-gray-400 font-small text-lg max-w-sm mx-auto">
          ¡Moneticemos tu comunidad!
        </p>
      </div>

      <div 
        className="w-full max-w-md bg-white p-10 rounded-[2.8rem] border transition-shadow duration-500"
        style={{ borderColor: "#F3F4F6", boxShadow: `0 20px 50px -12px ${colors.emeraldShadow}` }}
      >
        <form className="space-y-4" onSubmit={handleRegister}>
          
          {/* Username */}
          <div className="relative pb-6">
            <AtSign className={`absolute left-5 top-[28px] -translate-y-1/2 w-5 h-5 z-10 transition-colors ${usernameTooShort ? 'text-red-400' : 'text-gray-300'}`} />
            <div className={inputBase} style={{ borderColor: usernameTooShort ? colors.error : "#E5E7EB", backgroundColor: usernameTooShort ? colors.errorBg : "white" }}>
              <div className="flex items-center w-full pl-2">
                <span className="text-[#1A2E1A] font-bold text-[16px] select-none shrink-0">globos.me/</span>
                <input type="text" placeholder="usuario" className="bg-transparent outline-none font-medium text-[#1A2E1A] text-[16px] ml-[1px] w-full placeholder:text-gray-300" value={username} onChange={(e) => handleUsernameChange(e.target.value)} required />
              </div>
            </div>
            <div className="absolute left-4 bottom-0 h-5"> 
              {usernameTooShort && <p className="text-[10px] text-red-500 font-bold">El usuario debe de ser de al menos 5 caracteres</p>}
            </div>
          </div>

          {/* Nombre */}
          <div className="relative">
            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5 z-10" />
            <input type="text" placeholder="Nombre" className={`${inputBase} border-[#E5E7EB] focus:border-[#2ECC71]`} value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>

          {/* Email */}
          <div className="relative pb-6">
            <Mail className={`absolute left-5 top-[28px] -translate-y-1/2 w-5 h-5 z-10 ${!isEmailValid ? 'text-red-400' : 'text-gray-300'}`} />
            <input 
              type="email" 
              placeholder="Email" 
              className={inputBase} 
              style={{ borderColor: !isEmailValid ? colors.error : "#E5E7EB", backgroundColor: !isEmailValid ? colors.errorBg : "white" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <div className="absolute left-4 bottom-0 h-5">
              {!isEmailValid && <p className="text-[10px] text-red-500 font-bold italic">Ingresa un correo válido</p>}
            </div>
          </div>

          {/* Teléfono */}
          <div className="flex gap-3 h-[66px]">
            <div className="relative w-[110px] shrink-0">
              <select className="w-full h-full p-4 pl-4 bg-white border border-[#E5E7EB] rounded-[1.2rem] outline-none font-bold text-[#1A2E1A] appearance-none cursor-pointer focus:border-[#2ECC71] shadow-sm" value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                <option value="+52">🇲🇽 +52</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+34">🇪🇸 +34</option>
                <option value="+54">🇦🇷 +54</option>
                <option value="+57">🇨🇴 +57</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300">
                <ArrowRight size={14} className="rotate-90" />
              </div>
            </div>
            <div className="relative flex-1">
              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5 z-10" />
              <input type="tel" placeholder="Número de teléfono" className={`${inputBase} border-[#E5E7EB] focus:border-[#2ECC71]`} value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} required />
            </div>
          </div>

          {/* Contraseña */}
          <div className="relative pb-6">
            <Lock className={`absolute left-5 top-[28px] -translate-y-1/2 w-5 h-5 z-10 ${!isPasswordSecure ? 'text-red-400' : 'text-gray-300'}`} />
            <input type={showPassword ? "text" : "password"} placeholder="Contraseña" className={inputBase} style={{ borderColor: !isPasswordSecure ? colors.error : "#E5E7EB", backgroundColor: !isPasswordSecure ? colors.errorBg : "white" }} value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-[28px] -translate-y-1/2 text-gray-300">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            <div className="absolute left-4 bottom-0 h-5">
              {!isPasswordSecure && <p className="text-[10px] text-red-500 font-bold">Mínimo 8 caracteres</p>}
            </div>
          </div>

          {/* Botón con Spinner */}
          <div className="pt-2">
            <button 
              type="submit" 
              className="group w-full py-5 rounded-[1.2rem] font-bold text-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed hover:bg-black hover:text-white"
              disabled={loading || usernameTooShort || !isPasswordSecure || username === '' || !isEmailValid || email === ''}
              style={{ backgroundColor: colors.emerald, color: colors.forest, boxShadow: `0 10px 25px -5px ${colors.emeraldShadow}` }}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>Siguiente <ArrowRight className="group-hover:translate-x-1.5 transition-transform" /></>
              )}
            </button>
          </div>
        </form>

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