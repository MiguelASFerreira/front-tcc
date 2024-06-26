"use client";

import { Separator } from "@/components/ui/separator";
import { Contrato, columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/data/api";
import { Spinner } from "@/components/spinner";

export default function ClientPage() {
  const { token } = useAuth();
  const [data, setData] = useState<Contrato[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const allContratos = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.post(
          "/empresa/contrato",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (token) {
      allContratos();
    }
  }, [token]);

  return (
    <div>
      <h1 className="text-loginColor font-bold text-xl">Clientes</h1>
      <Separator className="bg-[#008B85] h-[2px] rounded mb-5" />
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
}
