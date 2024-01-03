import Tabla from '../components/historial';
import './globals.css';
import Boton from '../components/boton';
import React from 'react';

export default function Historial() {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
        <Tabla></Tabla>
        <div>
          <Boton destino="/" texto="Volver" />
        </div>
      </main>
    )
  }