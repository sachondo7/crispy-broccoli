// components/Login.js
import 'tailwindcss/tailwind.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useCookieAuth from '@/hooks/useCookieAuth';
import Cookies from 'js-cookie';

const apiUrl = 'https://legitbusiness.me';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validCredentials, setValidCredentials] = useState(true);
    const { currentUser, handleUserLogin } = useCookieAuth(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(`${apiUrl}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const result = await response.json();
        if (response.status === 200){
            Cookies.set('userId', result.userId);
            Cookies.set('administrator', result.administrator);
            handleUserLogin();
            router.push('/menu');
        }
        else if (response.status === 403){
            alert("Esta Cuenta está Bloqueada");
        }
        else{
            setValidCredentials(false);
            // alert("Correo o Contraseña Incorrectos");

        }
        console.log(result);
        console.log(response.status);
    };

    useEffect(() => {
        if (currentUser) {
          router.push('/menu');
        }
      });

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="../trebol.svg.png"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Inicia Sesión
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleLogin} >
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Correo Electrónico
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                // className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                                autoComplete="email"
                                placeholder='Ingrese email'
                                required
                                pattern="[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                onChange={(e) => setEmail(e.target.value)}
                                className={`block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 ${validCredentials ? '  ring-gray-300 focus:ring-indigo-600'
                                    : ' ring-red-900 focus:ring-red-950'}`}
                                // className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {/* <span className={`mt-1 text-sm text-red-800 ${validCredentials ? "hidden" : "show"}`}>
                                Correo Electrónico y/o Contraseña Incorrectos
                            </span> */}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password"  className="block text-sm font-medium leading-6 text-gray-900">
                                Contraseña
                            </label>
                            {/* <div className="text-sm">
                                <a className="font-semibold text-selfpallete-300 hover:opacity-80">
                                    Olvidó la Contraseña?
                                </a>
                            </div> */}
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder='Ingrese Contraseña'
                                autoComplete="current-password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                className={`block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 ${validCredentials ? '  ring-gray-300 focus:ring-indigo-600'
                                    : ' ring-red-900 focus:ring-red-950'}`}
                            />
                        </div>
                        <span className={`mt-1 text-sm text-red-900 ${validCredentials ? "hidden" : "show"}`}>
                            Correo Electrónico y/o Contraseña Incorrectos
                        </span>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-selfpallete-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
  )

}