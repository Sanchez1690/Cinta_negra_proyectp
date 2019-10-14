const jwt = require('jsonwebtoken');
const { obtenerUsuarioEmail } = require('../services/UsuarioService');

const verifyToken = async (req) => {
    try
    {
        const Authoritation = req.get('Authoritation');
        if (Authoritation) {
            const formatedToken = Authoritation.replace('JWT ', '');
            const payload = jwt.verify(formatedToken, process.env.SECRET_KEY);
            if (!payload) return req;
            const user = await obtenerUsuarioEmail(payload.email);
            if (!user) return req;
            //req = { ...req, user };
            return user;
        }else{
            return {};
        }
    //return req;
    }
    catch(e)
    {
        throw new Error(e.message); 
    }
};

module.exports = verifyToken;
