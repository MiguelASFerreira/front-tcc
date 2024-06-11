'use client'

import { Separator } from "@/components/ui/separator";
import Image from "next/image";



export default function DashBoardPage() {
  return (
    <div>
      <h1 className="text-loginColor font-bold text-4xl">Meu Dashboard</h1>
      <Separator className="bg-[#008B85] h-[2px] rounded mb-5" />
    </div>
  );
}
