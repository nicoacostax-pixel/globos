'use client'

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Home, Store, Wallet, BarChart3, 
  Users, Heart, Share2, Calendar, 
  MessageCircle, Mail, Send, Plus, 
  Settings, Copy, X, Search, Filter,
  MoreHorizontal, MailQuestion, UserPlus
} from 'lucide-react';

export default function ClientesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
    { name: 'Appointments', icon: Calendar, path: '/appointments' },
    { name: 'Referrals', icon: MessageCircle, path: '/referrals' },
    { name: 'Email Flows', icon: Mail, path: '/emails' },
    { name: 'AutoDM', icon: Send, path: '/autodm' },
  ];

  const clientes = [
    { name: 'Ana Martínez', email: 'ana.mtz@mail.com', tag: 'Alumno', date: '22 Abr 2026' },
    { name: 'Carlos Ruíz', email: 'cruiz@pro.com', tag: 'Lead', date: '21 Abr 2026' },
    { name: 'Lucía Fernández', email: 'lucia.fer@gmail.com', tag: 'VIP', date: '20 Abr 2026' },
    { name: 'Roberto Gómez', email: 'rob.g@outlook.com', tag: 'Alumno', date: '19 Abr 2026' },
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
          <h1 className="text-xl font-black">Clientes</h1>
          <div className="flex items-center gap-3 bg-[#F0F7F0] px-4 py-2 rounded-full border border-[#DFF0DF]">
            <span className="text-xs font-bold text-[#2ECC71] font-mono">{profile.url}</span>
            <Copy size={14} className="text-[#2ECC71] cursor-pointer hover:opacity-70" onClick={() => navigator.clipboard.writeText(profile.url)} />
          </div>
        </header>

        {/* ÁREA DE CONTENIDO */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 pb-32 md:pb-10 max-w-7xl mx-auto w-full">
          
          {/* BARRA DE ACCIÓN Y BÚSQUEDA */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                type="text" 
                placeholder="Buscar por nombre o email..."
                className="w-full pl-12 pr-4 py-4 bg-[#F9FBF9] border border-[#DFF0DF] rounded-2xl outline-none focus:border-[#2ECC71] transition-all font-bold text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-white border border-[#DFF0DF] rounded-2xl font-black text-xs uppercase tracking-wider hover:bg-[#F9FBF9] cursor-pointer">
                <Filter size={16} /> Filtros
              </button>
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-[#2ECC71] text-white rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg shadow-[#2ecc71]/20 hover:bg-[#27ae60] cursor-pointer">
                <UserPlus size={16} /> Nuevo
              </button>
            </div>
          </div>

          {/* LISTA DE CLIENTES */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden">
            <div className="hidden md:grid grid-cols-4 px-8 py-5 bg-[#F9FBF9] border-b border-[#DFF0DF] text-[10px] font-black uppercase tracking-widest text-gray-400">
              <span>Cliente</span>
              <span>Estado</span>
              <span>Fecha de Registro</span>
              <span className="text-right">Acciones</span>
            </div>

            <div className="divide-y divide-gray-50">
              {clientes.map((cliente, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-4 px-8 py-6 items-center gap-4 hover:bg-[#F9FBF9]/50 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#DFF0DF] flex items-center justify-center font-black text-[#1A2E1A] text-xs">
                      {cliente.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-sm text-[#1A2E1A]">{cliente.name}</p>
                      <p className="text-xs font-medium text-gray-400">{cliente.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex md:block">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                      cliente.tag === 'Alumno' ? 'bg-[#DFF0DF] text-[#1A2E1A]' : 
                      cliente.tag === 'VIP' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {cliente.tag}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-gray-400">
                    {cliente.date}
                  </div>

                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-[#DFF0DF] rounded-xl text-[#2ECC71] transition-colors cursor-pointer">
                      <Mail size={18} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-xl text-gray-300 transition-colors cursor-pointer">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* EMPTY STATE (Si no hay resultados) */}
          {clientes.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-20 h-20 bg-[#F0F7F0] rounded-full flex items-center justify-center mb-6">
                <Users size={32} className="text-[#2ECC71]" />
              </div>
              <h3 className="text-lg font-black text-[#1A2E1A]">No tienes clientes aún</h3>
              <p className="text-sm font-bold text-gray-400">Comparte tu enlace para empezar a recibir leads.</p>
            </div>
          )}
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