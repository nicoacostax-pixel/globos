'use client'

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Home, Store, Wallet, BarChart3, 
  Users, Heart, Share2, Calendar, 
  MessageCircle, Mail, Send, Plus, 
  Settings, Copy, X, ArrowUpRight,
  TrendingUp, MousePointer2, Eye, ShoppingBag
} from 'lucide-react';

export default function AnaliticasPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const profile = { 
    username: 'gonzo',
    initial: 'G',
    url: 'globos.me/gonzo'
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

  const stats = [
    { label: 'Vistas Totales', value: '1,284', change: '+12%', icon: Eye },
    { label: 'Clics en Enlaces', value: '452', change: '+5%', icon: MousePointer2 },
    { label: 'CTR Promedio', value: '35.2%', change: '+2.4%', icon: TrendingUp },
    { label: 'Conversiones', value: '18', change: '+8%', icon: ShoppingBag },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-white text-[#1A2E1A] overflow-hidden font-sans">
      
      {/* --- SIDEBAR IZQUIERDA (DESKTOP) --- */}
      <aside className="hidden md:flex w-72 h-full bg-[#F0F7F0] border-r border-black/5 flex-col p-6 shrink-0 z-50">
        <div className="mb-10 flex items-center gap-2 px-2 cursor-pointer" onClick={() => router.push('/dashboard')}>
          <span className="text-3xl">🎈</span>
          <span className="text-4xl font-light tracking-tighter text-[#1A2E1A]">globos</span>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          {[...menuItems, ...extraItems].map((item) => {
            const isActive = pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => router.push(item.path)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-sm transition-all border-2 cursor-pointer ${
                  isActive 
                    ? 'bg-[#DFF0DF] text-[#1A2E1A] border-[#1A2E1A]' 
                    : 'text-gray-400 bg-transparent border-transparent hover:bg-black/5'
                }`}
              >
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-black/5">
          <div className="bg-white/60 p-4 rounded-[2rem] border border-black/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2ECC71] border-2 border-white flex items-center justify-center text-white font-black shadow-sm">
              {profile.initial}
            </div>
            <span className="text-sm font-black truncate">@{profile.username}</span>
          </div>
        </div>
      </aside>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="flex-1 flex flex-col min-w-0 bg-white relative overflow-hidden">
        
        {/* HEADER SUPERIOR */}
        <header className="h-20 flex items-center justify-between px-8 border-b border-gray-50 shrink-0 bg-white z-10">
          <h1 className="text-xl font-black">Analíticas</h1>
          <div className="flex items-center gap-3 bg-[#F0F7F0] px-4 py-2 rounded-full border border-[#DFF0DF]">
            <span className="text-xs font-bold text-[#2ECC71] font-mono">{profile.url}</span>
            <Copy size={14} className="text-[#2ECC71] cursor-pointer hover:opacity-70" onClick={() => navigator.clipboard.writeText(profile.url)} />
          </div>
        </header>

        {/* ÁREA DE CONTENIDO */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 pb-32 md:pb-10 max-w-7xl mx-auto w-full">
          
          {/* GRID DE MÉTRICAS RÁPIDAS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-[#F9FBF9] border border-[#DFF0DF] rounded-[2rem] p-6 space-y-4 hover:shadow-sm transition-all">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-white rounded-2xl border border-[#DFF0DF]">
                    <stat.icon size={20} className="text-[#2ECC71]" />
                  </div>
                  <span className="flex items-center text-[10px] font-black text-[#2ECC71] bg-[#DFF0DF] px-2 py-1 rounded-full">
                    {stat.change} <ArrowUpRight size={10} />
                  </span>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
                  <p className="text-3xl font-black text-[#1A2E1A]">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* SECCIÓN DE GRÁFICO (Placeholder Estilizado) */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-black">Tráfico de los últimos 7 días</h2>
              <select className="bg-[#F0F7F0] border-none rounded-xl px-4 py-2 text-xs font-bold outline-none cursor-pointer">
                <option>Últimos 7 días</option>
                <option>Últimos 30 días</option>
              </select>
            </div>
            
            <div className="h-64 w-full bg-[#F9FBF9] rounded-[2rem] border border-dashed border-[#DFF0DF] flex items-center justify-center relative overflow-hidden">
                {/* Decoración de gráfico minimalista */}
                <div className="absolute inset-x-10 bottom-20 h-32 flex items-end justify-between gap-2">
                    {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                        <div key={i} style={{ height: `${h}%` }} className="w-full bg-[#DFF0DF] rounded-t-xl hover:bg-[#2ECC71] transition-colors cursor-pointer relative group">
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1A2E1A] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                {h * 10}
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-xs font-bold text-gray-300 z-10">Gráfico de rendimiento próximamente</p>
            </div>
          </div>

          {/* LISTA DE ENLACES TOP */}
          <div className="space-y-6">
            <h2 className="text-xl font-black">Enlaces más clickeados</h2>
            <div className="space-y-3">
              {[
                { name: 'Guía Gratuita PDF', clicks: 245, color: 'bg-blue-500' },
                { name: 'Curso de Velas', clicks: 120, color: 'bg-orange-500' },
                { name: 'WhatsApp Directo', clicks: 87, color: 'bg-green-500' }
              ].map((link, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-white border border-gray-50 rounded-2xl hover:border-[#2ECC71] transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-10 ${link.color} rounded-full`}></div>
                    <div>
                      <p className="font-bold text-[#1A2E1A]">{link.name}</p>
                      <p className="text-[10px] font-black text-gray-300 uppercase tracking-tighter">Activo hace 2 horas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-lg">{link.clicks}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Clicks</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* --- NAVBAR INFERIOR MÓVIL --- */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-[#DFF0DF]/60 flex items-center justify-around z-[60] shadow-[0_-5px_20px_rgba(0,0,0,0.02)]">
          {menuItems.map((item) => (
            <button key={item.name} onClick={() => router.push(item.path)} className="flex flex-col items-center gap-1 flex-1 cursor-pointer">
              <item.icon size={22} className={pathname === item.path ? 'text-[#2ECC71]' : 'text-gray-300'} strokeWidth={pathname === item.path ? 3 : 2} />
              <span className={`text-[9px] font-black uppercase tracking-tighter ${pathname === item.path ? 'text-[#2ECC71]' : 'text-gray-300'}`}>{item.name}</span>
            </button>
          ))}
          <button onClick={() => setIsDrawerOpen(true)} className="flex flex-col items-center gap-1 flex-1 cursor-pointer">
            <div className={`w-5 h-5 border-2 rounded-[4px] flex items-center justify-center ${isDrawerOpen ? 'border-[#2ECC71]' : 'border-gray-300'}`}>
              <span className={`text-[10px] font-black ${isDrawerOpen ? 'text-[#2ECC71]' : 'text-gray-300'}`}>+</span>
            </div>
            <span className={`text-[9px] font-black uppercase tracking-tighter ${isDrawerOpen ? 'text-[#2ECC71]' : 'text-gray-300'}`}>Más</span>
          </button>
        </nav>

        {/* --- DRAWER MÓVIL --- */}
        <div className={`fixed inset-0 z-[100] transition-all duration-300 md:hidden ${isDrawerOpen ? 'visible' : 'invisible pointer-events-none'}`}>
          <div className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsDrawerOpen(false)} />
          <div className={`absolute right-0 top-0 bottom-0 w-[82%] bg-white transition-transform duration-500 ease-out flex flex-col ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <header className="p-6 flex items-center justify-between border-b border-gray-50">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/dashboard')}><span className="text-2xl">🎈</span><span className="text-2xl font-light">globos</span></div>
              <button onClick={() => setIsDrawerOpen(false)} className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full text-gray-400 cursor-pointer"><X size={20} /></button>
            </header>
            <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#F9FBF9]/50">
              <div className="space-y-5">
                <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] px-2">Herramientas</h3>
                <div className="grid grid-cols-3 gap-y-6 gap-x-4">
                  {extraItems.map((opt) => (
                    <button key={opt.name} onClick={() => { router.push(opt.path); setIsDrawerOpen(false); }} className="flex flex-col items-center gap-2 group transition-all cursor-pointer">
                      <div className="w-16 h-16 bg-[#F0F7F0] rounded-[1.5rem] flex items-center justify-center text-[#1A2E1A] border border-[#DFF0DF]/40 shadow-sm group-active:scale-95 transition-all">
                        <opt.icon size={26} strokeWidth={1.5} />
                      </div>
                      <span className="text-[10px] font-black text-center uppercase tracking-tighter leading-tight text-gray-500">{opt.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 bg-white border-t border-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#2ECC71] border-4 border-[#F0F7F0] flex items-center justify-center text-white font-black">{profile.initial}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black truncate">@{profile.username}</p>
                  <p className="text-[10px] font-bold text-[#2ECC71] uppercase tracking-tighter">Plan Pro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}