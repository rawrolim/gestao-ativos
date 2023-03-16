import mongoose from '../config/database';

const StatusSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    bloqueia_ativo: {
        type: Boolean
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

const DB = mongoose.models.Status || mongoose.model('Status', StatusSchema);

export default { DB, StatusSchema };