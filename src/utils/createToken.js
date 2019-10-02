const jwt = require('jsonwebtoken');

const createToken = ({ email, usuarioname }) => {
    const payload = {
        email,
        usuarioname
    };

    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });
};

module.exports = createToken;
