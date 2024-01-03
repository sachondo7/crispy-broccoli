import Link from 'next/link';
import React from 'react';

const Boton = ({ destino, texto }) => {
  return (
    <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href={destino}>
        {texto}
    </Link>
  );
};

export default Boton;