# Geo Query stores in Node with Auth

This app is the backend for a store locator. 

You simply add new stores with their coordinates.

1) clone the project:
```
git clone https://github.com/giovapanasiti/node-store-locator
```

2) move into the project directory and install all the dipendencies:

```bash
npm install
```

3) create a `.env` file and add an env variable called `MLAB_URI`

```js
MLAB_URI="mongodb://<dbuser>:<password>@something.mlab.com:43931/dbname"
// for this example I used mlab.com which is super convenient
```

4) the last thing you need to do is to add a specific index into the `stores` collection

```js
db.stores.createIndex({point:"2dsphere"});
```

__That's it__!! You should be good to go

-----

## Add new User

```http
POST http://{{host}}/api/auth/register
content-type: application/json

{
  "email": "demo@user.it",
  "name": "demo",
  "password": "12345678"
}
```

## Login

```http
POST http://{{host}}/api/auth/login
content-type: application/json

{
  "email": "demo@user.it",
  "password": "12345678"
}
```


## Add new store

This is an authenticated route

```http
POST http://{{host}}/api/stores/ 
content-type: application/json
x-access-token: {{token}} 

{
  "name": "Woolwich - Powis Street",
  "address": {
    "street": "32, POWIS STREET",
    "city": "Woolwich",
    "province": "ENG",
    "zipcode": "SE18 6LF"
  },
  "lat": 51.47,
  "lng": 0.07
}
```

## Search for Nearby Stores

This is an authenticated route

- __lat__ query params is the latitude you want to use in the query
- __lng__ query params is the longitude you want to use in the query
- __distance__ query params is the range you want to query within

```http
GET http://{{host}}/api/stores/nearby
  ?lat=51.47 
  &lng=0.07
  &distance=5000
x-access-token: {{token}} 
```

### Response Example

```json
{
  "records": 4,
  "stores": [
    {
      "_id": "5b58765f69599308f17c6efe",
      "name": "asd Woolwich - Powis Street ude",
      "point": {
        "type": "Point",
        "coordinates": [
          0.07,
          51.47
        ]
      },
      "__v": 0,
      "address": [
        {
          "street": "32, POWIS STREET",
          "city": "Woolwich",
          "province": "ENG",
          "zipcode": "SE18 6LF",
          "_id": "5b58765f69599308f17c6eff"
        }
      ]
    },
    {
      "_id": "5b58767069599308f17c6f00",
      "name": "asd Woolwich - Powis Street ude",
      "point": {
        "type": "Point",
        "coordinates": [
          0.07,
          51.47
        ]
      },
      "__v": 0,
      "address": [
        {
          "street": "32, POWIS STREET",
          "city": "Woolwich",
          "province": "ENG",
          "zipcode": "SE18 6LF",
          "_id": "5b58767069599308f17c6f01"
        }
      ]
    },
    {
      "_id": "5b570782dcfa5a13afe5e318",
      "name": "Woolwich - Powis Street",
      "point": {
        "type": "Point",
        "coordinates": [
          0.07,
          51.49
        ]
      },
      "__v": 0,
      "address": [
        {
          "zipcode": "SE18 6LF",
          "province": "ENG",
          "city": "Woolwich",
          "street": "32, POWIS STREET"
        }
      ]
    },
    {
      "_id": "5b570782dcfa5a13afe5e1cc",
      "name": "London - Greenwich Shopping Park",
      "point": {
        "type": "Point",
        "coordinates": [
          0.02,
          51.49
        ]
      },
      "__v": 0,
      "address": [
        {
          "zipcode": "SE7 7ST",
          "province": "ENG",
          "city": "London",
          "street": "Unit D, 1C Greenwich Shopping Park, Bugsbys Way, Charlton"
        }
      ]
    }
  ]
}
```