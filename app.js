'use strict';

const Hapi = require('@hapi/hapi');

// Configure the server to bind to 0.0.0.0 and use the PORT environment variable if set
const server = Hapi.server({
    host: '0.0.0.0', // Ensures the server is accessible from outside the container
    port: process.env.PORT || 3000
});

// Sample route
const Hello = require('./lib/hello');
server.route({
    method: 'GET',
    path: '/hello/{user}',
    handler: (request, h) => {
        const result = Hello(decodeURIComponent(request.params.user));
        return result;
    }
});

// Add a health-check route for probes
server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return { status: 'ok' }; // Responds with a 200 OK status
    }
});

// Start the server if the file is executed directly
if (!module.parent) {
    const startServer = async () => {
        try {
            await server.start();
            console.log(`Server running at: ${server.info.uri}`);
        } catch (err) {
            console.error(err);
            process.exit(1);
        }
    };
    startServer();
}

module.exports = server;
