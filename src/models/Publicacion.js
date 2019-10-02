const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublicacionSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    PublicacionPhoto: {
        type: String
    },
    contenido: {
        type: String

    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    likes: {
        type: Number
    },
    likedBy: {
        type: [Schema.Types.ObjectId],
        ref: 'usuarios'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('publicaciones', PublicacionSchema);
