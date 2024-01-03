import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from '@tanstack/react-table'
import 'tailwindcss/tailwind.css';
import { useState, useEffect, useMemo, useCallback } from 'react'
import {
  ArrowsUpDownIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/outline';

import { useRouter } from 'next/router';
import Navbar from '@/app/components/Navbar';


export default function KAMS() {
    const apiUrl = "https://legitbusiness.me"
    const [data, setData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [actionType, setActionType] = useState('');
    const router = useRouter();
    const [sorting, setSorting] = useState([])
    const [filtering, setFiltering] = useState('')


    useEffect(() => {
      async function fetchData() {
        try {
          await fetchProfiles();
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    
      fetchData();
    }, []);
    
    // const fetchProfiles = async () => {
    //   try {
    //     const response = await fetch(`${apiUrl}/api/users`);
    //     const result = await response.json();
    //     setData(result);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };

    const fetchProfiles = async () => {
        try {
          const response = await fetch(`${apiUrl}/api/users`);
          const result = await response.json();
          // Agregar un campo 'blocked' a los datos si no existe
          const usersWithBlockedState = result.map(user => ({ ...user, blocked: user.blocked || false}));
          setData(usersWithBlockedState);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
    
    const columns = [
        {
            header: 'ID',
            accessorKey: "id",
            sortable: true,
            cell: ({ row }) => String(row.original.id),
        },{
            header: 'Nombre',
            accessorKey: "name",
            sortable: true,
            cell: ({ row }) => String(row.original.name),
        },{
            header: 'Correo',
            accessorKey: "email",
            sortable: true,
            cell: ({ row }) => String(row.original.email),
        }
    ]

    const handleBloquear = (user) => {
      setSelectedUser(user);
      if (user.blocked) {
        setActionType('desbloquear');
      } else {
        setActionType('bloquear');
      }
      setShowModal(true);
    };
    
      
    const handleEliminar = (user) => {
        setSelectedUser(user);
        setActionType('eliminar');
        setShowModal(true);
      };
    
    const closeModal = () => {
    setShowModal(false);
    };

  // const confirmAction = () => {
  //   setShowModal(false);
  //   if (actionType === 'bloquear' || actionType === 'desbloquear') {
  //     const updatedData = data.map((u) => {
  //       if (u.id === selectedUser.id) {
  //         u.blocked = !u.blocked;
  //       }
  
  //       const endpoint = actionType === 'bloquear' ? 'block_user' : 'unblock_user';
  //       console.log(`${apiUrl}/admin/${endpoint}/1/${selectedUser.id}`);
  //       fetch(`${apiUrl}/admin/${endpoint}/1/${selectedUser.id}`, {
  //         method: 'PUT',
  //       }
  //       )
  //         .then((response) => {
  //           if (!response.ok) {
  //             console.error(`Error al ${actionType} el usuario`);
  //           }
  //         })
  //         .catch((error) => {
  //           console.error(`Error al ${actionType} el usuario:`, error);
  //         });
  
  //       return u;
  //     });
  
  //     setData(updatedData);
  //   } else if (actionType === 'eliminar') {
  //     eliminarUsuario(selectedUser.id);
  //   }
  // };

  // const confirmAction = () => {
  //   setShowModal(false);
  //   // Verificar si la acción es bloquear o desbloquear
  //   if (actionType === 'bloquear' || actionType === 'desbloquear') {
  //     // Construir la URL para la acción (bloquear o desbloquear) en función del tipo de acción
  //     const actionUrl = actionType === 'bloquear'
  //     // https://legitbusiness.me/admin/block_user/1/5
  //       ? `${apiUrl}/admin/block_user/1/${selectedUser.id}`
  //       : `${apiUrl}/admin/unblock_user/1/${selectedUser.id}`;
  //     // Enviar la solicitud al backend
  //     fetch(actionUrl, {
  //       method: 'PUT',
  //     })
  //       .then((response) => {
  //         if (response.ok) {
  //           // Actualizar el estado de 'blocked' del usuario
  //           const updatedData = data.map((user) =>
  //             user.id === selectedUser.id
  //               ? { ...user, blocked: actionType === 'bloquear' }
  //               : user
  //           );
  //           setData(updatedData);
  //         } else {
  //           console.error(`Error al ${actionType === 'bloquear' ? 'bloquear' : 'desbloquear'} el usuario`);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(`Error al ${actionType === 'bloquear' ? 'bloquear' : 'desbloquear'} el usuario:`, error);
  //       });
  //   } else if (actionType === 'eliminar') {
  //     // Si la acción es eliminar, llama a la función eliminarUsuario
  //     eliminarUsuario(selectedUser.id);
  //   }
  //   // Restablecer el tipo de acción a una cadena vacía
  //   setActionType('');
  // };
  
  const confirmAction = () => {
    setShowModal(false);
    // Verificar si la acción es bloquear o desbloquear
    if (actionType === 'bloquear' || actionType === 'desbloquear') {
      // Encuentra el usuario en la lista de datos
      const userToModify = data.find((user) => user.id === selectedUser.id);
      console.log(data);
  
      if (userToModify) {
        // Verificar si el usuario está bloqueado
        const isBlocked = userToModify.blocked;
        console.log(`Bloquear usuario ID: ${selectedUser.id}, Estado actual: ${selectedUser.blocked}`);
        console.log(isBlocked);
  
        if ((actionType === 'bloquear' && !isBlocked) || (actionType === 'desbloquear' && isBlocked)) {
          const actionUrl = actionType === 'bloquear'
            ? `${apiUrl}/admin/block_user/1/${selectedUser.id}`
            : `${apiUrl}/admin/unblock_user/1/${selectedUser.id}`;
  
          // Enviar la solicitud al backend
          fetch(actionUrl, {
            method: 'PUT',
          })
            .then((response) => {
              if (response.ok) {
                // Actualizar el estado de 'blocked' del usuario
                userToModify.blocked = !isBlocked;
  
                // Actualizar la lista de datos con el usuario modificado
                const updatedData = data.map((user) =>
                  user.id === selectedUser.id
                    ? userToModify
                    : user
                );
  
                setData(updatedData);
              } else {
                console.error(`Error al ${actionType === 'bloquear' ? 'bloquear' : 'desbloquear'} el usuario`);
              }
            })
            .catch((error) => {
              console.error(`Error al ${actionType === 'bloquear' ? 'bloquear' : 'desbloquear'} el usuario:`, error);
            });
        } else {
          console.error(`El usuario ya está ${actionType === 'bloquear' ? 'bloqueado' : 'desbloqueado'}`);
        }
      } else {
        console.error('Usuario no encontrado en la lista de datos');
      }
    } else if (actionType === 'eliminar') {
      // Si la acción es eliminar, llama a la función eliminarUsuario
      eliminarUsuario(selectedUser.id);
    }
    // Restablecer el tipo de acción a una cadena vacía
    setActionType('');
  };
  

    const eliminarUsuario = async (userId) => {
    try {
        const response = await fetch(`${apiUrl}/api/users/${userId}`, {
        method: 'DELETE',
        });

        if (response.status === 200) {
        const updatedData = data.filter(user => user.id !== userId);
        setData(updatedData);
        } else {
        console.error('Error al eliminar el usuario');
        }
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
    }
    const updatedData = data.filter(user => user.id !== userId);
    setData(updatedData);
    };

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
    })

    
    return (
      <div className="bg-gray-100  ">
        <div className=" border-slate-300 border-t-2 grid grid-cols-6 min-h-screen w-full">
          <Navbar className="col-span-1"/>
          <div className='bg-gray-100 min-h-screen col-span-5'>
          <div className="mx-auto max-w-2xl text-center py-4">
            <h2 className="text-3xl font-sans tracking-tight text-gray font-semibold sm:text-4xl">
              Tabla de Usuario
            </h2>
          </div>
          <main className="flex flex-col items-center justify-between  mx-4 bg-white p-2 pt-6">
            <div className="container mx-auto bg-white  mb-16">
              <div className="container mx-auto bg-white  mb-16 flex items-center">
                <p className="font-sans tracking-tight text-black font-semibold mr-2">Filtrar por nombre:</p>
                <input
                  type='text'
                  value={filtering}
                  onChange={e => setFiltering(e.target.value)}
                  className='block  rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  placeholder="Filtro"
                />
              </div>
              <table className='min-w-full'>
                <thead className='border-b-gray-800 border-b-2 font-sans'>
                  {table.getHeaderGroups().map(HeaderGroup => (
                    <tr key={HeaderGroup.id} className='text-gray-800 text-center'>
                      {HeaderGroup.headers.map(header => (
                        <th key={header.id} onClick={header.column.getToggleSortingHandler()} className="py-3 px-4 font-semibold text-sm cursor-pointer">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanSort() && ({
                            asc: <ArrowDownIcon className='h-4 inline' />,
                            desc: <ArrowUpIcon className='h-4 inline' />
                          }[header.column.getIsSorted()] ??
                            <ArrowsUpDownIcon className='h-4 inline' />
                          )}
                        </th>
                      ))}
                      <th className="py-3 px-4 font-semibold text-sm">
                        Acciones
                      </th>
                    </tr>
                  ))}
                </thead>
                <tbody className='text-gray-800 border-b-gray-600 border-b-2 font-sans'>
                  {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="text-center py-3 px-4 border-b-gray-200 border-b-2">
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                      <td className="flex items-center justify-center space-x-2">
                      <button
                        type='button'
                        onClick={() => handleBloquear(row.original)}
                        className={`flex w-20 justify-center rounded-md ${
                            row.original.blocked ? 'bg-gray-500' : 'bg-selfpallete-300'
                        } opacity-90 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                        >
                        {row.original.blocked ? 'Desbloquear' : 'Bloquear'}
                        </button>


                        <button
                            type='button'
                            onClick={() => handleEliminar(row.original)}
                            className="flex w-20 justify-center rounded-md bg-red-500 opacity-90 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
          {showModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
                </span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                        Confirmar Acción
                        </h3>
                        <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            ¿Seguro que quieres {actionType === 'bloquear' ? 'bloquear' : (actionType === 'eliminar' ? 'eliminar' : 'desbloquear')} a {selectedUser.name}?
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button onClick={confirmAction} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Confirmar
                    </button>
                    <button onClick={closeModal} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
                    Cancelar
                    </button>
                </div>
                </div>
            </div>
            </div>
        )}
        <div className=" flex items-center justify-center py-5">
          <button
            onClick={() => router.back()}
            className='bg-selfpallete-300 text-white h-10 w-150 rounded-md hover:opacity-70 py-2 px-4 rounded' >
            Volver
          </button>
        </div>
        </div>
        </div>
      </div>
      );
    }