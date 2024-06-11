"use client";

import { formatDate, formatCurrency, formatPhoneNumber } from "@/utils/formatUtils";
import { ColumnDef } from "@tanstack/react-table";
import { DropdownClient } from "./dropdown_client";

export type Contrato = {
  id: number;
  nome: string;
  email: string;
  telefone: number;
  dt_contrato: Date;
  vl_total: number;
  rota: string
};

export const columns: ColumnDef<Contrato>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "telefone",
    header: 'Telefone',
    cell: ({ getValue }) => {
      return formatPhoneNumber(getValue<number>())
    }
  },
  {
    accessorKey: "rota",
    header: "Rota",
  },
  {
    accessorKey: "dt_contrato",
    header: "Data do Contrato",
    cell: ({ getValue }) => {
      return formatDate(getValue<string>())
    }
  },
  {
    accessorKey: "vl_total",
    header: "Valor total",
    cell: ({ getValue }) => formatCurrency(getValue<number>()),
  },
  {
    id: "actions",
    header: " ",
    cell: ({row}) => {
      const id = row.original.id;
      return <DropdownClient id_client={id} />
    },
  },
];
