"use client"
import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

type Client = {
id: string;
name: string;
address: string;
city_state_zip: string;
social_security_number: string;
email: string;
telephone: string;
portfolio_value: number;
};  
  
export const columns: ColumnDef<Client>[] = [
{
    accessorKey: "name",
    header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
        },
    cell: ({ row }) => (
    <div className="capitalize">{row.getValue("name")}</div>
    ),
},
{
    accessorKey: "email",
    header: ({ column }) => {
    return (
        <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
},
{
    accessorKey: "city_state_zip",
    header: ({ column }) => {
    return (
        <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
        City, State, Zip
        <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("city_state_zip")}</div>,
},
{
    accessorKey: "portfolio_value",
    header: ({ column }) => (
    <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
        Portfolio Value
        <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
    ),
    // Format the number as currency for display
    cell: ({ row }) => {
    const value = row.getValue('portfolio_value') as number;
    const formattedValue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        // If you don't want to show cents
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);

    return <div>{formattedValue}</div>;
    },
},
]