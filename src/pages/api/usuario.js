import usuarioDB from '@/database/usuario'
import md5 from 'md5';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    if (req.query._id) {
      const user = await usuarioDB.DB.findById(req.query._id);
      res.status(200).json(user);
    } else {
      let users;
      if (req.query) {
        users = await usuarioDB.DB.find(req.query);
      } else {
        users = await usuarioDB.DB.find();
      }
      res.status(200).json(users);
    }
  } else if (req.method === 'POST') {
    req.body.senha = md5(req.body.senha);
    req.body.motivo_bloqueio = "Pendente confirmação de e-mail.";
    const user = await usuarioDB.DB.create(req.body);
    res.status(200).json(user);
  } else if (req.method === 'PUT') {
    if (req.body.senha) {
      const userActual = await usuarioDB.DB.findById(req.body._id);
      if (md5(req.body.senha) !== userActual.senha) {
        req.body.senha = md5(req.body.senha);
      }
    }
    await usuarioDB.DB.findByIdAndUpdate(req.body._id, { updatedAt: new Date() });
    const user = await usuarioDB.DB.findByIdAndUpdate(req.body._id, req.body);
    res.status(200).json(user);
  } else if (req.method === 'DELETE') {
    await usuarioDB.DB.findByIdAndDelete(req.body._id)
    res.status(200).json();
  }
}
