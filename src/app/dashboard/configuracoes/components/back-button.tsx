'use client'

import { CircleChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function BackButton() {
  return (
    <Link href={'/dashboard'} className="rounded-full">
      <CircleChevronLeft className="w-9 h-9 text-white" />
    </Link>
  );
}
