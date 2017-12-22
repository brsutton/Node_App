const Bcrypt = require('bcrypt');
const Hapi = require('hapi');
const getUserFromDatabase = require('../src/getUsersFromDatabase.js');
const config = require('../config/config.js');
const validate = require('../src/validate.js');

const main = async () => {

    const server = Hapi.server({ port: config.port });
    await server.register(require('hapi-auth-basic'));
    server.auth.strategy('simple', 'basic', { validate: validate.validate });
    server.auth.default('simple');

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, h) {
            return `Welcome ${request.auth.credentials.firstName} ${request.auth.credentials.lastName}`;
        }
    });

    await server.start();
    return server;
};

main()
    .then((server) => console.log(`Server listening on ${server.info.uri}`))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });