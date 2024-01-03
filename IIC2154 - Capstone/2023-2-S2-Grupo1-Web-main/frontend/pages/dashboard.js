import Image from 'next/image'
import { useEffect, useState } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid'
import Cookies from 'js-cookie';
import useCookieAuth from '@/hooks/useCookieAuth';
import { useRouter } from 'next/router';
import Navbar from '@/app/components/Navbar';
import Loading from '@/app/components/Loading';
import LinesChart from '@/app/components/LinesChart';
import BarsChart from '@/app/components/BarsChart';


export default function ManagerControl() {
    const router = useRouter();
    const { currentUser, isAdmin, handleUserLogin } = useCookieAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        handleUserLogin().then(() => {
        setIsLoading(false);
        });
    }, [handleUserLogin]);

    useEffect(() => {
        if (isLoading) {
            return;
        }
        if (!currentUser) {
            router.push('/login');
        } else if (!isAdmin) {
            router.push('/');
        }
    }, [currentUser, isLoading]);

    if (isLoading) {
        return <Loading />;
    }

    return (<div className="bg-gray-100">
     <div className=" border-slate-300 border-t-2 grid grid-cols-6 min-h-screen">
        <Navbar className="col-span-1 "/>
            <div className="bg-gray-100 col-span-5 grid  grid-rows-2">
                <div className="flex flex-row h-full gap-x-4  px-5 pt-5">
                    <div className="bg-white flex-1   outline outline-slate-200 rounded-md items-center">
                    <h3 className="mt-8 ml-5 text-2xl">Ganancias</h3>
                    <div className="flex">
                        <p className="mt-2 ml-5 text-4xl font-bold">$2,454 UF</p>
                        <p className="mt-3 ml-5">-11.4</p>
                        <ArrowDownIcon className="mt-3 h-5 w-5 text-red-500"/>
                    </div>
                    <p className="mt-2 ml-5 text-m text-gray-600">en comparación con el mes anterior</p>
                </div>
                    <div className="bg-white flex-1 outline outline-slate-200 rounded-md">
                <h3 className="mt-8 ml-5 text-2xl">Ventas</h3>
                    <div className="flex">
                        <p className="mt-2 ml-5 text-4xl font-bold">$4,454 UF</p>
                        <p className="mt-3 ml-5">-1.4</p>
                        <ArrowDownIcon className="mt-3 h-5 w-5 text-red-500"/>
                    </div>
                    <p className="mt-2 ml-5 text-m text-gray-600">en comparación con el mes anterior</p>
                </div>
                    <div className="bg-white flex-1 h-full outline outline-slate-200 rounded-md">
                <h3 className="mt-8 ml-5 text-2xl">Costos</h3>
                    <div className="flex">
                        <p className="mt-2 ml-5 text-4xl font-bold">$2,023 UF</p>
                        <p className="mt-3 ml-5">+2.1</p>
                        <ArrowUpIcon className="mt-3 h-5 w-5 text-green-500"/>
                    </div>
                    <p className="mt-2 ml-5 text-m text-gray-600">en comparación con el mes anterior</p>
                </div>
            </div>

                <div className="flex flex-row h-full gap-x-4  px-5 pt-5 pb-8">
                    <div className="bg-white flex-1   outline outline-slate-200 rounded-md items-center">
                        <LinesChart className="p-8" />
                    </div>
                    <div className="bg-white flex-1 outline outline-slate-200 rounded-md items-center">
                        <BarsChart />
                    </div>
                </div>
            





            {/* <div className="flex flex-row h-full  gap-x-4  mx-4">
                    <div className="bg-white flex-1  outline outline-slate-200 rounded-md items-center">
                    <LinesChart />
                </div>
                    <div className="bg-white flex-1  outline outline-slate-200 rounded-md items-center">
                            <LinesChart />
                </div>
            </div> */}



            {/* <div className="grid grid-cols-2 gap-x-4 h-36 mt-4 mx-4">
                <div className="bg-white h-28 outline outline-slate-200 rounded-md">
                    <h3 className="mt-4 ml-4 text-xl font-bold">Nuevos Kams</h3>
                </div>
                <div className="bg-white h-28 outline outline-slate-200 rounded-md">
                    <h3 className="mt-4 ml-4 text-xl font-bold">Última Cotización</h3>
                </div>
            </div> */}
        </div>
    </div>
 </div>)
}