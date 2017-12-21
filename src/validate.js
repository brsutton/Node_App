const Bcrypt = require('bcrypt');
const getUserFromDatabase = require('../src/getUsersFromDatabase.js');

exports.validate = async (request, username, password, h) => {

    const data = await getUserFromDatabase.getUserFromDatabase(username);
    const user = data.Item;
    
    if (!user) {
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

