'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ArrowRight, Tag, Gift, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SubscriberPlans() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [coupon, setCoupon] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [showSecretPlan, setShowSecretPlan] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);

  const colors = {
    forest: "#1A2E1A",
    emerald: "#2ECC71",
    emeraldShadow: "rgba(46, 204, 113, 0.12)",
    borderDarker: "#E2E8F0",
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#2ECC71', '#1A2E1A', '#FFD700']
    });
  };

  const handleApplyCoupon = () => {
    if (coupon === 'XFJYUV2C') {
      setIsApplying(true);
      setTimeout(() => {
        setIsApplying(false);
        setCouponApplied(true);
        setShowSecretPlan(true);
        setSelectedPlan('secret');
        triggerConfetti();
      }, 600);
    } else {
      alert("Cupón no válido");
    }
  };

  const handlePlanSelection = (plan: string) => {
    // Si el cupón ya fue aplicado con éxito, bloqueamos el cambio de plan
    if (couponApplied) return;
    
    setSelectedPlan(plan);
    if (plan === 'yearly') triggerConfetti();
  };

  const planCardBase = "relative flex items-center p-6 border-2 rounded-[1.5rem] transition-all duration-300";

  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-6 pt-20 bg-[#F9FBF9] font-sans text-[#1A2E1A]">
      
      {/* Barra de progreso */}
      <div className="w-full max-w-md mb-16 px-4">
        <div className="h-1.5 w-full bg-gray-200/50 rounded-full overflow-hidden">
          <div className="h-full bg-[#2ECC71] w-3/4 transition-all duration-700 ease-out"></div>
        </div>
      </div>

      <div className="text-center mb-10 max-w-md mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-snug mb-6">
          Elige tu plan, empieza a <br /> ganar hoy 💸
        </h1>
      </div>

      <div className="w-full max-w-md px-4 space-y-4">
        
        {/* --- PLAN SECRETO (Aparece al aplicar cupón) --- */}
        {showSecretPlan && (
          <div 
            className={`${planCardBase} border-[#FFD700] bg-white ring-4 ring-[#FFD700]/10 animate-in fade-in zoom-in duration-500 cursor-default`}
          >
            <div className="absolute -top-3 right-8 bg-[#FFD700] text-[#1A2E1A] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
              <Gift size={10} /> PLAN ESPECIAL ACTIVADO
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 border-[#FFD700]`}>
              <div className="w-3 h-3 rounded-full bg-[#FFD700]" />
            </div>
            <div className="flex-1">
              <h3 className="font-black text-lg text-[#1A2E1A]">Gratis por un año</h3>
              <p className="text-sm text-[#2ECC71] font-bold">Acceso total · $0.00 USD</p>
            </div>
          </div>
        )}

        {/* Plan Mensual (Se bloquea si el cupón es aplicado) */}
        <div 
          onClick={() => handlePlanSelection('monthly')}
          className={`${planCardBase} ${
            selectedPlan === 'monthly' ? 'border-[#2ECC71] bg-white ring-4 ring-[#2ECC71]/10' : 'border-[#E2E8F0] bg-white opacity-60'
          } ${couponApplied ? 'opacity-30 cursor-not-allowed scale-95' : 'cursor-pointer'}`}
        >
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${selectedPlan === 'monthly' ? 'border-[#2ECC71]' : 'border-gray-300'}`}>
            {selectedPlan === 'monthly' && <div className="w-3 h-3 rounded-full bg-[#2ECC71]" />}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg">Mensual</h3>
            <p className="text-sm text-gray-500 font-medium">$0 por 14 días, luego $29/mes</p>
          </div>
          {couponApplied && <Lock size={16} className="text-gray-400 absolute right-6" />}
        </div>

        {/* Plan Anual (Se bloquea si el cupón es aplicado) */}
        <div 
          onClick={() => handlePlanSelection('yearly')}
          className={`${planCardBase} ${
            selectedPlan === 'yearly' ? 'border-[#2ECC71] bg-white ring-4 ring-[#2ECC71]/10' : 'border-[#E2E8F0] bg-white opacity-60'
          } ${couponApplied ? 'opacity-30 cursor-not-allowed scale-95' : 'cursor-pointer'}`}
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
          {couponApplied && <Lock size={16} className="text-gray-400 absolute right-6" />}
        </div>

        {/* Cupón con Botón Aplicar */}
        <div className="pt-2">
          <div 
            className="relative flex items-center gap-3 w-full p-4 bg-white border rounded-[1.2rem] transition-all duration-300 focus-within:border-[#2ECC71]"
            style={{ borderColor: couponApplied ? colors.emerald : colors.borderDarker }}
          >
            <Tag size={20} className={couponApplied ? "text-[#2ECC71]" : "text-gray-300"} />
            <input 
              type="text" 
              placeholder="Código de descuento" 
              className="flex-1 bg-transparent outline-none font-bold text-sm pr-20"
              value={coupon}
              onChange={(e) => {
                if (!couponApplied) setCoupon(e.target.value.toUpperCase());
              }}
              readOnly={couponApplied}
            />
            
            {/* BOTÓN APLICAR (Aparece cuando hay texto y no se ha aplicado aún) */}
            {!couponApplied && (
              <button
                onClick={handleApplyCoupon}
                disabled={isApplying || coupon.length === 0}
                className={`absolute right-2 px-4 py-2 rounded-[0.8rem] text-xs font-black transition-all duration-300 uppercase tracking-tighter ${
                  coupon.length > 0 
                  ? 'opacity-100 translate-x-0 scale-100' 
                  : 'opacity-0 translate-x-4 scale-90 pointer-events-none'
                }`}
                style={{ backgroundColor: colors.emerald, color: '#FFFFFF' }}
              >
                {isApplying ? '...' : 'Aplicar'}
              </button>
            )}

            {couponApplied && <Check size={18} className="text-[#2ECC71] absolute right-4" />}
          </div>
        </div>

        <p className="text-center font-bold text-sm pt-4">
          Total a pagar hoy <span className="text-[#2ECC71]">$0 🙌</span>
        </p>

        <div className="pt-4">
          <button 
            onClick={() => {
              if (couponApplied) {
                router.push('/dashboard');
              } else {
                router.push('/suscriber/start');
              }
            }}
            className="group w-full py-5 rounded-full font-bold text-xl transition-all duration-300 flex items-center justify-center gap-2 bg-[#2ECC71]"
            style={{ 
              color: "#ffffff",
              boxShadow: `0 10px 25px -5px ${colors.emeraldShadow}`
            }}
          >
            {couponApplied ? 'Ir al Dashboard' : 'Siguiente'}
            <ArrowRight className="group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}