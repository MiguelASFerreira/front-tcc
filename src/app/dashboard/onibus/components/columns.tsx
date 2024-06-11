"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DropdownVeiculo } from "./dropdown-veiculo";

export type Veiculo = {
  id: number;
  nome: string;
  placa: string;
  capacidade: number;
  adaptavel: number;
};

export const columns: ColumnDef<Veiculo>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "placa",
    header: "Nº da Placa",
  },
  {
    accessorKey: "capacidade",
    header: "Capacidade",

  },
  {
    accessorKey: "adaptavel",
    header: "Adaptável",
    cell: ({ getValue }) => {
      return getValue<boolean>() ? 'Adaptável' : 'Não é Adaptável'
    }
  },
  {
    accessorKey: 'actions',
    header: ' ',
    cell: ({row}) => {
      const id = row.original.id;
      return <DropdownVeiculo veiculoId={id}/>
    }
  }
];
