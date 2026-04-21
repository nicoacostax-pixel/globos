'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ArrowRight, Tag } from 'lucide-react';
import confetti from 'canvas-confetti'; // Asegúrate de instalarlo con: npm install canvas-confetti && npm install -D @types/canvas-confetti

export default function SubscriberPlans() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [coupon, setCoupon] = useState('');

  const colors = {
    forest: "#1A2E1A",
    emerald: "#2ECC71",
    emeraldShadow: "rgba(46, 204, 113, 0.12)",
    borderDarker: "#E2E8F0",
    placeholderOscuro: "#A1A1A1",
  };

  // Función para disparar confeti
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2ECC71', '#1A2E1A', '#FFFFFF']
    });
  };

  const handlePlanSelection = (plan: string) => {
    setSelectedPlan(plan);
    if (plan === 'yearly') {
      triggerConfetti(); // Dispara la animación al elegir el plan anual
    }
  };

  const planCardBase = "relative flex items-center p-6 cursor-pointer border-2 rounded-[1.5rem] transition-all duration-300";

  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-6 pt-20 bg-[#F9FBF9] font-sans text-[#1A2E1A]">
      
      {/* Barra de progreso al 75% */}
      <div className="w-full max-w-md mb-16 px-4">
        <div className="h-1.5 w-full bg-gray-200/50 rounded-full overflow-hidden">
          <div className="h-full bg-[#2ECC71] w-3/4 transition-all duration-700 ease-out"></div>
        </div>
      </div>

      <div className="text-center mb-10 max-w-md mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-snug mb-6">
          Elige tu plan, empieza a <br /> ganar hoy 💸
        </h1>
        
        {/* Subtítulos/Beneficios CENTRADOS */}
        <div className="flex flex-col items-center space-y-2 w-full">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
            <Check size={18} className="text-[#2ECC71] shrink-0" /> 
            <span>Ahorra cientos eligiendo Globo</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
            <Check size={18} className="text-[#2ECC71] shrink-0" /> 
            <span>Tienda todo-en-uno, fácil de configurar</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md px-4 space-y-4">
        
        {/* Plan Mensual */}
        <div 
          onClick={() => handlePlanSelection('monthly')}
          className={`${planCardBase} ${selectedPlan === 'monthly' ? 'border-[#2ECC71] bg-white ring-4 ring-[#2ECC71]/10' : 'border-[#E2E8F0] bg-white opacity-60'}`}
        >
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${selectedPlan === 'monthly' ? 'border-[#2ECC71]' : 'border-gray-300'}`}>
            {selectedPlan === 'monthly' && <div className="w-3 h-3 rounded-full bg-[#2ECC71]" />}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg">Mensual</h3>
            <p className="text-sm text-gray-500 font-medium">$0 por 14 días, luego $29/mes</p>
          </div>
        </div>

        {/* Plan Anual con etiqueta de ahorro */}
        <div 
          onClick={() => handlePlanSelection('yearly')}
          className={`${planCardBase} ${selectedPlan === 'yearly' ? 'border-[#2ECC71] bg-white ring-4 ring-[#2ECC71]/10' : 'border-[#E2E8F0] bg-white opacity-60'}`}
        >
          <div className="absolute -top-3 right-8 bg-[#A8E6CF] text-[#1A2E1A] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            AHORRA 20%
          </div>
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${selectedPlan === 'yearly' ? 'border-[#2ECC71]' : 'border-gray-200'}`}>
            {selectedPlan === 'yearly' && <div className="w-3 h-3 rounded-full bg-[#2ECC71]" />}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg">Anual</h3>
            <p className="text-sm text-gray-500 font-medium">
              $0 por 14 días, luego $300 <span className="line-through opacity-40">$360</span>/año
            </p>
          </div>
        </div>

        {/* Cupón */}
        <div className="pt-2">
          <div 
            className="flex items-center gap-3 w-full p-4 bg-white border rounded-[1.2rem] transition-all duration-300 focus-within:border-[#2ECC71]"
            style={{ borderColor: colors.borderDarker }}
          >
            <Tag size={20} className="text-gray-300 shrink-0" />
            <input 
              type="text" 
              placeholder="Código de descuento" 
              className="flex-1 bg-transparent outline-none font-bold text-sm"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value.toUpperCase())}
            />
          </div>
        </div>

        <p className="text-center font-bold text-sm pt-4">
          Total a pagar hoy $0 🙌
        </p>

        <div className="pt-4">
          <button 
            onClick={() => router.push('/suscriber/start')}
            className="group w-full py-5 rounded-full font-bold text-xl transition-all duration-300 flex items-center justify-center gap-2 bg-[#2ECC71]"
            style={{ 
              color: colors.forest,
              boxShadow: `0 10px 25px -5px ${colors.emeraldShadow}`
            }}
          >
            Siguiente
            <ArrowRight className="group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}