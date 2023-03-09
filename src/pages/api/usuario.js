import usuarioDB from '@/database/usuario'
import md5 from 'md5';

export default async function handler(req,res){
  if(req.method === 'GET'){
    if(req.body._id){
      const user = await usuarioDB.findById(req.body._id);
      res.status(200).json(user);
    }else{
      let users;
      if(req.body){
        users = await usuarioDB.find(req.body);
      }else{
        users = await usuarioDB.find();
      }
      res.status(200).json(users);
    }
  }else if(req.method === 'POST'){
    req.body.senha = md5(req.body.senha);
    req.body.motivo_bloqueio = "Pendente confirmação de e-mail.";
    const user = await usuarioDB.create(req.body);
    res.status(200).json(user);
  }else if(req.method === 'PUT'){
    if(req.body.senha){
      const userActual = await usuarioDB.findById(req.body._id);
      if(md5(req.body.senha) !== userActual.senha){
        req.body.senha = md5(req.body.senha);
      }
    }
    await usuarioDB.findByIdAndUpdate(req.body._id,{updatedAt: new Date() });
    const user = await usuarioDB.findByIdAndUpdate(req.body._id, req.body);
    res.status(200).json(user);
  }else if(req.method === 'DELETE'){
      let user = await usuarioDB.findById(req.body._id);
      req.body.bloqueado = !user.bloqueado;
      user = await usuarioDB.findByIdAndUpdate(req.body._id,
      { 
        updatedAt: new Date(),
        bloqueado: req.body.bloqueado, 
        motivo_bloqueio: req.body.motivo_bloqueio
      });
    res.status(200).json(user);
  }
}
