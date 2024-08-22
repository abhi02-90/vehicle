# Vehicle Api

GraphQL api for fetching xml data of vehicle make and type from public endpoint and return data in json form. 

## Setup Development Environment

Step 1:

```
git clone https://github.com/abhi02-90/vehicle.git
```
Step 2:

Rename .env.example to .env

Step 3:

```
sudo docker-compose up -d
```
### Unit Test

Test using Jest

For running available test, execute:

```
npm run test
```

### GraphQL

GraphiQL - `http://localhost:3000/`


### GraphQL query

query {
        vehicles {
          makeId
          makeName
          vehicleTypes {
            typeId
            typeName
          }
        }
     }
     

