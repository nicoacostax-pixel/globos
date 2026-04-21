'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = [
    "tu espacio ",
    "tu audiencia ",
    "tu comunidad ",
    "tu Globo"
  ];

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

  const colors = {
    forest: "#1A2E1A",
    emerald: "#2ECC71",
    mint: "#F1F5F1", // Gris verdoso mucho más tenue para los bordes
    smoke: "#F9FBF9",
    emeraldShadow: "rgba(46, 204, 113, 0.12)"
  };

  // Estilo de input con borde gris más ligero
  const inputStyle = "w-full p-5 pl-14 bg-white/60 border border-[#E5E7EB] rounded-[1.2rem] outline-none font-medium placeholder:text-gray-400 focus:border-[#2ECC71] focus:ring-4 focus:ring-[#2ECC71]/10 transition-all shadow-sm";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 font-sans text-[#1A2E1A] bg-[#F9FBF9]">
      
      {/* Encabezado Dinámico */}
      <div className="text-center mb-8 min-h-[100px]"> {/* Reducido el margen inferior */}
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

      {/* Tarjeta de Login - Espacio con slogan reducido */}
      <div 
        className="w-full max-w-md bg-white p-10 rounded-[2.8rem] border transition-shadow duration-500"
        style={{ 
          borderColor: "#F3F4F6",
          boxShadow: `0 20px 50px -12px ${colors.emeraldShadow}`
        }}
      >
        <form className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5 z-10" />
            <input type="email" placeholder="Correo electrónico" className={inputStyle} required />
          </div>

          <div className="relative">
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5 z-10" />
            <input type={showPassword ? "text" : "password"} placeholder="Contraseña" className={inputStyle} required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#2ECC71] transition-colors">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex justify-end px-2">
            <Link href="/forgot-password" className="text-sm font-bold text-[#2ECC71] hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button 
            type="submit" 
            className="group w-full py-5 rounded-[1.2rem] font-bold text-xl transition-all flex items-center justify-center gap-2 active:scale-95"
            style={{ 
              backgroundColor: colors.emerald, 
              color: colors.forest,
              boxShadow: `0 10px 25px -5px ${colors.emeraldShadow}`
            }}
          >
            Infla tu Globo
            <ArrowRight className="group-hover:translate-x-1.5 transition-transform" />
          </button>
        </form>

        <div className="mt-10 text-center pt-6 border-t border-gray-50">
          <p className="text-gray-400 font-medium text-sm">
            ¿Aún no tienes un Globo? <br />
            <Link href="/register" className="font-bold hover:underline inline-block mt-2 text-[#2ECC71]">
              Empieza gratis hoy
            </Link>
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-cursor {
          animation: cursor-blink 1s step-end infinite;
          color: #1A2E1A;
        }
      `}</style>
    </div>
  );
}