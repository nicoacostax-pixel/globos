'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// Importamos todos los iconos necesarios
import { 
  FaInstagram, FaTiktok, FaFacebook, FaYoutube, 
  FaLink, FaPinterest, FaSpotify, FaApple, 
  FaEtsy, FaDiscord, FaSnapchat, FaTwitch, FaVimeo 
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { ChevronDown, ArrowRight, Mail } from 'lucide-react';

export default function SubscriberSocials() {
  const router = useRouter();
  const [showMore, setShowMore] = useState(false); // Estado para el despliegue
  
  const [socials, setSocials] = useState({
    instagram: '', tiktok: '', email: '', facebook: '', 
    youtube: '', link: '', pinterest: '', x: '',
    spotify: '', apple: '', etsy: '', discord: '',
    snapchat: '', twitch: '', vimeo: ''
  });

  const colors = {
    forest: "#1A2E1A",
    emerald: "#2ECC71",
    emeraldShadow: "rgba(46, 204, 113, 0.12)",
    borderDarker: "#E2E8F0", 
    atDark: "#1A2E1A", 
    placeholderOscuro: "#A1A1A1",
  };

  const inputContainer = "flex items-center gap-3 w-full p-4 bg-white border rounded-full transition-all duration-300 focus-within:border-[#2ECC71] focus-within:ring-4 focus-within:ring-[#2ECC71]/10";
  const iconTextSeparator = "w-px h-6 bg-gray-100";

  // Función reutilizable para los inputs
  const SocialInput = ({ icon: Icon, label, placeholder, name, type = "text", iconColor = "" }: any) => (
    <div className={inputContainer} style={{ borderColor: colors.borderDarker }}>
      <div className="flex items-center gap-2 shrink-0">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        <span className="font-bold text-xs" style={{ color: colors.atDark }}>{label}</span>
      </div>
      <div className={iconTextSeparator}></div>
      <input 
        type={type}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none font-medium text-sm"
        style={{ '--tw-placeholder-opacity': 1, '--tw-placeholder-color': colors.placeholderOscuro } as any}
        value={(socials as any)[name]}
        onChange={(e) => setSocials({...socials, [name]: e.target.value})}
      />
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-6 pt-20 bg-[#F9FBF9] font-sans text-[#1A2E1A]">
      
      {/* Barra de progreso al 50% */}
      <div className="w-full max-w-md mb-12 px-4">
        <div className="h-1.5 w-full bg-gray-200/50 rounded-full overflow-hidden">
          <div className="h-full bg-[#2ECC71] w-1/2 transition-all duration-700 ease-out"></div>
        </div>
      </div>

      <h1 className="text-3xl font-extrabold text-center mb-10">
        Conecta tus redes sociales <br /> a tu tienda
      </h1>

      <div className="w-full max-w-md px-4 space-y-4">
        
        {/* Redes Principales */}
        <SocialInput icon={FaInstagram} label="@" placeholder="Tu usuario" name="instagram" />
        <SocialInput icon={FaTiktok} label="@" placeholder="Tu usuario" name="tiktok" />

        {/* Sección Desplegable */}
        {showMore && (
          <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
            <SocialInput icon={Mail} label="Email" placeholder="email@gmail.com" name="email" iconColor="text-red-500" />
            <SocialInput icon={FaFacebook} label="URL" placeholder="https://www.facebook.com/" name="facebook" iconColor="text-blue-600" />
            <SocialInput icon={FaYoutube} label="URL" placeholder="https://youtube.com/" name="youtube" iconColor="text-red-600" />
            <SocialInput icon={FaLink} label="URL" placeholder="https://link.com/" name="link" iconColor="text-gray-600" />
            <SocialInput icon={FaPinterest} label="URL" placeholder="https://www.pinterest.com/" name="pinterest" iconColor="text-red-700" />
            <SocialInput icon={FaXTwitter} label="@" placeholder="Your Username" name="x" />
            <SocialInput icon={FaSpotify} label="URL" placeholder="https://open.spotify.com/" name="spotify" iconColor="text-green-500" />
            <SocialInput icon={FaApple} label="URL" placeholder="https://podcasts.apple.com/" name="apple" iconColor="text-purple-600" />
          </div>
        )}

        {/* Botón Ver Más / Ver Menos */}
        <button 
          onClick={() => setShowMore(!showMore)}
          className="w-full flex items-center justify-center gap-1.5 text-[#2ECC71] font-bold text-sm py-2 hover:opacity-80 transition-all"
        >
          {showMore ? 'Ver menos' : 'Ver más'} 
          <ChevronDown size={16} className={`transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`} />
        </button>

        <div className="pt-10 space-y-4">
          <button 
            onClick={() => router.push('/suscriber/plan')}
            className="group w-full py-5 rounded-full font-bold text-xl transition-all duration-300 flex items-center justify-center gap-2 hover:bg-black hover:text-white bg-[#2ECC71]"
            style={{ color: colors.forest, boxShadow: `0 10px 25px -5px ${colors.emeraldShadow}` }}
          >
            Siguiente <ArrowRight className="group-hover:translate-x-1.5 transition-transform" />
          </button>
          <button onClick={() => router.push('/suscriber/plan')} className="w-full text-center text-gray-400 font-bold text-sm">
            Saltar por ahora
          </button>
        </div>
      </div>

      <svg width="0" height="0" className="absolute">
        <linearGradient id="ig-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop stopColor="#F58529" offset="0%" /><stop stopColor="#DD2A7B" offset="25%" />
          <stop stopColor="#8134AF" offset="50%" /><stop stopColor="#515BD4" offset="100%" />
        </linearGradient>
      </svg>
    </div>
  );
}