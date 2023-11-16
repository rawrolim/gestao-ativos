import usuarioDB from '@/database/usuario'
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    const token = req.headers.authorization;

    const tokenDecoded = jwt.decode(token, process.env.JWT_SECRET);

    const user = await usuarioDB.DB.findOne({ refreshToken: tokenDecoded.refreshToken });
    if (user) {
        const jwtData = {
            email: user.email,
            exp: Math.floor(Date.now() / 1000) + (30),
            refreshToken: generateToken()
        };

        await usuarioDB.DB.findByIdAndUpdate(user._id, {
            refreshToken: jwtData.refreshToken
        });

        const newToken = jwt.sign(jwtData, process.env.JWT_SECRET);

        return res.status(200).send(newToken);
    }else{
        return res.status(500).send("ERRO AO BUSCAR USUÁRIO");

    }
}

function generateToken() {
    var token = ""
    for (var i = 0; i < 16; i++) {
        token += rand();
    }
    return token;

    function rand() {
        return Math.random().toString(36).substr(2);
    };
};