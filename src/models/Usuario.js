const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({

    usuarioname: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    cumple: {
        type: Date
    },

    publicaciones: {
        type: [Schema.Types.ObjectId],
        ref: 'publicaciones'
    },

    perfilImg: {
        type: String
    },

    amigos: {
        type: [Schema.Types.ObjectId],
        ref: 'usuarios'
    },

    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

UsuarioSchema.pre('save',function(next){
    const usuario = this;
    const SALT_FACTOR = 10;
    if(!usuario.isModified('password')) {return next();}
    bcrypt.genSalt(SALT_FACTOR,function(err,salt){
        if(err) return next(err);
        bcrypt.hash(usuario.password,salt,function(err,hash){
            if(err) return next(err);
            usuario.password = hash;
            next();
        });
    });

});

module.exports = mongoose.model('usuarios', UsuarioSchema);
