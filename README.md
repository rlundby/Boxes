# Boxinator

## Frontend

The frontend is built with Create React App, uses Redux, is styled with Less and utilizes Enzyme to test components
To run, use following commands:

- yarn install
- yarn start


## Backend

The backend is built using Java with the Spring Framework. The database is using MySQL

To use the REST Api from the frontend, run "Application" located in the "boxinator" package.

Please note,
the database runs on an MySQL instance on port 3306 with the "admin" user. You might have to change
the user to suite on available on your instance.

Also note that "spring.jpa.hibernate.ddl-auto" will be set to "create" to initiate the database. To have data persist between sessions please change this to "update" once the structure is in place.
