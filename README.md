# Projector

Web application to post project ideas and connect people with projects

[Video Demonstration](https://youtu.be/IYBb8gSut6k "video demo")

## Instructions

This project demo will be run locally. The frontend and backend need to be run separately in different terminal windows.

### Backend

Open the projector_server directory in your terminal and use the following commands to set up and run the Django server.

1. `pipenv install`
2. `pipenv shell`
3. `./manage.py migrate` (This sets up the database)
4. `./manage.py runserver 8080` (The frontend depends on the port being 8080)

### Frontend

Open the projector_frontend directory in your terminal and use the following commands to set up and run the React app.

1. `npm install`
2. `npm start`