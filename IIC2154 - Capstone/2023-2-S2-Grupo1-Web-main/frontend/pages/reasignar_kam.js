import 'tailwindcss/tailwind.css';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import {
    flexRender,
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
} from '@tanstack/react-table';
import { 
    InformationCircleIcon,
} from '@heroicons/react/24/outline';
import Navbar from '@/app/components/Navbar';

const customModalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '35%',
        maxWidth: '800px',
    },
};

const riskObj = {30: "Alto", 20: "Medio", 10: "Bajo"};

export default function ReasignarKam() {

    const apiUrl = 'https://legitbusiness.me';
    const router = useRouter();
    const [quotes, setQuotes] = useState([]);
    const [quote, setQuote] = useState({});
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState({});
    const notBlockedUsers = users
        .filter((user) => !user.blocked)
        .map((user) => ({
            value: user.name,
            id: user.id,
            label: user.name,
            isSearchable: true,
    }));

    const handleSetQuote = (id) => {
        const found = quotes.find(row => row.id == id);
        setQuote(found);
    };

    const handleSelectedUsers = (rowId, user) => {
        setSelectedUsers((prevSelectedUsers) => ({
          ...prevSelectedUsers,
          [rowId]: user,
        }));
      };

    const columns = [
        {
            header: 'ID',
            accessorKey: 'id',
            cell: (props) => <p>{props.getValue()}</p>,
            id: 'id',
        },
        {
            header: 'Fecha ',
            accessorKey: 'startDate',
            cell: (props) => <p>{new Date(props.getValue()).toLocaleDateString()}</p>,
            enableColumnFilter: false,
        },
        {
            header: 'Cliente ',
            accessorKey: 'clientId.name',
            cell: (props) => <p>{props.getValue()}</p>,
        },
        {
            header: 'Servicio ',
            accessorKey: 'tariffId.serviceId.type',
            cell: (props) => <p>{props.getValue()}</p>,
            enableColumnFilter: false,
        },
        {
            header: 'Nombre ',
            accessorKey: 'idProyecto',
            cell: (props) => <p>{props.getValue()}</p>,
        },
        {
            header: 'Responsable',
            accessorKey: 'userId.name',
            cell: (props) => <p>{props.getValue()}</p>,
        },
        {
            header: '',
            accessorKey: 'id',
            cell: (props) => (
                <button onClick={() => handleSetQuote(props.getValue())}>
                    <InformationCircleIcon className='w-6 h-6' />
                </button>
            ),
            id: 'info',
        },
        {
            header: '',
            accessorKey: 'id',
            cell: (props) => {
                const selectedUser = selectedUsers[props.row.id];
                return (
                <Select
                    instanceId={props.getValue()}
                    placeholder='Selecciona un usuario'
                    options={notBlockedUsers}
                    value={selectedUser}
                    onChange={(e) => handleSelectedUsers(props.row.id, e)}
                />);
            },
            id: 'selectedUser',
        },
        {
            header: '',
            accessorKey: 'id',
            cell: (props) => (
                <button 
                    onClick={() => reasignQuote(props.getValue(), selectedUsers[props.row.id].id)}
                    className='flex justify-center rounded-md bg-selfpallete-300 opacity-90 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                    Reasignar
                </button>
            ),
            id: 'reasignar',
        },
    ];

    const table = useReactTable({
        data: quotes,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    useEffect(() => {
        fetchQuotes();
        fetchUsers();
        setQuote();
    }, []);

    // TODO: get current user from session
    const currentUser = 1;

    const fetchQuotes = async () => {
        try {
            const response = await fetch(`${apiUrl}/admin/quotes_to_reassign/${currentUser}`);
            const result = await response.json();
            setQuotes(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/users`);
            const result = await response.json();
            setUsers(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const reasignQuote = async (quoteId, userId) => {
        try {
            const response = await fetch(`${apiUrl}/admin/reassign_quotes_user/${currentUser}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    quoteId,
                }),
            });
            const result = await response.json();
            console.log(result);
            setSelectedUsers({});
            fetchQuotes();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="bg-gray-100 ">
            <div className=" border-slate-300 border-t-2 grid grid-cols-6 min-h-screen w-full">
                <Navbar className="col-span-1" />
                <div className='bg-gray-100 min-h-screen col-span-5'>
            <div className='mx-auto max-w-2xl text-center py-4'>
                <h2 className='text-3xl font-sans tracking-tight text-gray-900 sm:text-4xl'>Reasignar Cotizaciones</h2>
            </div>
            <main className='flex flex-col items-center justify-between py-2 mx-4 bg-white p-2 '>
                <table className='w-full'>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header =>
                                    <th key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                )}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
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
            </main>
            {quote ? (
                <Modal isOpen={true} onRequestClose={() => setQuote()} style={customModalStyle}>
                <div className='p-4'>
                    <h2 className='text-lg font-bold mb-4'>Detalles Cotización</h2>
                    <div className='flex flex-col'>
                    <div className='flex flex-row mb-2'>
                        <div className='w-2/5 font-bold'>ID</div>
                        <div className='w-3/5'>{quote.id}</div>
                    </div>
                    <div className='flex flex-row mb-2'>
                        <div className='w-2/5 font-bold'>Cliente</div>
                        <div className='w-3/5'>{quote.clientId?.name}</div>
                    </div>
                    <div className='flex flex-row mb-2'>
                        <div className='w-2/5 font-bold'>Contraparte</div>
                        <div className='w-3/5'>{quote.contactId?.name}</div>
                    </div>
                    <div className='flex flex-row mb-2'>
                        <div className='w-2/5 font-bold'>Correo</div>
                        <div className='w-3/5'>{quote.contactId?.email}</div>
                    </div>
                    <div className='flex flex-row mb-2'>
                        <div className='w-2/5 font-bold'>Responsable</div>
                        <div className='w-3/5'>{quote.userId?.name}</div>
                    </div>
                    <div className='flex flex-row mb-2'>
                        <div className='w-2/5 font-bold'>Servicio</div>
                        <div className='w-3/5'>{quote.tariffId?.serviceId.type}</div>
                    </div>
                    <div className='flex flex-row mb-2'>
                        <div className='w-2/5 font-bold'>Creado en</div>
                        <div className='w-3/5'>{new Date(quote.startDate).toLocaleDateString()}</div>
                    </div>
                    <div className='flex flex-row mb-2'>
                        <div className='w-2/5 font-bold'>Nombre</div>
                        <div className='w-3/5'>{quote.idProyecto}</div>
                    </div>
                    <div className='flex flex-row mb-2'>
                        <div className='w-2/5 font-bold'>Descuento</div>
                        <div className='w-3/5'>{quote.tariffId?.deductions[0].percentage}%</div>
                    </div>
                    <div className='flex flex-row mb-2'>
                        <div className='w-2/5 font-bold'>Tarifa total</div>
                        <div className='w-3/5'>{quote.tariffId?.priceWhitDeduction} {quote.tariffId?.currency}</div>
                    </div>
                    <div className='flex flex-row mb-2'>
                        <div className='w-2/5 font-bold'>Riesgo</div>
                        <div className='w-3/5'>{riskObj[quote.tariffId?.risk]}</div>
                    </div>
                    </div>
                </div>
                </Modal>
            ) : (
                <></>
            )}
        </div>
            </div>
        </div>
)};
