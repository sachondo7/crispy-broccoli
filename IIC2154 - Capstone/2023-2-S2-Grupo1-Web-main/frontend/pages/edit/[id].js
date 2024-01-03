"use client"
import { useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import useCookieAuth from '@/hooks/useCookieAuth';
 
export default function UpdateRegister() {
    
    const router = useRouter();
    const apiUrl = "https://legitbusiness.me"
    let newTotal = 0;
    let newMonthlyTotal = 0;
    // const discount = ["0%", "1%", "2%", "3%", "4%", "5%", "6%", "7%", "8%", "9%", "10%", "11%", "12%", "13%", "14%", "15%"]
    const { currentUser, isAdmin, handleUserLogin } = useCookieAuth();

    const discount = ["0%", '1%', '2%', '3%', '4%', '5%', '6%', '7%', '8%', '9%', '10%', '11%', '12%', '13%', '14%', '15%', '16%', '17%', '18%', '19%', '20%', '21%', '22%', '23%', '24%', '25%', '26%', '27%', '28%', '29%', '30%', '31%', '32%', '33%', '34%', '35%', '36%', '37%', '38%', '39%', '40%', '41%', '42%', '43%', '44%', '45%', '46%', '47%', '48%', '49%', '50%', '51%', '52%', '53%', '54%', '55%', '56%', '57%', '58%', '59%', '60%', '61%', '62%', '63%', '64%', '65%', '66%', '67%', '68%', '69%', '70%', '71%', '72%', '73%', '74%', '75%', '76%', '77%', '78%', '79%', '80%', '81%', '82%', '83%', '84%', '85%', '86%', '87%', '88%', '89%', '90%', '91%', '92%', '93%', '94%', '95%', '96%', '97%', '98%', '99%', '100%']
    // let discount;
    // if (isAdmin) {
    //     discount = ["0%", '1%', '2%', '3%', '4%', '5%', '6%', '7%', '8%', '9%', '10%', '11%', '12%', '13%', '14%', '15%', '16%', '17%', '18%', '19%', '20%', '21%', '22%', '23%', '24%', '25%', '26%', '27%', '28%', '29%', '30%', '31%', '32%', '33%', '34%', '35%', '36%', '37%', '38%', '39%', '40%', '41%', '42%', '43%', '44%', '45%', '46%', '47%', '48%', '49%', '50%', '51%', '52%', '53%', '54%', '55%', '56%', '57%', '58%', '59%', '60%', '61%', '62%', '63%', '64%', '65%', '66%', '67%', '68%', '69%', '70%', '71%', '72%', '73%', '74%', '75%', '76%', '77%', '78%', '79%', '80%', '81%', '82%', '83%', '84%', '85%', '86%', '87%', '88%', '89%', '90%', '91%', '92%', '93%', '94%', '95%', '96%', '97%', '98%', '99%', '100%']
    // }
    // else {
    //     discount = ["0%", '1%', '2%', '3%', '4%', '5%', '6%', '7%', '8%', '9%', '10%', '11%', '12%', '13%', '14%', '15%', '16%', '17%', '18%', '19%', '20%', '21%', '22%', '23%', '24%', '25%']
    // }
    const status = ["Emitida", "Enviada", "Negociada", "Adjudicada", "Perdida"];
    const allStatus = status.map((oneStatus, index) => ({
        value: oneStatus,
        id: index,
        label: oneStatus,
        isSearchable: true,
    }));
    const riskList ={
        "Alto":30,
        "Medio":20,
        "Bajo":10
    }
    const [profiles, setProfiles] = useState([
        { role: "Frontend", id: 1 },
        { role: "Backend", id: 2 },
        { role: "Full Stack", id: 3 }
    ]);
    const [isContactIdChange, setIsContactIdChange] = useState(false);
    const [isIdProyectoChange, setIsIdProyectoChange] = useState(false);
    const [isStatusChange, setIsStatusChange] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("Emitida");
    const [isRiskChange, setIsRiskChange] = useState(false);
    const [isDiscountChange, setIsDiscountChange] = useState(false);
    const [isProyectDurationChange, setIsProyectDurationChange] = useState(false);
    const [isOtherCostsChange, setIsOtherCostsChange] = useState(false);
    const [isEndDateChange, setIsEndDateChange] = useState(false);
    const [isDeliveryDateChange, setIsDeliveryDateChange] = useState(false);
    const [showWarning, setShowWarning] = useState(false);    
    const [companies, setCompanies] = useState([]);
    const [contrapartes, setContrapartes] = useState([]);
    const [selectedServices, setSelectedServices] = useState({}); 
    const [profilesToSend, setProfilesToSend] = useState({});
    const [selectedProfiles, setSelectedProfiles] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState({});
    const [selectedProject, setSelectedProject] = useState("")
    const [selectedCounterparty, setSelectedCounterparty] = useState(0);;
    const [selectedRisk, setSelectedRisk] = useState("");
    const [risks, setRisks] = useState({});
    const [selectedDiscount, setSelectedDiscount] = useState(0);
    const [selectedProyectDuration, setSelectedProyectDuration] = useState(0);
    const [selectedOtherCosts, setSelectedOtherCosts] = useState(0);
    const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
    const [deliveryDate, setDeliveryDate] = useState(new Date().toISOString().slice(0, 10));
    const [showAlert, setShowAlert] = useState(false);
    const [showEmptyFieldsAlert, setShowEmptyFieldsAlert] = useState(false);
    // carrito de compras
    const [total, setTotal] = useState(0);
    const [monthlyTotal, setMonthlyTotal] = useState(0);
    const [isCartVisible, setIsCartVisible] = useState(true);
    const [selectedHorasHombre, setSelectedHorasHombre] = useState(0);
    
    
    const openAlert = () => {
        setShowAlert(true);
    };
    
    const closeAlert = () => {
        setShowAlert(false);
        router.push('/historial_cotizaciones');
    };

    const closeWarning = () => {
        setShowWarning(false);
    };
    
    const findStatus = (statusList, newStatus) => {
        const foundStatus = statusList.find(obj => obj.value == newStatus);
        return foundStatus;
    };

    const onSubmit = (event) => {
        event.preventDefault();

        if (
            event.target.proyectName.value === '' ||
            event.target.month.value === '' ||
            event.target.extra.value === ''
          ) {
            setShowEmptyFieldsAlert(true);
            return;
        }

       
        let profilesToSendCleaned = [];
        for (const [key, value] of Object.entries(selectedProfiles)) {
            value.forEach(element => {
                for (const [key, value] of Object.entries(profiles)) {
                    if (value.id === element.id && element.quantity) {
                        profilesToSendCleaned.push([value.role, element.quantity])
                    }
                }
            });
        }

        const data = {
            "perfiles": profilesToSendCleaned,
            "adicionales": [],
        }
        if (isContactIdChange)
            data["contactId"] = selectedCounterparty;
        if (isIdProyectoChange)
            data["idProyecto"] = event.target.proyectName.value;
        if (isStatusChange) {
            console.log(selectedStatus);
            data["status"] = selectedStatus;
        }
        if (isRiskChange)
            data["risk"] = selectedRisk;
        if (isDiscountChange)
            data["porcentajeDescuento"] = parseInt(selectedDiscount, 10);
        if (isProyectDurationChange)
            data["proyectDuration"] = parseInt(event.target.month.value);
        if (isOtherCostsChange)
            data["otherCosts"] = parseInt(event.target.extra.value);
        if (isEndDateChange)
            data["endDate"] = event.target.endDate.value;
        if (isDeliveryDateChange)
            data["deliveryDate"] = event.target.deliveryDate.value;
        try {
            console.log(data)
            fetch((`${apiUrl}/api/quotes/update/${router.query.id}`), {
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

    const confirmDelete = async (e) => {
        e.preventDefault();
        try {
            fetch((`${apiUrl}/api/quotes/${router.query.id}`), {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json', // Specify the content type as JSON
                }
            })
                .then(response => response.json())

                .catch(error => console.error('Error:', error));
        }
        catch (error) {
            console.error('Error:', error);
        }
        router.refresh();
        router.push("/historial_cotizaciones");
    };
    

    const profileOptions = profiles.map((profile) => ({
        value: profile.role,
        label: profile.role,
        isSearchable: true, // Habilitar la búsqueda para cada opción
    }));

    const updateTotal = (objectParams) => {
        newTotal = 0;
        newMonthlyTotal = 0;
        
        Object.entries(selectedProfiles).map(([role, list]) => {
            list.map((obj) => {
                const profileFound = profiles.find((profile) => obj.id == profile.id);
                // console.log(obj.quantity);
                if (obj.quantity) {
                    newTotal += profileFound.costperhour * (obj.quantity / 100);
                    newMonthlyTotal += profileFound.costperhour * (obj.quantity / 100);
                }
            })
        });
        if ("duration" in objectParams) {
            newTotal += selectedOtherCosts;
            newMonthlyTotal += selectedOtherCosts;
            if (objectParams["duration"]) {
                newTotal *= objectParams["duration"];
            }
            newTotal *= (1 + riskList[selectedRisk] / 100);
            newMonthlyTotal *= (1 + riskList[selectedRisk] / 100);            
        } else if ("other" in objectParams) {
            if (objectParams["other"]) {
                newTotal += objectParams["other"];
                newMonthlyTotal += objectParams["other"];
            }
            newTotal *= selectedProyectDuration;
            newTotal *= (1 + riskList[selectedRisk] / 100);
            newMonthlyTotal *= (1 + riskList[selectedRisk] / 100);
        } else if ("risk" in objectParams) {
            newTotal += selectedOtherCosts;
            newMonthlyTotal += selectedOtherCosts;
            newTotal *= selectedProyectDuration;
            if (objectParams["risk"]) {
                newTotal *= (1 + objectParams["risk"] / 100);
                newMonthlyTotal *= (1 + objectParams["risk"] / 100);
            }
        } else {
            newTotal += selectedOtherCosts;
            newMonthlyTotal += selectedOtherCosts;
            newTotal *= selectedProyectDuration;
            newTotal *= (1 + riskList[selectedRisk] / 100);
            newMonthlyTotal *= (1 + riskList[selectedRisk] / 100);
        }
        newTotal = Math.round(newTotal);
        newMonthlyTotal = Math.round(newMonthlyTotal);
        // console.log(newTotal);
        setTotal(newTotal);
        setMonthlyTotal(newMonthlyTotal);
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
                        id: profileId,
                        quantity: 0, // Inicialmente, la cantidad es 0
                        hrsHombre: 0
                    });
                } else {
                    updatedSelectedProfiles[profileType] = [
                        {
                            id: profileId,
                            quantity: 0, // Inicialmente, la cantidad es 0
                            hrsHombre: 0
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
            }
        }
        updateTotal({});
    };
    
    const handleChangeQuantityProfiles = (event, profileId, profileType, index) => {
        const newProfiles = { ...selectedProfiles };
        const profileIndex = newProfiles[profileType].findIndex(
            (profile) => profile.id === profileId.id
        );

        if (profileIndex !== -1) {
            newProfiles[profileType][index].quantity = Math.round(parseInt(
                event.target.value
            ));
            newProfiles[profileType][index].hrsHombre = Math.round(parseInt(
                event.target.value
            ) * 160 / 100);
            setSelectedProfiles(newProfiles);
        }
        updateTotal({});
    };

    const handleHorasHombreChange = (event, profileId, profileType, index) => {
        const newProfiles = { ...selectedProfiles };
        const profileIndex = newProfiles[profileType].findIndex(
            (profile) => profile.id === profileId.id
        );

        if (profileIndex !== -1) {
            newProfiles[profileType][index].hrsHombre = Math.round(parseInt(
                event.target.value
            ));
            newProfiles[profileType][index].quantity = Math.round(parseInt(
                (event.target.value) 
            ) * 100 / 160);

            setSelectedProfiles(newProfiles);
        }
        updateTotal({});
    };

    const numberWithCommas = (x) => {
        return Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
      
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
            setProfiles(updatedProfiles);
        }
        updateTotal({});
    };
    
    const handleSelectedCounterparty = (counterpartyIndex) => {
        setSelectedCounterparty(counterpartyIndex);
        setIsContactIdChange(true);
    };

    const handleSelectedProject = (ProjectName) => {
        setSelectedProject(ProjectName);
        setIsIdProyectoChange(true);
    };

    const handleSelectedRisk = (riskName) => {
        setSelectedRisk(riskName);
        setIsRiskChange(true);
        updateTotal({"risk": riskList[riskName]});
    }

    const handleEndDate = (NewEDate) => {
        setEndDate(NewEDate);
        setIsEndDateChange(true);
    };

    const handleDeliveryDate = (NewDDate) => {
        setDeliveryDate(NewDDate);
        setIsDeliveryDateChange(true);
    };

    const handleSelectedDiscount = (newDiscount) => {
        setSelectedDiscount(newDiscount);
        setIsDiscountChange(true);
    };

    const handleSelectedProyectDuration = (newDuration) => {
        let nDuration = parseInt(newDuration, 10);
        setSelectedProyectDuration(nDuration);
        setIsProyectDurationChange(true);
        updateTotal({"duration": nDuration});
    };
    
    const handleSelectedOtherCosts = (newOthers) => {
        let nOthers = parseInt(newOthers, 10);
        setSelectedOtherCosts(nOthers);
        setIsOtherCostsChange(true);
        updateTotal({"other": nOthers});
    };

    const handleStatusChange = (selectedOption) => {
        console.log(selectedOption);
        setIsStatusChange(true);
        setSelectedStatus(selectedOption.value);
    };

    const fetchData = async () => {
        try {
            await fetchCompanies();
            await fetchProfiles();
            await fetchRisks();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchRisks = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/risks`);
            const result = await response.json();
            setRisks(result);
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
    
    const fetchQuote = async () => {
        try {
            let id = router.query.id;
            const response = await fetch(`${apiUrl}/api/quotes/${id}`);
            const result = await response.json();
            const profileArray = []; 
            const selectedProfileObj = {};
            setSelectedCompany(result.clientId);
            setSelectedProject(result.idProyecto);
            setSelectedStatus(result.status);
            setSelectedCounterparty(result.contactId);
            if (result.tariffId) {
                if (result.tariffId.deductions) {
                    setSelectedDiscount(result.tariffId.deductions[0] ? result.tariffId.deductions[0].percentage : 0);
                }
                setSelectedOtherCosts(result.tariffId.otherCosts);
                setSelectedProyectDuration(result.tariffId.proyectDuration);
                Object.entries(riskList).map(([riskname, number]) => {
                    if (result.tariffId.risk == number) {
                        setSelectedRisk(riskname);
                    }
                }); 
                result.tariffId.profiles.map(obj => {
                    profileArray.push({
                        role: obj.role,
                        assigment: obj.hourAssignment,
                        id: obj.id
                    })
                    if (obj.role in selectedProfileObj) {
                        selectedProfileObj[obj.role].push(
                            {
                                id:obj.id,
                                quantity:obj.hourAssignment,
                                hrsHombre: Math.round(160 * (obj.hourAssignment / 100))
                            }
                            )
                    } else {
                        selectedProfileObj[obj.role] = [
                            {
                                id:obj.id,
                                quantity:obj.hourAssignment,
                                hrsHombre: Math.round(160 * (obj.hourAssignment / 100))
                            }
                        ]
                    }
                })
                setSelectedProfiles(selectedProfileObj);
                setProfilesToSend(profileArray);
                setTotal(result.tariffId.grossPrice);
                setMonthlyTotal(Math.round(result.tariffId.grossPrice / result.tariffId.proyectDuration));
                setSelectedServices(result.tariffId.serviceId);
                setEndDate(new Date(result.endDate).toISOString().slice(0, 10));
                setDeliveryDate(new Date(result.deliveryDate).toISOString().slice(0, 10));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
 
    useEffect(() => {
        if (router.isReady) {
            fetchData();
            fetchQuote();
        }
    }, [router.isReady]);


    return (
    <div className="bg-white px-6 py-8 sm:py-8 lg:px-8">
        <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden sm:top-[-20rem]"></div>
        <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Edición de Cotización</h2>
        </div>
        <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={onSubmit}>
            <div className="grid grid-cols-1  gap-y-6 ">
                <div className="sm:col-span-2">
                    <label htmlFor="service" className="block text-lg font-semibold leading-6 text-gray-900">Tipo de servicio</label>
                    <div className="mt-2.5">
                        <select 
                            id="service" 
                            className="value:hidden text-center block bg-transparent w-full rounded-md border-2 border-grey px-3.5 py-2 text-gray-900"
                            disabled>
                            <option key={0} value={selectedServices.id}>
                                {selectedServices.type}
                            </option>
                        </select>
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">Empresa</label>
                    <div className="mt-2.5">
                        <select 
                            id="company" 
                            className="value:hidden text-center block bg-transparent w-full rounded-md border-2 border-gray-200 px-3.5 py-2 text-gray-900"
                            disabled>
                            <option key={selectedCompany.id} value={selectedCompany.id}>
                                {selectedCompany.name}
                            </option>
                        </select>
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="counterparty" className="block text-sm font-semibold leading-6 text-gray-900">Asignación de Contraparte</label>
                    <div className="mt-2.5">
                        <select 
                            id="counterparty"
                            onChange={(e) => handleSelectedCounterparty(e.target.value)}  
                            className="block bg-white border-2 border-gray-200 rounded-md w-full px-3.5 py-2 text-gray-900">
                            <option key={0} value={selectedCounterparty.id}>
                                {selectedCounterparty.name}
                            </option>
                            {contrapartes.map((obj, index) =>
                                selectedCounterparty!=obj.name &&  (
                                    <option key={index+1} value={obj.id}>
                                        {obj.name}
                                    </option>
                                )
                            )}
                        </select>
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="profiles" className="block text-sm font-semibold leading-6 text-gray-900">Perfiles</label>
                    <Select
                        className='text-gray-900'
                        instanceId="profiles"
                        options={profileOptions}
                        value={selectedProfiles}
                        onChange={handleProfileChange}
                    />
                </div>
                <div className="item-list">
                    {Object.entries(selectedProfiles).map(([profileType, profileIds]) =>
                        profileIds.map((profileId, index) => (        
                            <div className="item-container" key={index}>
                                <div className="item-name">
                                    <div className="pb-2 sm:grid sm:grid-cols-4  justify-center ring-1 ring-inset rounded-md border-1 py-1 my-1 text-gray-900 shadow-sm ring-gray-300">
                                        <span className='col-span-1 px-2'>{profileType}</span>
                                        <div className="col-span-1 flex-col w-full px-2 ">
                                        <p> % Asignación: </p>
                                            <input
                                                type="number"
                                                onChange={(e) => handleChangeQuantityProfiles(e, profileId, profileType, index)}
                                                name="profile"
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
                                                min={0}
                                                max={160}
                                                className="appearance-none px-2 form-input w-full col-span-1  h-8 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
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
                        <input 
                        type="profile" 
                        onChange={(e) => handleSelectedProject(e.target.value)} 
                        value={selectedProject}
                        name="profile" 
                        id="proyectName" 
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                        />
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="risk" className="block text-md font-semibold leading-6 text-gray-900">Asignación de riesgo</label>
                    <div className="mt-2.5">
                        <select 
                            id="risk"
                            onChange={(e) => handleSelectedRisk(e.target.value)} 
                            className="text-center block w-full bg-transparent rounded-md border-2 border-grey px-3.5 py-2 text-gray-900 shadow-sm">
                            <option key={0} value={selectedRisk}>{selectedRisk}</option>
                            {Object.entries(risks).map(([riskName, number], i) =>
                                selectedRisk!=riskName &&  (
                                    <option key={i+1} value={riskName}>
                                        {riskName}
                                    </option>
                                )
                            )}
                        </select>
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <div className="flex">
                        <div className="flex-1">
                            <label htmlFor="deliveryDate" className="block text-lg font-semibold leading-6 text-gray-900">Fecha de Entrega</label>
                            <div className="mt-2.5">
                                <input
                                    id="deliveryDate"
                                    type="date"
                                    locale="es"
                                    value={deliveryDate}
                                    onChange={(e) => handleDeliveryDate(e.target.value)}
                                    min={new Date().toISOString().slice(0, 10)}
                                    className="value:hidden text-center block bg-transparent w-full rounded-md border-2 border-grey px-3.5 py-2 text-gray-900 shadow-sm ring-gray-300"
                                />
                            </div>
                        </div>
                        <div className="flex-1 ps-4">
                            <label htmlFor="endDate" className="block text-lg font-semibold leading-6 text-gray-900">Fecha de Cierre</label>
                            <div className="mt-2.5">
                                <input
                                    id="endDate"
                                    type="date"
                                    locale="es"
                                    value={endDate}             
                                    onChange={(e) => handleEndDate(e.target.value)}
                                    className="value:hidden text-center block bg-transparent w-full rounded-md border-2 border-grey px-3.5 py-2 text-gray-900 shadow-sm ring-gray-300"
                                    min={new Date().toISOString().slice(0, 10)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex ">
                    <div className="flex-1 ">
                        <label htmlFor="discount" className="block text-lg font-semibold leading-6 text-gray-900">Descuento</label>
                        <div className="mt-2.5">
                            <select 
                                id="discount"
                                onChange = {(e) => handleSelectedDiscount(e.target.value)} 
                                className="text-center block bg-transparent w-full rounded-md border-2 border-grey px-3.5 py-2 text-gray-900 shadow-sm ring-gray-300">
                                <option key={0} value={selectedDiscount}>{discount[selectedDiscount]}</option>
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
                    <div className="flex-1 px-4">
                        <label htmlFor="month" className="block text-lg font-semibold leading-6 text-gray-900">Meses</label>
                        <div className="mt-2.5">
                            <input 
                            id="month" 
                            type="number" 
                            className="value:hidden text-center block bg-transparent w-full rounded-md border-2 border-grey px-3.5 py-2 text-gray-900 shadow-sm ring-gray-300" 
                            placeholder="N° Meses"
                            // defaultValue={1}
                            value={selectedProyectDuration}
                            onChange={(e) => handleSelectedProyectDuration(e.target.value)}
                            min={1}
                            />
                        </div>
                    </div>
                    <div className="flex-1">
                            <label htmlFor="extra" className="block text-lg font-semibold leading-6 text-gray-900">Monto Extra Mensual</label>
                        <div className="mt-2.5">
                            <input
                                id="extra"
                                type="number"
                                className="value:hidden text-center block bg-transparent w-full rounded-md border-2 border-grey px-3.5 py-2 text-gray-900 shadow-sm ring-gray-300"
                                // placeholder="N° Extras"
                                placeholder="Monto UF"

                                value={selectedOtherCosts}
                                onChange={(e) => handleSelectedOtherCosts(e.target.value)}
                                min={0}
                            />
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="status" className="block text-lg font-semibold leading-6 text-gray-900">Estado</label>
                    <div className="mt-2.5">
                        <Select
                            className='text-gray-900'
                            instanceId="status"
                            options={allStatus}
                            value={findStatus(allStatus, selectedStatus)}
                            onChange={handleStatusChange}
                        />
                    </div>
                </div>
            </div>
            {showWarning && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeWarning}></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-top sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <p className="text-x mb-2">¿Estás seguro de eliminar esta cotización?.</p>
                                <div className='flex justify-between'>
                                    <button
                                        type="button"
                                        className="top-4 right-4 text-gray-500 hover:text-gray-700"
                                        onClick={async (e) => {confirmDelete(e)}}>
                                        Eliminar
                                    </button>
                                    <button
                                        type="button"
                                        className="top-4 left-4 text-gray-500 hover:text-gray-700"
                                        onClick={closeWarning}>
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
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
                    <p className="text-x mb-2 text-gray-900">La cotización se editó correctamente.</p>
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
                            type="button"
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowEmptyFieldsAlert(false)}
                            >
                            Cerrar
                            </button>
                            <p className="text-x mb-2 text-gray-900">Campos obligatorios sin rellenar. Por favor, proporcione la información necesaria.</p>
                        </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="mt-10 grid grid-cols-3 gap-x-2">
                <button
                    type="button"
                        onClick={() =>  router.back()}
                    className="block w-full rounded-md bg-selfpallete-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Cancelar Cambios
                </button>
                <button 
                    type="submit" 
                        className="block w-full rounded-md bg-selfpallete-300 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Guardar Cambios
                </button>
                <button 
                    type="button"
                    onClick={() => setShowWarning(true)} 
                        className="block w-full rounded-md bg-red-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Eliminar
                </button>
            </div>
            {isCartVisible && (
                <div className="fixed top-16 right-0 p-4 bg-white border border-gray-300 rounded-lg shadow-lg max-w-[320px]">
                    <div className="cart-summary">
                        <h2 className="text-2xl font-semibold">Resumen de la Cotización</h2>
                        <ul>
                            {Object.entries(selectedProfiles).map(([type, profiles], i) =>
                            profiles.map((profile, j) => (
                                <li key={i*10+j}>
                                    {type  + " "} 
                                    {profile.uniqueId}
                                    {profile.quantity}%
                                </li>
                            ))
                            )}
                        </ul>
                        <p>Monto Mensual: ${numberWithCommas(monthlyTotal)}</p>        
                        <p>Tarifa Total: ${numberWithCommas(total)}</p>
                        <p className='font-bold'>Tarifa Total Con Descuento: ${numberWithCommas(Math.round(total*(1-selectedDiscount/100)))}</p>
                    </div>
                </div>
            )}
        </form>
    </div>
    )
}