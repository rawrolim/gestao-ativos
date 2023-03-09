import mongoose from '../config/database';

const LocalidadeSchema = new mongoose.Schema({
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

const DB = mongoose.models.Localidade || mongoose.model('Localidade', LocalidadeSchema);

export default { DB, LocalidadeSchema };