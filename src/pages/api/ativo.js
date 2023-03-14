import ativo from '@/database/ativo';

export default async function handler(req, res) {

    if (req.method === 'GET') {
        if (req.query._id) {
            const active = await ativo.DB.findById(req.query._id);
            res.status(200).json(active);
        } else {
            let actives;
            if(req.query){
                actives = await ativo.DB.find(req.query);
            }else{
                actives = await ativo.DB.find();
            }
            res.status(200).json(actives);
        }
    } else if (req.method === 'POST') {
        req.body.historico = [{message:'Ativo criado', createdAt: new Date()}];
        const active = await ativo.DB.create(req.body);
        res.status(200).json(active);
    } else if (req.method === 'PUT') {
        await ativo.DB.findByIdAndUpdate(req.body._id, { updatedAt: new Date() });
        const active = await ativo.DB.findByIdAndUpdate(req.body._id, req.body);
        res.status(200).json(active);
    } else if (req.method === 'DELETE') {
        let active = await ativo.DB.findById(req.body._id);
        req.body.bloqueado = !active.bloqueado;
        active = await ativo.DB.findByIdAndUpdate(req.body._id,
            {
                updatedAt: new Date(),
                bloqueado: req.body.bloqueado
            });
        res.status(200).json(active);
    }
}
