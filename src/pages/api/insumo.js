import insumo from '@/database/insumo';

export default async function handler(req, res) {

    if (req.method === 'GET') {
        if (req.query._id) {
            const obj = await insumo.DB.findById(req.query._id);
            res.status(200).json(obj);
        } else {
            let obj;
            if(req.query){
                obj = await insumo.DB.find(req.query);
            }else{
                obj = await insumo.DB.find();
            }
            res.status(200).json(obj);
        }
    } else if (req.method === 'POST') {
        const obj = await insumo.DB.create(req.body);
        res.status(200).json(obj);
    } else if (req.method === 'PUT') {
        await insumo.DB.findByIdAndUpdate(req.body._id, { updatedAt: new Date() });
        const obj = await insumo.DB.findByIdAndUpdate(req.body._id, req.body);
        res.status(200).json(obj);
    } else if (req.method === 'DELETE') {
        await insumo.DB.findByIdAndDelete(req.body._id);
        res.status(200).json();
    }
}
