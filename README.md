# agrosistec
Repositório para o backend do projeto da disciplina de LDS e PrInt2


## running locally

Clone the project

```bash
  git clone https://github.com/AntonioEvandro/agrosistec.git
```

Enter the project directory

```bash
  cd agrosistec/
```

install the dependencies

```bash
   npm i
```

or

```bash
   yarn install
```


start the server

```bash
  npm run start:dev
```
or
```bash
  yarn run start:dev
```


Acesse:

https://localhost:3000/api-docs

ou

 http://localhost:5001/api-docs




## API documentation

```http
  POST /login
```

 Example:
```http
{
  "email": "adm@gmail.com",
  "senha": "adm12345"
}
```

Example:
```http
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzdiZDQ3YjZiZTBjOTc3NzU5MmUyMiIsImlhdCI6MTY5MDgyMzM2NywiZXhwIjoxNjkwOTA5NzY3fQ.8eTDY93Q4_8RvIAYTPttJQllkZUrTQAfh4GT9QK4yIE"
}
```

if you pass invalid values

```http
{
  "error": true,
  "code": 401,
  "message": "Invalid email or senha"
}
```


### Usuario


#### Returns all usuarios

```http
  GET /usuarios
```

Return:
```http
{
  "usuariosWithAnimals": [
    {
      "_id": "64c7bd47b6be0c9777592e22",
      "nome": "adm",
      "email": "adm@gmail.com",
      "animal": [],
      "__v": 0,
      "senha": "******"
    }
  ],
  "message": "Listing All usuarios and animals"
}
```

Authentication required

if not authenticated
```http
{
  "error": true,
  "code": 401,
  "message": "Authentication invalid, unauthorized"
}
```

#### Create a new usuario


```http
  POST /usuario
```

Example:
```http
{
  "nome": "user",
  "senha": "12345678",
  "email": "user@gmail.com",
}
```

Return: 
```http
{
  "newUsuario": {
    "nome": "user",
    "email": "user@gmail.com",
    "senha": "******",
    "animal": [],
    "_id": "64c7efbd9d412b935a787792",
    "__v": 0
  },
  "message": "Usuario created successfully"
}
```

#### Return usuario by id

```http
  GET /usuario/{id}
```

Return: 
```http
{
  "_id": "64c7efbd9d412b935a787792",
  "nome": "user",
  "email": "user@gmail.com",
  "senha": "******",
  "animal": [],
  "__v": 0
}
```
Authentication required

if not authenticated
```http
{
  "error": true,
  "code": 401,
  "message": "Authentication invalid, unauthorized"
}
```

#### Update usuario by id

```http
  PUT /usuario/{id}
```

Example:
```http
{
  "nome": "User01",
  "senha": "12345678",
  "email": "User01@gmail.com",
}
```


Return: 
```http
{
  "updatedData": {
    "nome": "User01",
    "senha": "12345678",
    "email": "User01@gmail.com",
  },
  "message": "Usuario updated successfully"
}
```

Authentication required

if not authenticated
```http
{
  "error": true,
  "code": 401,
  "message": "Authentication invalid, unauthorized"
}
```

#### Delete Usuario by id


```http
  DELETE /Usuario/{id}
```

Return:
```http

```

It is not possible to delete Usuario with animals associated with them.

Return:
```http
{
  "message": "Request error, check and try again, usuario has animals associated and cannot be deleted"
}
```
Authentication required

if not authenticated
```http
{
  "error": true,
  "code": 401,
  "message": "Authentication invalid, unauthorized"
}
```

### Animal

#### Creates a animal and adds it to the usuario.

```http
  POST /animal/{usuarioId}
```

 Example:
```http
{
  "nome": "Animal01",
  "raca": "",
  "peso": 500,
  "mediaLeite": "5",
  "dataNasc": "1993-12-12 10:10",
  "dataDes": "2023-09-09",
  "sexo": "F",
  "faixaEta": "",
  "status": ""
}
```

Return: 
```http
{
  "newAnimal": {
    "nome": "Animal01",
    "raca": "",
    "peso": 500,
    "mediaLeite": "5",
    "dataNasc": "1993-12-12 10:10",
    "dataDes": "2023-09-09",
    "sexo": "F",
    "faixaEta": "",
    "status": ""
    "_id": "64c7f4809d412b935a7877ab",
    "__v": 0
  },
  "usuarioId": "64c7efbd9d412b935a787792",
  "message": "Animal created and associated with usuario successfully"
}
```

Authentication required

if not authenticated
```http
{
  "error": true,
  "code": 401,
  "message": "Authentication invalid, unauthorized"
}
```


#### Returns all animals

```http
  GET /animal
```

Return:
```http
{
  "animals": [
    {
      "_id": "64c7f4809d412b935a7877ab",
      "nome": "Animal01",
      "raca": "",
      "peso": 500,
      "mediaLeite": "5",
      "dataNasc": "1993-12-12 10:10",
      "dataDes": "2023-09-09",
      "sexo": "F",
      "faixaEta": "",
      "status": ""
      "__v": 0
    }
  ],
  "message": "Listing All Animals"
}
```

Authentication required

if not authenticated
```http
{
  "error": true,
  "code": 401,
  "message": "Authentication invalid, unauthorized"
}
```

#### Update animal by id

```http
  PUT /animal/{animalId}/usuario/{usuarioId}
```

 Example:
```http
{
  "nome": "Mimosa",
  "raca": "",
  "peso": 500,
  "mediaLeite": "5",
  "dataNasc": "1993-12-12 10:10",
  "dataDes": "2023-09-09",
  "sexo": "F",
  "faixaEta": "",
  "status": ""
}
```


Return: 
```http
{
  "updatedData": {
    "nome": "Mimosa",
    "raca": "",
    "peso": 500,
    "mediaLeite": "5",
    "dataNasc": "1993-12-12 10:10",
    "dataDes": "2023-09-09",
    "sexo": "F",
    "faixaEta": "",
    "status": ""
  },
  "message": "Animal updated successfully"
}
```

Authentication required

if not authenticated
```http
{
  "error": true,
  "code": 401,
  "message": "Authentication invalid, unauthorized"
}
```


#### Delete animal by id

```http
  DELETE /animal/{animalId}/usuario/{usuarioId}
```

Return:
```http

```

Authentication required

if not authenticated
```http
{
  "error": true,
  "code": 401,
  "message": "Authentication invalid, unauthorized"
}
```



## Feedback

If you have any feedback, please let us know via Instagram. [@AntonioEvandro](https://www.instagram.com/evandro.013/) , [Camila Lima](https://www.instagram.com/camilalimalp/), [Fabricio Alves](https://wwwinstagram.com/fabricio.alves0/) or Email [Antonio Evandro](antonio.evandro.borges07@aluno.ifce.edu.br)


## Authors

- [@AntonioEvandro](https://github.com/AntonioEvandro)