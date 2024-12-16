Node Version 18.19.1

Pre-requisite:

- Postgres Local Server is Live on port 5432
- In .env.development - Change the database Username and Password to access local postgres

Step to Setup
npm install
npm run start

Test Endpoints:
GET - /product/:productCode/:location
POST - /product || Payload: {productCode: string, location: string, description: string, price: double}
PUT - /product/:productCode || Payload: {location: string, price: double}
DELETE - /product/:productCode
