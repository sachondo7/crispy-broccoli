import React from 'react';

const Tabla = () => {
  return (
    <div className="container mx-auto">
      <table className="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="text-left py-3 px-4 text-black uppercase font-semibold text-sm">Fecha</th>
            <th className="text-left py-3 px-4 text-black uppercase font-semibold text-sm">Cliente</th>
            <th className="text-left py-3 px-4 text-black uppercase font-semibold text-sm">Proyecto</th>
            <th className="text-left py-3 px-4 text-black uppercase font-semibold text-sm">Costo</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-gray-200">
            <td className="text-left text-blue-800 py-3 px-4">16/02/2022</td>
            <td className="text-left text-blue-800 py-3 px-4">Tomas Neumann</td>
            <td className="text-left text-blue-800 py-3 px-4">Astroanalisis</td>
            <td className="text-left text-blue-800 py-3 px-4">$400.001</td>
          </tr>
          <tr className="border-t border-gray-200">
            <td className="text-left text-blue-800 py-3 px-4">30/05/2023</td>
            <td className="text-left text-blue-800 py-3 px-4">Manuel Rodriguez</td>
            <td className="text-left text-blue-800 py-3 px-4">Conteo de Datos</td>
            <td className="text-left text-blue-800 py-3 px-4">$100.000</td>
          </tr>
          <tr className="border-t border-gray-200">
            <td className="text-left text-blue-800 py-3 px-4">11/10/2023</td>
            <td className="text-left text-blue-800 py-3 px-4">Mathias Madsen</td>
            <td className="text-left text-blue-800 py-3 px-4">Pagina Veterinaria</td>
            <td className="text-left text-blue-800 py-3 px-4">$250.000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Tabla;


