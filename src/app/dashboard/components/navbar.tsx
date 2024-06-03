'use client'
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { MapPin, User, Bus, Settings, LogOut } from 'lucide-react';

export const Navbar = () => {
  const { signOut } = useAuth();

  return (
    <div className="bg-[#008B85] text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">UniBus</h1>
      <nav className="flex space-x-4 items-center gap-6">
        <Link href="/dashboard/servicos" className="flex items-center hover:text-gray-300">
            <MapPin className="mr-2" /> Serviços
        </Link>
        <Link href="/dashboard/clientes" className="flex items-center hover:text-gray-300">
            <User className="mr-2" /> Clientes
        </Link>
        <Link href="/dashboard/onibus" className="flex items-center hover:text-gray-300">
            <Bus className="mr-2" /> Ônibus
        </Link>
        <Link href="/dashboard/configuracoes" className="flex items-center hover:text-gray-300">
            <Settings className="mr-2" /> Configurações
        </Link>
        <button
          onClick={signOut}
          className="flex items-center bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
        >
          <LogOut className="mr-2" /> Sair
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
