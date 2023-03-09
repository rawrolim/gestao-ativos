import mongoose from '../config/database';

const MarcaSchema = new mongoose.Schema({
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

const DB = mongoose.models.Marca || mongoose.model('Marca', MarcaSchema);

export default { DB, MarcaSchema };