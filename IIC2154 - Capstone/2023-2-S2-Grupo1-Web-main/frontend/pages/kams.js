import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import 'tailwindcss/tailwind.css';
import { useState, useEffect, useMemo, useCallback } from 'react'
import {
    ArrowsUpDownIcon,
    ArrowDownIcon,
    ArrowUpIcon,
} from '@heroicons/react/24/outline';

import { useRouter } from 'next/router';
import Navbar from '@/app/components/Navbar';


export default function KAMS() {
    const apiUrl = "https://legitbusiness.me"
    const [data, setData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            try {
                await fetchProfiles();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const fetchProfiles = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/users`);
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const columns = [
        {
            header: 'ID',
            accessorKey: "id",
            sortable: true,
            cell: ({ row }) => String(row.original.id),
        }, {
            header: 'Nombre',
            accessorKey: "name",
            sortable: true,
            cell: ({ row }) => String(row.original.name),
        }, {
            header: 'Correo',
            accessorKey: "email",
            sortable: true,
            cell: ({ row }) => String(row.original.email),
        }
    ]

    const [sorting, setSorting] = useState([])
    const [filtering, setFiltering] = useState('')

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
    })
    return (
        <div className="bg-gray-100  ">
            <div className=" border-slate-300 border-t-2 grid grid-cols-6 min-h-screen w-full">
                <Navbar className="col-span-1" />
                <div className='bg-gray-100 min-h-screen min-w-screen col-span-5'>
            <div className="mx-auto max-w-2xl text-center py-4">
                <h2 className="text-3xl font-sans tracking-tight text-gray-900 sm:text-4xl">Tabla de Usuario</h2>
            </div>
            <main className="flex flex-col items-center justify-between  mx-4 bg-white p-2">
                <div className="container mx-auto bg-white mt-10 mb-16">
                    <div className="container mx-auto bg-white mt-10 mb-16 flex items-center">
                        <p className="font-sans tracking-tight text-black font-semibold mr-2">Filtrar por nombre:</p>
                        <input
                            type='text'
                            value={filtering}
                            onChange={e => setFiltering(e.target.value)}
                            className='block rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            placeholder="Buscar"
                        />
                    </div>
                    <table className='min-w-full'>
                        <thead className='border-b-gray-800 border-b-2 font-sans'>
                            {table.getHeaderGroups().map(HeaderGroup => (
                                <tr key={HeaderGroup.id} className='text-gray-800 text-center'>
                                    {HeaderGroup.headers.map(header =>
                                        <th key={header.id} onClick={header.column.getToggleSortingHandler()} className="py-3 px-4 font-semibold text-sm cursor-pointer">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {header.column.getCanSort() && ({
                                                asc: <ArrowDownIcon className='h-4 inline' />,
                                                desc: <ArrowUpIcon className='h-4 inline' />
                                            }[header.column.getIsSorted()] ??
                                                <ArrowsUpDownIcon className='h-4 inline' />
                                            )}
                                        </th>)}
                                    <th className="py-3 px-4 font-semibold text-sm">
                                        Acciones
                                    </th>
                                </tr>
                            )
                            )}
                        </thead>
                        <tbody className='text-gray-800 border-b-gray-600 border-b-2 font-sans'>
                            {table.getRowModel().rows.map(row => (
                                <tr key={row.id} className="text-center py-3 px-4 border-b-gray-200 border-b-2">
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                    <td className='grid grid-cols-1 gap-2 content-center justify-center my-1 mx-2'>
                                        <button
                                            type='button'
                                            onClick={() => router.push(`/stats/${data[row.id]["id"]}`)}
                                            className="flex w-full justify-center rounded-md bg-selfpallete-300 opacity-90 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                            Cotizaciones
                                        </button>
                                    </td>
                                </tr>
                            )
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
            </div>
        </div>
    )
}

