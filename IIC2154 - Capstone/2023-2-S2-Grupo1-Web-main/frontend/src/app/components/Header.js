"use client";
import 'tailwindcss/tailwind.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faWrench, faFileAlt, faSearch, faEnvelope, faBell, faFile, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import useCookieAuth from '@/hooks/useCookieAuth';

const Header = ({ notifications }) => {
    const isAdmin = useCookieAuth().isAdmin;
    console.log(notifications);
    const [isOpen, setIsOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    if (notifications === undefined) {
        notifications = [];
    }


    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    // Establecer el fondo blanco en todo el cuerpo de la página
    const setBodyBackground = () => {
        document.body.style.backgroundColor = 'white';
    };

    // Ejecutar la función para establecer el fondo al cargar la página
    useEffect(() => {
        setBodyBackground();
    }, []);

    return (
        <div>
            {/* Barra de navegación */}
            <div
                className={`flex-grow bg-gray-200 text-black w-0 h-screen fixed top-0 left-${isOpen ? '0' : '-60'} overflow-x-hidden transition-all duration-300 ${isOpen ? 'w-60' : ''}`}
                style={{ zIndex: 1000 }} // Asegura que la barra de navegación esté sobre otros elementos
            >
                {isOpen && (
                    <button
                        onClick={closeSidebar}
                        className="bg-white text-black border-none rounded-full p-2 fixed top-6 left-6 hover:bg-gray-300 focus:outline-none z-10"
                    >
                        X
                    </button>
                )}

                <Link href="/menu" onClick={closeSidebar} className="block py-2 px-6 text-black hover:text-gray-300 flex items-center" style={{ marginTop: '70px' }}>
                    <FontAwesomeIcon icon={faHome} className="mr-2" /> Inicio
                </Link>
                <Link href="/cotizacion" onClick={closeSidebar}  className="block py-4 px-6 text-black hover:text-gray-300 flex items-center">
                    <FontAwesomeIcon icon={faFile} className="mr-2" /> Realizar Cotización
                </Link>
                <Link href="/historial_cotizaciones" onClick={closeSidebar} className="block py-4 px-6 text-black hover:text-gray-300 flex items-center">
                    <FontAwesomeIcon icon={faWrench} className="mr-2" /> Historial de Cotizaciones
                </Link>
                { isAdmin && (
                <Link href="/dashboard" onClick={closeSidebar} className="block py-4 px-6 text-black hover:text-gray-300 flex items-center">
                    <FontAwesomeIcon icon={faWrench} className="mr-2" /> Manager Control
                </Link>

                )}
                {/* <Link href="#" onClick={closeSidebar} className="block py-4 px-6 text-black hover:text-gray-300 flex items-center">
                    <FontAwesomeIcon icon={faFileAlt} className="mr-2" /> Ayuda
                </Link> */}
                <Link href="/auth/logout" className="block py-4 px-6 text-black hover:text-gray-300 flex items-center">
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className="mr-2" /> Logout
                </Link>

            </div>

            {/* Barra superior */}
            <div className="bg-white h-16 flex items-center justify-between" style={{ zIndex: 999 }}> {/* Z-index ligeramente inferior */}
                {/* Botón para abrir/cerrar la barra de navegación */}
                <button
                    onClick={toggleSidebar}
                    className={`bg-gray-800 text-white border-none rounded-full p-2 ml-4 hover:bg-gray-300 focus:outline-none`}
                >
                    {isOpen ? '<<' : '>>'}
                </button>

                {/* Barra de búsqueda */}
                <div className="w-1/3 text-center flex items-center bg-white rounded-full py-2 px-4 border border-gray-300">
                    <FontAwesomeIcon icon={faSearch} className="text-black mr-2" />
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="bg-transparent text-black border-none outline-none flex-grow"
                    />
                    <button className="bg-transparent text-black border-none outline-none hover:bg-gray-300">
                        Buscar
                    </button>
                </div> */}

                <div className="flex items-center relative"> 
                    <div className="relative mx-2">
                        <FontAwesomeIcon icon={faEnvelope} onClick={handleEnvelopeClick} className="text-black text-2xl hover:text-gray-300 cursor-pointer" />
                        {notifications.length > 0 && (
                            <span className="absolute bottom-0 right-4 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                        )}
                    </div>
                    {/* <FontAwesomeIcon icon={faBell} className="text-black text-2xl mx-2 hover:text-gray-300 cursor-pointer" /> */}

                    {showNotifications && (
                        <div className="absolute top-16 right-4 bg-white rounded-lg shadow-lg p-4 w-[40vw] z-50 max-h-[60vh] overflow-y-auto">
                            {notifications.length === 0 ? (
                                <p className="text-gray-600">No hay notificaciones</p>
                            ) : (
                                <ul className="divide-y divide-gray-200">
                                    {notifications.map((notification, index) => (
                                         <div key={index} className="notification flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                                            <FontAwesomeIcon icon={faBell} className="text-gray-410 text-xs"/>
                                            <span className="ml-2">{notification}</span>
                                        </div>
                        
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}

               </div>
           </div>
       </div>
   );
};

export default Navbar;