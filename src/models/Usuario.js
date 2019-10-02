const mongoose = require('mongoose');

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

module.exports = mongoose.model('usuarios', UsuarioSchema);
