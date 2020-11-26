# hackerbay-round-1-backend

### Getting Started

#### Local setup
- Clone this repo to your local machine
- Change into the project directory and run `npm install`.
- Create a .env file in the root directory and follow the format used in the .env.example file,
  replace the values of the keys with your choice of values e.g `PORT=2333 HOST=localhost JWT_SECRET=mysecret`
- Start the server by running `npm start` on the console. The server will be running on what ever localhost:<PORT> PORT is the value you set in the enviroment variable.
- You run the test by running `npm test`


#### Docker setup
- Run docker pull ohwill/hackerbay-round1-nodejs on your console to pull the docker image from dockerhub.
- Run docker run -p <PORT>:8080 -d ohwill/hackerbay-round1-nodejs to run the image. NB: replece PORT with an actual port number.

### API Reference
#### Getting started

### Error Handling
Errors are return as JSON objects in the following format
400
```
{
    "status": 400,
    "errors": ['bad request']
}
```
500
```
{
    "status": 500,
    "error": 'server error'
}
```
401
```
{
    "status": 401,
    "error": 'unauthorized'
}
```
The endpoints will return three types of errors when request fails;
- 400: Bad request
- 401: Unauthorized
- 500: Server Error

### Endpoints
```
POST '/signin'
POST '/resize-thumbnail'
POST '/patch-jso'
```

POST '/signin'
- Signs a user in.  
- Request Argument: None
- Returns: Json web token for future authorization
- Sample: ```curl http://127.0.0.1:<PORT>/signin -X POST -H "Content-type: application/json" -d '{"password": 'sdhsdh', "email": "abc@gmail.com"}'```
```
{
    'status': 200,
    'token': <JWT>
}
```

POST '/resize-thumbnail'
- Take an image url and resizes it to 50 BY 50 
- Request Argument: None
- Returns: A resized thumbnail image
- Sample: ```curl http://127.0.0.1:<PORT>/resize-thumbnail -X POST -H "Content-type: application/json" -d '{"url": "https://www.gla.ac.uk/hunterian/visit/ourvenues/hunterianartgallery.jpg"}'```
```
{
    'status': 200,
    'url': <resized thumbnail in base64>
}
```

POST '/patch-json'
- applies a json patch to a json object
- Request Argument: None
- Returns: A resized thumbnail image
- Sample: ```curl http://127.0.0.1:<PORT>/patch -X POST -H "Content-type: application/json" -d '{
    "patch" :[
        { "op": "addd", "payth": "/lastName", "value": "Wester" },
        { "op": "addd", "path": "/contactDetails/phoneNumbers/0", "value": { "number": "555-123" }  }
    ],
    "jsonObject": { "firstName": "Albert", "contactDetails": { "phoneNumbers": [] } }}```
```
{
    'status': 200,
    'data': <patched object>
}
```
