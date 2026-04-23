'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js'; 
import { 
  FaInstagram, FaTiktok, FaFacebook, FaYoutube, 
  FaPinterest, FaSpotify, FaApple 
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { ChevronDown, ArrowRight, Loader2 } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// --- 1. MOVEMOS EL COMPONENTE FUERA PARA EVITAR EL DESENFOQUE ---
const SocialInput = ({ icon: Icon, label, placeholder, name, value, onChange, iconColor = "" }: any) => {
  const colors = {
    borderDarker: "#E2E8F0", 
    atDark: "#1A2E1A", 
    placeholderOscuro: "#A1A1A1",
  };

  return (
    <div className="flex items-center gap-3 w-full p-4 bg-white border rounded-full transition-all duration-300 focus-within:border-[#2ECC71] focus-within:ring-4 focus-within:ring-[#2ECC71]/10" 
         style={{ borderColor: colors.borderDarker }}>
      <div className="flex items-center gap-2 shrink-0">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        <span className="font-bold text-xs" style={{ color: colors.atDark }}>{label}</span>
      </div>
      <div className="w-px h-6 bg-gray-100"></div>
      <input 
        type="text"
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none font-medium text-sm"
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
      />
    </div>
  );
};

export default function SubscriberSocials() {
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  
  const [socials, setSocials] = useState({
    instagram: '', tiktok: '', facebook: '', 
    youtube: '', x: '', pinterest: '',
  });

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
      else router.push('/register');
    };
    getUser();
  }, [router]);

  // Función para manejar los cambios de input
  const handleInputChange = (name: string, value: string) => {
    setSocials(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          instagram: socials.instagram,
          tiktok: socials.tiktok,
          facebook: socials.facebook,
          youtube: socials.youtube,
          twitter: socials.x,
          pinterest: socials.pinterest
        })
        .eq('id', userId);

      if (error) throw error;
      router.push('/suscriber/plans');
    } catch (err) {
      alert("Error al guardar datos.");
    } finally {
      setLoading(false);
    }
  };

  const colors = {
    forest: "#1A2E1A",
    emerald: "#2ECC71",
    emeraldShadow: "rgba(46, 204, 113, 0.12)",
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-6 pt-20 bg-[#F9FBF9] font-sans text-[#1A2E1A]">
      <div className="w-full max-w-md mb-12 px-4">
        <div className="h-1.5 w-full bg-gray-200/50 rounded-full overflow-hidden">
          <div className="h-full bg-[#2ECC71] w-1/2"></div>
        </div>
      </div>

      <h1 className="text-3xl font-extrabold text-center mb-10">
        Conecta tus redes sociales <br /> a tu tienda
      </h1>

      <div className="w-full max-w-md px-4 space-y-4">
        {/* Pasamos las nuevas props value y onChange */}
        <SocialInput 
          icon={FaInstagram} label="@" placeholder="Tu usuario" name="instagram" 
          value={socials.instagram} onChange={handleInputChange} 
        />
        <SocialInput 
          icon={FaTiktok} label="@" placeholder="Tu usuario" name="tiktok" 
          value={socials.tiktok} onChange={handleInputChange} 
        />

        {showMore && (
          <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
            <SocialInput icon={FaFacebook} label="URL" placeholder="https://facebook.com/" name="facebook" iconColor="text-blue-600" value={socials.facebook} onChange={handleInputChange} />
            <SocialInput icon={FaYoutube} label="URL" placeholder="https://youtube.com/" name="youtube" iconColor="text-red-600" value={socials.youtube} onChange={handleInputChange} />
            <SocialInput icon={FaXTwitter} label="@" placeholder="Tu usuario" name="x" value={socials.x} onChange={handleInputChange} />
            <SocialInput icon={FaPinterest} label="URL" placeholder="https://pinterest.com/" name="pinterest" iconColor="text-red-700" value={socials.pinterest} onChange={handleInputChange} />
          </div>
        )}

        <button 
          onClick={() => setShowMore(!showMore)}
          className="w-full flex items-center justify-center gap-1.5 text-[#2ECC71] font-bold text-sm py-2 cursor-pointer hover:opacity-80"
        >
          {showMore ? 'Ver menos' : 'Ver más'} 
          <ChevronDown size={16} className={`transition-transform ${showMore ? 'rotate-180' : ''}`} />
        </button>

        <div className="pt-10 space-y-4">
          <button 
            onClick={handleNext}
            disabled={loading}
            className="group w-full py-5 rounded-full font-bold text-xl transition-all flex items-center justify-center gap-2 bg-[#2ECC71] cursor-pointer disabled:opacity-50"
            style={{ color: "#ffffff", boxShadow: `0 10px 25px -5px ${colors.emeraldShadow}` }}
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : <>Siguiente <ArrowRight /></>}
          </button>
          
          <button onClick={() => router.push('/suscriber/plans')} className="w-full text-center text-gray-400 font-bold text-sm cursor-pointer hover:text-gray-600">
            Saltar por ahora
          </button>
        </div>
      </div>
    </div>
  );
}