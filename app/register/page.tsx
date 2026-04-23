'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js'; 
import { User, Mail, Lock, Eye, EyeOff, AtSign, ArrowRight, Phone, Loader2, CheckCircle2 } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Register() {
  const router = useRouter();
  
  // Estados de sesión y carga inicial
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(false);

  // Estados del formulario
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+52');

  // Estados de validación dinámica
  const [errors, setErrors] = useState({ username: false, email: false, phone: false });
  const [isChecking, setIsChecking] = useState({ username: false, phone: false });
  
  // Validaciones visuales de formato
  const [usernameTooShort, setUsernameTooShort] = useState(false);
  const isPasswordSecure = password.length >= 8 || password === '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = email === '' || emailRegex.test(email);

  // --- BLOQUE DE PROTECCIÓN: Redirigir si ya hay sesión ---
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/dashboard');
      } else {
        setCheckingAuth(false); // Solo mostramos el form si no hay sesión
      }
    };
    checkSession();
  }, [router]);

  // --- Lógica de Validación en Tiempo Real (Debounce) ---
  useEffect(() => {
    if (username.length >= 5) {
      const timeoutId = setTimeout(async () => {
        setIsChecking(prev => ({ ...prev, username: true }));
        const { data } = await supabase
          .from('profiles')
          .select('username')
          .eq('username', username)
          .maybeSingle();
        
        setErrors(prev => ({ ...prev, username: !!data }));
        setIsChecking(prev => ({ ...prev, username: false }));
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      setErrors(prev => ({ ...prev, username: false }));
    }
  }, [username]);

  useEffect(() => {
    if (phone.length >= 10) {
      const timeoutId = setTimeout(async () => {
        setIsChecking(prev => ({ ...prev, phone: true }));
        const fullPhone = `${countryCode}${phone}`;
        const { data } = await supabase
          .from('profiles')
          .select('phone')
          .eq('phone', fullPhone)
          .maybeSingle();
        
        setErrors(prev => ({ ...prev, phone: !!data }));
        setIsChecking(prev => ({ ...prev, phone: false }));
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [phone, countryCode]);

  // --- Manejadores de cambio ---
  const handleUsernameChange = (val: string) => {
    const cleanVal = val.toLowerCase().replace(/\s+/g, '');
    setUsername(cleanVal);
    setUsernameTooShort(cleanVal.length > 0 && cleanVal.length < 5);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (errors.username || errors.phone || usernameTooShort) return;
    setLoading(true);

    try {
      const fullPhone = `${countryCode}${phone}`;

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        if (authError.message.includes("already registered") || authError.status === 422) {
          setErrors(prev => ({ ...prev, email: true }));
        } else {
          alert(authError.message);
        }
        setLoading(false);
        return;
      }

      if (authData.user) {
        await supabase.from('profiles').insert([{ 
          id: authData.user.id, 
          username, 
          full_name: fullName, 
          phone: fullPhone 
        }]);
        router.push('/suscriber/socials');
      }
    } catch (err) {
      alert("Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  // --- Renderizado de Carga Inicial ---
  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F9FBF9]">
        <Loader2 className="animate-spin text-[#2ECC71]" size={48} />
      </div>
    );
  }

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
          Hey @<span style={{ color: (usernameTooShort || errors.username) ? colors.error : colors.emerald }}>{username || 'usuario'}</span> 👋
        </h1>
        <p className="text-gray-400 text-lg max-w-sm mx-auto">¡Moneticemos tu comunidad!</p>
      </div>

      <div className="w-full max-w-md bg-white p-10 rounded-[2.8rem] border transition-shadow duration-500"
           style={{ borderColor: "#F3F4F6", boxShadow: `0 20px 50px -12px ${colors.emeraldShadow}` }}>
        
        <form className="space-y-4" onSubmit={handleRegister}>
          {/* Form Fields (Username, Name, Email, Phone, Password) */}
          <div className="relative pb-6">
            <AtSign className={`absolute left-5 top-[28px] -translate-y-1/2 w-5 h-5 z-10 transition-colors ${(usernameTooShort || errors.username) ? 'text-red-400' : 'text-gray-300'}`} />
            <div className={inputBase} style={{ borderColor: (usernameTooShort || errors.username) ? colors.error : "#E5E7EB", backgroundColor: (usernameTooShort || errors.username) ? colors.errorBg : "white" }}>
              <div className="flex items-center w-full pl-2">
                <span className="text-[#1A2E1A] font-bold text-[16px] select-none shrink-0">globos.me/</span>
                <input type="text" placeholder="usuario" className="bg-transparent outline-none font-medium text-[#1A2E1A] text-[16px] ml-[1px] w-full" value={username} onChange={(e) => handleUsernameChange(e.target.value)} required />
                {isChecking.username && <Loader2 className="animate-spin text-gray-400 w-4 h-4 ml-2" />}
                {!isChecking.username && username.length >= 5 && !errors.username && <CheckCircle2 className="text-emerald-500 w-4 h-4 ml-2" />}
              </div>
            </div>
            <div className="absolute left-4 bottom-0 h-5"> 
              {usernameTooShort && <p className="text-[10px] text-red-500 font-bold">Mínimo 5 caracteres</p>}
              {errors.username && !usernameTooShort && <p className="text-[10px] text-red-500 font-bold italic">Usuario no disponible</p>}
            </div>
          </div>

          <div className="relative">
            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5 z-10" />
            <input type="text" placeholder="Nombre completo" className={`${inputBase} border-[#E5E7EB] focus:border-[#2ECC71]`} value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>

          <div className="relative pb-6">
            <Mail className={`absolute left-5 top-[28px] -translate-y-1/2 w-5 h-5 z-10 ${(!isEmailValid || errors.email) ? 'text-red-400' : 'text-gray-300'}`} />
            <input type="email" placeholder="Email" className={inputBase} style={{ borderColor: (!isEmailValid || errors.email) ? colors.error : "#E5E7EB", backgroundColor: (!isEmailValid || errors.email) ? colors.errorBg : "white" }} value={email} onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({...prev, email: false})) }} required />
            <div className="absolute left-4 bottom-0 h-5">
              {!isEmailValid && <p className="text-[10px] text-red-500 font-bold italic">Email inválido</p>}
              {errors.email && isEmailValid && <p className="text-[10px] text-red-500 font-bold italic">Este email ya tiene cuenta</p>}
            </div>
          </div>

          <div className="flex gap-3 h-[66px] pb-0 mb-4">
            <div className="relative w-[110px] shrink-0">
              <select className="w-full h-full p-4 bg-white border border-[#E5E7EB] rounded-[1.2rem] outline-none font-bold text-[#1A2E1A] appearance-none cursor-pointer" value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                <option value="+52">🇲🇽 +52</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+34">🇪🇸 +34</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300">
                <ArrowRight size={14} className="rotate-90" />
              </div>
            </div>
            <div className="relative flex-1">
              <Phone className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 z-10 ${errors.phone ? 'text-red-400' : 'text-gray-300'}`} />
              <input 
                type="tel" 
                placeholder="Teléfono" 
                className={inputBase} 
                style={{ borderColor: errors.phone ? colors.error : "#E5E7EB", backgroundColor: errors.phone ? colors.errorBg : "white" }}
                value={phone} 
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} 
                required 
              />
              {isChecking.phone && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-gray-400 w-4 h-4" />}
            </div>
          </div>
          {errors.phone && <p className="text-[10px] text-red-500 font-bold italic -mt-2 ml-4">Teléfono ya registrado</p>}

          <div className="relative pb-6">
            <Lock className={`absolute left-5 top-[28px] -translate-y-1/2 w-5 h-5 z-10 ${!isPasswordSecure ? 'text-red-400' : 'text-gray-300'}`} />
            <input type={showPassword ? "text" : "password"} placeholder="Contraseña" className={inputBase} style={{ borderColor: !isPasswordSecure ? colors.error : "#E5E7EB", backgroundColor: !isPasswordSecure ? colors.errorBg : "white" }} value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-[28px] -translate-y-1/2 text-gray-300 cursor-pointer">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            <div className="absolute left-4 bottom-0 h-5">
              {!isPasswordSecure && <p className="text-[10px] text-red-500 font-bold">Mínimo 8 caracteres</p>}
            </div>
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              className="group w-full py-5 rounded-[1.2rem] font-bold text-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed hover:bg-black hover:text-white cursor-pointer"
              disabled={loading || usernameTooShort || !isPasswordSecure || !isEmailValid || email === '' || errors.username || errors.phone}
              style={{ backgroundColor: colors.emerald, color: '#FFFFFF', boxShadow: `0 10px 25px -5px ${colors.emeraldShadow}` }}
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <>Siguiente <ArrowRight className="group-hover:translate-x-1.5 transition-transform" /></>}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-gray-50 text-gray-400 text-sm">
          ¿Ya tienes cuenta? <Link href="/login" className="font-bold hover:underline text-[#2ECC71] cursor-pointer">Inicia aquí</Link>
        </div>
      </div>
    </div>
  );
}