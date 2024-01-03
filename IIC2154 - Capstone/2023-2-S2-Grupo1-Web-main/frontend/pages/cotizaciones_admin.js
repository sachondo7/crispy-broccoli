import 'tailwindcss/tailwind.css';
import Link from 'next/link';
import { useState, useEffect } from 'react'

import {
    flexRender,
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
} from '@tanstack/react-table'
import Header from '../src/app/components/Header';
import ColumnFilter from '../src/app/components/filter';

import { useRouter } from 'next/router';
import useCookieAuth from '@/hooks/useCookieAuth';

import {
    ArrowsUpDownIcon,
    ArrowDownIcon,
    ArrowUpIcon,
} from '@heroicons/react/24/outline';
import Navbar from '@/app/components/Navbar';



/*
HISTORIAL
--------------------------------
id
codigo
fecha
cliente (nombre de la empresa)
nombre de la contraparte
tipo de servicio
nombre del proyecto
costo total
*/

// Referencia paginacion:
// medium.com/@jordammendes/build-powerfull-tables-in-reactjs-with-tanstack-9d57a3a63e35

export default function Historial({ updateNotifications }) {
    const apiUrl = "https://legitbusiness.me"
    const router = useRouter();
    const columns = [
        {
            header: 'ID',
            accessorKey: 'id',
            cell: (props) => <p>{props.getValue()}</p>,
            enableGlobalFilter: false,
            enableSorting: false,
        },
        {
            header: 'Fecha Creación',
            accessorKey: 'startDate',
            cell: (props) => <p>{new Date(props.getValue()).toLocaleDateString()}</p>,
            enableGlobalFilter: false,
        },
        {
            header: 'Fecha Cierre',
            accessorKey: 'endDate',
            cell: (props) => <p>{new Date(props.getValue()).toLocaleDateString()}</p>,
            enableGlobalFilter: false,
        },
        {
            header: 'Responsable',
            accessorKey: 'userId.name',
            cell: (props) => <p>{props.getValue()}</p>,
            enableGlobalFilter: false,
        },
        {
            header: 'Cliente ',
            accessorKey: 'clientId.name',
            cell: (props) => <p>{props.getValue()}</p>,
        },
        {
            header: 'Contraparte ',
            accessorKey: 'contactId.name',
            cell: (props) => <p>{props.getValue()}</p>,
            enableGlobalFilter: false,
        },
        {
            header: 'Servicio ',
            accessorKey: 'tariffId.serviceId.type',
            cell: (props) => <p>{props.getValue()}</p>,
            enableGlobalFilter: false,
        },
        {
            header: 'Costo Total',
            accessorKey: 'tariffId.priceWhitDeduction',
            cell: (props) => <p>{props.getValue()} UF</p>,
            enableGlobalFilter: false,
        },
        {
            header: 'Acciones',
            accessorKey: 'id',
            cell: (props) => (
                <div className='grid grid-cols-1 gap-x-2 content-center justify-center mt-1 mx-2'>
                    <button
                        type='button'
                        onClick={() => router.push(`/view/${props.getValue()}`)}
                        className="flex w-full justify-center rounded-md bg-selfpallete-300 opacity-90 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Ver
                    </button>
                    {/* <button
                        type="button"
                        onClick={() => router.push(`/edit/${props.getValue()}`)}
                        className="flex w-full justify-center rounded-md bg-blue-600 opacity-90 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Editar
                    </button> */}
                </div>
            ),
            enableSorting: false,
            enableGlobalFilter: false,
        },
    ];
    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [history, setHistory] = useState([]);

    const table = useReactTable({
        data: history,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        initialState: {
            pagination: {
                pageSize: 100,
            },
        },
        state: {
            sorting,
            globalFilter,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
    });


    // useEffect(() => {
    //     fetchData();
    // }, []);
    const { currentUser, isAdmin, handleUserLogin } = useCookieAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        handleUserLogin().then(() => {
            setIsLoading(false);
        });
    }, [handleUserLogin]);


    const fetchData = async () => {
        try {
            await fetchProfiles();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (isLoading) {
            return;
        }
        fetchNotifications();
    }, [history]);



    const fetchNotifications = async () => {
        const today = new Date();
        // const upcomingNotifications = history.filter(datos => {
        //     const cotizacionDate = new Date(datos.startDate);
        //     const differenceInDays = Math.floor((today - cotizacionDate) / (1000 * 60 * 60 * 24));
        //     return differenceInDays === 0;
        // })
        //     .map(datos => `La cotización ${datos.idProyecto} vencerá en 15 días.`);
        // updateNotifications(upcomingNotifications);
        const upcomingNotifications = history.filter(datos => {
            const cotizacionDate = new Date(datos.endDate);
            cotizacionDate.setDate(cotizacionDate.getDate())
            const differenceInDays = Math.floor((cotizacionDate - today) / (1000 * 60 * 60 * 24));
            datos.differenceInDays = differenceInDays;
            return differenceInDays <= 2;
        })
            .map(datos => `La cotización ${datos.idProyecto} vencerá en ${datos.differenceInDays} días.`);
        updateNotifications(upcomingNotifications);
    }


    const fetchProfiles = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/quotes`);
            const result = await response.json();
            console.log(result);
            setHistory(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="bg-gray-100  ">
        <div className=" border-slate-300 border-t-2 grid grid-cols-6 min-h-screen w-full">
            <Navbar className="col-span-1" />
            <div className='bg-gray-100 min-h-screen col-span-5'>
            <div className="mx-auto max-w-2xl text-center py-4">
                <h2 className="text-3xl font-sans tracking-tight text-gray-900 sm:text-4xl">Cotizaciones</h2>
            </div>
            <main className="flex flex-col items-center justify-between py-2 mx-4 bg-white p-2">
                <div className="flex flex-row items-left justify-left w-full">
                    <p>Buscar por cliente: </p>
                    <input
                        type="text" value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="w-36 border shadow rounded"
                    />
                </div>
                <table className='w-full'>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) =>
                                    <th key={header.id}>
                                        {header.column.getCanSort() ? (

                                            <button
                                                type='button'
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {header.column.getCanSort() && ({
                                                    asc: <ArrowDownIcon className='h-4 inline' />,
                                                    desc: <ArrowUpIcon className='h-4 inline' />
                                                }[header.column.getIsSorted()] ??
                                                    <ArrowsUpDownIcon className='h-4 inline' />
                                                )}
                                            </button>
                                        ) : (
                                            flexRender(header.column.columnDef.header, header.getContext())
                                        )}
                                    </th>
                                )}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className='odd:bg-gray-200'>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex sm:flex-row flex-col w-full mt-8 items-center gap-2 text-xs">
                    <div className="sm:mr-auto sm:mb-0 mb-2">
                        <span className="mr-2">Items por página</span>
                        <select
                            className="border p-1 rounded w-16 border-gray-200"
                            value={table.getState().pagination.pageSize}
                            onChange={(e) => {
                                table.setPageSize(Number(e.target.value));
                            }}
                        >
                            {[10, 50, 100, 500].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <button
                            className={`${!table.getCanPreviousPage()
                                    ? 'bg-gray-100'
                                    : 'hover:bg-gray-200 hover:curstor-pointer bg-gray-100'
                                } rounded p-1`}
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="w-5 h-5">{'<<'}</span>
                        </button>
                        <button
                            className={`${!table.getCanPreviousPage()
                                    ? 'bg-gray-100'
                                    : 'hover:bg-gray-200 hover:curstor-pointer bg-gray-100'
                                } rounded p-1`}
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="w-5 h-5">{'<'}</span>
                        </button>
                        <span className="flex items-center gap-1">
                            <input
                                min={1}
                                max={table.getPageCount()}
                                type="number"
                                value={table.getState().pagination.pageIndex + 1}
                                onChange={(e) => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                    table.setPageIndex(page);
                                }}
                                className="border p-1 rounded w-10"
                            />
                            de {table.getPageCount()}
                        </span>
                        <button
                            className={`${!table.getCanNextPage()
                                    ? 'bg-gray-100'
                                    : 'hover:bg-gray-200 hover:curstor-pointer bg-gray-100'
                                } rounded p-1`}
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="w-5 h-5">{'>'}</span>
                        </button>
                        <button
                            className={`${!table.getCanNextPage()
                                    ? 'bg-gray-100'
                                    : 'hover:bg-gray-200 hover:curstor-pointer bg-gray-100'
                                } rounded p-1`}
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="w-5 h-5">{'>>'}</span>
                        </button>
                    </div>
                </div>
            </main>
        </div>
        </div>
        </div>
    )
}
