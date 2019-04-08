# Boxinator

## Frontend

The frontend is built with Create React App, uses Redux, is styled with Less and utilizes Enzyme to test components
To run, use following commands:

- yarn install
- yarn start


## Backend

The backend is built using Java with the Spring Framework. The database is using MySQL

To use the REST Api from the frontend, run **"Application"** located in the **"boxinator" package**.
To launch the tests, run **"ApplicationTests"** located in the test folder.

*Please note,  
the database runs on an MySQL instance on port 3306 with the **"admin"** user. You might have to change
the user to one available.*

*Also note that "spring.jpa.hibernate.ddl-auto" will be set to **"create"** to initiate the database. To have data persist between sessions please change this to **"update"** once the structure is in place.*

### Api Endpoints
- GET: http://localhost:8080/orders/all

Returns all a list of all orders

- POST: http://localhost:8080/orders/add

Adds a single order  
Requires a box item

```
const box = {
        receiver: "Name of the receriver",
        weight: 200,
        color: "(255,255,255)",
        country: "Sweden",
      }
```
- Receiver: String, Not empty
- Weight: Int, Positive or Zero, Weight in kg
- Color: String, Not Emtpy, Not Blue, In RGB format
- Country: String, Not Empty
