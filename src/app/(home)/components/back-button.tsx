'use client'

import { usePathname } from 'next/navigation';
import { CircleChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function BackButton() {
  const router = usePathname();

  if (router !== '/register') {
    return null;
  }

  return (
    <Link href={'/'} className="absolute top-4 left-4  p-2 rounded-full shadow-lg">
      <CircleChevronLeft className="w-6 h-6 text-white" />
    </Link>
  );
}
