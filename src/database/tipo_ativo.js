import mongoose from '../config/database';

const TipoAtivoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
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

const DB = mongoose.models.TipoAtivo || mongoose.model('TipoAtivo', TipoAtivoSchema);

export default { DB, TipoAtivoSchema };