import Image from 'next/image'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid'
import { UserIcon, ChartBarIcon, ClipboardDocumentListIcon, DocumentChartBarIcon, WindowIcon, EnvelopeIcon, ExclamationCircleIcon, Cog6ToothIcon, UserGroupIcon, ChatBubbleLeftEllipsisIcon, ArrowTrendingUpIcon, ReceiptPercentIcon, NoSymbolIcon, HomeIcon, UsersIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'


export default function Navbar() {
    return (
            <div className="bg-gray-100 pl-1 border">
                <h1 className="mt-4 text-3xl">Manager Control</h1>

                <h3 className="text-gray-400 mt-4 ml-4">Dashboard</h3>
                <dl className="mt-2 ml-8">
                    <dt className="flex">
                        <HomeIcon className="h-5 w-5" />
                        <Link href="/dashboard" className="ml-2">Inicio</Link>
                        {/* <a href="/dashboard" className="ml-2">Inicio</a> */}
                    </dt>
                    {/* <dt className="flex">
                        <ChartBarIcon className="h-5 w-5" />
                        <a href="#" className="ml-2">Estadísticas</a>
                    </dt>
                    <dt className="flex">
                        <ArrowTrendingUpIcon className="h-5 w-5" />
                        <a href="#" className="ml-2">Ventas</a>
                    </dt> */}
                </dl>
                <h3 className="text-gray-400 mt-4 ml-4">Menú rápido</h3>
                <dl className="mt-2 ml-8">
                    <dt className="flex">
                        <UserIcon className="h-5 w-5" />
                    <Link href="/kams" className="ml-2">Kams</Link>

                        {/* <a href="/kams" className="ml-2">Kams</a> */}
                    </dt>
                    <dt className="flex">
                        <DocumentChartBarIcon className="h-5 w-5" />
                        <Link href="/cotizaciones_admin" className="ml-2">Cotizaciones</Link>
                        {/* <a href="/cotizaciones_admin" className="ml-2">Cotizaciones</a> */}
                    </dt>
                    {/* <dt className="flex">
                        <ClipboardDocumentListIcon className="h-5 w-5" />
                        <a href="#" className="ml-2">Reportes</a>
                    </dt> */}
                    <dt className="flex">
                        <WindowIcon className="h-5 w-5" />
                        <Link href="/reasignar_kam" className="ml-2"> Reasignar KAMS </Link>
                        {/* <a href="/reasignar_kam" className="ml-2">Reasignar KAMS</a> */}
                    </dt>
                    {/* <dt className="flex">
                        <BuildingLibraryIcon className="h-5 w-5" />
                        <a href="#" className="ml-2">Clientes</a>
                    </dt>
                    <dt className="flex">
                        <UsersIcon className="h-5 w-5" />
                        <a href="#" className="ml-2">Contactos</a>
                    </dt> */}
                    <dt className="flex">
                        <ReceiptPercentIcon className="h-5 w-5" />
                    <Link href="/autorizar_descuentos" className="ml-2"> Autorizar descuentos  </Link>
                        {/* <Link href="/autorizar_descuentos" className="ml-2"> Autorizar descuentos </Link> */}
                    </dt>
                </dl>
                {/* <h3 className="text-gray-400 mt-4 ml-4">Notificaciones</h3>
                <dl className="mt-2 ml-8">
                    <dt className="flex">
                        <EnvelopeIcon className="h-5 w-5" />
                        <a href="#" className="ml-2">Mail</a>
                    </dt>
                    <dt className="flex">
                        <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
                        <a href="#" className="ml-2">Mensajes</a>
                    </dt>
                </dl> */}
                <h3 className="text-gray-400 mt-4 ml-4">Equipo</h3>
                <dl className="mt-2 ml-8">
                    {/* <dt className="flex">
                        <UserGroupIcon className="h-5 w-5" />
                        <a href="#" className="ml-2">Administración</a>
                    </dt> */}
                    <dt className="flex">
                        <NoSymbolIcon className="h-5 w-5" />
                        <Link href="/bloquear_usuarios" className="ml-2"> Bloquear usuarios </Link>
                        {/* <a href="#" className="ml-2">Bloquear usuarios</a> */}
                    </dt>
                    {/* <dt className="flex">
                        <Cog6ToothIcon className="h-5 w-5" />
                        <a href="#" className="ml-2">Ajustes</a>
                    </dt>
                    <dt className="flex">
                        <ExclamationCircleIcon className="h-5 w-5" />
                        <a href="#" className="ml-2">Reportes</a>
                    </dt> */}
                </dl>
            </div>
)
}