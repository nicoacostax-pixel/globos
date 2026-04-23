'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js'; 
import { 
  FaInstagram, FaTiktok, FaFacebook, FaYoutube, 
  FaPinterest 
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { 
  Home, Store, Wallet, BarChart3, 
  Users, Share2, MessageCircle, 
  Copy, ChevronRight, ArrowLeft, 
  Edit2, Save, ChevronDown, Loader2,
  Heart, Settings, Mail, Send, Calendar
} from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const SocialInput = ({ icon: Icon, label, placeholder, name, value, onChange, iconColor = "" }: any) => {
  return (
    <div className="flex items-center gap-3 w-full p-4 bg-white border border-[#E2E8F0] rounded-full transition-all duration-300 focus-within:border-[#2ECC71] focus-within:ring-4 focus-within:ring-[#2ECC71]/10">
      <div className="flex items-center gap-2 shrink-0">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        <span className="font-bold text-xs text-[#1A2E1A]">{label}</span>
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

export default function PerfilPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);
  
  // VARIABLE ESTÁTICA PARA EL USERNAME (Esquinas y @)
  const [staticUsername, setStaticUsername] = useState('usuario');

  const [profile, setProfile] = useState({
    full_name: '',
    bio: '',
    instagram: '',
    tiktok: '',
    facebook: '',
    youtube: '',
    x: '',
    pinterest: '',
    initial: 'G'
  });

  const menuItems = [
    { name: 'Inicio', icon: Home, path: '/dashboard' },
    { name: 'Mi Globo', icon: Store, path: '/globos' },
    { name: 'Ingresos', icon: Wallet, path: '/ingresos' },
    { name: 'Analíticas', icon: BarChart3, path: '/analiticas' },
  ];

  const extraItems = [
    { name: 'Clientes', icon: Users, path: '/clientes' },
    { name: 'Comunidad', icon: Heart, path: '/comunidad' },
    { name: 'Funnels', icon: Share2, path: '/funnels' },
    { name: 'Citas', icon: Calendar, path: '/citas' },
    { name: 'Referidos', icon: MessageCircle, path: '/referidos' },
    { name: 'Email Marketing', icon: Mail, path: '/emails' },
    { name: 'AutoDM', icon: Send, path: '/autodm' },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (data) {
          // Guardamos el identificador original una sola vez
          const username = data.full_name?.toLowerCase().replace(/\s/g, '') || 'usuario';
          setStaticUsername(username);
          
          setProfile({
            full_name: data.full_name || '',
            bio: data.bio || '',
            instagram: data.instagram || '',
            tiktok: data.tiktok || '',
            facebook: data.facebook || '',
            youtube: data.youtube || '',
            x: data.twitter || '',
            pinterest: data.pinterest || '',
            initial: (data.full_name?.[0] || 'G').toUpperCase()
          });
        }
      } else {
        router.push('/register');
      }
    };
    fetchUserData();
  }, [router]);

  const handleInputChange = (name: string, value: string) => {
    setProfile(prev => ({ 
        ...prev, 
        [name]: value,
        initial: name === 'full_name' ? (value[0] || 'G').toUpperCase() : prev.initial
    }));
  };

  const handleSave = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name,
          bio: profile.bio,
          instagram: profile.instagram,
          tiktok: profile.tiktok,
          facebook: profile.facebook,
          youtube: profile.youtube,
          twitter: profile.x,
          pinterest: profile.pinterest
        })
        .eq('id', userId);

      if (error) throw error;
      router.refresh(); 
      router.push('/globos');
    } catch (err) {
      alert("Error al guardar cambios.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen md:h-screen w-full bg-white text-[#1A2E1A] font-sans overflow-x-hidden">
      
      {/* --- SIDEBAR IZQUIERDA --- */}
      <aside className="hidden md:flex w-72 h-full bg-[#F0F7F0] border-r border-black/5 flex-col p-6 shrink-0 z-50">
        <div className="mb-10 flex items-center gap-2 px-2 cursor-pointer" onClick={() => router.push('/dashboard')}>
          <span className="text-3xl">🎈</span>
          <span className="text-4xl font-light tracking-tighter text-[#1A2E1A]">globos</span>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          {[...menuItems, ...extraItems].map((item) => {
            const isActive = item.path === '/globos'; 
            return (
              <button
                key={item.name}
                onClick={() => router.push(item.path)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-sm transition-all border-2 cursor-pointer hover:bg-black/5 ${
                  isActive ? 'bg-[#DFF0DF] text-[#1A2E1A] border-[#1A2E1A]' : 'text-gray-400 bg-transparent border-transparent'
                }`}
              >
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-black/5 space-y-3">
          <button onClick={() => router.push('/settings')} className="w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-sm text-gray-400 hover:bg-black/5 cursor-pointer">
            <div className="flex items-center gap-4">
              <Settings size={20} />
              <span>Settings</span>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </button>

          <div className="bg-white/60 p-4 rounded-[2rem] border border-black/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2ECC71] border-2 border-white flex items-center justify-center text-white font-black shadow-sm">
              {profile.initial}
            </div>
            <span className="text-sm font-black truncate">@{staticUsername}</span>
          </div>
        </div>
      </aside>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="flex-1 flex flex-col min-w-0 bg-white relative overflow-hidden">
        
        <header className="h-20 flex items-center justify-between px-8 border-b border-gray-50 shrink-0 bg-white z-10 sticky top-0">
          <div className="flex items-center gap-3 text-sm font-bold">
            <button onClick={() => router.push('/globos')} className="text-gray-400 hover:text-[#1A2E1A] flex items-center gap-2 transition-colors cursor-pointer">
              <ArrowLeft size={16} /> My Store
            </button>
            <ChevronRight size={14} className="text-gray-300" />
            <span className="text-[#1A2E1A]">Header</span>
          </div>
          <div className="flex items-center gap-3 bg-[#F0F7F0] px-4 py-2 rounded-full border border-[#DFF0DF]">
            <span className="text-xs font-bold text-[#2ECC71] font-mono italic">globo.me/{staticUsername}</span>
            <Copy size={14} className="text-[#2ECC71] cursor-pointer hover:opacity-70" onClick={() => navigator.clipboard.writeText(`globo.me/${staticUsername}`)} />
          </div>
        </header>

        <div className="flex-1 flex flex-col xl:flex-row overflow-hidden">
          
          <div className="flex-1 p-6 md:p-12 overflow-y-auto border-r border-gray-50 pb-32 md:pb-12">
            <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-3 duration-500">
              
              {/* TARJETA DE PERFIL (Sustitución de XZ<XZ y @) */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-black/5 flex items-center gap-6 mb-12">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-[#F0F7F0] flex items-center justify-center text-3xl overflow-hidden">
                    <Users className="text-gray-400" size={32} /> 
                  </div>
                  <button className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-md border border-gray-100">
                    <Edit2 size={12} className="text-[#2ECC71]" />
                  </button>
                </div>

                <div className="flex flex-col">
                  <h2 className="text-2xl font-black text-[#1A2E1A] flex items-center gap-2 leading-none mb-1">
                    {profile.full_name || 'Tu Nombre'} 
                    <Edit2 size={16} className="text-[#2ECC71] cursor-pointer" />
                  </h2>
                  <span className="text-gray-400 font-bold text-sm">
                    @{staticUsername}
                  </span>
                </div>
              </div>

              {/* FORMULARIO */}
              <div className="space-y-10">
                <div className="space-y-3">
                  <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Nombre Completo</label>
                  <input 
                    type="text" 
                    placeholder="Tu nombre real"
                    value={profile.full_name}
                    onChange={(e) => handleInputChange('full_name', e.target.value)}
                    className="w-full p-4 bg-[#F9FBF9] border border-[#DFF0DF] rounded-2xl font-bold focus:border-[#2ECC71] focus:bg-white outline-none transition-all"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Bio</label>
                    <span className="text-[10px] text-gray-300 font-bold">{profile.bio.length}/80</span>
                  </div>
                  <textarea 
                    placeholder="Escribe algo sobre ti..."
                    value={profile.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value.slice(0, 80))}
                    className="w-full p-4 bg-[#F9FBF9] border border-[#DFF0DF] rounded-2xl font-bold h-32 resize-none focus:border-[#2ECC71] focus:bg-white outline-none transition-all"
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Social Links</label>
                  <SocialInput icon={FaInstagram} label="@" placeholder="Tu usuario" name="instagram" value={profile.instagram} onChange={handleInputChange} />
                  <SocialInput icon={FaTiktok} label="@" placeholder="Tu usuario" name="tiktok" value={profile.tiktok} onChange={handleInputChange} />

                  {showMore && (
                    <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      <SocialInput icon={FaFacebook} label="URL" placeholder="https://facebook.com/" name="facebook" iconColor="text-blue-600" value={profile.facebook} onChange={handleInputChange} />
                      <SocialInput icon={FaYoutube} label="URL" placeholder="https://youtube.com/" name="youtube" iconColor="text-red-600" value={profile.youtube} onChange={handleInputChange} />
                      <SocialInput icon={FaXTwitter} label="@" placeholder="Tu usuario" name="x" value={profile.x} onChange={handleInputChange} />
                      <SocialInput icon={FaPinterest} label="URL" placeholder="https://pinterest.com/" name="pinterest" iconColor="text-red-700" value={profile.pinterest} onChange={handleInputChange} />
                    </div>
                  )}

                  <button 
                    onClick={() => setShowMore(!showMore)}
                    className="flex items-center gap-2 text-[#2ECC71] font-black text-[11px] tracking-widest uppercase py-2 hover:opacity-70 transition-opacity cursor-pointer"
                  >
                    {showMore ? 'Ver menos' : 'Ver más sociales'} <ChevronDown size={14} className={showMore ? 'rotate-180' : ''} />
                  </button>
                </div>

                <button 
                  onClick={handleSave}
                  disabled={loading}
                  className="w-full py-5 bg-[#2ECC71] text-white rounded-[1.5rem] font-black text-xl shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2 mt-12 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? <Loader2 className="animate-spin" size={24} /> : <><Save size={22} /> Guardar cambios</>}
                </button>
              </div>
            </div>
          </div>

          {/* PANEL DERECHO: PREVIEW MÓVIL */}
          <aside className="hidden xl:flex w-[460px] bg-[#F9FBF9] items-center justify-center p-12 shrink-0 border-l border-black/5">
            <div 
                className="w-[300px] h-[620px] bg-black rounded-[3.5rem] p-3 shadow-2xl relative overflow-hidden flex flex-col items-center pt-12 px-8"
                style={{ border: '2px solid #374151' }}
            >
              <div className="w-full h-full bg-white rounded-[2.8rem] overflow-hidden flex flex-col items-center pt-10">
                <div className="w-20 h-20 rounded-full bg-[#F0F7F0] mb-4 flex items-center justify-center text-3xl font-black text-[#2ECC71]">{profile.initial}</div>
                
                {/* Nombre dinámico en el teléfono */}
                <h4 className="text-xl font-black text-[#1A2E1A] mb-1">{profile.full_name || 'Tu Nombre'}</h4>
                
                <p className="text-gray-400 text-[10px] font-bold text-center px-6 mb-8">{profile.bio || 'Tu bio aparecerá aquí...'}</p>
                <div className="w-full px-6 space-y-3">
                  <div className="w-full h-10 bg-[#F9FBF9] rounded-xl border border-[#DFF0DF] border-dashed" />
                  <div className="w-full h-10 bg-[#F9FBF9] rounded-xl border border-[#DFF0DF] border-dashed" />
                </div>
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl" />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}