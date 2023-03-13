import mongoose from '../config/database';
import localidade from './localidade';
import marca from './marca';
import tipo_ativo from './tipo_ativo';
import usuario from './usuario';

const AtivoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
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