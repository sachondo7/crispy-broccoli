import 'tailwindcss/tailwind.css';

import Image from 'next/image'
import Home from '../src/app/views/home';
import Header from '../src/app/components/Header'
import { useState } from 'react'
import Footer from '@/components/footer';

export default function mainPage() {
    return (
        <main className="min-h-screen bg-white">


            <Home />
        </main>
    )
}
