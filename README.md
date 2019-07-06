# Environment Variable:

-   REACT_APP_SECRET: Secret key for encrypting passwords

# Starting the application:

-   Create environment variable file
-   \$ npm i OR \$ yarn
-   \$ npm start OR \$ yarn start

# Login Credentials

-   admin@test.com / admin
-   random@test.com / random
-   user@test.com / user

# Note:

-   Google Place Search Text autocomplete is in the Home Page
-   Due to this [issue](https://github.com/googlemaps/google-maps-services-js/issues/59#issuecomment-399626833), we need a middleware server to call Google Maps API.
-   When creating new employees, the ID is generated with UUID.
-   When user is logged in, their token (based on their password) is stored in the localhost
