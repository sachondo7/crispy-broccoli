# ARQUITECTURA HEXAGONAL

### Está dividida en 3 capas

1. Aplicación: es la que contiene la casos de uso
2. Dominio: contiene la lógica del negocio y las entidades del negocio
3. Infraestructura: Se encarga de la comunicación (BD-Servicios externos, repositorios externos, otras apis, etc.)

```console
|--src/
|    |--aplicacion/
|    |--dominio/
|    |--infraestructura/
|    |--api/
|--dist/
```

# .env

DB_TYPE=postgres

DB_HOST=localhost (test), db (development)

DB_PORT=5432

DB_USERNAME=

DB_PASS=

DB_NAME=

POSTGRES_USER=

POSTGRES_PASSWORD=

POSTGRES_DB= test (test), capstone (development)

NODE_ENV=development (development), test (test)

CONECTION_NAME=test (test), default (development)

EMAIL=trebolitmailertest@gmail.com
REFRESH_TOKEN=1//04g9U22A-5ihQCgYIARAAGAQSNwF-L9IrYcNVml8PocaS2aFY1dQ3MaQIOCRllja274iYBWs80tc51_Zqa19184wq7gwDE62qHN0
CLIENT_SECRET=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
CLIENT_ID=813231970833-o42g0pq0l4db81lu1nbc4sk92hm7soka.apps.googleusercontent.com

# Crear y correr una migración

Para crear la migración correr comando

```console
typeorm migration:create ./src/infrastructure/database/migrations/nombre_migracion
```

Luego se edita el contenido de la migración

Para correr la migración usar comando

```console
npm run typeorm migration:run -- -d ./src/infrastructure/database/data-source.ts
```

# Generar las seeds

Para que se agreguen las seeds a las tablas, se debe correr el siguiente comando:

```console
docker exec -it api npm run seed:run
```

# Otros comandos útiles:

```console
sudo service postgresql start
```

```console
psql -U tu_usuario -d nombre_db
```

```console
sudo docker rm $(sudo docker ps -aq)
```

```console
sudo docker rmi $(sudo docker images -aq)
```

```console
sudo docker exec -it db bin/bash
```

# Comandos para reiniciar base de datos en EC2

```
sudo docker compose down
```

```
sudo docker volume rm 2023-2-s2-grupo1-backend_db-volume
```

```
sudo docker compose up
```

# Reiniciar ids en las bases de datos

```
TRUNCATE TABLE clientdb, contactdb, deductiondb, profiledb, quotedb, servicedb, tariffdb, userdb CASCADE;


```

```
ALTER SEQUENCE clientdb_id_seq RESTART WITH 1;
ALTER SEQUENCE contactdb_id_seq RESTART WITH 1;
ALTER SEQUENCE deductiondb_id_seq RESTART WITH 1;
ALTER SEQUENCE profiledb_id_seq RESTART WITH 1;
ALTER SEQUENCE quotedb_id_seq RESTART WITH 1;
ALTER SEQUENCE servicedb_id_seq RESTART WITH 1;
ALTER SEQUENCE tariffdb_id_seq RESTART WITH 1;
ALTER SEQUENCE userdb_id_seq RESTART WITH 1;

```

# Borrar toda la base de datos personal

`DROP SCHEMA public CASCADE; CREATE SCHEMA public;`

# Link diagrama entidad relación:

https://drive.google.com/file/d/1rpL6XLzFNoCREnlJdYUuKdroAA6di9EG/view?pli=1

# Simulaciones:

Para el correcto uso de la API se simularon algunas rutas, las cuales deben ser cambiadas por las rutas del tarificador una vez estas sean creadas. Especificamente en los archivos.

#### /src/routes/clients el endpoint get '/api/clients'.

* output ejemplo

  ```
  [
        {
          name: 'Banco Falabella',
          rut_empresa: '123456789',
          id: 1,
          contacts: [
            {
              name: 'Martin Perez',
              email: 'martin.perez@bancofalabella.cl',
              id: 1
            },
            {
              name: 'Jose Gutierrez',
              email: 'jose.gutierrez@bancofalabella.cl',
              id: 2
            },
            {
              name: 'Tomas Soto',
              email: 'tomas.soto@bancofalabella.cl',
              id: 3
            }
          ]
        },
        {
          name: 'Abcdin',
          rut_empresa: '20500-03',
          id: 3,
          contacts: [
            {
              name: 'Pedro Perez',
              email: 'pedro.perez@abcdin.cl',
              id: 8
            },
            {
              name: 'Luis Lopez',
              email: 'luis.lopez@abcdin.cl',
              id: 9
            }
          ]
        },
        {
          name: 'Unimarc',
          rut_empresa: '42042-421',
          id: 4,
          contacts: [
            {
              name: 'Maria Perez',
              email: 'maria.perez@unimarc.cl',
              id: 10
            }
          ]
        }
      ];
  ```

#### /src/routes/services el endpoint get '/api/services/:clientId'

* input : Es necesario que la ruta reciba el id del cliente (mismo obtenido del endpoint anterior) como parametro.
* ouptut ejemplo:

  ```
  [
        {
          type: 'ASESORÍA',
          id: 1
        },
        {
          type: 'ASESORÍA EN ARQUITECTURA',
          id: 2
        },
        {
          type: 'ASESORÍA EN DISEÑO',
          id: 3
        },
        {
          type: 'CELULA PRODUCTO DE CLIENTE',
          id: 6
        },
        {
          type: 'CELULA T&M',
          id: 7
        },
        {
          type: 'DESARROLLO DISEÑO',
          id: 10
        },
        {
          type: 'DESARROLLO SISTEMA SEGURO',
          id: 12
        },
        {
          type: 'PROCESAMIENTO DE DATOS FINANCIERO',
          id: 13
        },
        {
          type: 'PRODUCTO STACKBIO',
          id: 16
        },
        {
          type: 'RECLUTAMIENTO Y SELECCIÓN',
          id: 17
        }
      ];
  ```

#### /src/routes/profiles el endpoint get '/api/profiles/:clientId'

* input : Es necesario que la ruta reciba el id del cliente (mismo obtenido del endpoint anterior) como parametro.
* ouptut ejemplo:

  ```
  const perfiles = [
        {
          id: 2,
          role: 'Diseñador',
          costpermonth: 120,
          hourAssignment: 100
        },
        {
          id: 4,
          role: 'Desarrollador frontend',
          costpermonth: 189,
          hourAssignment: 100
        },
        {
          id: 5,
          role: 'Arquitecto',
          costpermonth: 80,
          hourAssignment: 100
        },
        {
          id: 8,
          role: 'Product owner',
          costpermonth: 90,
          hourAssignment: 100
        }
      ];
  ```

# Tests

Para correr los tests se deben cambiar los valores del .env que se indican arriba. Si es que es necesario, correr el comando ``sudo service postgresql start`` para iniciar postgres. Luego, se corre ``npm test``. El coverage report se encuentra en la carpeta coverage.
