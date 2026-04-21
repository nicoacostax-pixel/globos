'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ChevronDown} from 'lucide-react';

// Iconos personalizados con el estilo de la marca
const InstagramIcon = () => (
  <div className="w-6 h-6 rounded-md flex items-center justify-center bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]">
    <div className="w-3.5 h-3.5 border-2 border-white rounded-sm flex items-center justify-center">
      <div className="w-1 h-1 bg-white rounded-full" />
    </div>
  </div>
);

const TikTokIcon = () => (
  <div className="relative w-5 h-5 flex items-center justify-center">
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-[#1A2E1A]">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.9-.39-2.81-.12-1.07.32-2 1.07-2.42 2.1-.45.95-.44 2.1-.06 3.03.31.8.94 1.47 1.74 1.81.88.4 1.89.46 2.78.15.82-.24 1.54-.78 1.94-1.54.34-.63.48-1.34.48-2.05V.02z"/>
    </svg>
  </div>
);

export default function SocialConnect() {
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);

  const colors = {
    forest: "#1A2E1A",
    emerald: "#2ECC71",
    emeraldShadow: "rgba(46, 204, 113, 0.12)"
  };

  const inputContainer = "flex items-center gap-3 w-full p-5 bg-white border border-[#E5E7EB] rounded-[1.5rem] shadow-sm focus-within:border-[#2ECC71] focus-within:ring-4 focus-within:ring-[#2ECC71]/10 transition-all";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-[#F9FBF9] font-sans text-[#1A2E1A]">
      
      {/* Barra de progreso en verde esmeralda */}
      <div className="w-full max-w-md mb-12">
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#2ECC71] transition-all duration-700 w-[66%]" />
        </div>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight leading-tight mb-2">
          Conecta tus <span style={{ color: colors.emerald }}>redes sociales</span> <br /> 
          a tu tienda 🚀
        </h1>
      </div>

      <div className="w-full max-w-md space-y-4">
        
        {/* Instagram */}
        <div className={inputContainer}>
          <InstagramIcon />
          <span className="text-gray-300 font-bold">@</span>
          <input type="text" placeholder="Tu usuario" className="flex-1 outline-none font-medium placeholder:text-gray-300" />
        </div>

        {/* TikTok */}
        <div className={inputContainer}>
          <TikTokIcon />
          <span className="text-gray-300 font-bold">@</span>
          <input type="text" placeholder="Tu usuario" className="flex-1 outline-none font-medium placeholder:text-gray-300" />
        </div>

        {/* LinkedIn */}


        {/* Botón de expansión con estilo dinámico */}
        <button 
          onClick={() => setShowMore(!showMore)}
          className="w-full flex items-center justify-center gap-2 text-[#2ECC71] font-bold text-sm py-2 hover:opacity-80 transition-opacity"
        >
          Ver más opciones <ChevronDown size={16} className={`${showMore ? 'rotate-180' : ''} transition-transform`} />
        </button>

        {/* Botones de acción con el estilo de la página Register */}
        <div className="pt-8 space-y-4">
          <button 
            onClick={() => router.push('/suscriber/plan')}
            className="group w-full py-5 rounded-[1.2rem] font-bold text-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 hover:bg-black hover:text-white hover:scale-[1.03]"
            style={{ 
              backgroundColor: colors.emerald, 
              color: colors.forest,
              boxShadow: `0 10px 25px -5px ${colors.emeraldShadow}`
            }}
          >
            Siguiente
            <ArrowRight className="group-hover:translate-x-1.5 transition-transform" />
          </button>
          
          <button 
            onClick={() => router.push('/suscriber/plan')}
            className="w-full text-center text-gray-400 font-bold hover:text-[#2ECC71] transition-colors"
          >
            Omitir por ahora
          </button>
        </div>
      </div>
    </div>
  );
}