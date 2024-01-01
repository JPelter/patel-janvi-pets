# Introduction
This is a python flask server. The entrypoint of this application is *server.py*. Below is information about the build and release. Then there is a description of each script, top-to-bottom. More comments can be found in-line with the code.

# Build
<TODO>

# Release
<TODO>

# Scripts
## server.py
Starts with library imports for creating a flask SQL Alchemy app.

Creates common objects that other scripts rely on: flask app, database connection, table objects, object-storage client, the critical function *login_required*.

Database table objects are renamed to be FRIENDLY.

Other scripts are imported that define sets of related functions and API routes. 

Finally, the server is started up (when it is the entrypoint). This startup includes defining two routes: an open healthcheck endpoint that shows the server is running and an authenticated route that verifies connectivity to database and object-storage client.

## auth_routes.py
Several imports from standard library, some flask imports, and import of the common objects from **server.py**.

The script starts by defining 3 POST routes. First a request containing JSON data with key "email" triggers creation of a login token (registering the email in the DB if not recorded already) and email send of token to the user. Next a route accepting matching JSON data for "email" and "login_token", this will authenticate the client with a flask session cookie. There is also an enable to logout: the server responds by telling the client to delete the session cookie.

## appointment_routes.py
Several imports from standard library, some flask imports, and import of the common objects from **server.py**.