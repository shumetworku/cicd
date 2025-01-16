'use strict';

const Hapi = require('@hapi/hapi');
const Server = Hapi.server({ // Corrected the initialization
    host: 'localhost',
    port: 3000
});
const Hello = require('./lib/hello');

Server.route({
    method: 'GET',
    path: '/hello/{user}',
    handler: (request, h) => {
        const result = Hello(decodeURIComponent(request.params.user));
        return result;
    }
});

// Don't start the server if this file is required
if (!module.parent) {
    const start = async () => {
        try {
            await Server.start();
            console.log(`Server running at: ${Server.info.uri}`);
        } catch (err) {
            console.error(err);
            process.exit(1);
        }
    };
    start();
}

module.exports = Server;
