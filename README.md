
# Hospital project

This is a scholar project for the Data Bases subject. For this project is used Node JS 18.5 at the moment.


## Authors

- [Hernández Jiménez Irmin](https://www.github.com/IrminDev)
- Garcia Garcia Aram Jesua
- Horteales Morales Antony Rafel
- Toral Hernandez Leonardo Javier

# Environment variables
To run this project you need the following environment variables in a .env file located in ./hospital-backend

`DB_USER`: Your username in SQL Server.

`DB_PWD`: Your password in SQL Server.

`DB_SERVER`: This will be localhost only for developing and testing issues.

`PORT`: It could be 3003, but you can choose any port what you want or leave this variable empty.

`DB_NAME`: The name of the DB is hospital
## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd hospital
```

Install dependencies, for this case you need to install the dependencies of the backend and the frontend

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## API Reference

#### Get all persons

```http
  GET /api/persons
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| none | default |  |

#### Get a persons

```http
  GET /api/persons/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the person to fetch |

```http
  PUT /api/persons/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the person to update |

```http
  DELETE /api/persons/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the person to delete |

```http
  POST /api/signUp
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `patient`      | `Object` | **Required**. Patient to upload on the DB |

```http
  POST /api/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user`      | `Object` | **Required**. User credentials |
