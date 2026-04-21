'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Hash, Globe } from 'lucide-react';
import { FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa';

export default function SubscriberStart() {
  const router = useRouter();
  
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [country, setCountry] = useState('MX'); // País por defecto
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const countries = [
    { code: 'MX', name: 'México', flag: '🇲🇽' },
    { code: 'US', name: 'Estados Unidos', flag: '🇺🇸' },
    { code: 'ES', name: 'España', flag: '🇪🇸' },
    { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
    { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
    { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  ];

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); 
    value = value.replace(/(\d{4})(?=\d)/g, '$1 '); 
    setCardNumber(value.substring(0, 19)); 
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.substring(0, 2) + ' / ' + value.substring(2, 4);
    }
    setExpiry(value.substring(0, 7));
  };

  const inputStyles = "w-full p-4 bg-white border rounded-2xl outline-none focus:border-[#2ECC71] transition-all font-medium text-sm appearance-none";

  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-6 pt-20 bg-[#F9FBF9] font-sans text-[#1A2E1A]">
      
      {/* Barra de progreso */}
      <div className="w-full max-w-md mb-12 px-4">
        <div className="h-1.5 w-full bg-gray-200/50 rounded-full overflow-hidden">
          <div className="h-full bg-[#2ECC71] w-full transition-all duration-700 ease-out"></div>
        </div>
      </div>

      <div className="w-full max-w-md bg-[#EEF2FF] rounded-[2rem] p-8 text-center mb-10 border border-blue-50">
        <h2 className="text-xl font-bold mb-2">Tu tienda funciona gratis hasta el 4 de mayo</h2>
        <p className="text-sm font-medium text-gray-600">Cancela en cualquier momento 💝</p>
      </div>

      <div className="w-full max-w-md px-4 space-y-6">
        <h3 className="text-xl font-black mb-4">Método de Pago</h3>

        <div className="space-y-4">
          {/* Selector de País [NUEVO] */}
          <div className="relative">
            <select 
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={inputStyles}
              style={{ borderColor: "#E2E8F0" }}
            >
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <Globe size={18} />
            </div>
          </div>

          {/* Datos de Tarjeta */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Número de tarjeta" 
              className={inputStyles}
              style={{ borderColor: "#E2E8F0" }}
              value={cardNumber}
              onChange={handleCardChange}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2 items-center text-gray-400">
              <FaCcVisa size={22} className={cardNumber.startsWith('4') ? "text-[#1A1F71]" : ""} />
              <FaCcMastercard size={22} className={cardNumber.startsWith('5') ? "text-[#EB001B]" : ""} />
              <FaCcAmex size={22} className={cardNumber.startsWith('3') ? "text-[#0070D2]" : ""} />
            </div>
          </div>

          <div className="flex gap-4">
            <input 
              type="text" 
              placeholder="MM / YY" 
              className={inputStyles}
              style={{ borderColor: "#E2E8F0" }}
              value={expiry}
              onChange={handleExpiryChange}
            />
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="CVC" 
                className={inputStyles}
                style={{ borderColor: "#E2E8F0" }}
                maxLength={4}
                value={cvc}
                onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
              />
              <Hash size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Términos y Botón */}
        <div className="flex items-start gap-3 pt-4">
          <input 
            type="checkbox" 
            checked={acceptedTerms}
            onChange={() => setAcceptedTerms(!acceptedTerms)}
            className="mt-1 w-5 h-5 rounded accent-[#2ECC71]" 
          />
          <p className="text-xs font-medium text-gray-500">
            He leído y acepto los <span className="text-[#2ECC71] underline cursor-pointer">Términos de Servicio</span> y la <span className="text-[#2ECC71] underline cursor-pointer">Política de Privacidad</span>.
          </p>
        </div>

        <div className="pt-6">
          <button 
            disabled={!acceptedTerms || cardNumber.length < 19}
            className={`w-full py-5 rounded-full font-bold text-lg transition-all ${
              acceptedTerms && cardNumber.length >= 19 
              ? "bg-[#2ECC71] text-[#1A2E1A] shadow-lg" 
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Comenzar prueba de 14 días
          </button>
          <div className="flex items-center justify-center gap-2 mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <Lock size={12} /> Pago Seguro Encriptado
          </div>
        </div>
      </div>
    </div>
  );
}