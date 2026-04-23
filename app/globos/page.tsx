"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { 
  Home, Store, Wallet, BarChart3, 
  Users, Heart, Plus, Pencil, GripVertical,
  MoreVertical, Paintbrush, Globe, Copy, 
  ChevronLeft, ChevronRight, Smartphone, 
  Palette, Type, Share2, Calendar, MessageCircle, 
  Mail, Send, X, Settings, Package, Sparkles, Check, Loader2
} from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function MiGloboPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('Store');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // VARIABLE ESTÁTICA (Zonas Rojas)
  const [staticUsername, setStaticUsername] = useState('usuario');

  // VARIABLES DINÁMICAS (Zonas Verdes)
  const [profile, setProfile] = useState({ 
    full_name: 'Tu Nombre', 
    handle: 'usuario', 
    initial: 'G' 
  });

  // Estado para el Carrusel de Diseños
  const [activeDesign, setActiveDesign] = useState(2);

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

  const designs = [
    { id: 0, name: 'Soft Pastel', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=500&fit=crop', bg: 'bg-[#FDF2F8]', accent: '#F472B6', text: 'text-pink-900', isDark: false },
    { id: 1, name: 'Minimalist', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=300&h=500&fit=crop', bg: 'bg-white', accent: '#000000', text: 'text-black', isDark: false },
    { id: 2, name: 'The Stone', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&h=500&fit=crop', bg: 'bg-[#0F172A]', accent: '#2ECC71', text: 'text-white', isDark: true },
    { id: 3, name: 'Clean White', img: 'https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?w=300&h=500&fit=crop', bg: 'bg-[#F0F7F0]', accent: '#1A2E1A', text: 'text-[#1A2E1A]', isDark: false },
    { id: 4, name: 'Deep Night', img: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=300&h=500&fit=crop', bg: 'bg-black', accent: '#2ECC71', text: 'text-white', isDark: true },
  ];

  useEffect(() => {
    const loadData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (data) {
          const username = data.full_name?.toLowerCase().replace(/\s/g, '') || 'usuario';
          setStaticUsername(username);
          setProfile({
            full_name: data.full_name || 'Sin Nombre',
            handle: username,
            initial: (data.full_name?.[0] || 'G').toUpperCase()
          });
        }
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const currentDesign = designs[activeDesign];
  const moveNext = () => setActiveDesign((prev) => (prev + 1) % designs.length);
  const movePrev = () => setActiveDesign((prev) => (prev - 1 + designs.length) % designs.length);

  if (loading) return <div className="h-screen w-full flex items-center justify-center bg-white"><Loader2 className="animate-spin text-[#2ECC71]" size={40} /></div>;

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-white text-[#1A2E1A] overflow-hidden font-sans">
      
      {/* --- SIDEBAR IZQUIERDA (ZONA ROJA) --- */}
      <aside className="hidden md:flex w-72 h-full bg-[#F0F7F0] border-r border-black/5 flex-col p-6 shrink-0 z-50">
        <div className="mb-10 flex items-center gap-2 px-2 cursor-pointer" onClick={() => router.push('/dashboard')}>
          <span className="text-3xl">🎈</span>
          <span className="text-4xl font-light tracking-tighter text-[#1A2E1A]">globos</span>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          {[...menuItems, ...extraItems].map((item) => {
            const isActive = item.path === pathname; 
            return (
              <button
                key={item.name}
                onClick={() => router.push(item.path)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-sm transition-all border-2 cursor-pointer ${
                  isActive ? 'bg-[#DFF0DF] text-[#1A2E1A] border-[#1A2E1A]' : 'text-gray-400 bg-transparent border-transparent hover:bg-black/5'
                }`}
              >
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-black/5 space-y-3">
          <button onClick={() => router.push('/settings')} className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-sm transition-all border-2 cursor-pointer ${pathname === '/settings' ? 'bg-[#DFF0DF] text-[#1A2E1A] border-[#1A2E1A]' : 'text-gray-400 border-transparent bg-transparent hover:bg-black/5'}`}>
            <div className="flex items-center gap-4">
              <Settings size={20} strokeWidth={pathname === '/settings' ? 2.5 : 2} />
              <span>Settings</span>
            </div>
            {pathname !== '/settings' && <ChevronRight size={16} className="text-gray-300" />}
          </button>

          <div className="bg-white/60 p-4 rounded-[2rem] border border-black/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2ECC71] border-2 border-white flex items-center justify-center text-white font-black shadow-sm">
              {profile.initial}
            </div>
            {/* SE MANTIENE EL USERNAME DE SUPABASE */}
            <span className="text-sm font-black truncate">@{staticUsername}</span>
          </div>
        </div>
      </aside>

      {/* --- CONTENIDO CENTRAL --- */}
      <main className="flex-1 flex flex-col min-w-0 bg-white relative overflow-hidden">
        
        {/* HEADER (ZONA ROJA) */}
        <header className="h-20 flex items-center justify-between px-8 border-b border-gray-50 shrink-0 bg-white z-10">
          <h1 className="text-xl font-black">My Store</h1>
          <div className="flex items-center gap-3 bg-[#F0F7F0] px-4 py-2 rounded-full border border-[#DFF0DF]">
            {/* URL CON USERNAME DE SUPABASE */}
            <span className="text-xs font-bold text-[#2ECC71] font-mono">globos.me/{staticUsername}</span>
            <Copy size={14} className="text-[#2ECC71] cursor-pointer hover:opacity-70" onClick={() => navigator.clipboard.writeText(`globos.me/${staticUsername}`)} />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 pb-32 md:pb-8">
          <div className="flex items-center gap-8 border-b border-gray-100">
            {[
              { id: 'Store', icon: Store, label: 'Store' },
              { id: 'Landing', icon: Globe, label: 'Landing Pages' },
              { id: 'Design', icon: Paintbrush, label: 'Edit Design' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-1 py-4 text-sm font-black transition-all border-b-2 cursor-pointer ${
                  activeTab === tab.id ? 'border-[#2ECC71] text-[#2ECC71]' : 'border-transparent text-gray-300 hover:text-gray-500'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB STORE (ZONA VERDE) */}
          {activeTab === 'Store' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="bg-[#F9FBF9] rounded-[2.5rem] border border-[#DFF0DF] p-8 flex items-center gap-6 shadow-sm">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-[#DFF0DF] shadow-inner">
                  <span className="text-3xl">{profile.initial}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {/* SUSTITUCIÓN xz<xz POR full_name */}
                    <h2 className="text-2xl font-black text-[#1A2E1A]">{profile.full_name}</h2>
                    <button onClick={() => router.push('/perfil')} className="p-2 hover:bg-[#DFF0DF] rounded-full transition-colors text-[#2ECC71] cursor-pointer"><Pencil size={16} /></button>
                  </div>
                  {/* SUSTITUCIÓN @ POR username */}
                  <p className="text-gray-400 font-bold">@{staticUsername}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between group hover:border-[#2ECC71] transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <GripVertical className="text-gray-200" size={20} />
                    <div className="w-12 h-12 bg-[#F0F7F0] rounded-xl flex items-center justify-center">📩</div>
                    <h3 className="font-bold text-[#1A2E1A]">Get My FREE Guide Now!</h3>
                  </div>
                  <MoreVertical size={20} className="text-gray-300 cursor-pointer hover:text-[#1A2E1A]" />
                </div>
                <button className="w-full py-4 bg-[#2ECC71] text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-[#27ae60] shadow-lg shadow-[#2ecc71]/20 cursor-pointer">
                  <Plus size={22} strokeWidth={3} /> Add Product
                </button>
              </div>
            </div>
          )}

          {/* TAB LANDING PAGES (Lógica completa) */}
          {activeTab === 'Landing' && (
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 pt-10 animate-in fade-in slide-in-from-bottom-4">
              <div className="max-w-md space-y-6 text-center lg:text-left">
                <h2 className="text-5xl font-black text-[#1A2E1A] tracking-tighter leading-tight">Create a Landing Page</h2>
                <p className="text-gray-400 font-medium leading-relaxed">Drive customers to an exclusive product link using a Private Landing Page!</p>
                <button className="flex items-center gap-2 bg-[#2ECC71] text-white px-10 py-4 rounded-xl font-black hover:scale-105 transition-transform shadow-lg shadow-[#2ecc71]/20 cursor-pointer mx-auto lg:mx-0"><Plus size={20} strokeWidth={3} /> Create</button>
              </div>
              <div className="relative w-full max-w-sm"><div className="bg-white rounded-3xl border border-gray-100 shadow-2xl p-4 rotate-3 transform"><div className="w-full h-48 bg-[#F0F7F0] rounded-2xl mb-4 flex items-center justify-center text-5xl">✨</div><div className="h-4 bg-[#DFF0DF] rounded-full w-3/4 mb-2"></div><div className="h-4 bg-[#F0F7F0] rounded-full w-1/2"></div></div></div>
            </div>
          )}

          {/* TAB EDIT DESIGN (Lógica completa) */}
          {activeTab === 'Design' && (
            <div className="space-y-12 animate-in fade-in duration-500 pb-10">
              <div className="relative flex flex-col items-center">
                <div className="relative w-full flex items-center justify-center h-[420px] overflow-hidden">
                    {designs.map((design, index) => {
                        const isCenter = index === activeDesign;
                        const isLeft = index === (activeDesign - 1 + designs.length) % designs.length;
                        const isRight = index === (activeDesign + 1) % designs.length;
                        let style = "opacity-0 scale-75 pointer-events-none translate-x-0";
                        if (isCenter) style = "opacity-100 scale-100 z-30 translate-x-0";
                        if (isLeft) style = "opacity-40 scale-90 z-20 -translate-x-[70%] md:-translate-x-[110%]";
                        if (isRight) style = "opacity-40 scale-90 z-20 translate-x-[70%] md:translate-x-[110%]";
                        return (
                            <div key={design.id} className={`absolute transition-all duration-500 ease-in-out cursor-pointer ${style}`} onClick={() => setActiveDesign(index)}>
                                <div className={`relative w-[200px] h-[350px] rounded-[2.5rem] overflow-hidden border-4 ${isCenter ? 'border-[#1A2E1A] shadow-2xl' : 'border-gray-100'}`}>
                                    <img src={design.img} alt={design.name} className="w-full h-full object-cover" />
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="flex items-center gap-6 mt-4">
                  <button onClick={movePrev} className="p-3 border border-gray-100 rounded-full hover:bg-gray-50 cursor-pointer active:scale-90 transition-all"><ChevronLeft size={20}/></button>
                  <span className="font-black text-lg tracking-tight min-w-[120px] text-center">{designs[activeDesign].name}</span>
                  <button onClick={moveNext} className="p-3 border border-gray-100 rounded-full hover:bg-gray-50 cursor-pointer active:scale-90 transition-all"><ChevronRight size={20}/></button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* --- NAVBAR INFERIOR MÓVIL (ZONA ROJA) --- */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-[#DFF0DF]/60 flex items-center justify-around z-[60] shadow-[0_-5px_20px_rgba(0,0,0,0.02)]">
          {menuItems.map((item) => (
            <button key={item.name} onClick={() => router.push(item.path)} className="flex flex-col items-center gap-1 flex-1 cursor-pointer">
              <item.icon size={22} className={pathname === item.path ? 'text-[#2ECC71]' : 'text-gray-300'} strokeWidth={pathname === item.path ? 3 : 2} />
              <span className={`text-[9px] font-black uppercase tracking-tighter ${pathname === item.path ? 'text-[#2ECC71]' : 'text-gray-300'}`}>{item.name}</span>
            </button>
          ))}
          <button onClick={() => setIsDrawerOpen(true)} className="flex flex-col items-center gap-1 flex-1 cursor-pointer">
            <div className="w-5 h-5 border-2 border-gray-300 rounded-[4px] flex items-center justify-center"><span className="text-[10px] font-black text-gray-300">+</span></div>
            <span className="text-[9px] font-black uppercase text-gray-300 tracking-tighter">Más</span>
          </button>
        </nav>

        {/* --- DRAWER MÓVIL (ZONA ROJA) --- */}
        <div className={`fixed inset-0 z-[100] transition-all duration-300 md:hidden ${isDrawerOpen ? 'visible' : 'invisible pointer-events-none'}`}>
          <div className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsDrawerOpen(false)} />
          <div className={`absolute right-0 top-0 bottom-0 w-[82%] bg-white transition-transform duration-500 ease-out flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.05)] ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <header className="p-6 flex items-center justify-between border-b border-gray-50">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/dashboard')}><span className="text-2xl">🎈</span><span className="text-2xl font-light">globos</span></div>
              <button onClick={() => setIsDrawerOpen(false)} className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full text-gray-400 cursor-pointer active:scale-90 transition-all"><X size={20} /></button>
            </header>
            <div className="p-6 border-t border-gray-50 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#2ECC71] flex items-center justify-center text-white font-black">{profile.initial}</div>
              <p className="text-sm font-black truncate">@{staticUsername}</p>
            </div>
          </div>
        </div>
      </main>

      {/* --- PREVISUALIZACIÓN MÓVIL (ZONA VERDE) --- */}
      <aside className="hidden xl:flex w-[460px] bg-[#F9FBF9] border-l border-black/5 items-center justify-center p-12 shrink-0">
        <div className="w-[300px] h-[620px] bg-black rounded-[3.5rem] p-3 shadow-2xl relative border-[8px] border-gray-900 overflow-hidden">
          <div className={`w-full h-full ${currentDesign.bg} rounded-[2.8rem] overflow-hidden flex flex-col transition-all duration-500`}>
            <div className="h-40 flex flex-col items-center justify-center pt-8">
              <div className={`w-16 h-16 rounded-full border-2 mb-2 flex items-center justify-center text-xl font-black ${currentDesign.isDark ? 'border-white/20 bg-white/10 text-white' : 'border-black/5 bg-black/5 text-black'}`}>{profile.initial}</div>
              {/* NOMBRE DINÁMICO EN EL MÓVIL */}
              <h4 className={`font-black text-xs uppercase tracking-widest ${currentDesign.text}`}>{profile.full_name}</h4>
              <p className={`text-[9px] font-bold opacity-60 ${currentDesign.text}`}>@{staticUsername}</p>
            </div>
            <div className="p-4 space-y-4">
              <div className={`${currentDesign.isDark ? 'bg-white/10' : 'bg-black/5'} rounded-2xl p-4 border border-white/5 space-y-3`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs" style={{backgroundColor: currentDesign.accent, color: currentDesign.isDark ? '#000' : '#fff'}}>📩</div>
                  <p className={`text-[10px] font-black ${currentDesign.text}`}>Free Guide</p>
                </div>
                <button className="w-full font-black text-[10px] py-2.5 rounded-lg" style={{backgroundColor: currentDesign.accent, color: currentDesign.isDark ? '#000' : '#fff'}}>Download Now</button>
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl" />
        </div>
      </aside>
    </div>
  );
}