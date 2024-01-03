import { useState, useEffect} from 'react';
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/router';

import Header from '../src/app/components/Header'
import { XMarkIcon } from '@heroicons/react/24/outline';
import useCookieAuth from '@/hooks/useCookieAuth';

import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import { Mina } from 'next/font/google';
import { redirect } from 'next/dist/server/api-utils';
export default function Register() {

    const [open, setOpen] = useState(false);
    const router = useRouter();
    const apiUrl = "https://legitbusiness.me"
    const [services, setServices] = useState([
        "Servicio 1",
        "Servicio 2",
        "Servicio 3"
    ]);
    // const discount = ["0%", "1%", "2%", "3%", "4%", "5%", "6%", "7%", "8%", "9%", "10%", "11%", "12%", "13%", "14%", "15%"]

    const [companies, setCompanies] = useState([]);
    const [contrapartes, setContrapartes] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [profilesToSend, setProfilesToSend] = useState([ ]);
    const [risk, setRisk] = useState([]);
    const [currency, setCurrency] = useState([]);
    const [discountSelected, setDiscountSelected] = useState([0]);
    const [month, setMonth] = useState(0);
    const [extraAmount, setExtraAmount] = useState(0);
    
    const nextMonthDate = new Date();
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    const nextMonth = nextMonthDate.toISOString().slice(0, 10);


    const [selectedProfiles, setSelectedProfiles] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedCounterparty, setSelectedCounterparty] = useState(null);
    const [selectedRisk, setSelectedRisk] = useState();
    const [selectedAdditionalIndex, setSelectedAdditionalIndex] = useState(null);
    const [selectedAdditionals, setSelectedAdditionals] = useState([]);
    const [additionalGroup, setAdditionalGroup] = useState([]);
    const [selectedAdditionalIndexes, setSelectedAdditionalIndexes] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [showEmptyFieldsAlert, setShowEmptyFieldsAlert] = useState(false);
    const [selectedHorasHombre, setSelectedHorasHombre] = useState(0);

    const { currentUser, isAdmin, handleUserLogin } = useCookieAuth();
    // let discount;
    // if (isAdmin){
    const discount = ["0%", '1%', '2%', '3%', '4%', '5%', '6%', '7%', '8%', '9%', '10%', '11%', '12%', '13%', '14%', '15%', '16%', '17%', '18%', '19%', '20%', '21%', '22%', '23%', '24%', '25%', '26%', '27%', '28%', '29%', '30%', '31%', '32%', '33%', '34%', '35%', '36%', '37%', '38%', '39%', '40%', '41%', '42%', '43%', '44%', '45%', '46%', '47%', '48%', '49%', '50%', '51%', '52%', '53%', '54%', '55%', '56%', '57%', '58%', '59%', '60%', '61%', '62%', '63%', '64%', '65%', '66%', '67%', '68%', '69%', '70%', '71%', '72%', '73%', '74%', '75%', '76%', '77%', '78%', '79%', '80%', '81%', '82%', '83%', '84%', '85%', '86%', '87%', '88%', '89%', '90%', '91%', '92%', '93%', '94%', '95%', '96%', '97%', '98%', '99%', '100%']
    // }
    // else{
    //     discount =  ["0%", '1%', '2%', '3%', '4%', '5%', '6%', '7%', '8%', '9%', '10%', '11%', '12%', '13%', '14%', '15%', '16%', '17%', '18%', '19%', '20%', '21%', '22%', '23%', '24%', '25%']
    // }

    const handleOpenT = () => {
            setOpen(true);
        
    };

    const openAlert = () => {
        setShowAlert(true);
      };
    
    const closeAlert = () => {
        setShowAlert(false);
        router.push('/historial_cotizaciones');
      };

    const onSubmit = (event) => {
        event.preventDefault();
        let porcentajeDescuentoCleaned = parseInt(discount[event.target.discount.value].split("%")[0]);
        const additionalNames = selectedAdditionals.map((additional) => additional.type);

        if (
            event.target.proyectName.value === '' ||
            event.target.month.value === ''  ||
            event.target.service.value === '' ||
            selectedCompany === null || 
            selectedCounterparty === null) {
            setShowEmptyFieldsAlert(true);
            return;
          }

       
        let profilesToSendCleaned = {};
        for (const [key, value] of Object.entries(selectedProfiles)) {
            value.forEach(element => {
                        profilesToSendCleaned.push([key, element.quantity])  
            });
        }
        

        for (const [key, value] of Object.entries(selectedAdditionals)) {
            // console.log(value)
            additionalToSendCleaned.push([value.type, value.quantity])
        }
        console.log(profilesToSendCleaned)
        console.log(selectedProfiles)
        console.log(selectedRisk);

        try {
            const data = {
                "clientId": selectedCompany.id,
                "contactId": 1, // id contacto contraparte
                "idProyecto": event.target.proyectName.value,
                "risk": event.target.risk.value, // alto, medio, bajo
                "porcentajeDescuento": porcentajeDescuentoCleaned, // Entre 0 y 100
                "proyectDuration": parseInt(event.target.month.value), // En meses
                "userId": currentUser,
                "perfiles": profilesToSendCleaned,
                "adicionales": additionalToSendCleaned,
                "currency": "UF", // UF, CLP
                "service": services[event.target.service.value].id, // id service
                "otherCosts": parseInt(event.target.extra.value) // Valor de costos adicionales no calculable
            }
            console.log(data)
            console.log(profilesToSendCleaned);
            fetch((`${apiUrl}/api/quotes`), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify the content type as JSON
                },
                body: JSON.stringify(data) // Convert the data to JSON format
            })
                .then(response => response.json()) // Parse the response as JSON
                // .then(data => console.log('Success:', data))
                .then(data => {
                    // Mostrar una alerta de éxito
                    openAlert(true);
                    // console.log('Success:', data);
                })
                .catch(error => console.error('Error:', error));
        }
        catch (error) {
            console.error('Error:', error);
        }
        
      };

    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [isCartVisible, setIsCartVisible] = useState(false);

    const profileOptions = profiles.map((profile) => ({
        value: profile.role,
        label: profile.role,
        isSearchable: true, // Habilitar la búsqueda para cada opción
    }));

    const companyOptions = companies.map((company) => ({
        value: company.name,
        id: company.id,
        label: company.name,
        // isSearchable: true, // Habilitar la búsqueda para cada opción
    }));

    const counterpartyOptions = contrapartes.map((counterparty) => ({
        value: counterparty.name,
        label: counterparty.name,
        id: counterparty.id,
        isSearchable: true, // Habilitar la búsqueda para cada opción
    }));
    

    const calculateAsignacion = (profileType, quantity, profileId) => {
        const asignacion = (quantity * 100) / 160;
        console.log('asignacion', asignacion);
        const updatedCartItems = [...cartItems];
        const cartItemIndex = updatedCartItems.findIndex((item) => {
            return item.type === profileType && item.id === profileId.id;
        });
        
        if (cartItemIndex !== -1) {
        updatedCartItems[cartItemIndex].quantity = asignacion;}
        console.log('parseInt(event.target.value)', asignacion);
        setCartItems(updatedCartItems);
        console.log('Cards items', updatedCartItems);
        return Math.round(asignacion * 10) / 10;
      };
      
    const calculateHorasHombre = (profileType, quantity, profileId) => {
        const horasHombre = (quantity / 100) * 160;
        return Math.round(horasHombre * 10) / 10;
      };

    const handleProfileChange = (selectedOption) => {
        if (selectedOption) { 
            const profileType = selectedOption.value;
            const selectedProfile = profiles.find(
                (profile) => profile.role === profileType
          );
      
          if (selectedProfile) {
            const newUniqueId = uuidv4();
            const profileId = selectedProfile.id;
            const updatedSelectedProfiles = { ...selectedProfiles };
      
            if (updatedSelectedProfiles[profileType]) {
              updatedSelectedProfiles[profileType].push({
                id: newUniqueId, 
                quantity: 0,
                hrsHombre: 0,
              });
            } else {
              updatedSelectedProfiles[profileType] = [
                {
                id: newUniqueId, 
                quantity: 0,
                hrsHombre: 0,
                },
              ];
            }
      
            setSelectedProfiles(updatedSelectedProfiles);
      
            const updatedProfiles = [...profiles];
            const profileIndex = updatedProfiles.findIndex(
              (profile) => profile.id === profileId
            );
      
            if (profileIndex !== -1) {
              setProfiles(updatedProfiles);
            }
      
            const newItem = {
                id: newUniqueId, 
                type: profileType,
                quantity: 0,
                price: /* precio del perfil */ 100, // Debes definir el precio aquí
            };
      
            setCartItems([...cartItems, newItem]);
            if (!isCartVisible) {
                setIsCartVisible(true);
              }
          }
        }
    };

      

    const handleCompanyChange = (selectedOption) => {
        setSelectedCompany(selectedOption);
        handleChangeOfCompanyContraparte(selectedOption);
      };
    
    const handleCounterpartyChange = (selectedOption) => {
        setSelectedCounterparty(selectedOption);
    };

    const handleDiscount = (selectedOption) => {
        
        setDiscountSelected(document.getElementById("discount").value);
    };

    const handleRiskChange = async (selectedOption) => {
        setSelectedRisk(selectedOption.target.value);
    };
    
    const handleChangeQuantityProfiles = (event, profileId, profileType, index) => {
        const newProfiles = { ...selectedProfiles };
        const profileIndex = newProfiles[profileType].findIndex(
            (profile) => profile.id === profileId.id
        );

        // console.log(profileIndex)

        if (profileIndex !== -1) {
            newProfiles[profileType][index].quantity = parseInt(
                event.target.value
            );
            setSelectedProfiles(newProfiles);
            const horasHombre = calculateHorasHombre(profileType, event.target.value);
            newProfiles[profileType][index].hrsHombre = horasHombre;
            setSelectedHorasHombre(horasHombre);
            console.log(selectedProfiles);
        }
        const updatedCartItems = [...cartItems];
        const cartItemIndex = updatedCartItems.findIndex((item) => {
            return item.type === profileType && item.id === profileId.id;
        });
        
        if (cartItemIndex !== -1) {
        updatedCartItems[cartItemIndex].quantity = parseInt(event.target.value);}
        setCartItems(updatedCartItems);
    }; 

    
    const handleRemoveProfile = (profileType, profileId) => {
        const newSelectedProfiles = { ...selectedProfiles };
        const selectedProfileType = newSelectedProfiles[profileType];

        if (selectedProfileType) {
            const index = selectedProfileType.indexOf(profileId);

            if (index !== -1) {
                selectedProfileType.splice(index, 1);
                setSelectedProfiles(newSelectedProfiles);
            }
        }

        const updatedProfiles = [...profiles];
        const profileIndex = updatedProfiles.findIndex(
            (profile) => profile.id === profileId
        );

        if (profileIndex !== -1) {
            //   updatedProfiles[profileIndex].isSelected = false;
            setProfiles(updatedProfiles);
        }
        const updatedCartItems = cartItems.filter((item) => {
            return !(item.id === profileId.id);
        });
        setCartItems(updatedCartItems);
        updateTotal();
    };

    const handleHorasHombreChange = (event, profileId, profileType, index) => {
        const newProfiles = { ...selectedProfiles };
        const newHorasHombre = parseFloat(event.target.value); // Usamos parseFloat para asegurarnos de obtener un número decimal
    
        const profileIndex = newProfiles[profileType].findIndex(
            (profile) => profile.id === profileId.id
        );
    
        if (profileIndex !== -1) {
            newProfiles[profileType][index].hrsHombre = newHorasHombre;
            setSelectedHorasHombre(newHorasHombre);
            newProfiles[profileType][index].quantity = calculateAsignacion(profileType, newHorasHombre, profileId);
            setSelectedProfiles(newProfiles);
        }
    };
    
    
      
    const fetchData = async () => {
        try {
            await fetchServices();
            await fetchCompanies();
            await fetchProfiles();
            await fetchAdditionals();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchCompanies = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/clients`);
            const result = await response.json();
            setCompanies(result);
            setContrapartes(result[0].contacts);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const fetchProfiles = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/profiles`);
            const result = await response.json();
            setProfiles(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchServices = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/services`);
            // console.log(response);
            const result = await response.json();
            setServices(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchAdditionals = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/additionals/hardcoded`);
            const result = await response.json();
            // console.log(result)
            setAdditionalGroup(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleChangeOfCompanyContraparte = async (event) => {
        const indexEvent = (index) => event.value === index.name;
        const index = companies.findIndex(indexEvent)
        const result = companies[index].contacts
        setContrapartes(result);
    }

    const handleMonths = (selectedOption) => {
        const selectedMonths = parseInt(event.target.value);
        setMonth(selectedMonths);
    };

    const handleExtraAmountChange = (event) => {
        const inputValue = event.target.value;
        const newExtraAmount = inputValue === '' ? 0 : parseFloat(inputValue);
        setExtraAmount(newExtraAmount);
      };


    const updateTotal = () => {
        let newTotal = 0;
    
        // Calcula el total solo para los items en cartItems
        cartItems.forEach(item => {
            const profileSelected = profiles.find(profile => profile.role === item.type);
            newTotal += profileSelected.costperhour * item.quantity/100;
        });
        
        newTotal += extraAmount;
        selectedRisk ? newTotal = newTotal * (risk[selectedRisk] / 100 + 1) : newTotal = newTotal * 1.1;

        setTotal(newTotal);

    };
    const numberWithCommas = (x) => {
        return Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const handleRemoveAdditional = (additionalIndex) => {
        let newTotal = 0;
        const additionalIdToRemove = selectedAdditionals[additionalIndex].uniqueId;
    
        setSelectedAdditionals((prevAdditionals) => {
          const updatedAdditionals = [...prevAdditionals];
          updatedAdditionals.splice(additionalIndex, 1);
          return updatedAdditionals;
        });
    
        setCartItems((prevCartItems) => {
            const newCartItems = prevCartItems.filter(item => item.uniqueId !== additionalIdToRemove);
            return newCartItems;
        });
    };
    
    useEffect(() => {
        updateTotal();
    }, [cartItems, extraAmount, selectedRisk]);
    

    useEffect(() => {
        fetchData();
    }, []);


    return (
    <>
        {/* {<Header />} */}

    
    <div className="bg-white px-6 py-8 sm:py-8 lg:px-8">
        <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden sm:top-[-20rem]"></div>
        <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Creación de Cotización</h2>
        </div>
        <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={onSubmit}>
            <div className="grid grid-cols-1  gap-y-6 ">
                <div className="sm:col-span-2">
                    <label htmlFor="service" className="block text-lg font-semibold leading-6 text-gray-900">Tipo de servicio</label>
                    <div className="mt-2.5">
                        <select id="service" className="value:hidden text-center block bg-transparent w-full rounded-md border-2 border-grey px-3.5 py-2 text-gray-900 shadow-sm ring-gray-300">
                            <option value="" selected>Selecciona un servicio</option>
                            {services.map((profile, index) => (
                                <option key={index} value={index}>
                                    {profile.type}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>


                <div className="sm:col-span-2">
                    <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">Empresa</label>
                    <Select
                    // instanceId="company"
                    options={companyOptions}
                    value={selectedCompany}
                    onChange={handleCompanyChange}
                    />
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="counterparty" className="block text-sm font-semibold leading-6 text-gray-900">Asignación de Contraparte</label>
                    <Select
                    // instanceId="counterparty"
                    options={counterpartyOptions}
                    value={selectedCounterparty}
                    onChange={handleCounterpartyChange}
                    />
                </div>


                <div className="sm:col-span-2">
                    <label htmlFor="profilesID" className="block text-sm font-semibold leading-6 text-gray-900">Asignación de Perfiles</label>
                    <Select
                        // instanceId="profilesID"
                        options={profileOptions}
                        isSearchable
                        value={selectedProfiles}
                        onChange={handleProfileChange}
                    />
                </div>
                        <div className="item-list">
                            {Object.entries(selectedProfiles).map(([profileType, profileIds]) =>
                                profileIds.map((profileId, index) => (
                                    <div className="item-container" key={index}>
                                        <div className="item-name">
                                            <div className=" pb-2 sm:grid sm:grid-cols-4  justify-center ring-1 ring-inset rounded-md border-1 py-1 my-1 text-gray-900 shadow-sm ring-gray-300">
                                                <span className='col-span-1 px-2'>{profileType}</span>
                                                <div className="col-span-1 flex-col w-full px-2 ">
                                                <p className=''> % Asignación: </p>
                                                <input
                                                    type="number"
                                                    onChange={(e) => handleChangeQuantityProfiles(e, profileId, profileType, index)}
                                                    name="profile"
                                                    // step=".1"
                                                    value={selectedProfiles[profileType][index].quantity}
                                                    min={0}
                                                    max={100}
                                                                
                                                        className="appearance-none px-2 form-input col-span-1  w-full  h-8 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                                                />
                                                </div>
                                                <div className="col-span-1">
                                                <p>Horas Hombre:</p>
                                                <input
                                                    type="number"
                                                    // step=".1"
                                                    onChange={(e) => handleHorasHombreChange(e, profileId, profileType, index)}
                                                    name="hours"
                                                    value={selectedProfiles[profileType][index].hrsHombre}
                                                    // value={selectedHorasHombre}
                                                    min={0}
                                                    max={160}
                                                        className="appearance-none px-2  form-input w-full col-span-1  h-8 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                                                />
                                                </div>
                                                <div
                                                    className="flex mx-2 items-center justify-center hover:bg-red-100 mr-1 col-span-1"
                                                    onClick={() => handleRemoveProfile(profileType, profileId)}
                                                >
                                                    
                                                    <p className="text-gray-400">Eliminar</p>
                                                    <XMarkIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}

                        </div>

                <div className="sm:col-span-2">
                    <label htmlFor="proyectName" className="block text-sm font-semibold leading-6 text-gray-900">Nombre del Proyecto</label>
                    <div className="mt-2.5">
                        <input type="profile" name="profile" id="proyectName" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div className='item-list'>
                    {Object.entries(selectedAdditionals).map(([additionalIndex, data]) => {
                        const additional = additionalGroup[additionalIndex];
                        return (
                            <div className='item-container' key={additionalIndex}>
                                <div className='item-name'>
                                    <div className='block w-full flex ring-1 ring-inset rounded-md border-1 px-3.5 py-1 my-1 text-gray-900 shadow-sm ring-gray-300'>
                                        <span>{data.type}</span>
                                        <div className='flex-grow'></div>
                                        {/* <p> Cantidad: </p>
                                        <input
                                            type='text'
                                            inputMode='numeric'
                                            onChange={(e) => handleChangeQuantityAdditional(e, additionalIndex)}
                                            value={data.quantity || ''}
                                            className='appearance-none form-input w-12 px-1 rounded-md border-0 mx-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300'
                                        /> */}
                                        <div
                                            className='flex-col items-center justify-between hover:bg-red-100'
                                            onClick={() => handleRemoveAdditional(additionalIndex)}
                                        >
                                            <XMarkIcon className='h-6 w-6 text-red-500' aria-hidden='true' />
                                            <p className='text-gray-400'>Eliminar</p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {/* <div className="sm:col-span-2">
                    <label htmlFor="state" className="block text-sm font-semibold leading-6 text-gray-900">Estado</label>
                    <div className="mt-2.5">
                        <label id="state" className="value:hidden text-center block bg-transparent w-full rounded-md border-2 border-grey px-3.5 py-2 text-gray-900 shadow-sm ring-gray-300">
                            <option value="prospeccion">Emitida</option>
                        </label>
                    </div>
                </div> */}
                <div className="sm:col-span-2 mt-0">
                    <label htmlFor="risk" className="block text-md font-semibold leading-6 text-gray-900">Asignación de riesgo</label>
                    <div className="mt-2.5">
                                <select id="risk" value={selectedRisk} onChange={handleRiskChange} className="value:hidden text-center block bg-transparent w-full rounded-md border-2 border-grey px-3.5 py-2 text-gray-900 shadow-sm ring-gray-300">
                                    {Object.entries(risk).map(([profile, index]) => (
                                        <option key={index} value={profile}>
                                            {profile}
                                        </option>
                                    ))}

                                </select>
                    </div>               
                </div>
                <div className="sm:col-span-2">
                <div className="flex ">
                    <div className="flex-1  ">
                                    <label htmlFor="deliveryDate" className="block text-lg font-semibold leading-6 text-gray-900 text-center">Fecha de Entrega</label>
                        <div className="mt-2.5">
                            <input
                                id="deliveryDate"
                                type="date"
                                locale="es"
                                defaultValue={nextMonth}             
                                className="value:hidden text-center block bg-transparent w-full rounded-md border-2 border-grey px-3.5 py-2 text-gray-900 shadow-sm ring-gray-300"
                                min={new Date().toISOString().slice(0, 10)}

                            />
                        </div>
                    </div>
                    <div className="flex-1 ps-4  ">
                                    <label htmlFor="endDate" className="block text-lg font-semibold leading-6 text-gray-900 text-center">Fecha de Cierre</label>
                        <div className="mt-2.5">
                            <input
                                id="endDate"
                                type="date"
                                locale="es"
                                defaultValue={nextMonth}
                                min={new Date().toISOString().slice(0, 10)}
                                className="value:hidden text-center block bg-transparent w-full rounded-md border-2 border-grey px-3.5 py-2 text-gray-900 shadow-sm ring-gray-300"

                            />
                        </div>
                    </div>

                </div>
                </div>                     
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label htmlFor="discount" className="block text-lg font-semibold leading-6 text-gray-900 text-center">Descuento</label>
                        <div className="mt-2.5">
                                    <select id="discount"   onChange={handleDiscount} className="value:hidden text-center block bg-transparent w-full rounded-md border-2 border-grey px-3.5 py-2 text-gray-900 shadow-sm ring-gray-300">
                                
                                {isAdmin && discount.map((profile, index) => (
                                    <option key={index} value={index}>
                                        {profile}
                                    </option>
                                ))}
                                        {!isAdmin && discount.slice(0, 26).map((profile, index) => (
                                            <option key={index} value={index}>
                                                {profile}
                                            </option>
                                        ))}


                            </select>
                        </div>
                    </div>
                    <div className="flex-1 ">
                                <label htmlFor="month" className="block text-lg font-semibold leading-6 text-gray-900 text-center">Meses</label>
                        <div className="mt-2.5">
                            <input 
                            id="month" 
                            type="number" 
                            className="value:hidden text-center block bg-transparent w-full rounded-md border-2 border-grey px-3.5 py-2 text-gray-900 shadow-sm ring-gray-300" 
                            placeholder="N° Meses"
                            min={1}
                            
                            onChange={handleMonths}

                            />
                        </div>
                    </div>
                    <div className="flex-1 ">
                                <label htmlFor="extra" className="block text-lg font-semibold leading-6 text-gray-900 text-center">Monto Extra Mensual</label>
                        <div className="mt-2.5">
                            <input
                                id="extra"
                                type="number"
                                className="value:hidden text-center block bg-transparent w-full rounded-md border-2 border-grey px-3.5 py-2 text-gray-900 shadow-sm ring-gray-300"
                                placeholder="Monto UF"
                                min={0} 
                                onChange={handleExtraAmountChange}
                                onInput={handleExtraAmountChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {showAlert && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeAlert}></div>
                  </div>
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                  </span>
                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-top sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <button
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        onClick={closeAlert}
                      >
                        Cerrar
                      </button>
                      <p className="text-x mb-2">La cotización se creó correctamente.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showEmptyFieldsAlert && (
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowEmptyFieldsAlert(false)}></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                        </span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-top sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowEmptyFieldsAlert(false)}
                            >
                            Cerrar
                            </button>
                            <p className="text-x mb-2">Campos obligatorios sin rellenar. Por favor, proporcione la información necesaria.</p>
                        </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="mt-10">
                <button type="submit" className="block w-full rounded-md bg-selfpallete-300 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Siguiente</button>
            </div>
                {isCartVisible && (
                <div className="fixed top-16 right-0 p-4 bg-white border border-gray-300 rounded-lg shadow-lg max-w-[320px]">
                    <div className="cart-summary">
                        <h2 className="text-2xl font-semibold">Resumen de la Cotización</h2>
                            <ul>
                                {Object.entries(selectedProfiles).map(([type, profiles]) =>
                                profiles.map(profile => (
                                    <li key={profile.uniqueId}>
                                    {type} {profile.uniqueId} {profile.quantity}%
                                    </li>
                                ))
                                )}
                                {selectedAdditionals.map((additional, index) => (
                                    <li key={index}>
                                        {additional.type} {additional.quantity}
                                    </li>
                                ))}
                            </ul>
                                <p>Monto Mensual: ${numberWithCommas(total)}</p>
                                <p>Tarifa Total: ${numberWithCommas(total* Math.max(1, month))}</p>       
                                <p className='font-bold'>Tarifa Total Con Descuento: ${numberWithCommas(total*Math.max(1,month)*(1-discountSelected/100))}</p>

                </div>
                </div>
                )}
        </form>
    </div>
    </>
    )
}

