"use client";

import { Separator } from "@/components/ui/separator";
import { Veiculo, columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/data/api";
import { Spinner } from "@/components/spinner";
import { AddVeiculo } from "./components/addVeiculo";

export default function ClientPage() {
  const { token } = useAuth();
  const [data, setData] = useState<Veiculo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const allVeiculos = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get('/veiculo',
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
      allVeiculos();
    }
  }, [token]);
  return (
    <div>
      <h1 className="text-loginColor font-bold text-xl">Ônibus</h1>
      <Separator className="bg-[#008B85] h-[2px] rounded mb-5" />
      {isLoading ? (
        <div className="flex items-center justify-center ">
          <Spinner />
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-end">
            <AddVeiculo />
          </div>
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </div>
  );
}
