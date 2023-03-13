import marca from '@/database/marca';

export default async function handler(req, res) {

    if (req.method === 'GET') {
        if (req.body._id) {
            const brand = await marca.DB.findById(req.body._id);
            res.status(200).json(brand);
        } else {
            let brand;
            if(req.body){
                brand = await marca.DB.find(req.body);
            }else{
                brand = await marca.DB.find();
            }
            res.status(200).json(brand);
        }
    } else if (req.method === 'POST') {
        const brand = await marca.DB.create(req.body);
        res.status(200).json(brand);
    } else if (req.method === 'PUT') {
        await marca.DB.findByIdAndUpdate(req.body._id, { updatedAt: new Date() });
        const brand = await marca.DB.findByIdAndUpdate(req.body._id, req.body);
        res.status(200).json(brand);
    } else if (req.method === 'DELETE') {
        await marca.DB.findByIdAndDelete(req.body._id);
        res.status(200).json();
    }
}
