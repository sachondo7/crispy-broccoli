import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Columna 1 */}
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold text-white mb-2">Ayuda</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white">Preguntas Frecuentes</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white">Contacto</a>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 2 */}
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold text-white mb-2">Sobre Nosotros</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white">Nuestra Historia</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white">Equipo</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white">Carreras</a>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 3 */}
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold text-white mb-2">Términos Legales</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white">Términos y Condiciones</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white">Política de Privacidad</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white">Política de Cookies</a>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 4 */}

                </div>
            </div>
        </footer>
    );
};

export default Footer;