import usuarioDB from '@/database/usuario'
import md5 from 'md5';
import {sendEmailVerification, createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from '../../config/firebase';
import authMiddleware from '@/middleware/authMiddleware';

async function handler(req, res) {
  if (req.method === 'GET') {
    if (req.query._id) {
      const user = await usuarioDB.DB.findById(req.query._id);
      res.status(200).json(user);
    } else {
      let users;
      if (req.query) {
        if(req.query.email){
          req.query.email.replace("%40","@");
        }
        users = await usuarioDB.DB.find(req.query);
      } else {
        users = await usuarioDB.DB.find();
      }
      res.status(200).json(users);
    }

  } else if (req.method === 'POST') {
    req.body.senha = md5(req.body.senha);

    const userCredential = await createUserWithEmailAndPassword(auth, req.body.email, req.body.senha);
    const user = await usuarioDB.DB.create(req.body);

    await sendEmailVerification(userCredential.user);
    await auth.signOut();

    res.status(200).json(user);

  } else if (req.method === 'PUT') {
    if (req.body.senha) {
      const userActual = await usuarioDB.DB.findById(req.body._id);
      if (md5(req.body.senha) !== userActual.senha) {
        req.body.senha = md5(req.body.senha);
      }else{
        req.body.senha = userActual.senha;
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

export default authMiddleware(handler);
