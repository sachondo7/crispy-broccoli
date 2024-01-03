"use client";
import 'tailwindcss/tailwind.css'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import useCookieAuth from '@/hooks/useCookieAuth';


export default function ViewQ() {

    const apiUrl = "https://legitbusiness.me"
    const router = useRouter();
    const riskObj = {"alto":30, "medio":20, "bajo":10};
    const riskObjInv = {30:"alto", 20:"medio", 10:"bajo"};

    const [showAlert, setShowAlert] = useState(false);
    const { currentUser, isAdmin, handleUserLogin } = useCookieAuth();

    const [code, setCode] = useState("");
    const [status, setStatus] = useState("");
    const [service, setService] = useState("");
    const [client, setClient] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [profile, setProfile] = useState([]);
    const [risk, setRisk] = useState("");
    const [discount, setDiscount] = useState(0);
    const [cost, setCost] = useState("");
    const [currency, setCurrency] = useState("");

    const closeAlert = () => {
        setShowAlert(false)
    };

    const confirmDelete = async () => {
        try {
            fetch((`${apiUrl}/api/quotes/${router.query.id}`), {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json', // Specify the content type as JSON
                }
            })
                .then(response => response.json())

                .catch(error => console.error('Error:', error));
        }
        catch (error) {
            console.error('Error:', error);
        }
        finally {
            // router.reload();
            router.push("/cotizaciones_admin");
        }
    };

    const fetchData = async () => {
        try {
            const { id } = router.query
            // console.log(router.query)
            const response = await fetch(`${apiUrl}/api/quotes/${id}`);
            const result = await response.json();
            setCode(result.idProyecto);
            setStatus(result.status);
            setClient(result.clientId.name);
            setContact(result.contactId.name);
            setEmail(result.contactId.email);
            if (result.tariffId) {
                setService(result.tariffId.serviceId.type);
                setProfile(result.tariffId.profiles);
                setRisk(result.tariffId.risk);
                if(result.tariffId.deductions[0]) {
                    setDiscount(result.tariffId.deductions[0].percentage);
                }
                setCost(result.tariffId.priceWhitDeduction);
                setCurrency(result.tariffId.currency);
            } else {
                setService(datos.tariffId.serviceId.type);
                setProfile(datos.tariffId.profiles);
                setRisk(datos.tariffId.risk);
                if(datos.tariffId.deductions[0]) {
                    setDiscount(datos.tariffId.deductions[0].percentage);
                }
                setCost(datos.tariffId.priceWhitDeduction);
                setCurrency(datos.tariffId.currency);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (router.isReady) {
            fetchData();
        }
    }, [router.isReady]);

    
    return <div className='bg-white'>
        <div className="px-4 py-12 sm:px-0">
            <h3 className="text-3xl text-center font-semibold leading-7 text-gray-900">Información de la Cotización</h3>
        </div>
        <div className="mt-6 px-48 justify-center border-t border-gray-100">
            <dl className="divide-y divide-gray-300">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Nombre Proyecto</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{code}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Situación</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{status}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Servicio</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{service}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Cliente</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{client}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Contraparte</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{contact}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{email}</dd>
                </div>
                <div className="px-4 pb-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                    <dd className='col-span-4'>
                        <table className="min-w-full ">
                            <thead className=''>
                                <tr>
                                    <th colSpan="4" className="text-sm font-medium leading-6 text-gray-900 py-2">
                                        Perfiles
                                    </th>
                                </tr>
                                <tr className='text-sm font-medium leading-6 text-gray-900 bg-selfpallete-400 bg-opacity-90'>
                                    <th>Rol</th>
                                    <th>Tarifa Mes</th>
                                    <th>Asignación</th>
                                    <th>Horas Hombre</th>
                                    <th>Tarifa Asignación</th>
                                </tr>
                            </thead>
                            <tbody className='text-sm font-medium leading-6 text-gray-900'>
                                {profile.length?(
                                    profile.map((obj, i) => (
                                        i % 2==0 ? (
                                            <tr className="bg-selfpallete-400 bg-opacity-10 text-left py-3 px-4 text-center " key={i}>
                                                <td>{obj.role}</td>
                                                <td>{obj.costperhour}</td>
                                                <td>{obj.hourAssignment + "%"}</td>
                                                <td>{Math.round(obj.hourAssignment / 100 * 160)}</td>

                                                <td>{Math.round(obj.costperhour*obj.hourAssignment / 100)}</td>
                                            </tr>
                                        ):(
                                            <tr className="bg-selfpallete-400 bg-opacity-5 text-left py-3 px-4 text-center" key={i}>
                                                <td>{obj.role}</td>
                                                <td>{obj.costperhour}</td>
                                                <td>{obj.hourAssignment + "%"}</td>
                                                <td>{Math.round(obj.hourAssignment / 100 * 160)}</td>

                                                <td>{Math.round(obj.costperhour *  obj.hourAssignment / 100)}</td>
                                            </tr> 
                                        ) 
                                    ))
                                ):(
                                    <tr className="bg-selfpallete-400 bg-opacity-10 text-left py-3 px-4 text-center" key={0}>
                                        <td>no data</td>
                                        <td>no data</td>
                                        <td>no data</td>
                                        <td>no data</td>
                                        <td>no data</td>
                                    </tr> 
                                )}
                            </tbody>
                        </table>
                    </dd>
               </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Riesgo</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{riskObjInv[risk]}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Descuento asociado</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{discount}%</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Tarifa Total</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{cost}{currency}</dd>
                </div>
                {isAdmin && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 justify-center sm:gap-8 sm:px-0">
                    <button
                        onClick={() => router.back()} 
                        className='bg-selfpallete-300 text-white h-10 rounded-md hover:bg-blue-300 col-span-1'>
                            Volver
                    </button>
                    <button
                        onClick={() => router.push(`/edit/${router.query.id}`)}
                        className='bg-selfpallete-400 text-white h-10 rounded-md hover:bg-blue-300 col-span-1'>
                        Editar
                    </button>
                    
                    <button
                        onClick={() => setShowAlert(true)} 
                        className='bg-red-500  text-white h-10 rounded-md hover:bg-red-300 col-span-1'>
                            Eliminar
                    </button>
                </div>
                )}
                {!isAdmin && (
                    <div className="px-4 py-6 sm:grid sm:grid-cols-2 justify-center sm:gap-8 sm:px-0">
                        <button
                            onClick={() => router.back()}
                            className='bg-selfpallete-300 text-white h-10 rounded-md hover:bg-blue-300 '>
                            Volver
                        </button>
                        <button
                            onClick={() => router.push(`/edit/${router.query.id}`)}
                            className='bg-selfpallete-400 text-white h-10 rounded-md hover:bg-blue-300 '>
                            Editar
                        </button>
                    </div>
                )}

            </dl>
        </div>
        {showAlert && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeAlert}></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-top sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <p className="text-x mb-2">¿Estás seguro de eliminar esta cotización?.</p>
                            <div className='flex justify-between'>
                                <button
                                    className="top-4 right-4 text-gray-500 hover:text-gray-700"
                                    onClick={async () => {confirmDelete()}}>
                                    Eliminar
                                </button>
                                <button
                                    className="top-4 left-4 text-gray-500 hover:text-gray-700"
                                    onClick={closeAlert}>
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
}