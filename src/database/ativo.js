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
    comentarios: [],
    historico: [],
    marca: {
        type: marca.MarcaSchema
    },
    tipo_ativo: {
        type: tipo_ativo.TipoAtivoSchema
    },
    localidade: {
        type: localidade.LocalidadeSchema
    },
    responsavel: {
        type: usuario.UsuarioSchema
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