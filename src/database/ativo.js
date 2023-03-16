import mongoose from '../config/database';

const AtivoSchema = new mongoose.Schema({
    modelo: {
        type: String
    },
    serial: {
        type: String
    },
    comentarios: [],
    historico: [],
    marca: {
        
    },
    tipo_ativo: {
        
    },
    localidade: {
        
    },
    responsavel: {
        
    },
    status: {

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
});

const DB = mongoose.models.Ativo || mongoose.model('Ativo', AtivoSchema);

export default { DB, AtivoSchema };