import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' },
]

export default function Home() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="bg-white h-full">

            <div className="relative isolate pt-2 pb-20">
                <div className="mx-auto max-w-2xl py-5">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center bg-white">
                        {/* <img className="h-12" src="" alt="Workflow" /> */}
                        <img className="h-160 w-90" src="https://images.unsplash.com/photo-1572021335469-31706a17aaef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVvcGxlJTIwd29ya2luZ3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80" alt="" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Bienvenido a la Pagina de Cotizaciones
                        </h1>
                        {/* <p className="mt-6 text-lg leading-8 text-gray-600">
                            Esta pagina es un esfuerzo por acelerar el proceso de cotizaciones, buscando que sea mas facil y rapido para nuestros clientes.
                        </p> */}
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                href="/cotizacion"
                                className="rounded-md bg-selfpallete-300 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Realizar Cotización
                            </Link>
                            <Link
                                href="/historial_cotizaciones"
                                className="text-sm font-semibold leading-6 text-gray-900"
                            >
                                Ver Cotizaciones Realizadas
                            </Link>

                            {/* <a href="/historial_cotizaciones" className="text-sm font-semibold leading-6 text-gray-900">
                                Ver Cotizaciones Realizadas <span aria-hidden="true">→</span>
                            </a> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
