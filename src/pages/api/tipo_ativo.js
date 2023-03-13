import tipo_ativo from '@/database/tipo_ativo';

export default async function handler(req, res) {

    if (req.method === 'GET') {
        if (req.body._id) {
            const active_type = await tipo_ativo.DB.findById(req.body._id);
            res.status(200).json(active_type);
        } else {
            let active_type;
            if(req.body){
                active_type = await tipo_ativo.DB.find(req.body);
            }else{
                active_type = await tipo_ativo.DB.find();
            }
            res.status(200).json(active_type);
        }
    } else if (req.method === 'POST') {
        const active_type = await tipo_ativo.DB.create(req.body);
        res.status(200).json(active_type);
    } else if (req.method === 'PUT') {
        await tipo_ativo.DB.findByIdAndUpdate(req.body._id, { updatedAt: new Date() });
        const active_type = await tipo_ativo.DB.findByIdAndUpdate(req.body._id, req.body);
        res.status(200).json(active_type);
    } else if (req.method === 'DELETE') {
        await tipo_ativo.DB.findByIdAndDelete(req.body._id)
        res.status(200).json();
    }
}
