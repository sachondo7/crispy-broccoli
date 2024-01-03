# Endpoints (dominio: https://legitbusiness.me/)

## Get http://localhost:3000/api/services/:clientId

* output:

  ```json
  [
      {
          "type": "ASESORÍA EN ARQUITECTURA",
          "id": 1
      },
      {
          "type": "CELULA PRODUCTO DE CLIENTE",
          "id": 2
      }
  ]
  ```

## Get http://localhost:3000/api/quotes/expire/:userId/:days

- input: el param days que indica cuantos días quedan para que expire y el userId es el user que quiere ver
- output ejemplo:

```json
[
    {
        "startDate": "2023-09-22T18:59:56.339Z",
        "endDate": "2023-10-19T12:00:00.000Z",
        "deliveryDate": "2023-10-22T18:59:56.339Z",
        "status": "completed",
        "idProyecto": "nombreProyecto",
        "id": 1
    },
    {
        "startDate": "2023-09-23T17:41:30.722Z",
        "endDate": "2023-09-19T12:00:00.000Z",
        "deliveryDate": "2023-10-23T17:41:30.722Z",
        "status": "In Process",
        "idProyecto": "super proyecto 3000",
        "id": 2
    }
]
```

## POST http://localhost:3000/api/users/login

- input:

```json
{
    "email" : string,
    "password": string
}
```

- output cuando es correcto:

```json
{
    "administrator": true,// Indica si es administrador o CEO
    "userId": int
} 
```

- output cuando no se acepta:

```json
{
    "detail": "Usuario no encontrado o contraseña incorrecta"
}
```

## GET http://localhost:3000/api/quotes/searchHistory/:user_id

- params: user_id
- output:

```json
[
    {
        "startDate": "2023-09-23T16:39:47.360Z",
        "endDate": "2023-10-19T12:00:00.000Z",
        "deliveryDate": "2023-10-23T16:39:47.360Z",
        "status": "completed",
        "idProyecto": "nombre Proyecto",
        "id": 40
    }
]
```

## POST http://localhost:3000/api/quotes/filters/:user_id

- Disclaimer: la query está hecha con ``LIKE``, por ende si tienes una cotización con ``idProyecto = proyecto`` y otra con ``idProyecto = proyecto1`` y en el filtro pones ``idProyecto: proyecto``, se devolverán ambas. Se puede cambiar pero me pareció mejor.
- params: user_id
- input: alguna combinacion de

```json
{
    "idProyecto": "nombre proyecto",
    "clientId": 1
}
```

- output:

```json
[
    {
        "startDate": "2023-09-23T16:39:47.360Z",
        "endDate": "2023-10-19T12:00:00.000Z",
        "deliveryDate": "2023-10-23T16:39:47.360Z",
        "status": "completed",
        "idProyecto": "nombre proyecto",
        "id": 40
    }
]
```

## GET http://localhost:3000/api/clients

* output

  ```json
  [
      {
          "name": "Banco de Chile",
          "rut_empresa": "caoscn19biabjs",
          "id": 2,
          "contacts": [
              {
                  "name": "Antonia Blanco",
                  "email": "AntoBlanco@gmail.com",
                  "id": 5
              },
              {
                  "name": "Ema Rodriguez",
                  "email": "EmaRodriguez@gmail.com",
                  "id": 6
              }
          ]
      },
      {
          "name": "Fallabella",
          "rut_empresa": "caoscn19biabjs",
          "id": 1,
          "contacts": []
      }
  ]
  ```

## POST http://localhost:3000/api/quotes

- input:

```
{
    "clientId": int,
    "contactId": int, // id contacto contraparte
    "idProyecto": string,
    "risk": string, // Alto, Medio, Bajo
    "porcentajeDescuento": int, // Entre 0 y 100
    "proyectDuration": int, // En meses
    "userId": int,
    "perfiles": [[string,int], [string, int]],
    "adicionales": [[string,int], [string, int]],
    "currency": string,
    "service": int, // id service
    "otherCosts": int // Valor de costos adicionales no calculable,
    "endDate": timestamp (ej: "2023-10-19 09:00:00-03"),
    "deliveryDate": timestamp (ej: "2023-10-19 09:00:00-03")
}
```

- output cuando se crea correctamente:

```json
{
    "quoteId": int,
    "tariffId": int
}
```

- outputs cuando no se crea correctamente:

```json
{
    "error": "An error ocurred while creating the quote."
}
```

```json
{
    "error": "An error ocurred while creating the {tariff, deduction} of the quote."
}
```

### GET http://localhost:3000/api/tariffs/:id

* output

  ```json
  {
      "currency": "Euros",
      "priceWhitDeduction": 211478,
      "grossPrice": 302112,
      "proyectDuration": 4,
      "risk": 10,
      "otherCosts": 67839,
      "id": 45,
      "deductions": [
          {
              "authorization": true,
              "percentage": 30,
              "id": 25
          }
      ],
      "serviceId": {
          "type": "CELULA PRODUCTO DE CLIENTE",
          "id": 2
      },
      "tecnologies": [
          {
              "type": "Tecno1",
              "value": 273,
              "id": 32
          },
          {
              "type": "Tecno2",
              "value": 275,
              "id": 33
          }
      ],
      "quote": {
          "startDate": "2023-10-02T00:08:57.945Z",
          "endDate": "2024-01-30T00:08:57.917Z",
          "deliveryDate": "2023-12-01T00:08:57.945Z",
          "status": "Enviada",
          "idProyecto": "id40089",
          "userId": {
              "name": "Antonia Blanco",
              "email": "antoniabdr2001@gmail.com",
              "passwordHash": null,
              "id": 2
          },
          "clientId": {
              "name": "Banco de Chile",
              "rut_empresa": "caoscn19biabjs",
              "id": 2
          },
          "id": 38,
          "tariffId": {
              "currency": "Euros",
              "priceWhitDeduction": 211478,
              "grossPrice": 302112,
              "proyectDuration": 4,
              "risk": 10,
              "otherCosts": 67839,
              "id": 45
          }
      },
      "profiles": [
          {
              "role": "profile1",
              "costperhour": 230,
              "hourAssignment": 100,
              "id": 45
          },
          {
              "role": "profile2",
              "costperhour": 228,
              "hourAssignment": 20,
              "id": 46
          }
      ]
  }
  ```

### Get http://localhost:3000/api/quotes

* output

  ```json

  [
      {
          "startDate": "2023-10-01T23:52:24.164Z",
          "endDate": "2024-01-29T23:52:24.144Z",
          "deliveryDate": "2023-11-30T23:52:24.164Z",
          "status": "Enviada",
          "idProyecto": "id40089",
          "userId": {
              "name": "Antonia Blanco",
              "email": "antoniabdr2001@gmail.com",
              "passwordHash": null,
              "id": 2,
              "blocked": false,
  	    "type": "KAM",
          },
          "clientId": {
              "name": "Banco de Chile",
              "rut_empresa": "caoscn19biabjs",
              "id": 2
          },
          "id": 31,
          "tariffId": {
              "currency": "Euros",
              "priceWhitDeduction": 300713,
              "grossPrice": 300713,
              "proyectDuration": 4,
              "risk": 10,
  	    "monthPrice": 158,
              "otherCosts": 67839,
              "id": 38,
              "deductions": [
                  {
                      "authorization": false,
                      "percentage": 3,
                      "id": 18
                  }
              ],
              "profiles": [
                  {
                      "role": "profile1",
                      "costperhour": 100,
                      "hourAssignment": 171,
                      "id": 31
                  },
                  {
                      "role": "profile2",
                      "costperhour": 20,
                      "hourAssignment": 210,
                      "id": 32
                  }
              ],
              "serviceId": {
                  "type": "CELULA PRODUCTO DE CLIENTE",
                  "id": 2
              },
              "tecnologies": [
                  {
                      "type": "Tecno2",
                      "value": 143,
                      "id": 19
                  },
                  {
                      "type": "Tecno1",
                      "value": 149,
                      "id": 18
                  }
              ]
          }
      },
      {
          "startDate": "2023-10-02T00:02:37.535Z",
          "endDate": "2024-01-30T00:02:37.516Z",
          "deliveryDate": "2023-12-01T00:02:37.535Z",
          "status": "Enviada",
          "idProyecto": "id40089",
          "userId": {
              "name": "Antonia Blanco",
              "email": "antoniabdr2001@gmail.com",
              "passwordHash": null,
              "id": 2
          },
          "clientId": {
              "name": "Banco de Chile",
              "rut_empresa": "caoscn19biabjs",
              "id": 2
          },
          "id": 32,
          "tariffId": {
              "currency": "Euros",
              "priceWhitDeduction": 301065,
              "grossPrice": 301065,
              "proyectDuration": 4,
              "risk": 10,
              "otherCosts": 67839,
              "id": 39,
              "deductions": [
                  {
                      "authorization": true,
                      "percentage": 3,
                      "id": 19
                  }
              ],
              "profiles": [
                  {
                      "role": "profile1",
                      "costperhour": 100,
                      "hourAssignment": 164,
                      "id": 33
                  },
                  {
                      "role": "profile2",
                      "costperhour": 20,
                      "hourAssignment": 138,
                      "id": 34
                  }
              ],
              "serviceId": {
                  "type": "CELULA PRODUCTO DE CLIENTE",
                  "id": 2
              },
              "tecnologies": [
                  {
                      "type": "Tecno2",
                      "value": 210,
                      "id": 21
                  },
                  {
                      "type": "Tecno1",
                      "value": 184,
                      "id": 20
                  }
              ]
          }
      }
  ]
  ```

### GET http://localhost:3000/api/quotes/:id

* output

  ```json
  {
      "startDate": "2023-11-16T20:39:10.014Z",
      "endDate": "2023-11-14T12:00:00.000Z",
      "deliveryDate": "2023-11-11T12:00:00.000Z",
      "status": "Por autorizar",
      "idProyecto": "FA-001",
      "userId": {
          "name": "Ximena Lambert",
          "email": "yerko.contreras@uc.cl",
          "passwordHash": "$2b$05$8kHtblFVYNL4qJBDUvgHxe9Am.aDupFgjwLOA19F4y1svvvOkuh9u",
          "id": 1,
          "blocked": false,
          "type": "administrator"
      },
      "clientId": {
          "name": "Banco de Chile",
          "rut_empresa": "42424242",
          "id": 2
      },
      "id": 7,
      "tariffId": {
          "currency": "UF",
          "priceWhitDeduction": 474,
          "grossPrice": 489,
          "proyectDuration": 3,
          "risk": 20,
          "otherCosts": 10,
          "id": 7,
          "monthPrice": 158,
          "deductions": [
              {
                  "authorization": true,
                  "percentage": 3,
                  "id": 7
              }
          ],
          "profiles": [
              {
                  "role": "Senior Developer",
                  "costperhour": 181,
                  "hourAssignment": 20,
                  "id": 16
              },
              {
                  "role": "Junior Developer",
                  "costperhour": 181,
                  "hourAssignment": 50,
                  "id": 15
              }
          ],
          "serviceId": {
              "type": "CELULA GESTIONADA",
              "id": 5
          },
          "tecnologies": [
              {
                  "type": "Actualizacion de hardware",
                  "value": 125,
                  "id": 3,
                  "quantity": 1
              }
          ]
      },
      "contactId": {
          "name": "Martin Perez",
          "email": "martin.perez@bancofalabella.cl",
          "id": 1
      }

  ```

### POST http://localhost:3000/api/quotes/update/:Id

* input, mandar solo lo que cambia. En caso de que sea perfiles o adicionales, se necesitan todos los que se van a guardar pese a si existian antes.

  ```json
  {
      "clientId": 1,
      "contactId": 7, 
      "idProyecto": "oascbaos029usakbjUS8BXI",
      "risk": "Medio",
      "porcentajeDescuento": 5, 
      "proyectDuration": 2, 
      "userId": 6,
      "perfiles": [[string,int], [string, int]],
      "adicionales": [[string,int], [string, int]],
      "currency": "UF",
      "service": 1,
      "otherCosts": 10000,
      "endDate": timestamp (ej: "2023-10-19 09:00:00-03"),
      "deliveryDate": timestamp (ej: "2023-10-19 09:00:00-03"),
      "status": string
  }
  ```
* output

  ```json
  {
      "startDate": "2023-10-02T00:08:15.179Z",
      "endDate": "2024-01-30T00:08:15.158Z",
      "deliveryDate": "2023-12-01T00:08:15.179Z",
      "status": "Actualizada",
      "idProyecto": "oascbaos029usakbjUS8BXI",
      "userId": {
          "name": "Antonellas Mugu",
          "email": "Antmu@gmail.com",
          "id": 6,
          "blocked": false,
  	"type": "KAM",
      },
      "clientId": {
          "name": "Fallabella",
          "rut_empresa": "caoscn19biabjs",
          "id": 1,
          "contacts": [
              {
                  "name": "Gustavo Torres",
                  "email": "GustavoTorres@gmail.com",
                  "id": 7
              }
          ]
      },
      "id": 37,
      "tariffId": {
          "currency": "UF",
          "priceWhitDeduction": 1011,
          "grossPrice": 1065,
          "proyectDuration": 2,
          "risk": 20,
          "otherCosts": 100,
          "id": 44,
          "deductions": [
              {
                  "authorization": true,
                  "percentage": 5,
                  "id": 24
              }
          ],
          "profiles": [
              {
                  "role": "profile1",
                  "costperhour": 202,
                  "hourAssignment": 100,
                  "id": 43
              },
              {
                  "role": "profile2",
                  "costperhour": 194,
                  "hourAssignment": 20,
                  "id": 44
              }
          ],
          "serviceId": {
              "type": "invento 1",
              "id": 1
          },
          "tecnologies": [
              {
                  "type": "Tecno2",
                  "value": 21,
                  "id": 31
              },
              {
                  "type": "Tecno1",
                  "value": 83,
                  "id": 30
              }
          ]
      }
  }
  ```

### DELETE http://localhost:3000/api/quotes/:id

* input: Se debe entregar como param el id de la quote a eliminar
* output status = 204

### GET http://localhost:3000/api/risks

```json
{
    "Bajo": 10,
    "Medio": 20,
    "Alto": 30
}
```

### GET http://localhost:3000/api/cart

* input

  ```
  {
    risk: string;
    profiles: Array<[string, number]>;
    discountPercentage: number;
    proyectDuration: number; // En meses
    otherCosts: number; // Costos adicionales en uf
    clientId: number
  }
  ```
* output

  ```
  {
      "asignaciones": number,
      "riesgo": number,
      "mensual": number,
      "tarifa": number,
      "descuento": number,
      "total": number
  }
  ```

### PUT http://localhost:3000/api/users/changePassword/:userId

input: en params debe tener id del usuario. En el body debe tener el siguiente json:

```json
{
    "password": "string",
    "newPassword": "string"
}

```

output cuando se cambia correctamente: status 200 y el usuario actualizado

output cuando no se cambia correctamente: status 404 y un json con el error

```json
{
    "error": "..."
}

```

# Rutas del administrador

Importante notar que :userId en todas las rutas hacen referencia al user que esta intentando entrar a las rutas de administrador. Y se utiliza para verificar que solo usuarios con permiso de administrador puedan utilizar estas rutas. El orden en los params siempre debe ser primero el userId y después el id necesario para esa ruta en especifico.

### POST http://localhost:3000/admin/edit_deductions/:userId/:id

Este endpoint es para que el administrador acepte o rechace un descuento.

input: en params debe tener el id del descuento (deduction). En el body debe tener el siguiente json:

```json
{
    "authorization": bool,
    "percentage": int
}

```

output: devuelve un json son el descuento actualizado y la tariff actualizada con sus campos respectivos (ya que puede cambiar el precio con el descuento autorizado)

```json
{
    NewDeduction,
    NewTariff
}

```

### POST http://localhost:3000/admin/create_user/:userId

input: en body debe tener el json que se muestra a continuación:

output: status 201 y el usuario

```json
{
    "name": "string",
    "email": "string",
    "password": "string",
    "type": "string" // NO OBLIGATORIO, SOLO CUANDO QUIERE CREAR A UN ADMIN Y MANDAR 'administrator'
}

```

### DELETE http://localhost:3000/admin/eliminate_user/:userId/:id

input: en params debe tener id del usuario

output: status 204

### PUT http://localhost:3000/admin/block_user/:userId/:id

input: en params debe tener id del usuario

output: status 200 y el usuario actualizado

### PUT http://localhost:3000/admin/unblock_user/:userId/:id

input: en params debe tener id del usuario

output: status 200 y el usuario actualizado

### GET http://localhost:3000/admin/accept_discounts/:userId

* Output: Quotes que tienen un descuento que debe aceptar el admin

```
[
    {
        "startDate": "2023-10-21T23:10:51.889Z",
        "endDate": "2024-10-19T12:00:00.000Z",
        "deliveryDate": "2023-12-19T12:00:00.000Z",
        "status": "Enviada",
        "idProyecto": "oascbaos029usakbjUS8BXI",
        "userId": {
            "name": "Hebert Herraz",
            "email": "heber.herraz@trebolit.cl",
            "passwordHash": "$2b$05$PLddQVQ3m6Omtgi1WJ.oBeBknTSIZxoowM3G4rSa9YkJg1UzzzkCq",
            "id": 29,
            "blocked": false,
            "type": "KAM"
        },
        "clientId": {
            "name": "Banco Falabella",
            "rut_empresa": "123456789",
            "id": 27
        },
        "id": 82,
        "contactId": {
            "name": "Martin Perez",
            "email": "martin.perez@bancofalabella.cl",
            "id": 18
        },
        "tariffId": {
            "currency": "UF",
            "priceWhitDeduction": 928,
            "grossPrice": 928,
            "proyectDuration": 2,
            "risk": 30,
            "otherCosts": 100,
            "id": 88,
            "deductions": [
                {
                    "authorization": false,
                    "percentage": 5,
                    "id": 58
                }
            ]
        }
    },
    {
        "startDate": "2023-10-21T23:11:49.647Z",
        "endDate": "2024-10-19T12:00:00.000Z",
        "deliveryDate": "2023-12-19T12:00:00.000Z",
        "status": "Enviada",
        "idProyecto": "oascbaos029usakbjUS8BXI",
        "userId": {
            "name": "Hebert Herraz",
            "email": "heber.herraz@trebolit.cl",
            "passwordHash": "$2b$05$PLddQVQ3m6Omtgi1WJ.oBeBknTSIZxoowM3G4rSa9YkJg1UzzzkCq",
            "id": 29,
            "blocked": false,
            "type": "KAM"
        },
        "clientId": {
            "name": "Banco Falabella",
            "rut_empresa": "123456789",
            "id": 27
        },
        "id": 84,
        "contactId": {
            "name": "Martin Perez",
            "email": "martin.perez@bancofalabella.cl",
            "id": 18
        },
        "tariffId": {
            "currency": "UF",
            "priceWhitDeduction": 1825,
            "grossPrice": 1825,
            "proyectDuration": 2,
            "risk": 30,
            "otherCosts": 100,
            "id": 90,
            "deductions": [
                {
                    "authorization": false,
                    "percentage": 11,
                    "id": 60
                }
            ]
        }
    }
]
```

### POST http://localhost:3000/admin/reassign_quotes_user/:userId

* input

  ```
  {
      "userId": int,
      "quoteId": int
  }
  ```
* output

  ```
  {
      "startDate": "2023-10-24T22:52:42.987Z",
      "endDate": "2024-03-19T12:00:00.000Z",
      "deliveryDate": "2023-12-03T12:00:00.000Z",
      "status": "Enviada",
      "idProyecto": "FA-003",
      "userId": {
          "name": "Carol Villalobos",
          "email": "carol.villalobos@trebolit.cl",
          "passwordHash": "$2b$05$9v1MCLNsAWatZ2kSjVw89er3LO.V6a2pnSGCIECayvB1mXR2kknYW",
          "id": 6,
          "blocked": true,
          "type": "KAM"
      },
      "clientId": {
          "name": "Unimarc",
          "rut_empresa": "42042-42",
          "id": 4
      },
      "id": 3,
      "tariffId": {
          "currency": "UF",
          "priceWhitDeduction": 455,
          "grossPrice": 479,
          "proyectDuration": 3,
          "risk": 30,
          "otherCosts": 0,
          "id": 3,
          "deductions": [
              {
                  "authorization": true,
                  "percentage": 5,
                  "id": 3
              }
          ],
          "profiles": [
              {
                  "role": "Desarrollador backend",
                  "costperhour": 160,
                  "hourAssignment": 10,
                  "id": 5
              },
              {
                  "role": "Diseñador",
                  "costperhour": 190,
                  "hourAssignment": 30,
                  "id": 6
              },
              {
                  "role": "Tester",
                  "costperhour": 126,
                  "hourAssignment": 40,
                  "id": 7
              }
          ],
          "serviceId": {
              "type": "ASESORÍA EN ARQUITECTURA",
              "id": 2
          },
          "tecnologies": []
      },
      "contactId": {
          "name": "Tomas Soto",
          "email": "tomas.soto@bancofalabella.cl",
          "id": 3
      }
  }
  ```

### GET http://localhost:3000/admin/quotes_to_reassign/:userId

Son las quotes que necesitan ser reasignadas por que sus usuarios fueron bloqueados.

```
[
    {
        "startDate": "2023-10-24T22:52:42.987Z",
        "endDate": "2024-03-19T12:00:00.000Z",
        "deliveryDate": "2023-12-03T12:00:00.000Z",
        "status": "Enviada",
        "idProyecto": "FA-003",
        "userId": {
            "name": "Carol Villalobos",
            "email": "carol.villalobos@trebolit.cl",
            "passwordHash": "$2b$05$9v1MCLNsAWatZ2kSjVw89er3LO.V6a2pnSGCIECayvB1mXR2kknYW",
            "id": 6,
            "blocked": true,
            "type": "KAM"
        },
        "clientId": {
            "name": "Unimarc",
            "rut_empresa": "42042-42",
            "id": 4
        },
        "id": 3,
        "contactId": {
            "name": "Tomas Soto",
            "email": "tomas.soto@bancofalabella.cl",
            "id": 3
        },
        "tariffId": {
            "currency": "UF",
            "priceWhitDeduction": 455,
            "grossPrice": 479,
            "proyectDuration": 3,
            "risk": 30,
            "otherCosts": 0,
            "id": 3,
            "deductions": [
                {
                    "authorization": true,
                    "percentage": 5,
                    "id": 3
                }
            ],
            "profiles": [
                {
                    "role": "Desarrollador backend",
                    "costperhour": 160,
                    "hourAssignment": 10,
                    "id": 5
                },
                {
                    "role": "Diseñador",
                    "costperhour": 190,
                    "hourAssignment": 30,
                    "id": 6
                },
                {
                    "role": "Tester",
                    "costperhour": 126,
                    "hourAssignment": 40,
                    "id": 7
                }
            ],
            "serviceId": {
                "type": "ASESORÍA EN ARQUITECTURA",
                "id": 2
            },
            "tecnologies": []
        }
    }
]
```

### GET http://localhost:3000/api/getReport

Se descarga un archivo .xlsx con el reporte de todas las cotizaciones

## GET http://localhost:3000/api/statistics

- params:

  - clientId (opcional): id del cliente para filtrar (pueden ser varios), si no se entrega se consideran todas las cotizaciones
  - userId (opcional): id del usuario para filtrar (pueden ser varios), si no se entrega se consideran todas las cotizaciones
  - serviceId (opcional): id del servicio para filtrar (pueden ser varios), si no se entrega se consideran todas las cotizaciones
  - startDate (opcional): fecha de inicio para filtrar, si no se entrega se consideran todas las cotizaciones
  - endDate (opcional): fecha de termino para filtrar, si no se entrega se consideran todas las cotizaciones
- ejemplos de uso:

  - http://localhost:3000/api/statistics
  - http://localhost:3000/api/statistics?userId=1
  - http://localhost:3000/api/statistics?clientId=1&clientId=2
  - http://localhost:3000/api/statistics?clientId=1&userId=1
  - http://localhost:3000/api/statistics?startDate=2021-01-01
  - http://localhost:3000/api/statistics?clientId=1&userId=1&serviceId=1&startDate=2021-01-01&endDate=2021-12-31
- output:

```json
{
  "enviada": int,
  "enviadaUF": int,
  "adjudicado": int,
  "adjudicadoUF": int,
  "perdido": int,
  "perdidoUF": int,
  "emitida": int,
  "emitidaUF": int,
  "negociada": int,
  "negociadaUF": int
}
```
