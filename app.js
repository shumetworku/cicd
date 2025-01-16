'use strict';

const Hapi = require('@hapi/hapi');

// In-memory task storage
const tasks = [];

const init = async () => {
    const server = Hapi.server({
        host: '0.0.0.0', // Ensures accessibility from outside the container
        port: process.env.PORT || 3000
    });

    // Health check route for probes
    server.route({
        method: 'GET',
        path: '/',
        handler: () => {
            return { status: 'ok', message: 'Welcome to the To-Do API!' };
        }
    });

    // Route to get all tasks
    server.route({
        method: 'GET',
        path: '/tasks',
        handler: () => {
            return { tasks };
        }
    });

    // Route to add a task
    server.route({
        method: 'POST',
        path: '/tasks',
        handler: (request) => {
            const { title } = request.payload;
            if (!title) {
                return { error: 'Task title is required' };
            }
            const task = { id: tasks.length + 1, title, completed: false };
            tasks.push(task);
            return { message: 'Task added successfully', task };
        }
    });

    // Route to mark a task as completed
    server.route({
        method: 'PATCH',
        path: '/tasks/{id}',
        handler: (request) => {
            const id = parseInt(request.params.id);
            const task = tasks.find((t) => t.id === id);
            if (!task) {
                return { error: 'Task not found' };
            }
            task.completed = true;
            return { message: 'Task marked as completed', task };
        }
    });

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

init();
