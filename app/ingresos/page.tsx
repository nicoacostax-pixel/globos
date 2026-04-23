'use client'

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Home, Store, Wallet, BarChart3, 
  Users, Heart, Share2, Calendar, 
  MessageCircle, Mail, Send, Plus, 
  Settings, Download, Copy, X 
} from 'lucide-react';

export default function IngresosPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const profile = { 
    username: 'gonzo',
    initial: 'G',
    url: 'globos.me/gonzo'
  };

  // Menú principal (Barra inferior móvil + Sidebar)
  const menuItems = [
    { name: 'Inicio', icon: Home, path: '/dashboard' },
    { name: 'Mi Globo', icon: Store, path: '/globos' },
    { name: 'Ingresos', icon: Wallet, path: '/ingresos' },
    { name: 'Analíticas', icon: BarChart3, path: '/analiticas' },
  ];

  // Items extra (Drawer móvil + Sidebar Desktop)
  const extraItems = [
    { name: 'Clientes', icon: Users, path: '/clientes' },
    { name: 'Comunidad', icon: Heart, path: '/comunidad' },
    { name: 'Funnels', icon: Share2, path: '/funnels' },
    { name: 'Citas', icon: Calendar, path: '/citas' },
    { name: 'Referidos', icon: MessageCircle, path: '/referidos' },
    { name: 'Email Marketing', icon: Mail, path: '/emails' },
    { name: 'AutoDM', icon: Send, path: '/autodm' },
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
          <h1 className="text-xl font-black">My Income</h1>
          <div className="flex items-center gap-3 bg-[#F0F7F0] px-4 py-2 rounded-full border border-[#DFF0DF]">
            <span className="text-xs font-bold text-[#2ECC71] font-mono">{profile.url}</span>
            <Copy size={14} className="text-[#2ECC71] cursor-pointer hover:opacity-70" onClick={() => navigator.clipboard.writeText(profile.url)} />
          </div>
        </header>

        {/* ÁREA DE SCROLL */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 pb-32 md:pb-10 max-w-7xl mx-auto w-full">
          
          {/* BALANCE SECTION */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 space-y-2">
              <span className="text-6xl md:text-8xl font-black tracking-tighter text-[#1A2E1A]">$0.00</span>
              <div className="flex flex-wrap gap-6 pt-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-gray-300">
                <span>Mar 23</span> <span>Mar 29</span> <span>Apr 04</span> <span>Apr 10</span> <span>Apr 16</span>
              </div>
            </div>

            {/* CASHOUT CARD */}
            <div className="w-full lg:w-96 bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-50">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Available for Cashout</p>
                  <p className="text-3xl font-black">$0.00</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Available Soon</p>
                  <p className="text-sm font-bold">$0.00</p>
                  <button className="text-[10px] text-[#2ECC71] font-bold hover:underline cursor-pointer">View breakdown</button>
                </div>
              </div>
              <button className="w-full py-4 bg-[#F5F5F5] text-gray-300 rounded-full font-black text-sm flex items-center justify-center gap-2 cursor-not-allowed mb-4 transition-all">
                <Plus size={18} /> Cash Out
              </button>
              <button className="w-full flex items-center justify-center gap-2 text-gray-400 font-bold text-xs hover:text-[#1A2E1A] transition-colors cursor-pointer">
                <Settings size={14} /> Settings
              </button>
            </div>
          </div>

          {/* ORDERS SECTION */}
          <div className="space-y-6 pt-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-xl font-black">Latest Orders</h2>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#F9FBF9] border border-[#DFF0DF] rounded-xl text-[11px] font-black uppercase tracking-wider text-gray-500 hover:bg-[#DFF0DF] transition-all cursor-pointer">
                <Download size={14} /> Download CSV
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {['Date & Time', 'Email', 'Product', 'Amount', 'Discount Code', 'Payment Method', 'Status'].map((filter) => (
                <button key={filter} className="flex items-center gap-1.5 px-3 py-2 bg-[#F0F7F0] text-[#1A2E1A] rounded-full text-[10px] font-bold border border-[#DFF0DF] hover:border-[#2ECC71] transition-all cursor-pointer">
                  <Plus size={14} className="text-[#2ECC71]" /> {filter}
                </button>
              ))}
            </div>

            <div className="w-full border-t border-gray-100 mt-8 pt-6">
              <div className="grid grid-cols-4 text-[10px] font-black uppercase tracking-widest text-gray-300 mb-20 px-4">
                <span>Date</span> <span>Email</span> <span className="hidden sm:inline">Product</span> <span className="text-right">Amount</span>
              </div>
              <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in-95 duration-700">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-[#DFF0DF] rounded-full flex items-center justify-center relative">
                    <span className="text-4xl">😊</span>
                    <div className="absolute -top-1 -right-1 bg-white shadow-lg rounded-full p-2">
                       <Wallet size={18} className="text-[#2ECC71]" />
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-black text-[#1A2E1A] mb-2">No Transactions Matching Filters</h3>
                <p className="text-sm font-bold text-gray-400">Update filters to find what you're looking for!</p>
              </div>
            </div>
          </div>
        </div>

        {/* FLOAT HELP BUTTON */}
        <button className="fixed bottom-24 right-6 md:bottom-10 md:right-10 w-16 h-16 md:w-20 md:h-20 bg-[#2ECC71] rounded-full shadow-2xl flex items-center justify-center text-white z-40 hover:scale-110 active:scale-95 transition-all cursor-pointer">
          <MessageCircle size={32} fill="white" />
        </button>

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