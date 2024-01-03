"use client";
import Image from 'next/image'

import Home from './views/home';
import Header from './components/Header'
import { useState } from 'react'
import Login from '../../pages/auth/login';
// import Menu from '../../pages/menu';

export default function mainPage() {
  return (
    <main className="min-h-screen bg-white">
      

        <Home />
    </main>
    )
    }
