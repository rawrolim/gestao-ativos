import status from '@/database/status';

export default async function handler(req, res) {

    if (req.method === 'GET') {
        if (req.query._id) {
            const brand = await status.DB.findById(req.query._id);
            res.status(200).json(brand);
        } else {
            let brand;
            if(req.query){
                brand = await status.DB.find(req.query);
            }else{
                brand = await status.DB.find();
            }
            res.status(200).json(brand);
        }
    } else if (req.method === 'POST') {
        const brand = await status.DB.create(req.body);
        res.status(200).json(brand);
    } else if (req.method === 'PUT') {
        await status.DB.findByIdAndUpdate(req.body._id, { updatedAt: new Date() });
        const brand = await status.DB.findByIdAndUpdate(req.body._id, req.body);
        res.status(200).json(brand);
    } else if (req.method === 'DELETE') {
        await status.DB.findByIdAndDelete(req.body._id);
        res.status(200).json();
    }
}
