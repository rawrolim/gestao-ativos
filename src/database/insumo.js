import mongoose from '../config/database';

const InsumoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    obs: {
        type: String,
        required: false,
        dafault: ''
    }, 
    qtd: {
        type: Number,
        required: false,
        default: 0
    },
    historico: [],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const DB = mongoose.models.Insumo || mongoose.model('Insumo', InsumoSchema);

export default { DB, InsumoSchema };