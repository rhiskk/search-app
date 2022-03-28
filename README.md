# Search-app backend

Rest API for adding, listing, deleting and searching cats.

## Getting started

1. Clone this repository

### Docker
2. Make sure you have docker compose installed on your machine
3. Run `docker compose up`

### Without Docker
2. Make sure you have access to a PostgreSQL database
3. Create an .env file with the following content and your PostgreSQL database information
```
POSTGRES_PASSWORD=
POSTGRES_USER=
POSTGRES_DB=
DB_HOST=
PORT=3001
```
4. Run `npm install` to install dependencies
5. Run `npm start` to start the application

### Requests

#### Get
`/api/cats` lists all cats

`/api/cats?name=cat` lists all cats with `cat` in their name

`/api/cats?order=DESC&by=name` lists all the cats sorted by name in the descending order.
Accepted `order` query parameters are DESC and ASC. Accepted `by` query parameters are id, name, weight, breedGroupId, createdAt and updatedAt.

`/api/cats?page=10&limit=5` returns 5 cats from page 10

You can mix and match these query parameters as you like.

Returned cats have attributes: 
```javascript
{
    id: 1, //Integer
    name: "testCat", //String
    weight: 0.01, //Float
    breedGroup: "testGroup" //String: Name of the breed group 
}
```
#### Post

```javascript
POST http://localhost:3001/api/cats HTTP/1.1
content-type: application/json

{
    "name": "testCat",
    "breedGroup": "testGroup",
    "weight": 0.01
}
```

Searches for a breed group with the name `testGroup` and if not found creates one.
Creates a cat with:

```javascript
{
  "id": 1, //id auto increments so this depends on the amount of cats in the database 
  "name": "testCat", //String
  "weight": 0.01, //Float
  "breedGroupId": 1 //id of the found or created breed group
  "updatedAt": DATE, //current time
  "createdAt": DATE //current time
}
```

#### Delete

`/api/cats/1` delete a cat with id: 1



