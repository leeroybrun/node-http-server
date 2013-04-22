var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    path = require('path');

var baseDir = path.dirname(require.main.filename),
    routesDir = path.join(baseDir, 'routes/');

// Start the server
function start(port) {
    http.createServer(function(req, res) {
        var info = {};
        info.path = url.parse(req.url).pathname;
        info.params = [];
        info.data = '';
        info.method = req.method;
    
        // Parse POST data if any
        if(req.method === 'POST' || req.method === 'PUT') {
            req.on('data', function(data) {
                info.data += data;
            });
        }
        
        // On request end, route the request
        req.on('end', function() {
            (info.data !== '') ? info.data = JSON.parse(info.data) : {};
            
            router(info, res);
        });
    }).listen(port);
}

// Route the request and call the appropriate action
function router(info, res) {
    if(info.path.indexOf('/static/') === 0) {
        // Serve static files
        serveStaticFile(info.path, res);
    } else {
        // Parse route (controller) and action
        var urlParts = info.path.split('/'),
            route = (urlParts[1]) ? urlParts[1] : 'start',
            action = (urlParts[2]) ? urlParts[2] : 'handle';
        
        // Get params
        if(urlParts.length > 3) {
            info.params = urlParts.slice(3, urlParts.length);
        }
        
        // Check if route file exists
        fs.exists(path.join(routesDir, route +'.js'), function(exists) {
            if(exists) {
                var handler = require(path.join(routesDir, route));
                    
                // Call handler if exists
                if(typeof handler[action] === 'function') {
                    handler[action](info, res);
                } else {
                    notFound(res);
                }
            } else {
                notFound(res);
            }
        });
    }
}

// Serve static files
function serveStaticFile(pathname, res) {
    var file = path.join(baseDir, pathname);
        
    // File exists ?
    fs.exists(file, function(exists) {
        if(exists) {
            // Is it a file ?
            fs.stat(file, function(stat_err, stats) {
                if(stats.isFile()) {
                    // Send data back
                    res.writeHead(200);
                    fs.createReadStream(file).pipe(res);
                } else {
                    // It's not a file
                    notFound(res);
                }
            });
        } else {
            // File not found
            notFound(res);
        }
    })
}

// Return a 404 Not Found error
function notFound(res) {
    res.writeHead(404);
    res.end('Not Found');
}

exports.start = start;