'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js'; 
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Login() {
  const router = useRouter();
  
  // Estados de sesión y carga
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Estados del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Estados del texto animado
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = ["tu espacio ", "tu audiencia ", "tu comunidad ", "tu Globo"];

  // --- BLOQUE DE PROTECCIÓN: Redirigir si ya hay sesión ---
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Redirección directa a /dashboard si ya está logueado
        router.push('/dashboard');
      } else {
        setCheckingAuth(false);
      }
    };
    checkSession();
  }, [router]);

  // --- Lógica del texto animado ---
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        if (displayText === currentPhrase) {
          if (phraseIndex === phrases.length - 1) return;
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayText(currentPhrase.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setPhraseIndex((prev) => prev + 1);
        }
      }
    };
    const timer = setTimeout(handleTyping, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex]);

  // --- Manejador de Login ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setErrorMsg("El correo o la contraseña son incorrectos.");
      setLoading(false);
      return;
    }

    if (authData.user) {
      // Redirección directa a /dashboard tras login exitoso
      router.push('/dashboard');
    }
  };

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

  const inputStyle = `w-full p-5 pl-14 bg-white/60 border rounded-[1.2rem] outline-none font-medium placeholder:text-gray-400 focus:ring-4 focus:ring-[#2ECC71]/10 transition-all shadow-sm`;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 font-sans text-[#1A2E1A] bg-[#F9FBF9]">
      
      <div className="text-center mb-8 min-h-[100px]">
        <h1 className="text-5xl font-extrabold tracking-tight mb-2">
          Monetiza <br />
          <span style={{ color: colors.emerald }}>
            {displayText}
            <span className="animate-cursor ml-1">|</span>
          </span>
        </h1>
        <p className="text-gray-400 font-medium text-lg max-w-sm mx-auto">
          Gestiona tu contenido, productos y comunidad desde un solo lugar.
        </p>
      </div>

      <div 
        className="w-full max-w-md bg-white p-10 rounded-[2.8rem] border transition-shadow duration-500"
        style={{ borderColor: "#F3F4F6", boxShadow: `0 20px 50px -12px ${colors.emeraldShadow}` }}
      >
        <form className="space-y-5" onSubmit={handleLogin}>
          
          {errorMsg && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-[1.2rem] animate-in fade-in slide-in-from-top-1 duration-300">
              <div className="bg-red-500 p-1 rounded-full">
                <AlertCircle size={14} className="text-white" />
              </div>
              <p className="text-sm font-bold text-red-600">{errorMsg}</p>
            </div>
          )}

          <div className="relative">
            <Mail className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 z-10 transition-colors ${errorMsg ? 'text-red-400' : 'text-gray-300'}`} />
            <input 
              type="email" 
              placeholder="Correo electrónico" 
              className={inputStyle}
              style={{ borderColor: errorMsg ? colors.error : "#E5E7EB", backgroundColor: errorMsg ? colors.errorBg : "white" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="relative">
            <Lock className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 z-10 transition-colors ${errorMsg ? 'text-red-400' : 'text-gray-300'}`} />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Contraseña" 
              className={inputStyle}
              style={{ borderColor: errorMsg ? colors.error : "#E5E7EB", backgroundColor: errorMsg ? colors.errorBg : "white" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#2ECC71] transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex justify-end px-2">
            <Link href="/forgot-password" className="text-sm font-bold text-[#2ECC71] hover:underline cursor-pointer">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="group w-full py-5 rounded-[1.2rem] font-bold text-xl transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer disabled:opacity-50"
            style={{ 
              backgroundColor: colors.emerald, 
              color: '#FFFFFF',
              boxShadow: `0 10px 25px -5px ${colors.emeraldShadow}`
            }}
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : (
              <>Infla tu Globo <ArrowRight className="group-hover:translate-x-1.5 transition-transform" /></>
            )}
          </button>
        </form>

        <div className="mt-10 text-center pt-6 border-t border-gray-50">
          <p className="text-gray-400 font-medium text-sm">
            ¿Aún no tienes un Globo? <br />
            <Link href="/register" className="font-bold hover:underline inline-block mt-2 text-[#2ECC71] cursor-pointer">
              Empieza gratis hoy
            </Link>
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes cursor-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .animate-cursor { animation: cursor-blink 1s step-end infinite; color: #1A2E1A; }
      `}</style>
    </div>
  );
}