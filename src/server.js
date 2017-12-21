const Bcrypt = require('bcrypt');
const Hapi = require('hapi');
const getUserFromDatabase = require('../src/getUsersFromDatabase.js');
const config = require('../config/config.js');

const validate = async (request, username, password, h) => {

    const data = await getUserFromDatabase.getUserFromDatabase(username);
    const user = data.Item;

    if (!user) {
        console.log(user);
        return { credentials: null, isValid: false };
    }

    const isValid = await Bcrypt.compareSync(password, user.password);
    const credentials = {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName
    };

    return { isValid, credentials };
};

const main = async () => {
    
    const server = Hapi.server({ port: config.port });
    await server.register(require('hapi-auth-basic'));
    server.auth.strategy('simple', 'basic', { validate });
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