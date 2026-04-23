'use client'

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { 
  Home, Store, Wallet, BarChart3, 
  Users, Copy, ChevronRight, Palette, 
  Package, Sparkles, Send, X,
  Calendar, Mail, Heart,
  Share2, MessageCircle, Settings,
  LogOut
} from 'lucide-react';

// ESTO ES CLAVE: Definir el cliente FUERA para evitar el error de "Multiple instances"
// que aparece en tu terminal.
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function GlobosDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const profile = { username: 'gonzo' };

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      
      // 1. Ejecutar el sign out en Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Error al cerrar sesión en Supabase:', error.message);
      }

      // 2. Limpiar almacenamiento local por si acaso
      if (typeof window !== 'undefined') {
        window.localStorage.clear();
        window.sessionStorage.clear();
        // Usamos replace para que no puedan volver atrás con el botón del navegador
        window.location.replace('/login');
      }
      
    } catch (error) {
      console.error('Fallo crítico:', error);
      window.location.replace('/login');
    }
  };

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

  const dashboardActions = [
    { title: 'Choose store theme', desc: 'Customize your store design.', icon: Palette, bg: 'bg-orange-100/50', col: 'text-orange-500', path: '/edit-design' },
    { title: 'Add a product', desc: 'Go from idea to offer in minutes.', icon: Package, bg: 'bg-[#DFF0DF]/50', col: 'text-[#1A2E1A]', path: '/globos' },
    { title: 'Ask Globito', desc: 'Your very own AI Creator coach.', icon: Sparkles, bg: 'bg-red-50/50', col: 'text-red-500', path: '/dashboard' }
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-white text-[#1A2E1A] overflow-hidden font-sans">
      
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex w-72 h-full bg-[#F0F7F0] border-r border-black/5 flex-col p-6 shrink-0 z-50">
        <div className="mb-8 flex items-center gap-2 px-2 cursor-pointer" onClick={() => router.push('/dashboard')}>
          <span className="text-3xl drop-shadow-sm">🎈</span>
          <span className="text-4xl font-light tracking-tight">globos</span>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          {[...menuItems, ...extraItems].map((item) => {
            const isActive = pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => router.push(item.path)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-sm transition-all border-2 cursor-pointer ${
                  isActive ? 'bg-[#DFF0DF] text-[#1A2E1A] border-[#1A2E1A]' : 'text-gray-400 border-transparent hover:bg-black/5'
                }`}
              >
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-black/5 space-y-2">
          <button 
            onClick={() => router.push('/settings')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-sm transition-all border-2 cursor-pointer ${
              pathname === '/settings' 
                ? 'bg-[#DFF0DF] text-[#1A2E1A] border-[#1A2E1A]' 
                : 'text-gray-400 border-transparent bg-transparent hover:bg-black/5'
            }`}
          >
            <div className="flex items-center gap-4">
              <Settings size={20} />
              <span>Settings</span>
            </div>
            {pathname !== '/settings' && <ChevronRight size={16} className="text-gray-300" />}
          </button>

          {/* BOTÓN LOGOUT DESKTOP */}
          <button 
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-sm text-red-500 border-2 border-transparent hover:bg-red-50 transition-all cursor-pointer disabled:opacity-50"
          >
            <LogOut size={20} />
            <span>{isLoggingOut ? 'Saliendo...' : 'Cerrar Sesión'}</span>
          </button>

          <div className="bg-white/60 p-4 rounded-3xl border border-black/5 flex items-center gap-3 shadow-sm mt-2">
            <div className="w-10 h-10 rounded-full bg-[#2ECC71] border-2 border-white flex items-center justify-center text-white font-black">G</div>
            <span className="text-sm font-black truncate">@{profile.username}</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 md:h-20 flex items-center justify-between px-6 md:px-10 border-b border-gray-50 bg-white z-10">
          <h2 className="text-lg md:text-xl font-black text-gray-400">Dashboard</h2>
          <div className="flex items-center gap-3 bg-[#F9FBF9] px-4 py-2 rounded-full border border-[#DFF0DF]/60 shadow-sm">
            <span className="text-xs md:text-sm font-bold text-[#2ECC71] font-mono">globos.me/{profile.username}</span>
            <Copy 
              size={16} 
              className="text-[#2ECC71] cursor-pointer hover:opacity-70" 
              onClick={() => navigator.clipboard.writeText(`globos.me/${profile.username}`)}
            />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-white p-6 md:p-16 pb-32">
          <div className="max-w-2xl mx-auto md:mx-0">
            <div className="mb-10">
              <h1 className="text-3xl md:text-6xl font-black mb-1 tracking-tight text-[#1A2E1A]">Bienvenido, {profile.username} 👋</h1>
              <p className="text-gray-400 text-lg md:text-2xl font-bold">Let's get you ready to sell.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {dashboardActions.map((action, idx) => (
                <div 
                  key={idx} 
                  onClick={() => router.push(action.path)}
                  className="group bg-white border border-gray-100/50 p-6 rounded-[2.5rem] flex items-center justify-between shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:border-[#2ECC71]/30 transition-all cursor-pointer active:scale-[0.98]"
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 ${action.bg} rounded-[1.5rem] flex items-center justify-center transition-transform group-hover:rotate-3`}>
                      <action.icon className={action.col} size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black group-hover:text-[#2ECC71] transition-colors">
                        {action.title} <ChevronRight size={18} className="inline ml-1" />
                      </h3>
                      <p className="text-gray-400 font-bold text-sm leading-tight">{action.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Móvil Navbar */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-[#DFF0DF]/60 flex items-center justify-around z-50">
          {menuItems.map((item) => (
            <button key={item.name} onClick={() => router.push(item.path)} className="flex flex-col items-center gap-1 flex-1">
              <item.icon size={22} className={pathname === item.path ? 'text-[#2ECC71]' : 'text-gray-300'} />
              <span className={`text-[9px] font-black uppercase tracking-tighter ${pathname === item.path ? 'text-[#2ECC71]' : 'text-gray-300'}`}>{item.name}</span>
            </button>
          ))}
          <button onClick={() => setIsDrawerOpen(true)} className="flex flex-col items-center gap-1 flex-1">
            <div className="w-5 h-5 border-2 border-gray-300 rounded-[4px] flex items-center justify-center">
              <span className="text-[10px] font-black text-gray-300">+</span>
            </div>
            <span className="text-[9px] font-black uppercase text-gray-300 tracking-tighter">Más</span>
          </button>
        </nav>

        {/* Móvil Drawer */}
        <div className={`fixed inset-0 z-[100] transition-all duration-300 md:hidden ${isDrawerOpen ? 'visible' : 'invisible'}`}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setIsDrawerOpen(false)} />
          <div className={`absolute right-0 top-0 bottom-0 w-[82%] bg-white transition-transform duration-500 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
            <header className="p-6 flex items-center justify-between border-b border-gray-50">
               <span className="text-2xl">🎈 globos</span>
               <button onClick={() => setIsDrawerOpen(false)}><X size={20} /></button>
            </header>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
               <div className="grid grid-cols-3 gap-4">
                  {extraItems.map((opt) => (
                    <button key={opt.name} onClick={() => { router.push(opt.path); setIsDrawerOpen(false); }} className="flex flex-col items-center gap-2">
                      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center"><opt.icon size={22} /></div>
                      <span className="text-[10px] font-bold text-center uppercase tracking-tighter text-gray-500">{opt.name}</span>
                    </button>
                  ))}
               </div>
               
               <div className="pt-4 border-t space-y-2">
                 <button onClick={() => { router.push('/settings'); setIsDrawerOpen(false); }} className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                   <Settings size={18} /> <span className="text-sm font-bold">Settings</span>
                 </button>
                 <button onClick={handleLogout} className="w-full flex items-center gap-3 p-4 bg-red-50 text-red-500 rounded-2xl">
                   <LogOut size={18} /> <span className="text-sm font-bold">Cerrar Sesión</span>
                 </button>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}