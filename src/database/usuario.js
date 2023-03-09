import mongoose from '../config/database';

const UsuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    telefone: {
        type: String,
        required: true
    },
    senha:{
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    bloqueado: {
        type: Boolean,
        default: true,
    },
    motivo_bloqueio: {
        type: String
    }
});

const UsuarioDB = mongoose.models.usuarios || mongoose.model('usuarios', UsuarioSchema);

export default UsuarioDB;