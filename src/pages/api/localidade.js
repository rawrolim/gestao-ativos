import localidade from '@/database/localidade';

export default async function handler(req, res) {

    if (req.method === 'GET') {
        if (req.query._id) {
            const locale = await localidade.DB.findById(req.query._id);
            res.status(200).json(locale);
        } else {
            let locales;
            if(req.query){
                locales = await localidade.DB.find(req.query);
            }else{
                locales = await localidade.DB.find();
            }
            res.status(200).json(locales);
        }
    } else if (req.method === 'POST') {
        const locale = await localidade.DB.create(req.body);
        res.status(200).json(locale);
    } else if (req.method === 'PUT') {
        await localidade.DB.findByIdAndUpdate(req.body._id, { updatedAt: new Date() });
        const locale = await localidade.DB.findByIdAndUpdate(req.body._id, req.body);
        res.status(200).json(locale);
    } else if (req.method === 'DELETE') {
        let locale = await localidade.DB.findById(req.body._id);
        req.body.bloqueado = !locale.bloqueado;
        locale = await localidade.DB.findByIdAndUpdate(req.body._id,
            {
                updatedAt: new Date(),
                bloqueado: req.body.bloqueado
            });
        res.status(200).json(locale);
    }
}
