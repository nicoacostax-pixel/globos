'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Hash } from 'lucide-react';
// Importamos los iconos de tarjetas para mayor realismo
import { FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa';

export default function SubscriberStart() {
  const router = useRouter();
  
  const colors = {
    forest: "#1A2E1A",
    emerald: "#2ECC71",
    emeraldShadow: "rgba(46, 204, 113, 0.12)",
    borderDarker: "#E2E8F0",
    bgLight: "#F9FBF9",
    placeholderOscuro: "#A1A1A1",
  };

  const inputStyles = "w-full p-4 bg-white border rounded-2xl outline-none focus:border-[#2ECC71] transition-all font-medium text-sm";

  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-6 pt-20 bg-[#F9FBF9] font-sans text-[#1A2E1A]">
      
      {/* Barra de progreso al 100% */}
      <div className="w-full max-w-md mb-12 px-4">
        <div className="h-1.5 w-full bg-gray-200/50 rounded-full overflow-hidden">
          <div className="h-full bg-[#2ECC71] w-full transition-all duration-700 ease-out"></div>
        </div>
      </div>

      {/* Banner de Prueba Gratuita */}
      <div className="w-full max-w-md bg-[#EEF2FF] rounded-[2rem] p-8 text-center mb-10 shadow-sm border border-blue-50">
        <h2 className="text-xl font-bold mb-2">Tu tienda funciona gratis hasta el 4 de mayo</h2>
        <p className="text-sm font-medium text-gray-600">Cancela en cualquier momento 💝</p>
      </div>

      <div className="w-full max-w-md px-4 space-y-6">
        <h3 className="text-xl font-black mb-4">Método de Pago</h3>

        {/* Formulario de Tarjeta */}
        <div className="space-y-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Número de tarjeta" 
              className={inputStyles}
              style={{ borderColor: colors.borderDarker }}
            />
            {/* Iconos de tarjetas reales: Visa, Mastercard, Amex */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2 items-center text-gray-400">
              <FaCcVisa size={22} className="hover:text-[#1A1F71] transition-colors" title="Visa" />
              <FaCcMastercard size={22} className="hover:text-[#EB001B] transition-colors" title="Mastercard" />
              <FaCcAmex size={22} className="hover:text-[#0070D2] transition-colors" title="American Express" />
            </div>
          </div>

          <div className="flex gap-4">
            <input 
              type="text" 
              placeholder="MM / YY" 
              className={inputStyles}
              style={{ borderColor: colors.borderDarker }}
            />
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="CVC" 
                className={inputStyles}
                style={{ borderColor: colors.borderDarker }}
              />
              <Hash size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Términos y Condiciones */}
        <div className="flex items-start gap-3 pt-4">
          <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300 accent-[#2ECC71]" />
          <p className="text-xs font-medium leading-relaxed text-gray-500">
            He leído y acepto los <span className="text-[#2ECC71] underline cursor-pointer">Términos de Servicio</span> y la <span className="text-[#2ECC71] underline cursor-pointer">Política de Privacidad</span>.
          </p>
        </div>

        {/* Botón Final */}
        <div className="pt-6">
          <button 
            className="w-full py-5 rounded-full font-bold text-lg bg-gray-100 text-gray-400 transition-all cursor-not-allowed"
          >
            Empieza tus 14 días de prueba gratis
          </button>
          
          <div className="flex items-center justify-center gap-2 mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <Lock size={12} /> Pago Seguro Encriptado
          </div>
        </div>
      </div>
    </div>
  );
}