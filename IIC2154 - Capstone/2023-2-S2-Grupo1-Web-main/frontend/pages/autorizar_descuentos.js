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
        width: '45%',
        maxWidth: '800px',
    },
};

const riskObj = {30: "Alto", 20: "Medio", 10: "Bajo"};

// Modal.setAppElement('#root');

export default function Authorize() {

    const apiUrl = 'https://legitbusiness.me';
    const router = useRouter();
    const [quotes, setQuotes] = useState([]);
    const [quote, setQuote] = useState({});
    // const discounts = ["0%", "1%", "2%", "3%", "4%", "5%", "6%", "7%", "8%", "9%", "10%", "11%", "12%", "13%", "14%", "15%"];
    const discounts = ["0%",'1%', '2%', '3%', '4%', '5%', '6%', '7%', '8%', '9%', '10%', '11%', '12%', '13%', '14%', '15%', '16%', '17%', '18%', '19%', '20%', '21%', '22%', '23%', '24%', '25%', '26%', '27%', '28%', '29%', '30%', '31%', '32%', '33%', '34%', '35%', '36%', '37%', '38%', '39%', '40%', '41%', '42%', '43%', '44%', '45%', '46%', '47%', '48%', '49%', '50%', '51%', '52%', '53%', '54%', '55%', '56%', '57%', '58%', '59%', '60%', '61%', '62%', '63%', '64%', '65%', '66%', '67%', '68%', '69%', '70%', '71%', '72%', '73%', '74%', '75%', '76%', '77%', '78%', '79%', '80%', '81%', '82%', '83%', '84%', '85%', '86%', '87%', '88%', '89%', '90%', '91%', '92%', '93%', '94%', '95%', '96%', '97%', '98%', '99%', '100%']

    const [selectedDiscounts, setSelectedDiscounts] = useState({});
    const allDiscounts = discounts.map((onediscount, index) => ({
        value: index,
        id: index,
        label: onediscount,
        isSearchable: true,
    }));

    const handleSetQuote = (id) => {
        const found = quotes.find(row => row.id == id);
        setQuote(found);
    };

    
    const handleSelectedDeductions = (rowId, deduction) => {
        const updateDiscounts = [...selectedDiscounts];
        updateDiscounts[rowId] = deduction
        setSelectedDiscounts(updateDiscounts);
        console.log(selectedDiscounts);
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
                return (
                    <Select
                    instanceId={props.getValue()}
                    options={allDiscounts}
                    value={selectedDiscounts[props.row.id]}
                    onChange={(e) => handleSelectedDeductions(props.row.id, e)}
                />);
            },
            id: 'selectedDiscount',
        },
        {
            header: '',
            accessorKey: 'id',
            cell: (props) => (
                <button 
                onClick={() => acceptDeductions(props.getValue(), selectedDiscounts[props.row.id].id)}
                className='flex justify-center rounded-md bg-green-700 opacity-90 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                    Aceptar
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
        setQuote();
    }, []);
    
    // TODO: get current user from session
    const currentUser = 1;
    
    const fetchQuotes = async () => {
        try {
            const response = await fetch(`${apiUrl}/admin/accept_discounts/${currentUser}`);
            const result = await response.json();
            setQuotes(result);
            const oldDeductions = [];
            result.map((obj, index) => (
                oldDeductions.push(
                    {
                        value: obj.tariffId.deductions[0].percentage,
                        id: obj.tariffId.deductions[0].percentage,
                        label: obj.tariffId.deductions[0].percentage + "%",
                        isSearchable: true,
                    }
                    )
                    ));
                    //console.log(oldDeductions);
                    setSelectedDiscounts(oldDeductions);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
            
    const acceptDeductions = async (quoteId, deductionValue) => {
        // console.log(quoteId);
        // console.log(deductionValue);
        
        const found = quotes.find(obj => obj.id == quoteId);
        const idDeduction = found.tariffId.deductions[0].id;
        const oldPercentage = found.tariffId.deductions[0].percentage;
        
        const data = {
            "authorization":true,
        }
        if (deductionValue != oldPercentage)
            data["percentage"] = deductionValue;
        try {
            // console.log(data)
            const response = await fetch((`${apiUrl}/admin/edit_deductions/${currentUser}/${idDeduction}`), {
                    method: 'POST',
                    headers: {
                            'Content-Type': 'application/json', // Specify the content type as JSON
                        },
                        body: JSON.stringify(data) // Convert the data to JSON format
                    });
            const result = await response.json();
            // console.log(result); 
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            router.reload();
        }
    };

    return (
        <div className="bg-gray-100 ">
            <div className=" border-slate-300 border-t-2 grid grid-cols-6 min-h-screen w-full">
                <Navbar className="col-span-1" />
                <div
                id='root' 
                className='bg-gray-100 min-h-screen col-span-5'>
            <div className='mx-auto max-w-2xl text-center py-4'>
                <h2 className='text-3xl font-sans tracking-tight text-gray-900 sm:text-4xl'>Autorizar Descuentos</h2>
            </div>
            <main className='flex flex-col items-center justify-between py-2 mx-4 bg-white p-2'>
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
