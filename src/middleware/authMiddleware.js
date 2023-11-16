import jwt from 'jsonwebtoken';
import usuarioDB from '@/database/usuario'


const authMiddleware = (handler) => async (req, res) => {
    const token = req.headers.authorization;
    const tokenDecoded = jwt.decode(token, process.env.JWT_SECRET);
    if (tokenDecoded) {
        const user = await usuarioDB.DB.findOne({ refreshToken: tokenDecoded.refreshToken });
        if (user) {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    if (err.name == 'TokenExpiredError') {
                        return res.status(401).send("TOKEN EXPIRADO.");
                    } else {
                        return res.status(500).send("ERRO AO VALIDAR TOKEN ENVIADO.");
                    }
                }
            });
            const result = await handler(req, res);
            return result;
        } else {
            return res.status(500).send("ERRO AO VALIDAR USUÁRIO COM O TOKEN ENVIADO.");
        }
    } else {
        return res.status(500).send("ERRO AO VALIDAR TOKEN ENVIADO.");
    }
};

export default authMiddleware;