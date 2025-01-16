'use strict';

const Hapi = require('@hapi/hapi');
const os = require('os');

const Server = new Hapi.Server({
    host: '0.0.0.0', // Listen on all IP addresses (important for Kubernetes)
    port: 3000
});

// Generate a random color for the pod
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Handler for the root path
Server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {
        const podName = os.hostname(); // Use the pod's hostname for uniqueness
        const color = getRandomColor(); // Get a random color

        return `
            <html>
                <head>
                    <style>
                        body {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            margin: 0;
                            background-color: #f0f0f0;
                        }
                        .circle {
                            width: 150px;
                            height: 150px;
                            border-radius: 50%;
                            background-color: ${color};
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-size: 24px;
                            color: white;
                        }
                    </style>
                </head>
                <body>
                    <div class="circle">
                        ${podName}
                    </div>
                </body>
            </html>
        `;
    }
});

if (!module.parent) {
    Server.start((err) => {
        if (err) {
            throw err;
        }
        console.log(`Server running at: ${Server.info.uri}`);
    });
}

module.exports = Server;
