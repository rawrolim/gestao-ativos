import usuarioDB from '@/database/usuario'
import md5 from 'md5';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const usuarios = await usuarioDB.find();

        const usuario = usuarios.find(user => user.email === req.body.email && user.senha === md5(req.body.senha))

        if (!usuario) {
            throw Error("Usuário não encontrado");
        }
        const jwtData = {
            email: usuario.email,
            exp: Math.floor(Date.now() / 1000) + (10),
            refreshToken: generateToken()
        };

        await usuarioDB.findByIdAndUpdate(usuario._id, {
            refreshToken: jwtData.refreshToken
        });
        usuario.refreshToken = jwtData.refreshToken;
        const token = jwt.sign(jwtData, process.env.JWT_SECRET);

        res.json({ usuario,token });
    } else {
        res.status(404).send('Method Not Allowed');
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