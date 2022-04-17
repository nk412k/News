import { MongoClient } from "mongodb";

async function handler(req,res){
    if(req.method=='POST'){
        const data=req.body;
        const client = await MongoClient.connect(
          "mongodb+srv://Nokhalal:Nokhalal@cluster0.grwrf.mongodb.net/news?retryWrites=true&w=majority"
        );
        const db=client.db();
        const newsCollection=db.collection('news');
        const result=await newsCollection.insertOne(data);
        client.close();
        res.status(201).json({news:'News inserted'});
    }
}

export default handler;