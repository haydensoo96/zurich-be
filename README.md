Node Version 18.19.1

Pre-requisite:

- Postgres Local Server is Live on port 5432
- Create Database name motor_insurance_website
- In .env.development - Change the database Username and Password to access local postgres

Step to Setup
npm install
npm run start

Swagger Documentation:
Access the Swagger documentation at [http://localhost:3000/api](http://localhost:3000/api)

Test Endpoints:
GET - /product/:productCode/:location
POST - /product || Payload: {productCode: string, location: string, description: string, price: double}
PUT - /product/:productCode || Payload: {location: string, price: double}
DELETE - /product/:productCode
