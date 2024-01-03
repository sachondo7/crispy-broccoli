"use client"
import 'tailwindcss/tailwind.css'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';


export default function ViewQ({ params }) {

    const apiUrl = "https://legitbusiness.me"
    const router = useRouter();


    const [code, setCode] = useState("");
    const [client, setClient] = useState("");
    const [quotes, setQuotes] = useState("");



    const fetchData = async () => {
        try {
            let id = router.query.id;
            //console.log(id);
            const response = await fetch(`${apiUrl}/api/users/${id}`);
            const result = await response.json();
            //console.log(result);
            
            setCode(result.id);
            setClient(result.name);
            setQuotes(result.quotes);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    

    function calcularPromedio(quotes) {
        if (Array.isArray(quotes) && quotes.length > 0) {
            let sum = 0;
            for (let i = 0; i < quotes.length; i++) {
                if (quotes[i].tariffId != null){
                    sum = sum + quotes[i].tariffId.priceWhitDeduction;
                }
            }     

            return (sum / quotes.length).toFixed(2)
        } else {
          return 0; // O un valor predeterminado que desees usar
        }
      }

      useEffect(() => {
          if (router.isReady) {
                fetchData();
            }

      }, [router.isReady]);
    
    return (
        <div className="bg-gray-100  ">
            <div className=" border-slate-300 border-t-2 grid grid-cols-5 min-h-screen w-full">
                <Navbar className="col-span-1" />
            <div className="col-span-4 bg-gray-100">
                <div className="px-4 py-12 sm:px-0 ">
            <h3 className="text-3xl text-center font-semibold leading-7 text-gray-900">Cotización de Usuario</h3>
        </div>
        <div className="mt-6 px-48 justify-center border-t border-gray-100">
            <dl className="divide-y divide-gray-300">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">ID</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{code}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Nombre</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{client}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Numero Cotizaciones</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{quotes.length}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Promedio Precio Cotizaciones (UF)</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{calcularPromedio(quotes)}</dd>
                </div>

                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Cotizaciones</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <button
                        onClick={() => router.push(`/table/${code}`)} 
                        className='px-6 mt-1 bg-selfpallete-300 text-white h-10 rounded-md hover:bg-blue-300 sm:col-span-2 sm:mt-0 inline-block'
                        >
                           Ver Tabla   
                        </button>
                    </dd>
                </div>

                
            </dl>
            
        </div>
        <div className="px-4 py-6 flex justify-center">
                    <div></div>
                    <button
                        onClick={() => router.back()} 
                        className='bg-selfpallete-300 text-white h-10 rounded-md hover:bg-blue-300 px-4'>
                            Volver
                    </button>
                    <div></div>
                </div>
        
                </div>
    </div>
        </div>
    )
}