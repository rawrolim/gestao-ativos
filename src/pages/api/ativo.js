import ativo from '@/database/ativo';
import localidade from '@/database/localidade';
import marca from '@/database/marca';
import tipo_ativo from '@/database/tipo_ativo';
import usuario from '@/database/usuario';

export default async function handler(req, res) {

    if (req.method === 'GET') {
        if (req.query._id) {
            const active = await ativo.DB.findById(req.query._id);
            res.status(200).json(active);
        } else {
            const actives = await ativo.DB.aggregate([
                {
                    $lookup: {
                        from: "marcas",
                        localField: "marca",
                        foreignField: "_id",
                        as: "marca_obj",
                    }
                },
                {
                    $lookup: {
                        from: "localidades",
                        localField: "localidade",
                        foreignField: "_id",
                        as: "localidade_obj",
                    }
                },
                {
                    $lookup: {
                        from: "usuarios",
                        localField: "responsavel",
                        foreignField: "_id",
                        as: "responsavel_obj",
                    }
                },
                {
                    $lookup: {
                        from: "tipoativos",
                        localField: "tipo_ativo",
                        foreignField: "_id",
                        as: "tipo_ativo_obj",
                    }
                }
            ])

            actives.map(ativoCurrent => {
                ativoCurrent.marca_obj = ativoCurrent.marca_obj[0];
                ativoCurrent.localidade_obj = ativoCurrent.localidade_obj[0];
                ativoCurrent.responsavel_obj = ativoCurrent.responsavel_obj[0];
                ativoCurrent.tipo_ativo_obj = ativoCurrent.tipo_ativo_obj[0];
            });

            res.status(200).json(actives);
        }
    } else if (req.method === 'POST') {
        req.body.historico = [{ message: 'Ativo criado', createdAt: new Date() }];

        let marcaBD = await marca.DB.findById(req.body.marca);
        req.body.marca = marcaBD._id;
        let localidadeBD = await localidade.DB.findById(req.body.localidade);
        req.body.localidade = localidadeBD._id;
        let tipo_ativoBD = await tipo_ativo.DB.findById(req.body.tipo_ativo);
        req.body.tipo_ativo = tipo_ativoBD._id;
        let responsavelBD = await usuario.DB.findById(req.body.responsavel);
        req.body.responsavel = responsavelBD._id;

        const active = await ativo.DB.create(req.body);
        res.status(200).json(active);
    } else if (req.method === 'PUT') {
        if (req.body.marca) {
            let marcaBD = await marca.DB.findById(req.body.marca);
            req.body.marca = marcaBD._id;
        }
        if (req.body.localidade) {
            let localidadeBD = await localidade.DB.findById(req.body.localidade);
            req.body.localidade = localidadeBD._id;
        }
        if (req.body.tipo_ativo) {
            let tipo_ativoBD = await tipo_ativo.DB.findById(req.body.tipo_ativo);
            req.body.tipo_ativo = tipo_ativoBD._id;
        }
        if (req.body.responsavel) {
            let responsavelBD = await usuario.DB.findById(req.body.responsavel);
            req.body.responsavel = responsavelBD._id;
        }

        await ativo.DB.findByIdAndUpdate(req.body._id, { updatedAt: new Date() });
        const active = await ativo.DB.findByIdAndUpdate(req.body._id, req.body);
        res.status(200).json(active);
    } else if (req.method === 'DELETE') {
        await ativo.DB.findByIdAndDelete(req.body._id);
        res.status(200).json();
    }
}
