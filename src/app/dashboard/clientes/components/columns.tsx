"use client";

import {
  formatDate,
  formatCurrency,
  formatPhoneNumber,
} from "@/utils/formatUtils";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'
import { ColumnDef } from "@tanstack/react-table";
import { DropdownClient } from "./dropdown_client";

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export type Contrato = {
  id: number;
  id_client: number;
  nome: string;
  email: string;
  telefone: number;
  dt_contrato: Date;
  vl_total: number;
  vl_desconto: number;
  vl_total_desconto: number;
  rota: string;
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
    header: "Telefone",
    cell: ({ getValue }) => {
      return formatPhoneNumber(getValue<number>());
    },
  },
  {
    accessorKey: "rota",
    header: "Rota",
  },
  {
    accessorKey: "dt_contrato",
    header: "Data do Contrato",
    cell: ({ getValue }) => {
      return dayjs().to(getValue<string>());
    },
  },
  {
    accessorKey: "vl_total",
    header: "Valor total",
    cell: ({ getValue }) => formatCurrency(getValue<number>()),
  },
  {
    accessorKey: "vl_desconto",
    header: "Desconto",
    cell: ({ getValue }) => {
      return getValue<number>()
        ? formatCurrency(getValue<number>())
        : "Sem Desconto";
    },
  },
  {
    accessorKey: "vl_total_desconto",
    header: () => (
      <div className="whitespace-pre-line">Valor total com desconto</div>
    ),
    cell: ({ getValue }) => formatCurrency(getValue<number>()),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id_client;
      return <DropdownClient id_client={id} />;
    },
  },
];
