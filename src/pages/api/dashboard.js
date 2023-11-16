import ativo from '@/database/ativo';
import authMiddleware from '@/middleware/authMiddleware';

async function handler(req, res) {

    if (req.method === 'GET') {
        const statusAssets = await ativo.DB.aggregate([
            {
                $lookup: {
                    from: "status",
                    localField: "status",
                    foreignField: "_id",
                    as: "status"
                }
            },
            {
                $unwind: "$status"
            },
            {
                $group: {
                    _id: "$status.nome",
                    contador: { $sum: 1 }
                }
            }
        ]);

        const localAssets = await ativo.DB.aggregate([
            {
                $lookup: {
                    from: "localidades",
                    localField: "localidade",
                    foreignField: "_id",
                    as: "localidade"
                }
            },
            {
                $unwind: "$localidade"
            },
            {
                $group: {
                    _id: "$localidade.nome",
                    contador: { $sum: 1 }
                }
            }
        ]);

        const tipoAtivos = await ativo.DB.aggregate([
            {
                $lookup: {
                    from: "tipoativos",
                    localField: "tipo_ativo",
                    foreignField: "_id",
                    as: "tipo_ativo"
                }
            },
            {
                $unwind: "$tipo_ativo"
            },
            {
                $group: {
                    _id: "$tipo_ativo.nome",
                    contador: { $sum: 1 }
                }
            }
        ]);

        const retorno = {
            status: {
                label: [],
                qtd: []
            },
            localidade: {
                label: [],
                qtd: []
            },
            tipo_ativo: {
                label: [],
                qtd: []
            }
        };

        statusAssets.map(status => {
            retorno.status.label.push(status._id);
            retorno.status.qtd.push(status.contador);
        });

        localAssets.map(localidade => {
            retorno.localidade.label.push(localidade._id);
            retorno.localidade.qtd.push(localidade.contador);
        });

        tipoAtivos.map(tipoAtivo => {
            retorno.tipo_ativo.label.push(tipoAtivo._id);
            retorno.tipo_ativo.qtd.push(tipoAtivo.contador);
        });

        return res.status(200).json({
            statusCode: 200,
            body: retorno
        });
    }else{
        return res.status(500).json({
            statusCode: 500,
            message: 'method not allowed'
        });
    }
}

export default authMiddleware(handler);