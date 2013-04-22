# Node.js Simple Server

This is a simple HTTP server.

It can route requests to appropriate file located in the `routes/` folder and call the right handler.
It can also serve static files from the `static/` folder.

## Install

You can simply place the `http-server` folder in your `node_modules/` folder. Then you can call it like this :

```javascript
var server = require('http-server');
```

You can either place it somewhere in your project, and call it by relative path. Example if it's in the same folder as the file calling it :

```javascript
var server = require('./http-server');
```

## Usage

Once you have called the `http-server` module, you can start the server and pass the port number like this :

```javascript
var server = require('http-server');
server.start(8080);
```

Or you can directly use :

```javascript
require('http-server').start(8080);
```

## Routing

You don't have to define routes somewhere in your code. Juste create a file in the `routes/` folder and you are ready to go !

Routes works as follow : `/routeName/handler/param1/param2/...`

The default page is the `start.js` file in the `routes/` directory.
If you don't define the handler for a route, eg. by calling the URL `/api`, `/start`, etc. the router will call the `handle` function of your route.

### Examples

* GET / --> require the `routes/start.js` file and call the `handle` function
* GET /start --> require the `routes/start.js` file and call the `handle` function
* GET /api --> require the `routes/api.js` file and call the `handle` function
* GET /api/users --> require the `routes/api.js` file and call the `users` function
* GET /api/users/42 --> require the `routes/api.js` file and call the `users` function with one parameter (42)

### Route handler

A route handler receive 2 parameters :

* info --> informations about the request, params, etc
    * info.method --> HTTP method used for the request, eg POST, GET, PUT, etc.
    * info.path   --> requested path, eg. `/api/users/42`
    * info.data   --> data passed by POST or PUT
    * info.params --> array of parameters passed in the URL. Eg : with `/api/users/42/posts` your params will be `['42', 'posts']`
* res  --> response object (instance of http.ServerResponse), used to answer to the request

## Use, share & improve !

This is my first Node.js project, so it's certainly not perfect. Don't hesitate to share, comment and improve !

I know there is already a `http-server` module in npm, but when creating this project I had no ideas for a "creative" name...
I juste created it for personnal use, so for now it's gonna stay like that. If someone have any idea for another name, feel free to send me an email. :-)

You can contact me directly here : leeroy.brun@gmail.com
Or on my website : http://www.leeroy.me

That's all folks ! Thanks for reading !