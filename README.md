# Vehicle Api

GraphQL api for fetching xml data of vehicle make and type from public endpoint and return data in json form. 

## Setup Development Environment

Step 1:

git clone https://

Step 2:

Run selected service from Marvel

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

GraphiQL - http://localhost:3000/


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
