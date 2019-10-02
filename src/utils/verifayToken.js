const jwt = require('jsonwebtoken');
const { obtenerUsuarioEmail } = require('../services/UsuarioService');

const verifyToken = async (req) => {
    const Authoritation = req.get('Authoritation');
    if (Authoritation) {
        const formatedToken = Authoritation.replace('JWT ', '');
        const payload = jwt.verify(formatedToken, process.env.SECRET_KEY);
        if (!payload) return req;
        const user = await obtenerUsuarioEmail(payload.email);
        if (!user) return req;
        req = { ...req, user };
    }
    return req;
};

module.exports = verifyToken;
