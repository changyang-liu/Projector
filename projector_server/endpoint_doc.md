# Endpoint Documentation

## Projects

- __List:__ GET '/projects/'
- __Create new:__ POST '/projects/' (Authenticated only)
- __Retrieve single:__ GET '/projects/:id'
- __Update single:__ PUT 'projects/:id' (Owner only)
- __Delete single:__ DELETE 'projects/:id' (Owner only)
- __Update members:__ PUT 'projects/:id/join' (Authenticated only)

## Users

- __List:__ GET '/users/'
- __Retrieve single:__ GET '/users/:id'
- __Update profile:__ PUT 'users/:id/profile' (Is User only)

## Google oauth

- __Token exchange:__ POST '/social/google-oauth2' (Body: {'token': '...'})

## JWT refresh

- POST 'api/token/refresh/' (Body: {'refresh': '...'})
