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
        default: false,
    },
    motivo_bloqueio: {
        type: String
    },
    tipo_acesso: {
        type:String,
        default: 'USUARIO'
    }
});

const DB = mongoose.models.usuarios || mongoose.model('usuarios', UsuarioSchema);

export default { DB, UsuarioSchema };