import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';


async function getUriDatabase() {
    const mongod = await MongoMemoryServer.create({
        instance:{
            port: "27018",
            dbName: "gestao-ativos",
        }
    });
    const uri = mongod.getUri() + '/gestao-ativos';
    console.log(uri)
    return uri;
}

mongoose.connect(process.env.MONGODB_URI || '', {});
mongoose.Promise = global.Promise;

export default mongoose;