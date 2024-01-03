'use client';
import './globals.css'
import { Inter } from 'next/font/google'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'TrebolIT',
//   description: 'Generada por Grupo TrebolIT',
// }

export default function RootLayout({ children }) {
  const { push } = useRouter();

  useEffect(() => {
     push('/menu');
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
