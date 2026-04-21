'use client'

import { useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Store, Wallet, BarChart3, Users, Mail, Settings, ChevronRight, Check, Globe } from 'lucide-react';

export default function UserDashboard() {
  const [currentStep, setCurrentStep] = useState(1);
  const username = "nico"; 

  const colors = {
    forest: "#1A2E1A",
    emerald: "#2ECC71",
    emeraldShadow: "rgba(46, 204, 113, 0.10)",
    bgLight: "#F9FBF9",
    borderGray: "#F1F5F9"
  };

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Mi Tienda', icon: Store },
    { name: 'Ingresos', icon: Wallet },
    { name: 'Analíticas', icon: BarChart3 },
    { name: 'Clientes', icon: Users },
    { name: 'Email Marketing', icon: Mail },
    { name: 'Ajustes', icon: Settings },
  ];

  const checklistSteps = [
    { 
      id: 1, 
      title: 'Añade tu foto de perfil', 
      desc: 'Personaliza tu tienda Globo subiendo tu mejor foto.', 
      button: 'Subir Foto',
      iconUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=128&h=128&auto=format&fit=crop&q=80' 
    },
    { id: 2, title: 'Conecta tus redes sociales', desc: 'Sincroniza todas tus cuentas para mayor visibilidad.' },
    { id: 3, title: 'Configura tu depósito directo', desc: 'Globo usa Stripe para pagar directamente a tu banco.' },
    { id: 4, title: 'Crea tu primer producto', desc: 'Vende cualquier producto digital, servicio o asesoría.' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F9FBF9] font-sans text-[#1A2E1A]">
      
      {/* Barra Lateral (Sidebar) */}
      <aside className="w-64 bg-white border-r p-6 flex flex-col justify-between" style={{ borderColor: colors.borderGray }}>
        <div>
          <h1 className="text-3xl font-black text-[#1A2E1A] mb-12 italic">Globo🎈</h1>
          <nav className="space-y-3">
            {navItems.map((item, index) => (
              <Link key={item.name} href="#" className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold transition-all ${index === 0 ? 'bg-[#2ECC71]' : 'text-gray-500 hover:bg-[#F9FBF9]'}`} style={{ color: index === 0 ? colors.forest : 'inherit' }}>
                <item.icon size={20} className={index === 0 ? '' : 'text-gray-400'} />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="text-center pt-8 border-t" style={{ borderColor: colors.borderGray }}>
          <div className="w-12 h-12 rounded-full bg-gray-200 mx-auto mb-3" />
          <p className="font-bold text-sm">globo.me/{username}</p>
          <button className="text-xs font-bold text-[#2ECC71] mt-1">Mi Cuenta ▼</button>
        </div>
      </aside>

      {/* Área de Contenido Principal */}
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="flex justify-between items-start mb-16">
          <h2 className="text-5xl font-black leading-snug tracking-tight">
            Hey <span className="text-[#2ECC71]">@{username}</span>, completa <br /> estos pasos para ganar 🎯
          </h2>
          <div className="text-right">
            <p className="font-black text-3xl text-[#2ECC71] mb-1">{currentStep - 1}/{checklistSteps.length}</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">tareas completadas</p>
          </div>
        </header>

        {/* Sección de Checklist Corregida */}
        <div className="bg-white p-10 rounded-[2.8rem] border shadow-sm space-y-4" style={{ borderColor: colors.borderGray, boxShadow: `0 15px 40px -10px ${colors.emeraldShadow}` }}>
          {checklistSteps.map(step => {
            const isExpanded = step.id === currentStep;
            const isCompleted = step.id < currentStep;

            return (
              <div key={step.id} className={`relative flex items-start p-6 rounded-2xl transition-all duration-300 ${isExpanded ? 'bg-[#F9FBF9] border-gray-100 border' : 'bg-white'}`}>
                
                {/* Indicador de paso */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 border-2 transition-colors ${isCompleted ? 'bg-[#2ECC71] border-[#2ECC71]' : (isExpanded ? 'border-[#2ECC71]' : 'border-gray-100')}`}>
                  {isCompleted ? <Check size={18} className="text-[#1A2E1A]" /> : <span className={`text-sm font-black ${isExpanded ? 'text-[#2ECC71]' : 'text-gray-300'}`}>{step.id}</span>}
                </div>

                {/* Contenido del paso */}
                <div className="flex-1 px-6">
                  {isExpanded ? (
                    <div className="flex items-center justify-between gap-8">
                      <div className="max-w-md">
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-sm font-medium text-gray-500 leading-relaxed">{step.desc}</p>
                        {step.button && (
                          <button 
                            onClick={() => setCurrentStep(prev => prev + 1)}
                            className="mt-6 px-8 py-3 rounded-xl font-bold text-sm bg-[#2ECC71] hover:shadow-lg transition-all"
                            style={{ color: colors.forest }}
                          >
                            {step.button}
                          </button>
                        )}
                      </div>
                      {step.iconUrl && (
                        <div className="hidden md:block w-32 h-32 rounded-3xl bg-white border border-gray-100 p-2 shadow-sm">
                          <img src={step.iconUrl} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between py-1">
                      <p className={`font-bold text-gray-800 ${isCompleted ? 'opacity-40' : ''}`}>{step.title}</p>
                      <ChevronRight size={18} className="text-gray-300" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}